import { nanoid } from 'nanoid';
import { ensureQueueWorkerRunning } from '@/lib/queueWorker';
import { redis, redisAvailable, safeRedisOperation } from '@/lib/redis';
import questionsDataJson from '@/../data/questions.json';
import type { QueueEntry, QuestionsData } from '@/lib/types';

const questionsData = questionsDataJson as QuestionsData;

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #f3f4f6;
  }
  .card {
    background: #ffffff;
    border-radius: 12px;
    padding: 32px 28px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    width: 100%;
    max-width: 640px;
    text-align: center;
  }
  h1 {
    font-size: 24px;
    margin: 0 0 16px 0;
    color: #111827;
  }
  .question {
    font-size: 17px;
    color: #4b5563;
    margin-bottom: 16px;
  }
  .position {
    font-size: 22px;
    font-weight: 600;
    color: #2563eb;
    margin-bottom: 8px;
  }
  .time {
    font-size: 16px;
    color: #6b7280;
  }
  .info {
    margin-top: 16px;
    font-size: 14px;
    color: #6b7280;
  }
  button {
    margin-top: 20px;
    padding: 12px 18px;
    border: none;
    border-radius: 999px;
    background: #e5e7eb;
    color: #111827;
    cursor: pointer;
    font-size: 15px;
    transition: background-color 0.15s ease;
  }
  button:hover {
    background: #d1d5db;
  }
