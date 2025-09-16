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
        const res = await fetch('/api/queue?action=position', { method: 'POST' });
        const data = await res.json();
        if (res.ok) {
          setPosition(data.position);
          if (data.position === 1) {
            // Essayer d'acquérir le lock dès que premier
            const lockRes = await fetch('/api/lock?action=acquire', { method: 'POST' });
            if (lockRes.ok) {
              // sortir de la file
              await fetch('/api/queue?action=leave', { method: 'POST' });
              router.replace('/');
              return;
            }
          }
        }
      } catch {}
      timer = setTimeout(poll, 1500);
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


