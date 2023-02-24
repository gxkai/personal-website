import { NextApiHandler } from "next";
import prisma from "../../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  const { skip: skipFromQs, take: takeFromQs } = req.query;
  let skip = 0,
    take = 10;
  if (!isNaN(parseInt(skipFromQs as string))) {
    skip = parseInt(skipFromQs as string);
  }
  if (!isNaN(parseInt(takeFromQs as string))) {
    take = parseInt(takeFromQs as string);
  }
  const posts = await prisma.post.findMany({
    skip,
    take,
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          profile: {
            select: {
              full_name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  console.log(posts);
  res.status(200).json({ posts });
};

export default handler;
