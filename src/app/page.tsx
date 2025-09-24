'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger automatiquement vers la nouvelle page d'accueil
    router.replace('/guest/s/default');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-xl text-gray-600">
        Redirection vers la page d&apos;accueil...
      </div>
    </div>
  );
}