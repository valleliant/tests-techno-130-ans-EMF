/**
 * API GET /api/questions
 *
 * Rôle:
 * - Charge les questions depuis `data/questions.json` via `loadQuestions()`.
 * - Adapte la clé `answer` -> `reponse` pour compatibilité avec l'UI.
 */
import { NextResponse } from 'next/server';
import { loadQuestions } from '@/lib/questions';

export async function GET() {
  try {
    const questions = await loadQuestions();
    
    // Adapter le format pour compatibilité avec l'UI existante
    const adaptedQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      reponse: q.answer // adapter "answer" -> "reponse" pour l'UI
    }));
    
    return NextResponse.json(adaptedQuestions);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
