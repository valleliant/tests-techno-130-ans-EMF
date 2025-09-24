'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger automatiquement vers la page de démarrage
    router.replace('/start');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-xl text-gray-600">
        Redirection vers la page de démarrage...
      </div>
    </div>
  );
}