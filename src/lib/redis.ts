/**
 * Lib redis: connexion et client global.
 *
 * Rôle:
 * - Expose un client Redis partagé et `connectRedis()` pour gérer la connexion unique.
 * - Utilise `REDIS_URL` ou `redis://127.0.0.1:6379` par défaut.
 */
import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
});
redis.on("error", (e) => console.error("Redis error:", e));

let _connecting: ReturnType<typeof redis.connect> | null = null;
export async function connectRedis() {
  // Évite les tentatives multiples de connexion simultanées
  if (!redis.isOpen) _connecting ||= redis.connect();
  if (_connecting) await _connecting;
}
