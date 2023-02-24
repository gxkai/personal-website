import { NextApiHandler } from "next";
import prisma from "../../../lib/prisma";
import joi from "joi";
import getSession from "../../../lib/session";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const session = await getSession(req, res);
  if (!session.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { error } = joi
    .object({
      slug: joi.string().required(),
      content: joi.string().required().max(500).trim(),
    })
    .validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const { slug, content } = req.body;
  const comment = await prisma.postComment.create({
    data: {
      content,
      postId: slug,
      userId: session.userId,
    },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          profile: {
            select: {
              full_name: true,
            },
          },
        },
      },
    },
  });

  // Send message using discord webhook
  const res2 = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `@everyone New comment on post \`${slug}\`.\n\nContent: ${content}`,
    }),
  });
  if (!res2.ok) {
    console.error("Failed to send discord webhook", await res2.json());
  }
  res.status(200).json({ comment });
};

export default handler;
