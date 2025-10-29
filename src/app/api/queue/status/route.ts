/**
 * API GET /api/queue/status
 *
 * Rôle:
 * - Retourne la position du `ticketId` fourni et l'`activeTicketId` courant.
 * - Utilisée par le polling côté UI pour rafraîchir l'état de la file.
 */
import { getActiveTicketId, position } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ticketId = searchParams.get('ticketId');
  const active = await getActiveTicketId();
  const pos = ticketId ? await position(ticketId) : 0;
  return NextResponse.json({ activeTicketId: active, position: pos });
}


