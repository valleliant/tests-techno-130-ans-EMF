/**
 * API POST /api/queue/release
 *
 * Rôle:
 * - Termine la session associée au `ticketId` et supprime le cookie `qid`.
 * - Utilisée pour libérer explicitement la session si nécessaire.
 */
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
    console.log('[API][end] session ended', { ticketId });
    const res = NextResponse.json(result);
    res.cookies.set('qid', '', { httpOnly: true, maxAge: 0, path: '/' });
    return res;
  } catch (error) {
    console.error('[API] Erreur release session:', error);
    return NextResponse.json(
      { error: "Erreur lors de la libération de la session" },
      { status: 500 }
    );
  }
}
