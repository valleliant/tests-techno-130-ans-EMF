import { NextResponse } from 'next/server';
import { redis, redisAvailable, safeRedisOperation } from '@/lib/redis';
import { getWorkerStatus, ensureQueueWorkerRunning } from '@/lib/queueWorker';
import type { QueueEntry } from '@/lib/types';

export const runtime = 'nodejs';

/**
 * API de debug pour voir l'état de la file et du worker.
 * 
 * GET /api/queue-status
 *   → Affiche l'état complet
 * 
 * POST /api/queue-status
 *   → Force le démarrage du worker si pas déjà fait
 */
export async function GET() {
  const workerStatus = getWorkerStatus();

  const queueRaw = await safeRedisOperation(
    async () => {
      if (!redis) throw new Error('Redis not initialized');
      return redis.lrange('questions:queue', 0, -1);
    },
    [],
    'API queue-status LRANGE',
  );

  const queue = queueRaw
    .map((raw) => {
      try {
        const entry = JSON.parse(raw) as QueueEntry;
        return {
          id: entry.id,
          userId: entry.userId,
          question: entry.question.substring(0, 50) + (entry.question.length > 50 ? '...' : ''),
          timestamp: entry.timestamp,
        };
      } catch {
        return { invalid: true, raw: raw.substring(0, 50) };
      }
    });

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    redis: {
      available: redisAvailable,
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || '6379',
    },
    worker: {
      ...workerStatus,
      lastActivityAgoSeconds: workerStatus.lastActivityAgo 
        ? Math.round(workerStatus.lastActivityAgo / 1000) 
        : null,
    },
    queue: {
      length: queue.length,
      entries: queue,
    },
    config: {
      wledUrl: process.env.WLED_URL || 'http://192.168.2.120/json/state',
      displayUrl: process.env.NUMBER_DISPLAY_URL || 'http://192.168.2.130/data',
      displayTokenConfigured: !!process.env.NUMBER_DISPLAY_TOKEN,
    },
  });
}

export async function POST() {
  console.log('[API] Force worker start requested');
  ensureQueueWorkerRunning();
  
  const status = getWorkerStatus();
  
  return NextResponse.json({
    message: 'Worker start triggered',
    worker: status,
  });
}
