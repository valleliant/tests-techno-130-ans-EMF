import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIp } from '@/lib/ip';

// GET /api/lock -> status
export async function GET() {
  const lock = await prisma.lock.findUnique({ where: { id: 1 } });
  return NextResponse.json(lock ?? { isOpen: true, holderIp: null });
}

// POST /api/lock?action=acquire|release|heartbeat
export async function POST(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const ip = await getClientIp();

  if (!action) {
    return NextResponse.json({ error: 'action requise' }, { status: 400 });
  }

  if (action === 'acquire') {
    // tente d'acquérir si ouvert ou expiré (>60s)
    const now = new Date();
    const sixtySecondsAgo = new Date(now.getTime() - 60_000);
    let lock = await prisma.lock.findUnique({ where: { id: 1 } });
    if (!lock) {
      lock = await prisma.lock.create({ data: { id: 1, isOpen: true } });
    }
    if (lock.isOpen || (lock.acquiredAt && lock.acquiredAt < sixtySecondsAgo)) {
      const acquired = await prisma.lock.update({
        where: { id: 1 },
        data: { isOpen: false, holderIp: ip, acquiredAt: new Date() }
      });
      return NextResponse.json({ ok: true, lock: acquired });
    }
    return NextResponse.json({ ok: false, reason: 'locked' }, { status: 409 });
  }

  if (action === 'heartbeat') {
    const lock = await prisma.lock.findUnique({ where: { id: 1 } });
    if (!lock || lock.holderIp !== ip) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }
    const hb = await prisma.lock.update({
      where: { id: 1 },
      data: { acquiredAt: new Date() }
    });
    return NextResponse.json({ ok: true, lock: hb });
  }

  if (action === 'release') {
    // libère le lock sans vérification stricte d'IP pour éviter les blocages
    const released = await prisma.lock.update({
      where: { id: 1 },
      data: { isOpen: true, holderIp: null, acquiredAt: null }
    }).catch(async () => {
      // si lock inexistant, créer ouvert
      return await prisma.lock.create({ data: { id: 1, isOpen: true } });
    });
    // ne pas toucher à la file: le premier restera position 1 et tentera d'acquérir
    return NextResponse.json({ ok: true, lock: released });
  }

  return NextResponse.json({ error: 'action inconnue' }, { status: 400 });
}


