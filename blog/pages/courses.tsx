import React from "react";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen grid place-items-center">
      <section className="text-center">
        <h1 className="text-5xl font-bold">Coming soon</h1>
        <p className="text-2xl">Courses are coming soon!</p>
      </section>
    </main>
  );
};

export default NotFound;
