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
      className="cursor-pointer block bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition backdrop-blur-sm shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
      <p className="text-sm text-white/70 mb-2">{quiz.description}</p>
      <span className="inline-block bg-blue-800/40 text-xs px-2 py-1 rounded">
        {quiz.category.name}
      </span>
    </div>
  );
}
