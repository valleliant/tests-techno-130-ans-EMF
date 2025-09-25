import { enqueue } from "@/lib/queue.redis";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const ticket = await enqueue();
    console.log('[API][enqueue] ticket created', { ticketId: ticket.ticketId, at: new Date().toISOString() });
    
    return NextResponse.json({ ticketId: ticket.ticketId });
  } catch (error) {
    console.error('[API] Erreur enqueue:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement dans la file" },
      { status: 500 }
    );
  }
}


