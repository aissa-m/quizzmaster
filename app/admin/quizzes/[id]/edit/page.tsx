import { type Metadata } from 'next';
import prisma from '@/app/lib/prisma';
import QuizForm from '../../QuizForm';
import { JSX } from 'react';

// Tipado compatible con Next.js 15
export default async function EditQuizPage({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<JSX.Element> {
  const { id } = await params;

  const quiz = await prisma.quiz.findUnique({ where: { id } });
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  if (!quiz) {
    return <p className="text-red-400">Quiz no encontrado</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">✏️ Editar Quiz</h1>
      <QuizForm
        initialData={{
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          categoryId: quiz.categoryId,
        }}
        categories={categories}
      />
    </div>
  );
}
