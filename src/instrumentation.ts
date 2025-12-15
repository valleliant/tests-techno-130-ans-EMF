/**
 * Next.js Instrumentation - Exécuté au démarrage du serveur.
 * 
 * Ce fichier permet de démarrer le worker de file d'attente
 * automatiquement au boot du serveur, sans attendre qu'un
 * utilisateur visite une page.
 */

export async function register() {
  // Seulement côté serveur Node.js (pas Edge, pas client)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[INSTRUMENTATION] Server starting, initializing queue worker...');
    
    // Import dynamique pour éviter les problèmes de bundling
    const { ensureQueueWorkerRunning } = await import('@/lib/queueWorker');
    ensureQueueWorkerRunning();
    
    console.log('[INSTRUMENTATION] Queue worker initialized');
  }
}

