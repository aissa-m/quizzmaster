import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: Fetch quiz with questions and options
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const quizId = parseInt(id, 10);
  if (isNaN(quizId)) {
    return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 });
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
      id: true,
      title: true,
      description: true,
      category: { select: { name: true } },
      questions: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          text: true,
          order: true,
          options: { select: { id: true, text: true } },
        },
      },
    },
  });

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  return NextResponse.json(quiz);
}

// POST: Record an attempt
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const quizId = parseInt(id, 10);
  if (isNaN(quizId)) {
    return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { answers, timeElapsed } = await req.json();
  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json({ error: 'No answers provided' }, { status: 400 });
  }

  const selectedIds = answers.map((a: any) => a.optionId);
  const options = await prisma.option.findMany({
    where: { id: { in: selectedIds } },
    select: { id: true, isCorrect: true },
  });

  const correctMap = new Map(options.map((o) => [o.id, o.isCorrect]));
  const correctCount = answers.reduce(
    (count: number, a: any) => count + (correctMap.get(a.optionId) ? 1 : 0),
    0
  );

  const total = answers.length;
  const score = total > 0 ? (correctCount / total) * 100 : 0;

  const attempt = await prisma.attempt.create({
    data: {
      user: { connect: { email: session.user.email } },
      quiz: { connect: { id: quizId } },
      score,
      // duration: typeof timeElapsed === 'number' ? timeElapsed : undefined,
      answers: {
        create: answers.map((a: any) => ({
          question: { connect: { id: a.questionId } },
          selectedOption: { connect: { id: a.optionId } },
        })),
      },
    },
    include: { quiz: true },
  });

  return NextResponse.json(attempt);
}
