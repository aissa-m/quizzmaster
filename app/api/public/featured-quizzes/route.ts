// app/api/public/featured-quizzes/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      take: 3,
      orderBy: {
        attempts: {
          _count: 'desc',
        },
      },
      include: {
        category: true,
        _count: {
          select: { attempts: true },
        },
      },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los quizzes destacados' }, { status: 500 });
  }
}
