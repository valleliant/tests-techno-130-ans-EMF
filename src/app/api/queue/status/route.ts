import { getActiveTicketId, position } from "@/lib/queue.redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ticketId = searchParams.get('ticketId');
  const active = await getActiveTicketId();
  const pos = ticketId ? await position(ticketId) : 0;
  return NextResponse.json({ activeTicketId: active, position: pos });
}


