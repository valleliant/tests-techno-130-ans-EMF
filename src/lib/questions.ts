import fs from "node:fs/promises";

export type Question = {
  id: number;
  lang: "fr" | "de";
  question: string;
  answer: string;
  clockId?: number;
};

export async function loadQuestions(): Promise<Question[]> {
  const raw = await fs.readFile(process.cwd() + "/data/questions.json", "utf-8");
  return JSON.parse(raw);
}

export async function getQuestionById(id: number): Promise<Question | undefined> {
  const all = await loadQuestions();
  return all.find(q => q.id === id);
}

