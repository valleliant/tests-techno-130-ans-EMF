/**
 * Page racine de l'application (route `/`).
 *
 * Rôle:
 * - Redirige immédiatement l'utilisateur vers `guest/s/default` où il peut
 *   entrer dans la file d'attente.
 *
 * Notes:
 * - Cette redirection est côté serveur grâce à `next/navigation`.
 */
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirection immédiate vers la page d'accueil publique
  redirect('/guest/s/default');
}