// File: app/admin/quizzes/page.tsx
import prisma from '@/app/lib/prisma';
import Link from 'next/link';
import DeleteQuizButton from './DeleteQuizButton'; 
import { Pencil } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🧩 Quizzes</h1>
        <Link
          href="/admin/quizzes/new"
          className="px-4 py-2 bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          + Nuevo
        </Link>
      </div>

      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex justify-between items-center bg-white/10 p-5 rounded-xl backdrop-blur border border-white/10 shadow-md"
          >
            <div>
              <h2 className="text-lg font-semibold">{quiz.title}</h2>
              <p className="text-sm text-white/70">{quiz.description}</p>
              <span className="text-xs text-blue-200 mt-1 inline-block">
                Categoría: {quiz.category.name}
              </span>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/quizzes/${quiz.id}/edit`}
                className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow backdrop-blur-md transition text-sm font-medium"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </Link>
              <DeleteQuizButton id={quiz.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
