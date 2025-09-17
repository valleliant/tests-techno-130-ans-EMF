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

  // Initialise le lock si inexistant (id=1) ou le réinitialise
  await prisma.lock.upsert({
    where: { id: 1 },
    update: { isOpen: true },
    create: { id: 1, isOpen: true }
  });
  console.log('Lock initialisé/réinitialisé (ouvert).');
}

main()
  .catch((e) => {
    console.error('Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


