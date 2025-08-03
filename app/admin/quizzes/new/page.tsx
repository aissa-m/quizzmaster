import QuizForm from '../QuizForm';
import prisma from '@/app/lib/prisma';

export default async function NewQuizPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <div className="max-w-3xl mx-auto text-white space-y-8">
      <h1 className="text-3xl font-bold">🆕 Crear Nuevo Quiz</h1>
      <div className="bg-white/10 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md">
        <QuizForm categories={categories} />
      </div>
    </div>
  );
}
