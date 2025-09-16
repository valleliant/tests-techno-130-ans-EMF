import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIp } from '@/lib/ip';

// GET /api/queue -> liste brute (admin/debug)
export async function GET() {
  const entries = await prisma.queueEntry.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(entries);
}

// POST /api/queue?action=join|position|leave|popIfFirst
export async function POST(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const ip = await getClientIp();

  if (!action) {
    return NextResponse.json({ error: 'action requise' }, { status: 400 });
  }

  if (action === 'join') {
    // si déjà en file, renvoyer position
    const existing = await prisma.queueEntry.findUnique({ where: { ip } }).catch(() => null);
    if (!existing) {
      try {
        await prisma.queueEntry.create({ data: { ip } });
      } catch {}
    }
    const list = await prisma.queueEntry.findMany({ orderBy: { createdAt: 'asc' } });
    const position = list.findIndex(e => e.ip === ip) + 1;
    return NextResponse.json({ ok: true, position });
  }

  if (action === 'position') {
    const list = await prisma.queueEntry.findMany({ orderBy: { createdAt: 'asc' } });
    const position = list.findIndex(e => e.ip === ip) + 1;
    return NextResponse.json({ ok: true, position });
  }

  if (action === 'leave') {
    const existing = await prisma.queueEntry.findUnique({ where: { ip } }).catch(() => null);
    if (existing) {
      await prisma.queueEntry.delete({ where: { ip } }).catch(() => {});
    }
    return NextResponse.json({ ok: true });
  }

  if (action === 'popIfFirst') {
    // utilisé côté serveur après release du lock pour promouvoir le premier
    const first = await prisma.queueEntry.findFirst({ orderBy: { createdAt: 'asc' } });
    if (!first) return NextResponse.json({ ok: true, promoted: null });

    await prisma.queueEntry.delete({ where: { id: first.id } });
    return NextResponse.json({ ok: true, promoted: first.ip });
  }

  return NextResponse.json({ error: 'action inconnue' }, { status: 400 });
}
