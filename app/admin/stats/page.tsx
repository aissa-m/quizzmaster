// File: app/admin/dashboard/page.tsx

import React from 'react';
import prisma from '@/app/lib/prisma';
import AttemptsChart from '@/app/components/AttemptsChart';
import CategoryPieChart from '@/app/components/CategoryPieChart';
import SparklineChart from '@/app/components/SparklineChart';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  const attempts = await prisma.attempt.findMany({
    include: { quiz: { include: { category: true } } },
    orderBy: { createdAt: 'asc' },
  });
  const usersCount = await prisma.user.count();
  const quizzesCount = await prisma.quiz.count();

  const totalAttempts = attempts.length;
  const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
  const avgScore = totalAttempts ? totalScore / totalAttempts : 0;

  // Sparkline: últimos 10 scores
  const lastAttempts = attempts.slice(-10);
  const scoresSpark: [number, number][] = lastAttempts.map(a => [
    a.createdAt.getTime(),
    a.score,
  ]);

  // Intentos por quiz para gráfico de barras
  const perQuiz = attempts.reduce<Record<string, number>>((acc, a) => {
    acc[a.quiz.title] = (acc[a.quiz.title] || 0) + 1;
    return acc;
  }, {});
  const attemptsData = Object.entries(perQuiz).map(([name, value]) => ({ name, value }));

  // Intentos por categoría para gráfico pie
  const perCategory = attempts.reduce<Record<string, number>>((acc, a) => {
    const cat = a.quiz.category.name;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(perCategory).map(([name, value]) => ({ name, value }));

  return {
    usersCount,
    quizzesCount,
    totalAttempts,
    avgScore,
    scoresSpark,
    attemptsData,
    categoryData,
  };
}

export default async function DashboardPage() {
  const {
    usersCount,
    quizzesCount,
    totalAttempts,
    avgScore,
    scoresSpark,
    attemptsData,
    categoryData,
  } = await getDashboardData();

  return (
    <main className="p-8 space-y-8">
      {/* Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm text-gray-300">Usuarios</h3>
          <p className="text-2xl font-bold">{usersCount.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm text-gray-300">Quizzes</h3>
          <p className="text-2xl font-bold">{quizzesCount.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm text-gray-300">Intentos</h3>
          <p className="text-2xl font-bold">{totalAttempts.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm text-gray-300">Tendencia Puntuación</h3>
          <SparklineChart data={scoresSpark} />
        </div>
      </div>

      {/* Gráficos Detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
          <h3 className="font-semibold mb-4">Intentos por Quiz</h3>
          <AttemptsChart data={attemptsData} />
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
          <h3 className="font-semibold mb-4">Intentos por Categoría</h3>
          <CategoryPieChart data={categoryData} />
        </div>
      </div>

      {/* KPI adicional */}
      <div className="bg-white/10 p-6 rounded-2xl shadow-xl text-center">
        <h3 className="text-lg font-medium mb-2">Puntuación Media General</h3>
        <p className="text-4xl font-bold">{avgScore.toFixed(2)}%</p>
      </div>
    </main>
  );
}
