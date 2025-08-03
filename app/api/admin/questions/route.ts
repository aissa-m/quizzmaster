import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, quizId, order, options } = body;

    if (!text || !quizId || !order || !Array.isArray(options) || options.length < 2) {
      return NextResponse.json({ error: "Datos incompletos o inválidos" }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: {
        text,
        quizId,
        order,
        options: {
          create: options.map((opt: { text: string; isCorrect: boolean }) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    return NextResponse.json({ message: "Pregunta creada con éxito", question });
  } catch (error) {
    console.error("Error al crear la pregunta:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
