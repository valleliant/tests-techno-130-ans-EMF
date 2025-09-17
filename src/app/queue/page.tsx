'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QueuePage() {
  const router = useRouter();
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    // rejoindre la file à l'arrivée
    fetch('/api/queue?action=join', { method: 'POST' }).catch(() => {});
    
    const poll = async () => {
      try {
        // Tenter l'acquisition si premier (route atomique)
        const acquireRes = await fetch('/api/queue/acquire-if-first', { method: 'POST' });
        const acquireData = await acquireRes.json();
        
        if (acquireData.ok) {
          // Acquisition réussie ! Rediriger vers les questions
          router.replace('/');
          return;
        }
        
        // Mise à jour de la position
        setPosition(acquireData.position || null);
        
        // Polling plus agressif si on est premier
        const interval = acquireData.position === 1 ? 500 : 2000;
        timer = setTimeout(poll, interval);
        
      } catch (error) {
        // Fallback : vérifier juste la position
        try {
          const res = await fetch('/api/queue?action=position', { method: 'POST' });
          const data = await res.json();
          if (res.ok) {
            setPosition(data.position);
          }
        } catch {}
        timer = setTimeout(poll, 2000);
      }
    };
    
    poll();
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">File d’attente</h1>
        <p>Votre position: {position ?? '...'}</p>
      </div>
    </div>
  );
}


