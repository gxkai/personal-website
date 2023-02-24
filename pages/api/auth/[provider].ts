import { NextApiHandler } from "next";
import auth from "../../../lib/auth";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { provider } = req.query;
  if (typeof provider !== "string") {
    res.status(400).json({
      error: "You must provide a provider"
    });
    return;
  }

  const providerFunc = auth[provider];
  if (!providerFunc) {
    res.status(404).json({
      error: `No handler for ${provider}`
    });
    return;
  }

  const { code, error, status, redirect } = await providerFunc.handler(req);
  if (error) {
    res.status(status || 500).json({
      error
    });
    return;
  }

  if (code) {
    res.status(200).json({ ok: true });
    return;
  }

  if (redirect) {
    res.redirect(302, redirect);
    return;
  }
};

export default handler;
