import { endSession } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ticketId } = await request.json();
    
    if (!ticketId) {
      console.warn('[API][release] missing ticketId');
      return NextResponse.json(
        { error: "ticketId requis" },
        { status: 400 }
      );
    }
    
    const result = await endSession(ticketId);
    console.log('[API][release] session ended', { ticketId });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Erreur release session:', error);
    return NextResponse.json(
      { error: "Erreur lors de la libération de la session" },
      { status: 500 }
    );
  }
}
