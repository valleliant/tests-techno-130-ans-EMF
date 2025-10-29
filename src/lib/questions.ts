/**
 * Lib questions: chargement et lookup des questions locales.
 *
 * Rôle:
 * - Lire `data/questions.json` depuis le `cwd` du process.
 * - Exposer les types et helpers pour récupérer une question par id.
 */
import fs from "node:fs/promises";

export type Question = {
  id: number;
  lang: "fr" | "de";
  question: string;
  answer: string;
  clockId?: number;
};

export async function loadQuestions(): Promise<Question[]> {
  // Lecture du fichier JSON contenant les questions
  const raw = await fs.readFile(process.cwd() + "/data/questions.json", "utf-8");
  return JSON.parse(raw);
}

export async function getQuestionById(id: number): Promise<Question | undefined> {
  // Lookup en mémoire après chargement du JSON
  const all = await loadQuestions();
  return all.find(q => q.id === id);
}

