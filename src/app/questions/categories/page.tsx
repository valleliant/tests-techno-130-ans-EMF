import questionsDataJson from '@/../data/questions.json';
import type { QuestionsData } from '@/lib/types';

const questionsData = questionsDataJson as QuestionsData;

const categoryLabels: Record<'fr' | 'de', Record<string, string>> = {
  fr: {
    metiers_actuels: '🛠️ Métiers actuels',
    histoire_ecole: '🏫 Histoire de l’école',
    personnalites_illustres: '⭐ Personnalités illustres',
    anciens_metiers: '📜 Anciens métiers',
    histoire_metiers_actuels: '📚 Histoire des métiers actuels',
    emf_histoire_ville: '🏙️ EMF & histoire de la ville',
  },
  de: {
    aktuelle_berufe: '🛠️ Aktuelle Berufe',
    geschichte_schule: '🏫 Geschichte der Schule',
    fruehere_berufe: '📜 Frühere Berufe',
    geschichte_heutigen_berufe: '📚 Geschichte der heutigen Berufe',
    emf_geschichte_stadt: '🏙️ EMF & Geschichte der Stadt',
    beruehmte_persoenlichkeiten: '⭐ Berühmte Persönlichkeiten',
  },
};

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #f3f4f6;
  }
  .card {
    background: #ffffff;
    padding: 32px 28px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    width: 100%;
    max-width: 640px;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 24px;
    color: #111827;
    text-align: center;
  }
  .buttons {
    display: grid;
    gap: 12px;
  }
  form {
    margin: 0;
  }
  button {
    width: 100%;
    border: none;
    border-radius: 999px;
    padding: 14px 18px;
    font-size: 16px;
    cursor: pointer;
    background: #2563eb;
    color: #ffffff;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }
  button:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  }
  .back button {
    background: #e5e7eb;
    color: #111827;
    box-shadow: none;
  }
  .back button:hover {
    background: #d1d5db;
  }
  .info {
    text-align: center;
    margin-top: 16px;
    color: #6b7280;
    font-size: 14px;
  }
`;

interface CategoriesPageProps {
  searchParams: { lang?: string; clientip?: string; clientmac?: string };
}

export default function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const langParam = searchParams.lang === 'de' ? 'de' : searchParams.lang === 'fr' ? 'fr' : undefined;
  const clientip = searchParams.clientip ?? '';
  const clientmac = searchParams.clientmac ?? '';

  if (!langParam) {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Choix catégorie</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>Langue invalide</h1>
              <div className="buttons back">
                <form method="GET" action="/questions">
                  <input type="hidden" name="clientip" value={clientip} />
                  <input type="hidden" name="clientmac" value={clientmac} />
                  <button type="submit">Retour</button>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const langQuestions = questionsData[langParam] || {};
  const categories = Object.keys(langQuestions);

  console.log(`[CATEGORIES] Lang: ${langParam}, Categories: ${categories.join(', ')}`);

  const labels = categoryLabels[langParam as 'fr' | 'de'];

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Choix catégorie</title>
        <style>{styles}</style>
      </head>
      <body>
        <div className="page">
          <div className="card">
            <h1>Sélectionnez une catégorie</h1>
            <div className="buttons">
              {categories.map((category) => (
                <form key={category} method="GET" action="/questions/list">
                  <input type="hidden" name="lang" value={langParam} />
                    <input type="hidden" name="clientip" value={clientip} />
                    <input type="hidden" name="clientmac" value={clientmac} />
                  <button type="submit" name="category" value={category}>
                    {labels?.[category as keyof typeof labels] || category}
                  </button>
                </form>
              ))}
            </div>
            <div className="buttons back" style={{ marginTop: '24px' }}>
              <form method="GET" action="/questions">
                  <input type="hidden" name="clientip" value={clientip} />
                  <input type="hidden" name="clientmac" value={clientmac} />
                <button type="submit">← Retour</button>
              </form>
            </div>
            <div className="info">
              {langParam === 'fr'
                ? 'Choisissez une catégorie pour afficher les questions.'
                : 'Wählen Sie eine Kategorie, um die Fragen anzuzeigen.'}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

