'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QueuePage() {
  const router = useRouter();
  const [position, setPosition] = useState<number | null>(null);
  const [isAttempting, setIsAttempting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Rejoindre la file dès l'arrivée
    fetch('/api/queue?action=join', { method: 'POST' }).catch(() => {});
    
    const poll = async () => {
      try {
        // Vérifier la position dans la file
        const posRes = await fetch('/api/queue?action=position', { method: 'POST' });
        const posData = await posRes.json();
        
        if (posRes.ok && posData.position) {
          setPosition(posData.position);
          
          // Si on est premier, tenter l'acquisition
          if (posData.position === 1 && !isAttempting) {
            setIsAttempting(true);
            
            try {
              const acquireRes = await fetch('/api/lock?action=acquire', { method: 'POST' });
              const acquireData = await acquireRes.json();
              
              if (acquireRes.ok && acquireData.ok) {
                // Acquisition réussie ! Quitter la file et aller aux questions
                await fetch('/api/queue?action=leave', { method: 'POST' });
                router.replace('/');
                return;
              }
            } catch (error) {
              console.error('Erreur acquisition:', error);
            }
            
            setIsAttempting(false);
          }
        }
      } catch (error) {
        console.error('Erreur polling queue:', error);
      }
      
      // Polling : agressif si premier, normal sinon
      const interval = position === 1 ? 1000 : 3000;
      timer = setTimeout(poll, interval);
    };
    
    poll();
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [router, position, isAttempting]);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">File d’attente</h1>
        <p className="text-lg">
          Votre position: <span className="font-bold">{position ?? '...'}</span>
        </p>
        {position === 1 && (
          <p className="text-green-600 font-medium">
            {isAttempting ? 'Tentative d’accès...' : 'Vous êtes le prochain !'}
          </p>
        )}
        {position && position > 1 && (
          <p className="text-gray-600">
            {position - 1} personne{position > 2 ? 's' : ''} devant vous
          </p>
        )}
      </div>
    </div>
  );
}