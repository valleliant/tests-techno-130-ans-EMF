import { NextRequest, NextResponse } from 'next/server';
import { ensureQueueWorkerRunning } from '@/lib/queueWorker';

export const runtime = 'nodejs';

interface DisconnectPayload {
  clientip?: string;
  clientmac?: string;
  userId?: string;
}

/**
 * API de déconnexion du portail captif.
 *
 * IMPORTANT: Cette route ne gère PAS le roulement de la file d'attente.
 * Le worker (queueWorker.ts) est le SEUL responsable de:
 * - Lire la tête de file
 * - Envoyer aux ESP32 (WLED + afficheur 4 digits)
 * - Attendre 30 secondes
 * - Supprimer la tête de file (LPOP)
 *
 * Cette route ne fait que:
 * - Déconnecter l'utilisateur du portail captif (via openNDS gateway)
 * - Démarrer le worker si pas déjà fait
 */
export async function POST(request: NextRequest) {
  // S'assurer que le worker tourne
  ensureQueueWorkerRunning();

  const { clientip, clientmac, userId } = (await request.json()) as DisconnectPayload;

  console.log('[DISCONNECT-API] Request:', { userId, clientip, clientmac });

  // Si pas d'identifiant gateway, on ne peut pas déconnecter mais ce n'est pas une erreur
  if (!clientip && !clientmac) {
    console.log('[DISCONNECT-API] No gateway identifier, nothing to disconnect');
    return NextResponse.json({
      success: true,
      message: 'No gateway identifier provided, nothing to disconnect',
    });
  }

  const gateway = process.env.OPENNDS_GATEWAY || '192.168.1.1';
  const url = `http://${gateway}/cgi-bin/disconnect.cgi`;

  console.log('[DISCONNECT-API] Calling gateway:', url);

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

    console.log('[DISCONNECT-API] Gateway response:', data);

    return NextResponse.json({
      success: true,
      message: 'Client disconnected from gateway',
      data,
    });
  } catch (error) {
    console.error('[DISCONNECT-API] Error calling gateway:', error);

    // On renvoie quand même success: true pour ne pas bloquer l'UX côté portail
    // L'erreur gateway n'est pas critique pour l'utilisateur
    return NextResponse.json({
      success: true,
      message: 'Client disconnect attempted, but gateway error occurred',
    });
  }
}
