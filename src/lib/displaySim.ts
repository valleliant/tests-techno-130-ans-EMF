export const DISPLAY_DELAY_MS = Number(process.env.DISPLAY_DELAY_MS ?? 1500);

export function slice32(s: string): string {
  return s.length <= 32 ? s : s.slice(0, 32);
}

export async function showQuestionAndAnswer(question: { question: string; answer: string }): Promise<boolean> {
  console.log("[SIM:LED] QUESTION >", slice32(question.question));
  await new Promise(r => setTimeout(r, DISPLAY_DELAY_MS));
  console.log("[SIM:LED] ANSWER   >", slice32(question.answer));
  // Pas d'envoi horloges dans le test techno
  return true;
}

