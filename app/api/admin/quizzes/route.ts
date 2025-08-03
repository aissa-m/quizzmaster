// app/api/admin/quizzes/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  const quizzes = await prisma.quiz.findMany({
    select: { id: true, title: true },
  });
  return NextResponse.json(quizzes);
}
