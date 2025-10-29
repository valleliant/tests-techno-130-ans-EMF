/**
 * API POST /api/queue/enqueue
 *
 * Rôle:
 * - Crée un ticket de file (ou réutilise un ticket via cookie `qid`).
 * - Renvoie `{ ticketId, reused }` et (ré)écrit le cookie `qid`.
 */
import { enqueue, position } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = 'qid';
const COOKIE_MAX_AGE = 60 * 60 * 2; // 2 heures

export async function POST(request: NextRequest) {
  try {
    // 1) Si un cookie existe et que le ticket est encore en file, on le réutilise
    const cookie = request.cookies.get(COOKIE_NAME);
    if (cookie?.value) {
      const existingId = cookie.value;
      const pos = await position(existingId);
      if (pos > 0) {
        console.log('[API][enqueue] reused', { ticketId: existingId, pos });
        const res = NextResponse.json({ ticketId: existingId, reused: true });
        res.cookies.set(COOKIE_NAME, existingId, { httpOnly: true, maxAge: COOKIE_MAX_AGE, path: '/' });
        return res;
      }
    }

    // 2) Sinon, créer un nouveau ticket et poser le cookie
    const ticket = await enqueue();
    console.log('[API][enqueue] created', { ticketId: ticket.ticketId, at: new Date().toISOString() });
    const res = NextResponse.json({ ticketId: ticket.ticketId, reused: false });
    res.cookies.set(COOKIE_NAME, ticket.ticketId, { httpOnly: true, maxAge: COOKIE_MAX_AGE, path: '/' });
    return res;
  } catch (error) {
    console.error('[API] Erreur enqueue:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement dans la file" },
      { status: 500 }
    );
  }
}


