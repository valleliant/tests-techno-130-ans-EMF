/**
 * Page d'accueil publique (route `/guest/s/default`).
 *
 * Rôle:
 * - Présente l'entrée dans la file d'attente.
 * - Appelle l'API `POST /api/queue/enqueue` pour obtenir un `ticketId` puis
 *   redirige vers `/queue?ticketId=...`.
 *
 * Notes:
 * - Marquée `use client` car elle utilise des hooks React et le Router côté client.
 */
'use client';
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterQueue = async () => {
    setIsLoading(true);
    console.log("[UI][enqueue] POST /api/queue/enqueue ...");
    try {
      const response = await fetch('/api/queue/enqueue', {
        method: 'POST',
      });
      
      if (response.ok) {
        const { ticketId, reused } = await response.json();
        console.log("[UI][enqueue] success", { ticketId, reused });
        console.log(`[UI][enqueue] navigate /queue?ticketId=${ticketId}`);
        router.push(`/queue?ticketId=${ticketId}`);
      } else {
        console.error("[UI][enqueue] error status=", response.status);
        console.error('Erreur lors de l\'entrée dans la file');
        alert('Erreur lors de l\'entrée dans la file. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('[UI][enqueue] network error:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Tests Techno 130 ans EMF
          </h1>
          <p className="text-gray-600 mb-6">
            Bienvenue dans le système de questions techniques pour célébrer les 130 ans de l&apos;École des Métiers de Fribourg.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Le système garantit l&apos;accès exclusif aux questions - une seule personne à la fois peut participer.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleEnterQueue}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-medium"
          >
            {isLoading ? 'Entrée en cours...' : 'Entrer dans la file d&apos;attente'}
          </button>
          
          <div className="text-xs text-gray-400 text-center">
            Version TEST - Questions via JSON local, simulation d&apos;affichage uniquement
          </div>
        </div>
      </div>
    </div>
  );
}
