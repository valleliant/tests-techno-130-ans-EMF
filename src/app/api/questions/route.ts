import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { question, reponse } = await request.json();
    
    if (!question || !reponse) {
      return NextResponse.json(
        { error: 'Question et réponse sont requis' },
        { status: 400 }
      );
    }
    
    const newQuestion = await prisma.question.create({
      data: {
        question,
        reponse
      }
    });
    
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la question:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
