'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function QueueContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [position, setPosition] = useState<number | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ticketId: string | null = searchParams ? searchParams.get('ticketId') : null;

  useEffect(() => {
    if (!ticketId) {
      console.warn('[UI][queue] missing ticketId in URL, redirect to /guest/s/default');
      router.replace('/guest/s/default');
      return;
    }

    const pollPosition = async () => {
      console.log('[UI][queue][poll] GET /api/queue/position', { ticketId });
      try {
        const response = await fetch(`/api/queue/position?ticketId=${ticketId}`);
        if (response.ok) {
          const { position: pos } = await response.json();
          console.log('[UI][queue][poll] position=', pos);
          setPosition(pos);
          
          if (pos === 0) {
            console.warn('[UI][queue][poll] ticket inconnu/expiré');
            setError('Ticket invalide ou expiré');
          }
        } else {
          console.error('[UI][queue][poll] http error status=', response.status);
          setError('Erreur lors de la vérification de la position');
        }
      } catch (err) {
        console.error('[UI][queue][poll] network error:', err);
        setError('Erreur de connexion');
      }
    };

    pollPosition();
    const interval = setInterval(pollPosition, 2000); // Poll toutes les 2 secondes

    return () => clearInterval(interval);
  }, [ticketId, router]);

  const handleStartSession = async () => {
    if (!ticketId || position !== 1) return;
    
    setIsStarting(true);
    console.log('[UI][queue][start] POST /api/queue/start', { ticketId });
    try {
      const response = await fetch('/api/queue/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('[UI][queue][start] result=', result);
        if (result.ok) {
          console.log('[UI][queue][start] navigate /questions', { ticketId });
          router.push(`/questions?ticketId=${ticketId}`);
        } else {
          setError(result.reason === 'not-first' ? 'Vous n&apos;êtes plus le premier dans la file' : 'Impossible de démarrer');
        }
      } else {
        console.error('[UI][queue][start] http error status=', response.status);
        setError('Erreur lors du démarrage de la session');
      }
    } catch (err) {
      console.error('[UI][queue][start] network error:', err);
      setError('Erreur de connexion');
    } finally {
      setIsStarting(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/guest/s/default')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Retour au début
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">File d&apos;attente</h1>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {position !== null ? (position === 0 ? '❌' : `${position}`) : '⏳'}
          </div>
          <p className="text-gray-600">
            {position === null && 'Vérification de votre position...'}
            {position === 0 && 'Ticket invalide'}
            {position === 1 && 'C\'est votre tour !'}
            {position && position > 1 && `${position - 1} personne(s) devant vous`}
          </p>
        </div>

        {position === 1 && (
          <button
            onClick={handleStartSession}
            disabled={isStarting}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-medium"
          >
            {isStarting ? 'Démarrage...' : 'Commencer les questions'}
          </button>
        )}

        {position && position > 1 && (
          <div className="text-sm text-gray-500">
            <p>La page se mettra à jour automatiquement.</p>
            <p className="mt-2">Position rafraîchie toutes les 2 secondes.</p>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => router.push('/guest/s/default')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Retour au début
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QueuePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Chargement...</div></div>}>
      <QueueContent />
    </Suspense>
  );
}

