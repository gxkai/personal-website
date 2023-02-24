import Redis from "ioredis";

const redis: Redis.Redis =
  global.redis || new Redis(process.env.REDIS_URL || "redis://localhost:6379");

if (process.env.NODE_ENV === "development") global.redis = redis;

export default redis;
