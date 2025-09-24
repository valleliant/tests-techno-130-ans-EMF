import { startSession, withExclusiveAccess } from "@/lib/queue";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ticketId } = await request.json();
    
    if (!ticketId) {
      return NextResponse.json(
        { error: "ticketId requis" },
        { status: 400 }
      );
    }
    
    const result = await withExclusiveAccess(async () => {
      try {
        startSession(ticketId);
        return { ok: true };
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "not-first") {
          return { ok: false, reason: "not-first" };
        }
        throw error;
      }
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Erreur start session:', error);
    return NextResponse.json(
      { error: "Erreur lors du démarrage de la session" },
      { status: 500 }
    );
  }
}

