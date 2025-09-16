const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const seedQuestions = [
    { question: 'Combien font 2 + 2 ?', reponse: '4' },
    { question: 'Quelle est la capitale de la France ?', reponse: 'Paris' },
    { question: 'Quel langage est principalement utilisé avec Node.js ?', reponse: 'JavaScript' },
    { question: 'Quelle est la couleur du ciel par temps clair ?', reponse: 'Bleu' },
    { question: 'Que signifie l\'acronyme SQL ?', reponse: 'Structured Query Language' },
    { question: 'Quelle commande démarre un projet Next.js en dev ?', reponse: 'npm run dev' }
  ];

  for (const item of seedQuestions) {
    const existing = await prisma.question.findFirst({
      where: { question: item.question }
    });

    if (!existing) {
      await prisma.question.create({ data: item });
    }
  }

  const count = await prisma.question.count();
  console.log(`Seed terminé. Nombre total de questions: ${count}`);

  // Initialise le lock si inexistant (id=1)
  const existingLock = await prisma.lock.findUnique({ where: { id: 1 } });
  if (!existingLock) {
    await prisma.lock.create({
      data: {
        id: 1,
        isOpen: true,
        holderIp: null,
        acquiredAt: null
      }
    });
    console.log('Lock initial créé (ouvert).');
  } else {
    console.log(`Lock déjà présent. isOpen=${existingLock.isOpen}`);
  }
}

main()
  .catch((e) => {
    console.error('Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


