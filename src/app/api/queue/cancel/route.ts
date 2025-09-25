import { cancelTicket } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ticketId } = await request.json();

    if (!ticketId) {
      console.warn('[API][cancel] missing ticketId');
      return NextResponse.json(
        { error: "ticketId requis" },
        { status: 400 }
      );
    }

    const result = await cancelTicket(ticketId);
    console.log('[API][cancel] removed', { ticketId, removed: result.removed });
    const res = NextResponse.json({ ok: true });
    res.cookies.set('qid', '', { httpOnly: true, maxAge: 0, path: '/' });
    return res;
  } catch (error) {
    console.error('[API] Erreur cancel:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'annulation du ticket" },
      { status: 500 }
    );
  }
}