`;

const messages = {
  fr: {
    missing: 'Identifiant utilisateur manquant. Merci de recommencer.',
    fallbackTitle: 'File en préparation',
    fallbackBody: 'Redis n’est pas disponible pour le moment. Revenez plus tard.',
    queueTitle: 'Votre question est en attente',
    refresh: '⟳ Cette page se rafraîchit automatiquement toutes les 5 secondes.',
    back: '← Retour au début',
  },
  de: {
    missing: 'Benutzer-ID fehlt. Bitte erneut starten.',
    fallbackTitle: 'Warteschlange wird vorbereitet',
    fallbackBody: 'Redis ist momentan nicht verfügbar. Bitte versuchen Sie es später erneut.',
    queueTitle: 'Ihre Frage wartet noch',
    refresh: '⟳ Diese Seite aktualisiert sich alle 5 Sekunden automatisch.',
    back: '← Zurück zum Start',
  },
};

interface QueuePageProps {
  searchParams: {
    userId?: string;
    lang?: string;
    category?: string;
    questionId?: string;
    clientip?: string;
    clientmac?: string;
  };
}

export default async function QueuePage({ searchParams }: QueuePageProps) {
  // Déclenchement explicite du worker (idempotent), sans bootstrap auto-import.
  ensureQueueWorkerRunning();

  const userId = searchParams.userId;
  const langParam = searchParams.lang;
  const category = searchParams.category;
  const questionId = searchParams.questionId;
  const clientip = searchParams.clientip;
  const clientmac = searchParams.clientmac;
  const lang = langParam === 'de' ? 'de' : 'fr';
  const msg = messages[lang];

  // Cas initial: arrivé directement depuis la page des questions, sans userId
  if (!userId && langParam && category && questionId) {
    const normalizedLang = langParam === 'de' ? 'de' : langParam === 'fr' ? 'fr' : undefined;

    if (!normalizedLang) {
      console.error('[QUEUE] Invalid lang on initial arrival:', langParam);
    } else {
      const questions = questionsData[normalizedLang]?.[category];

      if (!questions) {
        console.error(`[QUEUE] Invalid category on initial arrival: ${category} for lang: ${normalizedLang}`);
      } else {
        const question = questions.find((item) => item.id === questionId);

        if (!question) {
          console.error(`[QUEUE] Question not found on initial arrival: ${questionId}`);
        } else {
          const generatedUserId = nanoid(10);

          const entry: QueueEntry = {
            id: questionId,
            question: question.question,
            reponse_detaillee: question.reponse_detaillee,
            lang: normalizedLang,
            category,
            timestamp: new Date().toISOString(),
            userId: generatedUserId,
          };

          await safeRedisOperation(
            async () => {
              if (!redis) {
                throw new Error('Redis client not initialized');
              }
              console.log('[REDIS] Attempting to add entry to queue (from list)...');
              await redis.rpush('questions:queue', JSON.stringify(entry));
              console.log('[REDIS] Successfully added to queue (from list):', entry);
              return true;
            },
            false,
            'RPUSH questions:queue (from list)',
          );

          console.log(
            `[QUEUE] Created entry from list - Lang: ${normalizedLang}, Category: ${category}, QuestionId: ${questionId}, UserId: ${generatedUserId}`,
          );

          const params = new URLSearchParams({
            userId: generatedUserId,
            lang: normalizedLang,
          });
          if (clientip) params.append('clientip', clientip);
          if (clientmac) params.append('clientmac', clientmac);
          const redirectUrl = `/questions/queue?${params.toString()}`;

          return (
            <html>
              <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="refresh" content={`0; url=${redirectUrl}`} />
                <title>Redirection file d&apos;attente</title>
                <style>{styles}</style>
              </head>
              <body>
                <div className="page">
                  <div className="card">
                    <h1>{msg.queueTitle}</h1>
                    <p className="question">Préparation de votre file d&apos;attente…</p>
                  </div>
                </div>
              </body>
            </html>
          );
        }
      }
    }
  }

  if (!userId) {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="refresh" content="5" />
          <title>File d&apos;attente</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>{msg.fallbackTitle}</h1>
              <p className="question">{msg.missing}</p>
              <form method="GET" action="/questions">
                <button type="submit">{msg.back}</button>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const queueRaw = await safeRedisOperation(
    async () => {
      if (!redis) {
        throw new Error('Redis client not initialized');
      }
      return redis.lrange('questions:queue', 0, -1);
    },
    [],
    'LRANGE questions:queue',
  );

  const queue: QueueEntry[] = queueRaw
    .map((item) => {
      try {
        return JSON.parse(item) as QueueEntry;
      } catch {
        return null;
      }
    })
    .filter((item): item is QueueEntry => Boolean(item));

  if (!redisAvailable || queue.length === 0) {
    console.warn('[QUEUE] Redis unavailable or queue empty');
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="refresh" content="5" />
          <title>File d&apos;attente</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>{msg.fallbackTitle}</h1>
              <p className="question">{msg.fallbackBody}</p>
              <form method="GET" action="/questions">
                <button type="submit">{msg.back}</button>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const position = queue.findIndex((item) => item.userId === userId) + 1;
  const total = queue.length;
  const currentEntry = queue.find((item) => item.userId === userId);

  console.log(`[QUEUE] UserId: ${userId}, Queue length: ${queue.length}`);

  if (!currentEntry || position === 0) {
    console.warn('[QUEUE] Entry not found for userId', userId);
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="refresh" content="5" />
          <title>File d&apos;attente</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>{msg.fallbackTitle}</h1>
              <p className="question">{msg.missing}</p>
              <form method="GET" action="/questions">
                <button type="submit">{msg.back}</button>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const estimatedTimeSeconds = position * 70;
  const minutes = Math.floor(estimatedTimeSeconds / 60);
  const seconds = estimatedTimeSeconds % 60;

  console.log(
    `[QUEUE] Position: ${position}/${total}, Estimated time: ${estimatedTimeSeconds}s`,
  );

  // Si l'utilisateur est en position 1, rediriger vers la page d'affichage
  if (position === 1) {
    console.log(`[QUEUE] User ${userId} reached position 1 - redirecting`);

    const params = new URLSearchParams({ userId, lang });
    if (clientip) params.append('clientip', clientip);
    if (clientmac) params.append('clientmac', clientmac);
    const query = params.toString();
    const target = `/questions/display?${query}`;

    console.log('[QUEUE] Redirecting to display:', target);

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="refresh" content={`0; url=${target}`} />
          <title>C&apos;est votre tour</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>🎉 C&apos;est votre tour !</h1>
              <p className="question">Redirection...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="refresh" content="5" />
        <title>File d&apos;attente</title>
        <style>{styles}</style>
      </head>
      <body>
        <div className="page">
          <div className="card">
            <h1>{msg.queueTitle}</h1>
            <p className="question">« {currentEntry.question} »</p>
            <div className="position">
              {position} / {total}
            </div>
            <div className="time">
              Temps estimé : ~{minutes} min {seconds} sec
            </div>
            <div className="info">{msg.refresh}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

