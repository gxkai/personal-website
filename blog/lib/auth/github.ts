import { AuthHandler, generateCode, GetUser, storeCode } from "./util";
import qs from "qs";
import prisma from "../prisma";

export const handler: AuthHandler = async _ => {
  const code = await storeCode(generateCode(21), { provider: "github" });
  return {
    redirect:
      "https://github.com/login/oauth/authorize?" +
      qs.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        scope: "user:email",
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
  if (metadata.provider !== "github") {
    return {
      error: "Invalid request"
    };
  }
  // fetch github access token from code
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.SELF_URL || "https://arnu515.gq"}/api/auth/session`,
      grant_type: "authorization_code"
    })
  });
  const data = await res.json();
  if (typeof data.error === "string") {
    return {
      error: data.error,
      status: res.status
    };
  }
  // check for correct scope
  if (data.scope !== "user:email") {
    return {
      error: "Invalid scope"
    };
  }
  // fetch github user info
  const userRes = await fetch(`https://api.github.com/user`, {
    headers: { Authorization: `token ${data.access_token}` }
  });
  const userData = await userRes.json();
  if (typeof userData.error === "string") {
    return {
      error: userData.error,
      status: userRes.status
    };
  }
  // fetch github user email
  const emailRes = await fetch(`https://api.github.com/user/emails`, {
    headers: { Authorization: `token ${data.access_token}` }
  });
  const emailData = await emailRes.json();
  if (typeof emailData.error === "string") {
    return {
      error: emailData.error,
      status: emailRes.status
    };
  }
  const primaryEmail = emailData.find(email => email.primary && email.verified);
  if (!primaryEmail) {
    return {
      error: "You need to verify and set a primary email to login with Github",
      status: 400
    };
  }

  let user = await prisma.user.findUnique({
    where: { email: primaryEmail.email }
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: primaryEmail.email,
        avatar: userData.avatar_url,
        countryCode,
        provider: "github",
        providerId: userData.id.toString(),
        providerData: JSON.stringify(userData)
      }
    });
  }
  if (user.provider !== "github") {
    return {
      error: `You can't use Github to log in. Please login using "${user.provider}".`,
      status: 400
    };
  }

  return { user, redirect: true };
};

const github = { handler, getUser };

export default github;
