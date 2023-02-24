import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { stringify } from "qs";
import type { Post, User, Profile } from "@prisma/client";

interface IBlogPost extends Post {
  user: {
    id: User["id"];
    avatar: User["avatar"];
    profile: {
      full_name: Profile["full_name"];
    };
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = require("../../lib/prisma").default;
  const posts = await prisma.post.findMany({
    skip: 0,
    take: 10,
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
  return {
    // Hey nextjs, can you use JSON.stringify instead of whatever garbage you do? Thanks
    props: { posts: JSON.parse(JSON.stringify(posts)) }
  };
};

const BlogPost: React.FC<{ post: IBlogPost }> = ({ post }) => {
  const router = useRouter();

  return (
    <article
      className="bg-[#dedede] text-black border border-gray-400 rounded-md dark:bg-[#333] dark:text-white dark:border-gray-700 mb-4 grid gap-4"
      style={{ gridTemplateColumns: post.cover ? "25% 75%" : "100%" }}
    >
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full cursor-pointer"
          onClick={() => router.push(`/blog/${post.slug}`)}
          style={{
            borderTopLeftRadius: "0.375rem",
            borderBottomLeftRadius: "0.375rem"
          }}
        />
      )}
      <div className="px-4 py-2">
        <Link href={`/blog/${post.slug}`}>
          <a>
            <h3 className="text-3xl font-bold my-2 hover:underline cursor-pointer">
              {post.title}
            </h3>
          </a>
        </Link>
        <p>
          {(post.tags || "").split(",").map((tag, key) => (
            <span key={key} className="text-gray-600 dark:text-gray-300 mr-2">
              <span className="text-gray-400 dark:text-gray-600 mr-1">#</span>
              {tag.trim()}
            </span>
          ))}
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
      </div>
    </article>
  );
};

const BlogIndex: React.FC<{ posts: IBlogPost[] }> = ({ posts: postsFromServer }) => {
  const [posts, setPosts] = React.useState(postsFromServer);
  const [isMore, setMore] = React.useState(postsFromServer.length > 10);
  const [isLoadingMore, setLoadingMore] = React.useState(true);

  async function loadMorePosts() {
    setLoadingMore(true);
    const res = await fetch("/api/blog?" + stringify({ skip: posts.length }));
    const { posts: newPosts } = await res.json();
    setLoadingMore(false);
    setMore(newPosts.length === 10);
    setPosts([...posts, ...newPosts]);
  }

  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen">
      <h1 className="text-center my-8 text-5xl font-bold">gxkai&#39;s blog</h1>
      <p className="text-center my-4 text-2xl">I write programming tutorials here!</p>
      <div className="mx-auto my-6 min-w-[250px] max-w-[1100px] w-[50%]">
        {posts?.length ? (
          posts.map(post => <BlogPost post={post} key={post.slug} />)
        ) : (
          <p className="text-center my-4 text-lg">Looks like there are no posts yet.</p>
        )}
      </div>
      {isMore && (
        <p className="text-center m-4">
          <button
            className="text-large bg-blue-500 px-6 py-3 rounded-md text-white border border-transparent cursor-pointer hover:bg-blue-600"
            disabled={isLoadingMore}
            onClick={loadMorePosts}
          >
            {isLoadingMore ? "..." : "More posts"}
          </button>
        </p>
      )}
    </main>
  );
};

export default BlogIndex;
