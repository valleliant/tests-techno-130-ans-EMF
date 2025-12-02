import { NextRequest, NextResponse } from 'next/server';
import { redis, safeRedisOperation } from '@/lib/redis';
import type { QueueEntry } from '@/lib/types';
import { sendQuestionToWled } from '@/lib/wled';
import { sendQuestionIdToDisplay } from '@/lib/numberDisplay';

interface DisconnectPayload {
  clientip?: string;
  clientmac?: string;
  userId?: string;
}

/**
 * Avance la file d'attente côté Redis :
 * - Lit la tête de file
 * - Si le userId correspond, supprime la tête
 *
 * Pour l'instant, c'est aussi l'endroit où l'on préparera
 * l'envoi vers les ESP32 (afficheur 4 digits + bandeau LED).
 */
async function advanceQueueIfHeadMatches(userId?: string) {
  if (!userId) {
    console.warn('[DISCONNECT-API] No userId provided, skipping queue advancement');
    return false;
  }

  return safeRedisOperation(
    async () => {
      if (!redis) {
        throw new Error('Redis client not initialized');
      }

      const headRaw = await redis.lindex('questions:queue', 0);
      if (!headRaw) {
        console.log('[DISCONNECT-API] Queue empty, nothing to advance');
        return false;
      }

      let head: QueueEntry | null = null;
      try {
        head = JSON.parse(headRaw) as QueueEntry;
      } catch (error) {
        console.warn('[DISCONNECT-API] Invalid head entry, removing it', error);
        await redis.lpop('questions:queue');
        return false;
      }

      if (head.userId !== userId) {
        console.log('[DISCONNECT-API] Head userId does not match, not popping', {
          expected: userId,
          actual: head.userId,
        });
        return false;
      }

      await redis.lpop('questions:queue');

      // Préparation pour intégration future avec les ESP32 :
      // Ici, on a la certitude que "head" est la question qui vient
      // de terminer son affichage.
      console.log('[DISCONNECT-API] Advanced queue for userId', userId, {
        id: head.id,
        question: head.question,
        lang: head.lang,
        category: head.category,
      });

      // Si la file est maintenant vide, on passe les afficheurs en mode "attente":
      // - texte EMF sur WLED
      // - ID 255 sur l'afficheur 4 digits
      const remainingHead = await redis.lindex('questions:queue', 0);
      if (!remainingHead) {
        console.log(
          '[DISCONNECT-API] Queue is now empty after pop, sending idle state to displays',
        );
        await sendQuestionToWled('ECOLE DES METIERS DE FRIBOURG');
        await sendQuestionIdToDisplay(255);
      }

      return true;
    },
    false,
    'DISCONNECT advance queue if head matches',
  );
}

export async function POST(request: NextRequest) {
  const { clientip, clientmac, userId } = (await request.json()) as DisconnectPayload;

  console.log('[DISCONNECT-API] Request:', { userId, clientip, clientmac });

  if (!clientip && !clientmac) {
    console.error('[DISCONNECT-API] Missing identifier (clientip/clientmac)');
    return NextResponse.json(
      { success: false, error: 'Missing identifier' },
      { status: 400 },
    );
  }

  const gateway = process.env.OPENNDS_GATEWAY || '192.168.1.1';
  const url = `http://${gateway}/cgi-bin/disconnect.cgi`;

  console.log('[DISCONNECT-API] Calling:', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientip, clientmac }),
      signal: AbortSignal.timeout(5000),
    });

    let data: unknown = null;
    try {
      data = await response.json();
    } catch {
      console.warn('[DISCONNECT-API] Gateway response is not valid JSON');
    }

    console.log('[DISCONNECT-API] Response:', data);

    // Avance la file une fois la tentative de déconnexion envoyée
    const advanced = await advanceQueueIfHeadMatches(userId);
    console.log('[DISCONNECT-API] Queue advanced:', advanced);

    return NextResponse.json({
      success: true,
      message: 'Client disconnected',
      data,
    });
  } catch (error) {
    console.error('[DISCONNECT-API] Error while calling gateway:', error);

    // Même en cas d'erreur gateway, on tente quand même d'avancer la file
    const advanced = await advanceQueueIfHeadMatches(userId);
    console.log('[DISCONNECT-API] Queue advanced (gateway error case):', advanced);

    // On renvoie quand même success: true pour ne pas bloquer l’UX côté portail
    return NextResponse.json({
      success: true,
      message: 'Client disconnect attempted, but gateway error occurred',
    });
  }
}
