import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const questionId = parseInt(params.id);
    await prisma.option.deleteMany({ where: { questionId } });
    await prisma.question.delete({ where: { id: questionId } });
    return NextResponse.json({ message: "Pregunta eliminada" });
  } catch (error) {
    console.error("Error eliminando pregunta:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}

// OBTENER una pregunta con sus opciones
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const question = await prisma.question.findUnique({
    where: { id },
    include: { options: true },
  });

  if (!question) return NextResponse.json({ error: "Pregunta no encontrada" }, { status: 404 });

  return NextResponse.json(question);
}

// ACTUALIZAR una pregunta y sus opciones
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const { text, quizId, order, options } = await req.json();

  // Actualizar la pregunta
  const updatedQuestion = await prisma.question.update({
    where: { id },
    data: {
      text,
      quizId,
      order,
    },
  });

  // Borrar opciones anteriores
  await prisma.option.deleteMany({
    where: { questionId: id },
  });

  // Crear las nuevas opciones
  await prisma.option.createMany({
    data: options.map((opt: any) => ({
      text: opt.text,
      isCorrect: opt.isCorrect,
      questionId: id,
    })),
  });

  return NextResponse.json({ success: true });
}
