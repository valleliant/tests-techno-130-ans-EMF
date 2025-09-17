import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIp } from '@/lib/ip';

// GET /api/queue -> liste de la file
export async function GET() {
  try {
    const entries = await prisma.queueEntry.findMany({ 
      orderBy: { createdAt: 'asc' } 
    });
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Erreur GET queue:', error);
    return NextResponse.json([]);
  }
}

// POST /api/queue?action=join|position|leave
export async function POST(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const ip = await getClientIp();

  if (!action) {
    return NextResponse.json({ error: 'action requise' }, { status: 400 });
  }

  try {
    if (action === 'join') {
      // Rejoindre la file (ignore si déjà présent)
      try {
        await prisma.queueEntry.create({ data: { ip } });
      } catch {
        // Déjà présent, pas grave
      }
      
      // Retourner la position
      const list = await prisma.queueEntry.findMany({ 
        orderBy: { createdAt: 'asc' } 
      });
      const position = list.findIndex(e => e.ip === ip) + 1;
      return NextResponse.json({ ok: true, position });
    }

    if (action === 'position') {
      // Juste retourner la position
      const list = await prisma.queueEntry.findMany({ 
        orderBy: { createdAt: 'asc' } 
      });
      const position = list.findIndex(e => e.ip === ip) + 1;
      return NextResponse.json({ ok: true, position });
    }

    if (action === 'leave') {
      // Quitter la file
      try {
        await prisma.queueEntry.delete({ where: { ip } });
      } catch {
        // Pas présent, pas grave
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'action inconnue' }, { status: 400 });

  } catch (error) {
    console.error('Erreur POST queue:', error);
    return NextResponse.json({ error: 'erreur serveur' }, { status: 500 });
  }
}