const DEFAULT_NUMBER_DISPLAY_URL =
  process.env.NUMBER_DISPLAY_URL || 'http://192.168.2.130/data';

// Token d'authentification pour l'Arduino 8 bits
const NUMBER_DISPLAY_TOKEN = process.env.NUMBER_DISPLAY_TOKEN || '';

// Log de configuration au chargement du module
console.log('[NUM-DISPLAY] ═══════════════════════════════════════════');
console.log('[NUM-DISPLAY] Configuration:');
console.log('[NUM-DISPLAY]   URL:', DEFAULT_NUMBER_DISPLAY_URL);
console.log('[NUM-DISPLAY]   Token configured:', NUMBER_DISPLAY_TOKEN ? 'YES (' + NUMBER_DISPLAY_TOKEN.length + ' chars)' : 'NO ⚠️');
console.log('[NUM-DISPLAY] ═══════════════════════════════════════════');

/**
 * Envoie l'ID de la question à l'Arduino (afficheur 8 bits via I2C).
 *
 * @param id - Valeur 0-255 à envoyer (255 = état idle)
 * @returns true si envoyé avec succès, false sinon
 */
export async function sendQuestionIdToDisplay(id: number): Promise<boolean> {
  const url = DEFAULT_NUMBER_DISPLAY_URL;

  if (!url) {
    console.warn('[NUM-DISPLAY] ⚠️ No URL configured, SKIPPING');
    return false;
  }

  if (!NUMBER_DISPLAY_TOKEN) {
    console.warn('[NUM-DISPLAY] ⚠️ No token configured (NUMBER_DISPLAY_TOKEN env var), SKIPPING');
    return false;
  }

  const safeId = Number.isFinite(id) ? Math.trunc(id) : 255;
  const clampedId = Math.max(0, Math.min(255, safeId));

  // Le token doit être URL-encodé car il contient des caractères spéciaux
  const body = `token=${encodeURIComponent(NUMBER_DISPLAY_TOKEN)}&datain=${clampedId}`;

  console.log('[NUM-DISPLAY] Sending request:', {
    url,
    id: clampedId,
    bodyLength: body.length,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      signal: AbortSignal.timeout(3000),
    });

    const responseText = await response.text().catch(() => '');

    if (!response.ok) {
      console.error('[NUM-DISPLAY] ❌ HTTP Error:', response.status, responseText);
      return false;
    }

    console.log('[NUM-DISPLAY] ✓ Response OK:', response.status, responseText);
    return true;
  } catch (error) {
    console.error('[NUM-DISPLAY] ❌ Network error:', error);
    return false;
  }
}
