import crypto from "node:crypto";

export type Ticket = {
  id: string;
  createdAt: number;
};

const queue: Ticket[] = [];
let busy = false;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export function enqueue(): Ticket {
  const ticket = {
    id: crypto.randomUUID(),
    createdAt: Date.now()
  };
  queue.push(ticket);
  console.log(`[QUEUE] Enqueue: ${ticket.id}, position: ${queue.length}`);
  return ticket;
}

export function position(ticketId: string): number {
  const idx = queue.findIndex(t => t.id === ticketId);
  return idx === -1 ? 0 : idx + 1; // 1-based, 0 si introuvable
}

export async function withExclusiveAccess<T>(fn: () => Promise<T>): Promise<T> {
  while (busy) {
    await sleep(250);
  }
  busy = true;
  try {
    return await fn();
  } finally {
    busy = false;
  }
}

export function startSession(ticketId: string): boolean {
  const pos = position(ticketId);
  if (pos !== 1) {
    throw new Error("not-first");
  }
  
  const [first] = queue.splice(0, 1);
  if (!first || first.id !== ticketId) {
    throw new Error("race-condition");
  }
  
  console.log(`[QUEUE] Session started for ticket: ${ticketId}, remaining queue: ${queue.length}`);
  return true;
}

export function getQueueStatus(): { queueLength: number; busy: boolean } {
  return {
    queueLength: queue.length,
    busy
  };
}

