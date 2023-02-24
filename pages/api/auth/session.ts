import { NextApiHandler } from "next";
import { getCodeMetadata, deleteCode } from "../../../lib/auth/util";
import auth from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import getSession from "../../../lib/session";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession(req, res);
  if (req.method === "GET") {
    const { token, state } = req.query;

    let code =
      typeof token === "string" ? token : typeof state === "string" ? state : null;

    if (!code) {
      res
        .status(400)
        .json({ error: "`token` or `state` is required in the query string" });
      return;
    }

    const metadata = await getCodeMetadata(code);
    await deleteCode(code);

    if (!metadata || typeof metadata.provider !== "string") {
      res.status(400).json({ error: "Invalid code" });
      return;
    }

    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      null;

    // Fetch country code using IP address
    const countryCode = ip
      ? (await (await fetch(`https://ip-api.com/json/${ip}?fields=countryCode`)).json())
          .countryCode
      : null;

    const providerFunc = auth[metadata.provider];
    const { error, status, user, redirect } = await providerFunc.getUser(
      metadata,
      countryCode ? countryCode.toUpperCase() : undefined,
      req
    );

    if (error) {
      res.status(status || 500).json({ error });
      return;
    }

    let profile = await prisma.profile.findUnique({
      where: { userId: user.id },
      include: { user: true }
    });
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId: user.id,
          full_name: user.email.split("@")[0]
        },
        include: { user: true }
      });
    }

    session.userId = user.id;
    session.user = user;
    session.profile = profile;
    session.loggedIn = true;
    session.loggedInAt = new Date();
    session.loginIp = ip;
    session.loginCountry = countryCode;
    if (redirect) res.redirect("/");
    else res.status(200).json({ user, profile });
  } else if (req.method === "DELETE") {
    delete session.userId;
    delete session.user;
    delete session.profile;
    delete session.loggedIn;
    delete session.loggedInAt;
    delete session.loginIp;
    delete session.loginCountry;
    res.status(200).json({});
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export const config = {
  api: {
    externalResolver: true
  }
};

export default handler;
