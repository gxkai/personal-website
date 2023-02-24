import type { NextApiRequest } from "next";
import type { User } from "prisma";
import redis from "../../lib/redis";
import crypto from "crypto";

export interface AuthHandlerReturnType {
  error?: string;
  code?: string;
  redirect?: string;
  status?: number;
}

export interface GetUserReturnType {
  error?: string;
  status?: number;
  user?: User;
  redirect?: boolean;
}

export type AuthHandler = (
  req: NextApiRequest
) => Promise<AuthHandlerReturnType> | AuthHandlerReturnType;

export type GetUser<Metadata = any> = (
  metadata: Metadata,
  countryCode?: string,
  req?: NextApiRequest
) => Promise<GetUserReturnType> | GetUserReturnType;

export function generateCode(length: number): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}

export async function getCodeMetadata<T = Record<string, unknown>>(
  code: string
): Promise<T> {
  const data = await redis.hget("auth:codes", code);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

export async function storeCode(code?: string, metadata: Record<string, unknown> = {}) {
  if (!code) {
    code = generateCode(6);
  }

  // Regenerate code if it is already stored
  while (await redis.get(code)) {
    code = generateCode(6);
  }

  await redis.hset("auth:codes", code, JSON.stringify(metadata));
  await redis.expire("auth:codes", 60 * 60);

  return code;
}

export async function deleteCode(code: string) {
  await redis.hdel("auth:codes", code);
  await redis.expire("auth:codes", 60 * 60);
}
