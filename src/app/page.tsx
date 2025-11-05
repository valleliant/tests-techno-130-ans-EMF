/**
 * Page racine de l'application (route `/`).
 *
 * Rôle:
 * - Gère l'authentification automatique OpenNDS si `tok` et `clientip` sont présents dans l'URL
 *   (redirige vers le pré-auth OpenNDS puis revient sur `/?auto=1`).
 * - Sert d'écran d'accueil (anciennement `/guest/s/default`) avec entrée dans la file d'attente,
 *   y compris le mode automatique via `?auto=1`.
 */
'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autoTriggeredRef = useRef(false);

  useEffect(() => {
    const tok = searchParams?.get('tok');
    const clientip = searchParams?.get('clientip');
    // Les paramètres supplémentaires peuvent être utiles pour debug/log
    // mais ne sont pas requis pour la pré-auth
    // const gatewayname = searchParams.get('gatewayname');
    // const redir = searchParams.get('redir');

    if (tok && clientip && !isAuthenticating) {
      setIsAuthenticating(true);
      // Après la pré-auth OpenNDS, on revient sur une page qui enclenche
      // automatiquement l'entrée dans la file d'attente, sans action utilisateur
      const returnUrl = `${window.location.origin}/?auto=1`;
      const authUrl = `http://192.168.1.1:2050/opennds_preauth/?clientip=${encodeURIComponent(clientip)}&tok=${encodeURIComponent(tok)}&redir=${encodeURIComponent(returnUrl)}`;
      window.location.href = authUrl;
      return;
    }
  }, [searchParams, isAuthenticating, router]);

  // --------- Logique d'entrée dans la file (ancien /guest/s/default) ---------
  const handleEnterQueue = useCallback(async () => {
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
  }, [router]);

  // Mode automatique: si `auto=1` présent, déclencher l'entrée dans la file
  useEffect(() => {
    const auto = searchParams?.get('auto');
    if (auto && !autoTriggeredRef.current && !isLoading) {
      autoTriggeredRef.current = true;
      handleEnterQueue();
    }
  }, [searchParams, isLoading, handleEnterQueue]);

  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-xl text-gray-600">Connexion au réseau WiFi en cours...</div>
      </div>
    );
  }

  // --------- UI d'accueil ---------
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
            {isLoading ? 'Entrée en cours...' : 'Entrer dans la file d\'attente'}
          </button>
          
          <div className="text-xs text-gray-400 text-center">
            Version TEST - Questions via JSON local, simulation d&apos;affichage uniquement
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RootPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8"><div className="text-xl text-gray-600">Chargement…</div></div>}>
      <HomeContent />
    </Suspense>
  );
}