import { enqueue } from "@/lib/queue";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const ticket = enqueue();
    
    return NextResponse.json({ ticketId: ticket.id });
  } catch (error) {
    console.error('[API] Erreur enqueue:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement dans la file" },
      { status: 500 }
    );
  }
}


