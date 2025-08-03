'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Quiz {
  id: number;
  title: string;
  description: string;
  category: { name: string };
}

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === 'authenticated') {
      router.push(`/play/${quiz.id}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer select-none rounded-2xl bg-white/10 border border-white/10 p-6 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out
        hover:bg-white/20 hover:shadow-2xl hover:ring-2 hover:ring-emerald-400/60 active:scale-95"
    >
      <h2 className="text-xl font-semibold mb-2 text-white">{quiz.title}</h2>
      <p className="text-sm text-white/70 mb-4 min-h-[48px]">{quiz.description}</p>
      <span className="inline-block bg-emerald-500/20 text-emerald-100 text-xs px-2 py-1 rounded-full border border-emerald-300/30">
        {quiz.category.name}
      </span>
    </div>
  );
}
