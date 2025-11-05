/**
 * Page racine de l'application (route `/`).
 *
 * Rôle:
 * - Détection SSR d'`authaction` (OpenNDS FAS level 0) et redirection immédiate via script inline.
 * - Sinon, rend le composant client d'accueil (entrée dans la file, gestion `?auto=1`).
 */
import { Suspense } from 'react';
import HomeClient from './_components/HomeClient';

type SearchParamsValue = Record<string, string | string[] | undefined>;
type PagePropsCompatible = { searchParams?: Promise<SearchParamsValue> };

export default async function RootPage({ searchParams }: PagePropsCompatible) {
  const resolvedSearch: SearchParamsValue | undefined = searchParams ? await searchParams : undefined;
  const rawAuthaction = resolvedSearch?.authaction;
  const authaction = typeof rawAuthaction === 'string' ? rawAuthaction : undefined;

  if (authaction) {
    // Page minimale sans dépendance aux assets Next, avec redirection inline
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        {/* Redirection immédiate */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace(${JSON.stringify(authaction)});`,
          }}
        />
        <div className="text-center">
          <div className="text-xl text-gray-600">Connexion au réseau WiFi en cours...</div>
          <div className="mt-2 text-sm text-gray-500">
            Redirection automatique...
            <noscript>
              JavaScript est requis. <a href={authaction}>Continuer</a>
            </noscript>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8"><div className="text-xl text-gray-600">Chargement…</div></div>}>
      <HomeClient />
    </Suspense>
  );
}