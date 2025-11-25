import questionsDataJson from '@/../data/questions.json';
import type { QuestionsData, Question } from '@/lib/types';

const questionsData = questionsDataJson as QuestionsData;

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
    max-width: 700px;
  }
  h1 {
    margin: 0 0 20px 0;
    font-size: 24px;
    color: #111827;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  label {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }
  label:hover {
    border-color: #bfdbfe;
    background: #f9fafb;
  }
  input[type="radio"] {
    margin-top: 4px;
  }
  button {
    padding: 14px 18px;
    font-size: 16px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    margin-top: 12px;
  }
  .submit {
    background: #2563eb;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
  }
  .submit:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  }
  .back {
    background: #e5e7eb;
    color: #111827;
  }
`;

interface ListPageProps {
  searchParams: { lang?: string; category?: string; clientip?: string; clientmac?: string };
}

export default function QuestionsListPage({ searchParams }: ListPageProps) {
  const lang = searchParams.lang === 'de' ? 'de' : searchParams.lang === 'fr' ? 'fr' : undefined;
  const category = searchParams.category;
  const clientip = searchParams.clientip ?? '';
  const clientmac = searchParams.clientmac ?? '';

  if (!lang || !category) {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Questions</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>Paramètres manquants</h1>
              <form method="GET" action="/questions">
                <input type="hidden" name="clientip" value={clientip} />
                <input type="hidden" name="clientmac" value={clientmac} />
                <button type="submit" className="back">
                  Retour
                </button>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const questions: Question[] = questionsData[lang]?.[category] || [];

  console.log(`[QUESTIONS LIST] Lang: ${lang}, Category: ${category}, Count: ${questions.length}`);

  if (questions.length === 0) {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Questions</title>
          <style>{styles}</style>
        </head>
        <body>
          <div className="page">
            <div className="card">
              <h1>Aucune question pour cette catégorie</h1>
              <form method="GET" action="/questions/categories">
                <input type="hidden" name="lang" value={lang} />
                <input type="hidden" name="clientip" value={clientip} />
                <input type="hidden" name="clientmac" value={clientmac} />
                <button type="submit" className="back">
                  Retour aux catégories
                </button>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Questions</title>
        <style>{styles}</style>
      </head>
      <body>
        <div className="page">
          <div className="card">
            <h1>Choisissez une question</h1>
            <form method="GET" action="/questions/queue">
              <input type="hidden" name="lang" value={lang} />
              <input type="hidden" name="category" value={category} />
              <input type="hidden" name="clientip" value={clientip} />
              <input type="hidden" name="clientmac" value={clientmac} />
              {questions.map((question) => (
                <label key={question.id}>
                  <input type="radio" name="questionId" value={question.id} required />
                  <span>{question.question}</span>
                </label>
              ))}
              <button type="submit" className="submit">
                ✅ Valider
              </button>
            </form>
            <form method="GET" action="/questions/categories">
              <input type="hidden" name="lang" value={lang} />
              <input type="hidden" name="clientip" value={clientip} />
              <input type="hidden" name="clientmac" value={clientmac} />
              <button type="submit" className="back">
                ← Retour
              </button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
}

