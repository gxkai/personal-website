import React from "react";
import { Profile, User } from "@prisma/client";

export async function getUser() {
  const res = await fetch("/api/auth/me");
  const data = await res.json();
  if (!res.ok) {
    if (res.status !== 401) throw new Error(data.message);
    return null;
  }
  return data;
}

interface IUserContext {
  user?: User | null;
  profile?: Profile | null;
}

const UserContext = React.createContext<IUserContext>({});

export default UserContext;
