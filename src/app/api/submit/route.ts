import { getQuestionById } from "@/lib/questions";
import { showQuestionAndAnswer } from "@/lib/displaySim";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { questionId } = await request.json();
    
    if (!questionId || typeof questionId !== "number") {
      return NextResponse.json(
        { error: "questionId (number) requis" },
        { status: 400 }
      );
    }
    
    const question = await getQuestionById(questionId);
    if (!question) {
      return NextResponse.json(
        { error: "Question introuvable" },
        { status: 404 }
      );
    }
    
    console.log(`[API] Soumission question ${questionId}: ${question.question}`);
    
    // Simuler l'affichage via logs uniquement
    await showQuestionAndAnswer({
      question: question.question,
      answer: question.answer
    });
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[API] Erreur submit:', error);
    return NextResponse.json(
      { error: "Erreur lors de la soumission" },
      { status: 500 }
    );
  }
}

