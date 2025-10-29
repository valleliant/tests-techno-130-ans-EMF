/**
 * Page de remerciement (route `/merci`).
 *
 * Rôle:
 * - Confirme à l'utilisateur que sa participation est enregistrée et clôt la
 *   navigation après l'envoi d'une question.
 */
export default function MerciPage() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Merci !</h1>
        <p>Votre participation a été enregistrée.</p>
      </div>
    </div>
  );
}


