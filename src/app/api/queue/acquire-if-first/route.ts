import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIp } from '@/lib/ip';

export async function POST() {
  const ip = await getClientIp();

  try {
    // Vérifier si on est le premier de la file
    const queueList = await prisma.queueEntry.findMany({ 
      orderBy: { createdAt: 'asc' } 
    });
    
    const myPosition = queueList.findIndex(entry => entry.ip === ip) + 1;
    
    if (myPosition !== 1) {
      return NextResponse.json({ 
        ok: false, 
        reason: 'not_first',
        position: myPosition 
      });
    }

    // Vérifier l'état du lock
    let lock = await prisma.lock.findUnique({ where: { id: 1 } });
    if (!lock) {
      lock = await prisma.lock.create({ data: { id: 1, isOpen: true } });
    }

    const now = new Date();
    const sixtySecondsAgo = new Date(now.getTime() - 60_000);
    const isLockAvailable = lock.isOpen || (lock.acquiredAt && lock.acquiredAt < sixtySecondsAgo);

    if (!isLockAvailable) {
      return NextResponse.json({ 
        ok: false, 
        reason: 'lock_busy',
        position: 1 
      });
    }

    // Tenter l'acquisition atomique
    const acquired = await prisma.lock.update({
      where: { id: 1 },
      data: { 
        isOpen: false, 
        holderIp: ip, 
        acquiredAt: new Date() 
      }
    });

    // Supprimer de la file maintenant qu'on a le lock
    await prisma.queueEntry.delete({ 
      where: { ip } 
    }).catch(() => {}); // Ignore si déjà supprimé

    return NextResponse.json({ 
      ok: true, 
      lock: acquired 
    });

  } catch (error) {
    console.error('Erreur acquire-if-first:', error);
    return NextResponse.json({ 
      ok: false, 
      reason: 'error' 
    }, { status: 500 });
  }
}
