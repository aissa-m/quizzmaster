// /app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      attempts: {
        select: {
          score: true,
          createdAt: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  const userStats = users.map((u) => {
    const totalAttempts = u.attempts.length;
    const avgScore = totalAttempts
      ? u.attempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts
      : 0;
    const lastAttempt = u.attempts.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )[0]?.createdAt;

    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      totalAttempts,
      avgScore,
      lastAttempt,
    };
  });

  return NextResponse.json(userStats);
}
