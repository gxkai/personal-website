import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Name: React.FC = () => {
  const NAME = "Xukai Gu";
  return (
    <div className="flex">
      {NAME.split("").map((i, ind) =>
        i === " " ? (
          <span key={ind} className="mr-2"></span>
        ) : (
          <motion.div key={ind} whileHover={{ y: -2 }}>
            {i}
          </motion.div>
        )
      )}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <div className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white grid place-items-center min-h-screen border-b border-gray-500 dark:border-black">
      <main className="px-6 py-4">
        <section className="px-6 py-4 text-center">
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="flex items-center justify-center m-8"
          >
            <img
              src="/avatar.png"
              alt="Avatar"
              className="rounded-lg w-48 h-48 border border-gray-500 dark:border-black"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl m-4 font-bold justify-center flex gap-2"
          >
            Hi, I&#39;m <Name />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            className="text-2xl mt-2 text-gray-500 dark:text-gray-300"
          >
            A self taught web developer from <b>China</b>.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.7 }}
            className="flex gap-2 items-center justify-center mt-6"
          >
            <Link href="/projects">
              <a className="bg-blue-500 text-white flex gap-2 border border-gray-500 dark:border-black rounded-lg px-5 py-3 text-lg hover:bg-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                View my projects
              </a>
            </Link>
            <Link href="/blog">
              <a className="bg-green-500 text-white flex gap-2 border border-gray-500 dark:border-black rounded-lg px-5 py-3 text-lg hover:bg-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Visit my blog
              </a>
            </Link>
            <Link href="/courses">
              <a className="bg-yellow-500 text-white flex gap-2 border border-gray-500 dark:border-black rounded-lg px-5 py-3 text-lg hover:bg-yellow-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Checkout my courses
              </a>
            </Link>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="mt-6 uppercase"
          >
            <Link href="/contact">
              <a className="text-gray-700 dark:text-gray-400 hover:brightness-90 hover:underline font-bold">
                Get in touch
              </a>
            </Link>
          </motion.p>
        </section>
      </main>
    </div>
  );
};

export default Index;
