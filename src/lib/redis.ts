import { Redis } from 'ioredis';

let redis: Redis | null = null;
let redisAvailable = false;

try {
  redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    retryStrategy: (times) => {
      if (times > 3) {
        console.error('[REDIS] Max retry attempts reached. Redis unavailable.');
        return null;
      }
      return Math.min(times * 50, 2000);
    },
    maxRetriesPerRequest: 3,
  });

  redis.on('connect', () => {
    console.log('[REDIS] Connected successfully');
    redisAvailable = true;
  });

  redis.on('error', (err) => {
    console.error('[REDIS ERROR]', err.message);
    redisAvailable = false;
  });
} catch (error) {
  console.error('[REDIS] Failed to initialize:', error);
  redis = null;
  redisAvailable = false;
}

export async function safeRedisOperation<T>(
  operation: () => Promise<T>,
  fallbackValue: T,
  operationName: string,
): Promise<T> {
  if (!redis) {
    console.warn(`[REDIS FALLBACK] ${operationName} - Redis client not initialized, using fallback`);
    return fallbackValue;
  }

  try {
    return await operation();
  } catch (error) {
    console.error(`[REDIS ERROR] ${operationName} failed:`, error);
    return fallbackValue;
  }
}

export { redis, redisAvailable };

