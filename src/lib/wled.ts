const DEFAULT_WLED_URL = process.env.WLED_URL || 'http://192.168.2.120/json/state';

// Log de configuration au chargement du module
console.log('[WLED] ═══════════════════════════════════════════');
console.log('[WLED] Configuration:');
console.log('[WLED]   URL:', DEFAULT_WLED_URL);
console.log('[WLED] ═══════════════════════════════════════════');

/**
 * Normalise un texte pour l'affichage sur le panneau LED :
 * - suppression des accents
 * - passage en majuscules
 */
function normalizeForLed(input: string): string {
  const withoutAccents = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return withoutAccents.toUpperCase();
}

/**
 * Envoie un texte au panneau LED WLED.
 * 
 * Stratégie: On envoie d'abord un reset (texte vide) puis le nouveau texte
 * pour forcer le WLED à rafraîchir l'affichage.
 *
 * @returns true si envoyé avec succès, false sinon
 */
export async function sendQuestionToWled(textInput: string): Promise<boolean> {
  const url = DEFAULT_WLED_URL;

  if (!url) {
    console.warn('[WLED] ⚠️ No URL configured, SKIPPING');
    return false;
  }

  const normalized = normalizeForLed(textInput);
  const text =
    normalized.length > 64 ? `${normalized.slice(0, 61).trimEnd()}...` : normalized;

  console.log('[WLED] Sending text:', {
    url,
    text,
    textLength: text.length,
  });

  // Payload complet pour forcer le rafraîchissement
  const payload = {
    on: true,
    bri: 255,
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
        // Texte à afficher
        n: text,
        col: [
          [77, 166, 255],
          [0, 0, 0],
          [0, 0, 0],
        ],
        // Effet 122 = Scrolling Text
        fx: 122,
        sx: 200,
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
    // Étape 1: Envoyer le nouveau texte
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });

    const responseText = await response.text().catch(() => '');

    if (!response.ok) {
      console.error('[WLED] ❌ HTTP Error:', response.status, responseText.substring(0, 200));
      return false;
    }

    console.log('[WLED] ✓ Response OK:', response.status);
    
    // Log partiel de la réponse pour debug
    if (responseText) {
      try {
        const parsed = JSON.parse(responseText);
        console.log('[WLED] Response state:', {
          on: parsed.on,
          bri: parsed.bri,
          seg0_n: parsed.seg?.[0]?.n?.substring(0, 30),
        });
      } catch {
        console.log('[WLED] Response (raw):', responseText.substring(0, 100));
      }
    }

    return true;
  } catch (error) {
    console.error('[WLED] ❌ Network error:', error);
    return false;
  }
}

/**
 * Test de connectivité WLED
 */
export async function testWledConnection(): Promise<boolean> {
  const url = DEFAULT_WLED_URL?.replace('/json/state', '/json/info');
  
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(3000),
    });
    
    if (response.ok) {
      const info = await response.json();
      console.log('[WLED] Connection test OK:', {
        name: info.name,
        ver: info.ver,
        ip: info.ip,
      });
      return true;
    }
    return false;
  } catch {
    console.error('[WLED] Connection test FAILED');
    return false;
  }
}
