import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// DELETE una pregunta y sus opciones
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const questionId = parseInt(id);

    await prisma.option.deleteMany({ where: { questionId } });
    await prisma.question.delete({ where: { id: questionId } });

    return NextResponse.json({ message: "Pregunta eliminada" });
  } catch (error) {
    console.error("Error eliminando pregunta:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}

// GET una pregunta con sus opciones
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const question = await prisma.question.findUnique({
    where: { id: numericId },
    include: { options: true },
  });

  if (!question) {
    return NextResponse.json({ error: "Pregunta no encontrada" }, { status: 404 });
  }

  return NextResponse.json(question);
}

// PUT actualizar pregunta y opciones
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const { text, quizId, order, options } = await req.json();

  const updatedQuestion = await prisma.question.update({
    where: { id: numericId },
    data: {
      text,
      quizId,
      order,
    },
  });

  await prisma.option.deleteMany({
    where: { questionId: numericId },
  });

  await prisma.option.createMany({
    data: options.map((opt: any) => ({
      text: opt.text,
      isCorrect: opt.isCorrect,
      questionId: numericId,
    })),
  });

  return NextResponse.json({ success: true });
}
