import type { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import joi from "joi";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { error } = joi
      .object({
        fullName: joi.string().required().max(255),
        occupation: joi.string().required().max(255),
        message: joi.string().required()
      })
      .validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }
    const data = await prisma.contactForm.create({
      data: {
        full_name: req.body.fullName,
        message: req.body.message,
        occupation: req.body.occupation
      }
    });

    // send message using discord webhook
    const res2 = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `@everyone New contact form submission:\n**Name:** ${data.full_name}\n**Occupation:** ${data.occupation}\n\n${data.message}`
      })
    });
    if (!res2.ok) {
      console.error("Failed to send discord webhook", await res2.json());
    }

    res.status(201).json(data);
  } else res.status(405).json({ message: "Method not allowed" });
};

export default handler;
