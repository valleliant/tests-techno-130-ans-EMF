import { redis, redisAvailable, safeRedisOperation } from '@/lib/redis';
import type { QueueEntry } from '@/lib/types';
import { ensureQueueWorkerRunning } from '@/lib/queueWorker';

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
    max-width: 720px;
    text-align: center;
    animation: fadeIn 0.4s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 999px;
    background: #16a34a;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 20px;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.03); }
    100% { opacity: 1; transform: scale(1); }
  }
  .title {
    font-size: 24px;
    margin: 0 0 16px 0;
    color: #111827;
  }
  .question-box {
    margin: 0 auto 24px auto;
    padding: 18px 20px;
    border-radius: 10px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #111827;
    font-size: 18px;
  }
  .timer-label {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 4px;
  }
  .timer {
    font-family: "SF Mono", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 44px;
    font-weight: 700;
    color: #dc2626;
    margin-bottom: 16px;
  }
  .progress-container {
    width: 100%;
    height: 10px;
    background: #fee2e2;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .progress-bar {
    height: 100%;
    width: 100%;
    background: #dc2626;
    transition: width 0.3s linear;
  }
  .info {
    font-size: 14px;
    color: #6b7280;
    margin-top: 8px;
  }
`;

const messages = {
  fr: {
    title: 'Votre question est affichée !',
    badge: '🎉 EN COURS D\'AFFICHAGE',
    disconnectInfo: 'Vous serez automatiquement déconnecté dans 30 secondes.',
    thankYou: '✅ Merci ! Vous allez être déconnecté...',
  },
  de: {
    title: 'Ihre Frage wird angezeigt!',
    badge: '🎉 WIRD ANGEZEIGT',
    disconnectInfo: 'Sie werden in 30 Sekunden automatisch getrennt.',
    thankYou: '✅ Danke! Sie werden jetzt getrennt...',
  },
};

interface DisplayPageProps {
  searchParams: { userId?: string; lang?: string; clientip?: string; clientmac?: string };
}

export default async function DisplayPage({ searchParams }: DisplayPageProps) {
  // Déclenchement explicite du worker (idempotent).
  // Le worker est le SEUL responsable des envois aux ESP32.
  ensureQueueWorkerRunning();

  const userId = searchParams.userId;
  const langParam = searchParams.lang;
  const clientip = searchParams.clientip;
  const clientmac = searchParams.clientmac;

  const lang = langParam === 'de' ? 'de' : 'fr';
  const msg = messages[lang];

  console.log('[DISPLAY] Request params:', { userId, lang, clientip, clientmac });

  if (!userId) {
    console.error('[DISPLAY] Missing userId in query');
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Erreur</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>Erreur</h1>
              <p className="question">Identifiant utilisateur manquant. Merci de recommencer.</p>
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
      // Ne récupérer que la première entrée
      return redis.lrange('questions:queue', 0, 0);
    },
    [],
    'LRANGE questions:queue (display)',
  );

  const currentEntry: QueueEntry | null =
    queueRaw[0] != null
      ? (() => {
          try {
            return JSON.parse(queueRaw[0]) as QueueEntry;
          } catch {
            return null;
          }
        })()
      : null;

  if (!redisAvailable || !currentEntry) {
    console.warn('[DISPLAY] Redis unavailable or queue empty');
    // Note: on n'envoie PAS aux ESP32 ici, le worker s'en charge
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Aucune question</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>{msg.title}</h1>
              <p className="question">Aucune question en attente d'affichage.</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  console.log('[DISPLAY] Queue head:', currentEntry);

  if (currentEntry.userId !== userId) {
    console.warn('[DISPLAY] UserId not at head, redirecting back to queue', {
      expected: userId,
      actual: currentEntry.userId,
    });

    const params = new URLSearchParams({ userId, lang });
    if (clientip) params.append('clientip', clientip);
    if (clientmac) params.append('clientmac', clientmac);

    const queueUrl = `/questions/queue?${params.toString()}`;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="refresh" content={`0; url=${queueUrl}`} />
          <title>Redirection</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>{msg.title}</h1>
              <p className="question">Redirection vers la file d'attente…</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // L'utilisateur est bien en tête de file.
  // NOTE: On n'envoie PAS aux ESP32 ici. Le worker s'en charge de façon centralisée.
  // Cela évite les doublons et garantit une synchronisation propre.

  const script = `
    (function () {
      var total = 30;
      var timeRemaining = total;
      var timerEl = document.getElementById('timer');
      var progressEl = document.getElementById('progress');
      var urlParams = new URLSearchParams(window.location.search);
      if (!timerEl || !progressEl) return;
      timerEl.textContent = timeRemaining + 's';
      progressEl.style.width = '100%';

      var interval = setInterval(function () {
        timeRemaining--;
        if (timeRemaining < 0) timeRemaining = 0;
        timerEl.textContent = timeRemaining + 's';
        progressEl.style.width = (timeRemaining / total * 100) + '%';

        if (timeRemaining <= 0) {
          clearInterval(interval);
          try {
            console.log('[DISPLAY] Calling /api/disconnect');
            fetch('/api/disconnect', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: urlParams.get('userId'),
                clientip: urlParams.get('clientip'),
                clientmac: urlParams.get('clientmac')
              })
            }).catch(function (err) {
              console.error('[DISPLAY] Disconnect fetch error', err);
            }).finally(function () {
              document.body.innerHTML =
                '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);">' +
                '<div style="background:white;padding:40px 32px;border-radius:18px;box-shadow:0 12px 45px rgba(87,90,131,0.25);text-align:center;font-family:Arial,sans-serif;font-size:18px;color:#111827;">' +
                '${msg.thankYou}' +
                '</div>' +
                '</div>';
            });
          } catch (e) {
            console.error('[DISPLAY] Disconnect error', e);
            document.body.innerHTML =
              '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);">' +
              '<div style="background:white;padding:40px 32px;border-radius:18px;box-shadow:0 12px 45px rgba(87,90,131,0.25);text-align:center;font-family:Arial,sans-serif;font-size:18px;color:#111827;">' +
              '${msg.thankYou}' +
              '</div>' +
              '</div>';
          }
        }
      }, 1000);
    })();
  `;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{msg.title}</title>
        <style>{styles}</style>
      </head>
      <body>
        <div className="page">
          <div className="card">
            <div className="badge">{msg.badge}</div>
            <h1 className="title">{msg.title}</h1>
            <div className="question-box">« {currentEntry.question} »</div>
            <div className="timer-label">Temps restant</div>
            <div className="timer" id="timer">30s</div>
            <div className="progress-container">
              <div className="progress-bar" id="progress" />
            </div>
            <div className="info">{msg.disconnectInfo}</div>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: script,
          }}
        />
      </body>
    </html>
  );
}
