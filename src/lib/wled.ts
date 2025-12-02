const DEFAULT_WLED_URL = process.env.WLED_URL || 'http://192.168.2.120/json/state';

/**
 * Normalise un texte pour l'affichage sur le panneau LED :
 * - suppression des accents
 * - passage en majuscules
 */
function normalizeForLed(input: string): string {
  // Supprime les accents (NFD + suppression des diacritiques)
  const withoutAccents = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return withoutAccents.toUpperCase();
}

/**
 * Envoie un texte au panneau LED WLED.
 *
 * La structure du JSON est basée sur le curl fourni par l'utilisateur,
 * en ne rendant dynamique que le champ "n" (texte à afficher).
 */
export async function sendQuestionToWled(textInput: string): Promise<void> {
  const url = DEFAULT_WLED_URL;

  if (!url) {
    console.warn('[WLED] No WLED URL configured, skipping');
    return;
  }

  const normalized = normalizeForLed(textInput);

  // On limite un peu la longueur du texte pour éviter de saturer l’écran.
  const text =
    normalized.length > 64 ? `${normalized.slice(0, 61).trimEnd()}...` : normalized;

  const payload = {
    mainseg: 0,
    seg: [
      {
        id: 0,
        start: 0,
        stop: 32,
        startY: 0,
        stopY: 8,
        grp: 1,
        spc: 0,
        of: 0,
        on: true,
        frz: false,
        bri: 255,
        cct: 127,
        set: 0,
        // Texte dynamique
        n: text,
        col: [
          [255, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        fx: 122,
        sx: 128,
        ix: 128,
        pal: 0,
        c1: 0,
        c2: 128,
        c3: 16,
        sel: true,
        rev: false,
        mi: false,
        rY: false,
        mY: false,
        tp: false,
        o1: false,
        o2: false,
        o3: false,
        si: 0,
        m12: 0,
      },
    ],
  };

  try {
    console.log('[WLED] Sending text to WLED:', { url, text });
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      console.warn('[WLED] Non-OK response from WLED:', response.status);
    }
  } catch (error) {
    console.error('[WLED] Error while calling WLED:', error);
  }
}

