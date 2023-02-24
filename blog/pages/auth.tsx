import React from "react";
import AuthForm from "../lib/components/AuthForm";
import Router from "next/router";
import { GetServerSideProps } from "next";
import getSession from "../lib/session";

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  let next = typeof query.next === "string" ? query.next : "/";
  // check that next is a relative url
  if (!new URL(next, process.env.SELF_URL).href.startsWith(process.env.SELF_URL)) {
    next = "/";
  }

  // check if the user is already logged in
  const session = await getSession(req, res);
  console.log(session);
  if (session.loggedIn) {
    // redirect to the next page
    return {
      redirect: {
        destination: next
      },
      props: { back: false, next }
    };
  }

  return {
    props: {
      next,
      back: !query.noback
    }
  };
};

const Auth: React.FC<{ next: string; back: boolean }> = ({ back, next }) => {
  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen grid place-items-center">
      <AuthForm
        onCancel={() => back && Router.back()}
        onDone={() => Router.push(next)}
      />
    </main>
  );
};

export default Auth;
