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
    background: #f3f4f6;
    padding: 24px;
  }
  .container {
    background: #ffffff;
    padding: 32px 28px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    width: 100%;
    max-width: 520px;
    text-align: center;
  }
  h1 {
    color: #111827;
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 1.4;
  }
  form {
    margin-bottom: 15px;
  }
  button {
    width: 100%;
    padding: 16px;
    font-size: 20px;
    background: #2563eb;
    color: #ffffff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }
  button:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.3);
  }
  @media (max-width: 600px) {
    .container {
      padding: 28px 20px;
    }
    h1 {
      font-size: 20px;
    }
    button {
      font-size: 18px;
      padding: 14px;
    }
  }
`;

interface QuestionsPageProps {
  searchParams: { tok?: string; hid?: string; clientip?: string; clientmac?: string };
}

export default function QuestionsPage({ searchParams }: QuestionsPageProps) {
  console.log('[QUESTIONS PAGE] Received tok:', searchParams.tok ? 'present' : 'missing');
  console.log('[QUESTIONS PAGE] Received hid:', searchParams.hid ? 'present' : 'missing');
  console.log(
    '[QUESTIONS PAGE] clientip:',
    searchParams.clientip ? 'present' : 'missing',
    ', clientmac:',
    searchParams.clientmac ? 'present' : 'missing',
  );

  const clientip = searchParams.clientip ?? '';
  const clientmac = searchParams.clientmac ?? '';

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sélection langue</title>
        <style>{styles}</style>
      </head>
      <body>
        <div className="page">
          <div className="container">
            <h1>
              Choisissez votre langue
              <br />
              Wählen Sie Ihre Sprache
            </h1>

            <form method="GET" action="/questions/categories">
              <input type="hidden" name="clientip" value={clientip} />
              <input type="hidden" name="clientmac" value={clientmac} />
              <button type="submit" name="lang" value="fr">
                🇫🇷 Français
              </button>
            </form>

            <form method="GET" action="/questions/categories">
              <input type="hidden" name="clientip" value={clientip} />
              <input type="hidden" name="clientmac" value={clientmac} />
              <button type="submit" name="lang" value="de">
                🇩🇪 Deutsch
              </button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
}

