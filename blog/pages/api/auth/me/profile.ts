import { NextApiHandler } from "next";
import getSession from "../../../../lib/session";
import prisma from "../../../../lib/prisma";
import joi from "joi";

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
  if (!session.profile) {
    let profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { user: true }
    });
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId: session.user.id,
          full_name: session.user.email.split("@")[0]
        },
        include: { user: true }
      });
    }
    session.profile = profile;
    session.commit();
  }

  if (req.method === "GET") {
    res.status(200).json({
      user: session.user,
      profile: session.profile
    });
  } else if (req.method === "PUT") {
    const { error } = joi
      .object({
        full_name: joi.string().allow(""),
        website: joi.string().allow(""),
        bio: joi.string().allow(""),
        occupation: joi.string().allow("")
      })
      .validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    console.log(session.profile);
    const profile = await prisma.profile.update({
      where: { userId: session.profile.userId },
      data: {
        full_name: req.body.full_name || session.profile.full_name,
        website: req.body.website || session.profile.website,
        bio: req.body.bio || session.profile.bio,
        occupation: req.body.occupation || session.profile.occupation
      }
    });

    session.profile = profile;
    session.commit();
    res.status(200).json({
      user: session.user,
      profile: session.profile
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
