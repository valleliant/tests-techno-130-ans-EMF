import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
});
redis.on("error", (e) => console.error("Redis error:", e));

let _connecting: ReturnType<typeof redis.connect> | null = null;
export async function connectRedis() {
  if (!redis.isOpen) _connecting ||= redis.connect();
  if (_connecting) await _connecting;
}
