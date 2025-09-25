import { position } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ticketId = searchParams.get('ticketId');
    
    if (!ticketId) {
      console.warn('[API][position] missing ticketId');
      return NextResponse.json(
        { error: "ticketId requis" },
        { status: 400 }
      );
    }
    
    const pos = await position(ticketId);
    console.log('[API][position] ticket', { ticketId, pos });
    
    return NextResponse.json({ position: pos });
  } catch (error) {
    console.error('[API] Erreur position:', error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification de la position" },
      { status: 500 }
    );
  }
}

