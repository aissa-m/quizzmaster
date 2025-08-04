import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  try {
    const body = await req.json();
    const { title, description, categoryId } = body;

    if (!title || !description || !categoryId) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const updated = await prisma.quiz.update({
      where: { id: numericId },
      data: { title, description, categoryId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /quizzes/:id error:', error);
    return NextResponse.json({ error: 'Error al actualizar quiz' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  try {
    await prisma.quiz.delete({ where: { id: numericId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /quizzes/:id error:', error);
    return NextResponse.json({ error: 'Error al borrar quiz' }, { status: 500 });
  }
}

