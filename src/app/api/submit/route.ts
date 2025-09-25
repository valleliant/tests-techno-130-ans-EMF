import { getQuestionById } from "@/lib/questions";
import { showQuestionAndAnswer } from "@/lib/displaySim";
import { getActiveTicketId, endSession } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { questionId, ticketId } = await request.json();
    
    if (!questionId || typeof questionId !== "number") {
      console.warn('[API][submit] invalid questionId', { questionId });
      return NextResponse.json(
        { error: "questionId (number) requis" },
        { status: 400 }
      );
    }
    if (!ticketId || typeof ticketId !== 'string') {
      return NextResponse.json({ error: 'ticketId requis' }, { status: 400 });
    }
    const active = await getActiveTicketId();
    if (!active || active !== ticketId) {
      return NextResponse.json({ error: 'no-active-session' }, { status: 409 });
    }
    
    const question = await getQuestionById(questionId);
    if (!question) {
      console.warn('[API][submit] not found', { questionId });
      return NextResponse.json(
        { error: "Question introuvable" },
        { status: 404 }
      );
    }
    
    console.log(`[API][submit] Soumission question ${questionId}: ${question.question}`);
    
    // Simuler l'affichage via logs uniquement
    await showQuestionAndAnswer({
      question: question.question,
      answer: question.answer
    });
    
    await endSession(ticketId);
    const res = NextResponse.json({ ok: true });
    // Nettoyage cookie qid
    res.cookies.set('qid', '', { httpOnly: true, maxAge: 0, path: '/' });
    return res;
  } catch (error) {
    console.error('[API] Erreur submit:', error);
    return NextResponse.json(
      { error: "Erreur lors de la soumission" },
      { status: 500 }
    );
  }
}

