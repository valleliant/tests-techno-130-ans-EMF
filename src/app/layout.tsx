import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portail captif EMF',
  description: 'Questionnaire multilingue sans JavaScript client',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#f3f4f6',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
