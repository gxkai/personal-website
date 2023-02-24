import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const NotFound: NextPage = () => {
  const router = useRouter();
  const message = router.query.message;

  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen grid place-items-center">
      <section className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-2xl">{message || "Page not found"}</p>
      </section>
    </main>
  );
};

export default NotFound;
