import { NextRequest, NextResponse } from 'next/server';
import { sendQuestionToWled, testWledConnection } from '@/lib/wled';
import { sendQuestionIdToDisplay } from '@/lib/numberDisplay';

export const runtime = 'nodejs';

/**
 * API de test pour vérifier la connectivité aux ESP32.
 * 
 * GET /api/test-esp32
 *   → Test de connectivité (sans changer l'affichage)
 * 
 * POST /api/test-esp32
 *   Body: { "wled": "texte", "display": 42 }
 *   → Envoie un texte au WLED et/ou un ID à l'afficheur
 */
export async function GET() {
  console.log('[TEST-ESP32] Testing connectivity...');

  const wledOk = await testWledConnection();

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    wled: {
      configured: !!process.env.WLED_URL || true, // default exists
      url: process.env.WLED_URL || 'http://192.168.2.120/json/state',
      reachable: wledOk,
    },
    display: {
      configured: !!process.env.NUMBER_DISPLAY_URL || true, // default exists
      url: process.env.NUMBER_DISPLAY_URL || 'http://192.168.2.130/data',
      tokenConfigured: !!process.env.NUMBER_DISPLAY_TOKEN,
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  
  const results: {
    wled?: { sent: boolean; text?: string };
    display?: { sent: boolean; id?: number };
  } = {};

  // Test WLED
  if (body.wled !== undefined) {
    const text = String(body.wled || 'TEST');
    console.log('[TEST-ESP32] Sending to WLED:', text);
    const ok = await sendQuestionToWled(text);
    results.wled = { sent: ok, text };
  }

  // Test afficheur 8-bit
  if (body.display !== undefined) {
    const id = Number(body.display) || 0;
    console.log('[TEST-ESP32] Sending to display:', id);
    const ok = await sendQuestionIdToDisplay(id);
    results.display = { sent: ok, id };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    results,
  });
}

