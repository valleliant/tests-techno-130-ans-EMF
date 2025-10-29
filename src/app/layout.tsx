/**
 * Layout racine commun à toutes les pages App Router.
 *
 * Rôle:
 * - Déclare les fontes (Geist), les métadonnées globales et importe le CSS global.
 * - Définit le `html lang="fr"` et applique des classes utilitaires sur le `body`.
 *
 * Impact:
 * - Toute page sous `src/app` est rendue à l'intérieur de `{children}`.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test Techno - Questions/Réponses",
  description: "Site de test technique avec questions et réponses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white`}
      >
        {/* Contenu spécifique à chaque page */}
        {children}
      </body>
    </html>
  );
}
