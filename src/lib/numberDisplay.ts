const DEFAULT_NUMBER_DISPLAY_URL =
  process.env.NUMBER_DISPLAY_URL || 'http://192.168.2.130/data';

/**
 * Envoie l'ID de la question au second Arduino (afficheur 4 digits).
 *
 * Correspond à :
 *   curl -X POST http://192.168.1.242/data -d "datain=255"
 */
export async function sendQuestionIdToDisplay(id: number): Promise<void> {
  const url = DEFAULT_NUMBER_DISPLAY_URL;

  if (!url) {
    console.warn('[NUM-DISPLAY] No number display URL configured, skipping');
    return;
  }

  const safeId = Number.isFinite(id) ? Math.trunc(id) : 255;
  const body = `datain=${safeId}`;

  try {
    console.log('[NUM-DISPLAY] Sending ID to display:', { url, id: safeId });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      console.warn(
        '[NUM-DISPLAY] Non-OK response from number display:',
        response.status,
      );
    }
  } catch (error) {
    console.error('[NUM-DISPLAY] Error while calling number display:', error);
  }
}


