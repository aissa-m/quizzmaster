import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { text, order, quizId } = body;

  if (!text || !quizId || order == null) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const question = await prisma.question.create({
    data: {
      text,
      order,
      quizId,
    },
  });

  return NextResponse.json(question);
}
