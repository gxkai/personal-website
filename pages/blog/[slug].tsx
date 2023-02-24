import React from "react";
import day from "dayjs";
import fs from "fs";
import path from "path";
import styles from "../blog.module.css";
import type { GetServerSideProps } from "next";
import type { Post, User, Profile, PostComment } from "@prisma/client";
import type Prisma from "../../lib/prisma";
import UserContext from "../../lib/contexts/UserContext";
import { toast } from "react-toastify";

interface IBlogPost extends Post {
  user: {
    id: User["id"];
    avatar: User["avatar"];
    profile: {
      full_name: Profile["full_name"];
    };
  };
  comments: (PostComment & { user: IBlogPost["user"] })[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  if (typeof slug !== "string") return { notFound: true };
  const prisma: typeof Prisma = require("../../lib/prisma").default;
  const post = await prisma.post.findUnique({
    where: { slug },
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
      },
      comments: {
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
        }
      }
    }
  });
  if (!post)
    return {
      notFound: true
    };
  // Read the corresponding HTML file in content/blog-posts
  const filePath = path.join(process.cwd(), "content/blog-posts", `${slug}.html`);
  if (!fs.existsSync(filePath))
    return {
      notFound: true
    };
  const content = fs.readFileSync(filePath, "utf8");
  return {
    props: { post: JSON.parse(JSON.stringify(post)), content }
  };
};

const CommentBox: React.FC<{
  profile: Profile;
  user: User;
  postSlug: IBlogPost["slug"];
  onComment: (x: IBlogPost["comments"][0]) => void;
}> = ({ profile, user, onComment, postSlug: slug }) => {
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (comment.trim().length < 1) return;
    setLoading(true);
    try {
      toast("Posting comment...", { type: "info" });
      const res = await fetch("/api/blog/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug,
          content: comment
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast("Added comment", { type: "success" });
        onComment(data.comment);
        setComment("");
      } else {
        toast(data.message, { type: "error" });
      }
    } catch (e) {
      toast(e.message, { type: "error" });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submit}>
      <textarea
        rows={3}
        className="w-full border border-black dark:border-white rounded mb-2 bg-gray-200 text-black dark:bg-[#212121] dark:text-white px-3 py-2 text-lg resize-y"
        placeholder="Enter a comment"
        aria-label="Comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
      ></textarea>
      <p className="flex gap-2 items-center mb-2">
        <span className="font-bold">Commenting as: </span>
        <img
          src={user.avatar}
          alt={profile.full_name}
          className="w-8 h-8 rounded-full mr-2 border border-black dark:border-white"
        />
        <span className="text-gray-600 dark:text-gray-300">{profile.full_name}</span>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer ml-auto px-2 py-1 border border-transparent rounded"
        >
          {loading ? "..." : "Send comment"}
        </button>
      </p>
    </form>
  );
};

const BlogSlug: React.FC<{ post: IBlogPost; content: string }> = ({
  post,
  content
}) => {
  const { profile, user } = React.useContext(UserContext);
  const [comments, setComments] = React.useState(post.comments);

  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen">
      {post.cover && <img
        src={post.cover}
        alt={`Cover of ${post.title}`}
        className="my-4 rounded-lg w-full h-[300px] border border-black dark:border-white"
      />}
      <h1 className="text-5xl font-bold my-6">{post.title}</h1>
      <p className="my-4">
        {(post.tags || "").split(",").map((tag, key) => (
          <span key={key} className="text-gray-600 dark:text-gray-300 mr-2">
            <span className="text-gray-400 dark:text-gray-600 mr-1">#</span>
            {tag.trim()}
          </span>
        ))}
      </p>
      <p className="text-gray-600 dark:text-gray-300 my-4">
        {day(post.createdAt).format("YYYY, MMMM DD")}{" "}
        <span className="text-black dark:text-white">at</span>{" "}
        {day(post.createdAt).format("hh:mm A")}
      </p>
      <p className="flex gap-2 items-center my-2">
        <img
          src={post.user.avatar}
          alt={post.user.profile.full_name}
          className="w-8 h-8 rounded-full mr-2 border border-black dark:border-white"
        />
        <span className="text-gray-600 dark:text-gray-300">
          {post.user.profile.full_name}
        </span>
      </p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className="mt-8">
        <h2 className="text-4xl">Comments ({post.comments.length})</h2>
        {user && (
          <div className="my-2">
            <CommentBox
              onComment={c => setComments([...comments, c])}
              profile={profile}
              user={user}
              postSlug={post.slug}
            />
          </div>
        )}
        {comments.length > 0 ? (
          comments.map(comment => {
            return (
              <div key={comment.id} className="my-4">
                <div className="flex gap-2 items-center">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.profile.full_name}
                    className="w-8 h-8 rounded-full mr-2 border border-black dark:border-white"
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    {comment.user.profile.full_name}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 my-2">
                  {day(comment.createdAt).format("YYYY, MMMM DD")}{" "}
                  <span className="text-black dark:text-white">at</span>{" "}
                  {day(comment.createdAt).format("hh:mm A")}
                </p>
                <p className="text-gray-600 dark:text-gray-300 my-2">
                  {comment.content}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-center">No comments yet.</p>
        )}
      </div>
    </main>
  );
};

export default BlogSlug;
