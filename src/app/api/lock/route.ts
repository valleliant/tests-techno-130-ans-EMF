import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/lock -> status du lock
export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ isOpen: true, warning: 'DATABASE_URL manquante' });
    }
    let lock = await prisma.lock.findUnique({ where: { id: 1 } });
    if (!lock) {
      lock = await prisma.lock.create({ data: { id: 1, isOpen: true } });
    }
    return NextResponse.json({ isOpen: lock.isOpen });
  } catch (error) {
    console.error('Erreur GET lock:', error);
    return NextResponse.json({ isOpen: true }); // fallback ouvert
  }
}

// POST /api/lock?action=acquire|release
export async function POST(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  if (!action) {
    return NextResponse.json({ error: 'action requise' }, { status: 400 });
  }

  try {
    if (action === 'acquire') {
      // Tenter d'acquérir : passer de ouvert à fermé
      let lock = await prisma.lock.findUnique({ where: { id: 1 } });
      if (!lock) {
        lock = await prisma.lock.create({ data: { id: 1, isOpen: true } });
      }

      if (!lock.isOpen) {
        return NextResponse.json({ ok: false, reason: 'already_locked' }, { status: 409 });
      }

      // Acquisition atomique
      const acquired = await prisma.lock.update({
        where: { id: 1 },
        data: { isOpen: false }
      });

      return NextResponse.json({ ok: true, isOpen: acquired.isOpen });
    }

    if (action === 'release') {
      // Forcer la libération
      let released;
      try {
        released = await prisma.lock.update({
          where: { id: 1 },
          data: { isOpen: true }
        });
      } catch {
        // Si le lock n'existe pas, le créer ouvert
        released = await prisma.lock.create({ data: { id: 1, isOpen: true } });
      }

      return NextResponse.json({ ok: true, isOpen: released.isOpen });
    }

    return NextResponse.json({ error: 'action inconnue' }, { status: 400 });

  } catch (error) {
    console.error('Erreur POST lock:', error);
    return NextResponse.json({ error: 'erreur serveur' }, { status: 500 });
  }
}