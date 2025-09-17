import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/debug/reset-lock -> force la libération du lock et vide la file
export async function POST() {
  try {
    // Forcer le lock ouvert
    await prisma.lock.upsert({
      where: { id: 1 },
      update: { isOpen: true },
      create: { id: 1, isOpen: true }
    });

    // Vider complètement la file d'attente
    await prisma.queueEntry.deleteMany({});

    return NextResponse.json({ 
      ok: true, 
      message: 'Lock libéré et file vidée' 
    });

  } catch (error) {
    console.error('Erreur reset lock:', error);
    return NextResponse.json({ 
      error: 'erreur serveur' 
    }, { status: 500 });
  }
}
