import nextSession from "next-session";
import { SessionData, SessionStore } from "next-session/lib/types";
import { generateCode } from "./auth/util";
import redis from "./redis";
import type { GetServerSideProps } from "next";

export const returnUserFromSession: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  if (session) {
    return {
      // To prevent Nextjs from complaining
      props: JSON.parse(
        JSON.stringify({
          user: session.user,
          profile: session.profile,
          session
        })
      )
    };
  }
  return { props: { user: null, profile: null, session: null } };
};

// thanks github copilot <3
class RedisStore implements SessionStore {
  private client: typeof redis;

  constructor() {
    this.client = redis;
  }

  async get(sid: string) {
    const data = await this.client.get(`session:${sid}`);
    return data ? JSON.parse(data) : null;
  }

  async set(sid: string, session: SessionData) {
    await this.client.set(`session:${sid}`, JSON.stringify(session));
  }

  async destroy(sid: string) {
    await this.client.del(`session:${sid}`);
  }

  async touch(sid: string, session: SessionData) {
    await this.client.set(`session:${sid}`, JSON.stringify(session));
  }
}

const getSession = nextSession({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
  },
  genid: () => generateCode(32),
  store: new RedisStore()
});

export default getSession;
