// File: app/profile/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

// Import client components directly (they contain 'use client' internally)
import SparklineChart from "@/app/components/SparklineChart";
import AttemptsChart from "@/app/components/AttemptsChart";
import CategoryPieChart from "@/app/components/CategoryPieChart";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      attempts: {
        include: {
          quiz: { include: { category: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!user) {
    return <div className="text-center text-white mt-10">Usuario no encontrado</div>;
  }

  const totalAttempts = user.attempts.length;
  const averageScore =
    totalAttempts > 0
      ? user.attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts
      : 0;

  // Últimos 10 scores para sparkline
  const sparkData = user.attempts
    .slice(-10)
    .map(a => [a.createdAt.getTime(), a.score] as [number, number]);

  // Intentos por quiz (bar chart)
  const perQuiz = user.attempts.reduce<Record<string, number>>((acc, a) => {
    acc[a.quiz.title] = (acc[a.quiz.title] || 0) + 1;
    return acc;
  }, {});
  const attemptsData = Object.entries(perQuiz).map(([name, value]) => ({ name, value }));

  // Intentos por categoría (pie chart)
  const perCategory = user.attempts.reduce<Record<string, number>>((acc, a) => {
    const cat = a.quiz.category.name;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(perCategory).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-8">
      <h1 className="text-3xl font-bold">👤 Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos básicos */}
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-md">
          <p className="text-lg"><strong>Nombre:</strong> {user.name}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          <p className="text-lg"><strong>Rol:</strong> {user.role}</p>
        </div>

        {/* Métricas generales */}
        <div className="grid grid-cols-1 gap-6">
          <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-md text-center">
            <p className="text-sm">Total de intentos</p>
            <p className="text-2xl font-bold">{totalAttempts}</p>
          </div>
          <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-md text-center">
            <p className="text-sm">Puntuación media</p>
            <p className="text-2xl font-bold">{averageScore.toFixed(2)}%</p>
          </div>
          <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-md">
            <p className="text-sm mb-2">Tendencia de scores (últimos 10)</p>
            <SparklineChart data={sparkData} />
          </div>
        </div>
      </div>

      {/* Gráficos detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-md">
          <p className="text-lg font-semibold mb-4">Intentos por Quiz</p>
          <AttemptsChart data={attemptsData} />
        </div>
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-md">
          <p className="text-lg font-semibold mb-4">Intentos por Categoría</p>
          <CategoryPieChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}
