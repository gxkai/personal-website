import { AuthHandler, GetUser, storeCode, generateCode } from "./util";
import qs from "qs";
import prisma from "../prisma";
import crypto from "crypto";

export const handler: AuthHandler = async _ => {
  const code = await storeCode(generateCode(21), { provider: "discord" });
  return {
    redirect:
      "https://discord.com/api/oauth2/authorize?" +
      qs.stringify({
        client_id: process.env.DISCORD_CLIENT_ID,
        redirect_uri: `${
          process.env.SELF_URL || "https://arnu515.gq"
        }/api/auth/session`,
        response_type: "code",
        scope: "identify email",
        state: code
      })
  };
};

export const getUser: GetUser = async (metadata, countryCode, req) => {
  const { code, state } = req.query;
  if (typeof code !== "string" || typeof state !== "string") {
    return {
      error: "Invalid request"
    };
  }
  if (metadata.provider !== "discord") {
    return {
      error: "Invalid request"
    };
  }
  // get discord token from code
  const res = await fetch("https://discord.com/api/oauth2/token", {
    body: qs.stringify({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.SELF_URL || "https://arnu515.gq"}/api/auth/session`
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST"
  });
  const data = await res.json();
  if (res.status !== 200) {
    console.error(data);
    return {
      error: "Failed to get token"
    };
  }
  const { access_token, scope } = data;
  if (scope !== "identify email") {
    return {
      error: "Invalid scope"
    };
  }
  // get user info using token
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  const userData = await userRes.json();
  if (userRes.status !== 200) {
    console.error(userData);
    return {
      error: "Failed to get user info"
    };
  }
  const discordUser = userData;
  // revoke discord access token
  await fetch("https://discord.com/api/oauth/token/revoke", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  // add user to db
  let user = await prisma.user.findUnique({ where: { email: discordUser.email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: discordUser.email,
        countryCode,
        avatar: discordUser.avatar
          ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
          : "https://gravatar.com/avatar/" +
            crypto.createHash("md5").update(metadata.email).digest("hex") +
            ".png?d=identicon&s=64",
        provider: "discord",
        providerId: discordUser.id,
        providerData: JSON.stringify(discordUser)
      }
    });
  }
  if (user.provider !== "discord") {
    return {
      error: `You can't use Discord to log in. Please login using "${user.provider}".`
    };
  }

  return { user, redirect: true };
};

const discord = { handler, getUser };

export default discord;
