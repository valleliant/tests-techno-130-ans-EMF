import { startSession } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ticketId } = await request.json();
    
    if (!ticketId) {
      console.warn('[API][start] missing ticketId');
      return NextResponse.json(
        { error: "ticketId requis" },
        { status: 400 }
      );
    }
    
    const result = await startSession(ticketId);
    if (!result.ok) {
      const reason = result.reason === 'locked' ? 'busy-active' : result.reason;
      console.warn('[API][start] failed', { ticketId, reason });
      return NextResponse.json({ ok: false, reason });
    }
    console.log('[API][start] started', { ticketId });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[API] Erreur start session:', error);
    return NextResponse.json(
      { error: "Erreur lors du démarrage de la session" },
      { status: 500 }
    );
  }
}

