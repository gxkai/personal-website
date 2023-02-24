import { NextApiHandler } from "next";
import getSession from "../../../../lib/session";
import joi from "joi";
import prisma from "../../../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!session.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    res.status(200).json({
      user: session.user,
      profile: session.profile
    });
  } else if (req.method === "PUT") {
    const { error } = joi
      .object({
        email: joi.string().email({ tlds: false }).required()
      })
      .validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    if (await prisma.user.findUnique({ where: { email: req.body.email } })) {
      res.status(400).json({ error: "This email is being used by another user" });
      return;
    }
    const user = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        email: req.body.email
      }
    });
    session.user = user;
    session.commit();
    return res.status(200).json({
      user: user,
      profile: session.profile
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
