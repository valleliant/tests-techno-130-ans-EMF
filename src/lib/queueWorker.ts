import crypto from 'node:crypto';

import { redis, safeRedisOperation } from '@/lib/redis';
import type { QueueEntry } from '@/lib/types';
import { sendQuestionIdToDisplay } from '@/lib/numberDisplay';
import { sendQuestionToWled } from '@/lib/wled';

const QUEUE_KEY = 'questions:queue';

// Configuration
const DISPLAY_DURATION_MS = 67_000;  // 67 secondes par question (33.5s question + 33.5s réponse)
const QUESTION_DISPLAY_DURATION_MS = 33_500; // 33.5 secondes pour la question sur WLED
const ID_DISPLAY_DURATION_MS = 1_000; // 1 seconde pour l'ID sur le display 8 bits (temps de capture)
const POLL_INTERVAL_MS = 500;        // Vérification de la file toutes les 500ms
const HEARTBEAT_INTERVAL_MS = 10_000; // Heartbeat toutes les 10s

// État global (survit aux rechargements de module via globalThis)
declare global {
  // eslint-disable-next-line no-var
  var __queueWorkerState: {
    started: boolean;
    instanceId: string;
    loopCount: number;
    lastActivity: number;
  } | undefined;
}

function getState() {
  if (!globalThis.__queueWorkerState) {
    globalThis.__queueWorkerState = {
      started: false,
      instanceId: '',
      loopCount: 0,
      lastActivity: 0,
    };
  }
  return globalThis.__queueWorkerState;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

function parseEntry(raw: string): QueueEntry | null {
  try {
    return JSON.parse(raw) as QueueEntry;
  } catch {
    return null;
  }
}

/**
 * Lit la tête de file.
 */
async function getQueueHead(): Promise<{ raw: string; entry: QueueEntry } | null> {
  const raw = await safeRedisOperation(
    async () => {
      if (!redis) throw new Error('Redis not initialized');
      return redis.lindex(QUEUE_KEY, 0);
    },
    null,
    'LINDEX',
  );

  if (!raw) return null;

  const entry = parseEntry(raw);
  if (!entry) {
    console.warn('[WORKER] JSON invalide en tête, suppression...');
    await safeRedisOperation(
      async () => {
        if (!redis) throw new Error('Redis not initialized');
        await redis.lpop(QUEUE_KEY);
      },
      undefined,
      'LPOP invalid',
    );
    return null;
  }

  return { raw, entry };
}

/**
 * Compte les éléments dans la file.
 */
async function getQueueLength(): Promise<number> {
  return safeRedisOperation(
    async () => {
      if (!redis) throw new Error('Redis not initialized');
      return redis.llen(QUEUE_KEY);
    },
    0,
    'LLEN',
  );
}

/**
 * Supprime la tête de file.
 */
async function popHead(): Promise<QueueEntry | null> {
  const raw = await safeRedisOperation(
    async () => {
      if (!redis) throw new Error('Redis not initialized');
      return redis.lpop(QUEUE_KEY);
    },
    null,
    'LPOP',
  );

  if (!raw) return null;
  return parseEntry(raw);
}

/**
 * Envoie l'état idle aux ESP32.
 */
async function sendIdle(): Promise<void> {
  console.log('[WORKER] ══> Envoi IDLE aux ESP32');
  
  const wledOk = await sendQuestionToWled('ECOLE DES METIERS DE FRIBOURG');
  const displayOk = await sendQuestionIdToDisplay(255);
  
  console.log('[WORKER] ══> Résultat IDLE: WLED=' + (wledOk ? '✓' : '✗') + ', Display=' + (displayOk ? '✓' : '✗'));
}

/**
 * Envoie la QUESTION au WLED + l'ID au display 8 bits (début : t=0).
 * L'ID sera envoyé pendant 1 seconde pour que l'ESP32 puisse le capturer.
 */
async function sendQuestionText(entry: QueueEntry): Promise<void> {
  const numId = parseInt(entry.id, 10);
  const displayId = isNaN(numId) ? 255 : numId;
  
  console.log('[WORKER] ══> Envoi QUESTION ID=' + entry.id + ' au WLED + ID au display 8bits');
  
  const wledOk = await sendQuestionToWled(entry.question);
  const displayOk = await sendQuestionIdToDisplay(displayId);
  
  console.log('[WORKER] ══> Résultat: WLED=' + (wledOk ? '✓' : '✗') + ', Display=' + (displayOk ? '✓' : '✗') + ' (ID=' + displayId + ')');
}

/**
 * Envoie la RÉPONSE DÉTAILLÉE au WLED uniquement (deuxième phase).
 * Le display 8 bits reste à 255 (déjà envoyé après 1s).
 */
async function sendAnswerText(entry: QueueEntry): Promise<void> {
  const text = entry.reponse_detaillee ?? entry.question;
  
  console.log('[WORKER] ══> Envoi RÉPONSE DÉTAILLÉE ID=' + entry.id + ' au WLED');
  
  const wledOk = await sendQuestionToWled(text);
  
  console.log('[WORKER] ══> Résultat: WLED=' + (wledOk ? '✓' : '✗'));
}

/**
 * Boucle principale du worker.
 */
async function workerLoop(instanceId: string): Promise<never> {
  const state = getState();
  let lastHeartbeat = Date.now();
  let currentDisplayedId: string | null = null;
  let currentEntry: QueueEntry | null = null; // Référence à l'entry actuelle pour envoyer la réponse
  let displayStartTime = 0;
  let idResetSent = false; // Track si on a déjà renvoyé 255 au display 8 bits
  let answerSent = false;  // Track si on a déjà envoyé la réponse détaillée au WLED

  console.log('[WORKER] ═══════════════════════════════════════════════════');
  console.log('[WORKER] Boucle démarrée - Instance:', instanceId);
  console.log('[WORKER] ═══════════════════════════════════════════════════');

  // eslint-disable-next-line no-constant-condition
  while (true) {
    state.loopCount++;
    state.lastActivity = Date.now();

    // Heartbeat
    if (Date.now() - lastHeartbeat > HEARTBEAT_INTERVAL_MS) {
      const len = await getQueueLength();
      console.log('[WORKER] ♥ Loop #' + state.loopCount + 
        ' | File: ' + len + 
        ' | Affiché: ' + (currentDisplayedId || 'IDLE'));
      lastHeartbeat = Date.now();
    }

    try {
      // Lire la tête de file
      const head = await getQueueHead();

      // ════════════════════════════════════════════════════════════════
      // CAS 1: File vide → envoyer IDLE
      // ════════════════════════════════════════════════════════════════
      if (!head) {
        if (currentDisplayedId !== null) {
          console.log('[WORKER] File vide détectée');
          await sendIdle();
          currentDisplayedId = null;
          currentEntry = null;
          displayStartTime = 0;
          idResetSent = false;
          answerSent = false;
        }
        await sleep(POLL_INTERVAL_MS);
        continue;
      }

      // ════════════════════════════════════════════════════════════════
      // CAS 2: Nouvelle question en tête
      // ════════════════════════════════════════════════════════════════
      if (head.entry.id !== currentDisplayedId) {
        console.log('[WORKER] ────────────────────────────────────────');
        console.log('[WORKER] NOUVELLE QUESTION');
        console.log('[WORKER] ID: ' + head.entry.id);
        console.log('[WORKER] User: ' + head.entry.userId);
        console.log('[WORKER] ────────────────────────────────────────');

        await sendQuestionText(head.entry);
        currentDisplayedId = head.entry.id;
        currentEntry = head.entry; // Garder l'entry pour envoyer la réponse plus tard
        displayStartTime = Date.now();
        idResetSent = false;  // Reset le flag pour la nouvelle question
        answerSent = false;   // Reset le flag pour la réponse

        console.log('[WORKER] Countdown 67s démarré (ID: 0-1s, Question: 0-33.5s, Réponse: 33.5-67s)');
      }

      // ════════════════════════════════════════════════════════════════
      // CAS 2.5: Après 1 seconde, repasser le display 8 bits à idle (255)
      // L'ESP32 a eu le temps de capturer l'ID au début
      // ════════════════════════════════════════════════════════════════
      const elapsed = Date.now() - displayStartTime;
      
      if (!idResetSent && displayStartTime > 0 && elapsed >= ID_DISPLAY_DURATION_MS) {
        console.log('[WORKER] 1s écoulée, envoi 255 au display 8 bits (ID capturé)');
        await sendQuestionIdToDisplay(255);
        idResetSent = true;
      }

      // ════════════════════════════════════════════════════════════════
      // CAS 2.6: Après ~33.5 secondes, envoyer la RÉPONSE DÉTAILLÉE au WLED
      // ════════════════════════════════════════════════════════════════
      if (!answerSent && currentEntry && displayStartTime > 0 && elapsed >= QUESTION_DISPLAY_DURATION_MS) {
        console.log('[WORKER] Question terminée, envoi de la RÉPONSE au WLED');
        await sendAnswerText(currentEntry);
        answerSent = true;
      }

      // ════════════════════════════════════════════════════════════════
      // CAS 3: Question en cours d'affichage
      // ════════════════════════════════════════════════════════════════
      const remaining = DISPLAY_DURATION_MS - elapsed;

      if (remaining <= 0) {
        // Temps écoulé → supprimer la question
        console.log('[WORKER] Temps écoulé pour question ID=' + currentDisplayedId);
        
        const popped = await popHead();
        if (popped) {
          console.log('[WORKER] ✓ Question supprimée: ID=' + popped.id);
        } else {
          console.log('[WORKER] ⚠ LPOP retourné null');
        }

        // Log de la file restante
        const remainingCount = await getQueueLength();
        console.log('[WORKER] Questions restantes: ' + remainingCount);

        // IMPORTANT: NE PAS reset currentDisplayedId ici !
        // On le garde pour que la prochaine itération détecte
        // le changement (soit nouvelle question, soit file vide → IDLE)
        displayStartTime = 0;

        // Petit délai avant de passer à la suivante
        await sleep(200);
      } else {
        // Attendre un peu avant de revérifier
        await sleep(POLL_INTERVAL_MS);
      }

    } catch (err) {
      console.error('[WORKER] ══════════ ERREUR ══════════');
      console.error('[WORKER]', err);
      currentDisplayedId = null;
      currentEntry = null;
      displayStartTime = 0;
      idResetSent = false;
      answerSent = false;
      await sleep(1000);
    }
  }
}

/**
 * Démarre le worker s'il n'est pas déjà démarré.
 */
export function ensureQueueWorkerRunning(): void {
  const state = getState();

  if (state.started) {
    console.log('[WORKER] Déjà démarré (instance: ' + state.instanceId + ')');
    return;
  }

  state.started = true;
  state.instanceId = `w-${process.pid}-${crypto.randomBytes(3).toString('hex')}`;

  console.log('[WORKER] ═══════════════════════════════════════════════════');
  console.log('[WORKER] ═══════════ DÉMARRAGE DU WORKER ═══════════════════');
  console.log('[WORKER] ═══════════════════════════════════════════════════');
  console.log('[WORKER] Instance: ' + state.instanceId);
  console.log('[WORKER] PID: ' + process.pid);
  console.log('[WORKER] Durée affichage: ' + DISPLAY_DURATION_MS + 'ms');
  console.log('[WORKER] Intervalle poll: ' + POLL_INTERVAL_MS + 'ms');

  // Démarrer la boucle (non-bloquant)
  void workerLoop(state.instanceId);
}

/**
 * Retourne l'état du worker pour debug.
 */
export function getWorkerStatus() {
  const state = getState();
  return {
    started: state.started,
    instanceId: state.instanceId,
    loopCount: state.loopCount,
    lastActivity: state.lastActivity,
    lastActivityAgo: state.lastActivity ? Date.now() - state.lastActivity : null,
  };
}
