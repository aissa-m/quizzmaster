import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const { title, description, categoryId } = body;

    if (!title || !description || !categoryId) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const updated = await prisma.quiz.update({
      where: { id },
      data: { title, description, categoryId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /quizzes/:id error:', error);
    return NextResponse.json({ error: 'Error al actualizar quiz' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    await prisma.quiz.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /quizzes/:id error:', error);
    return NextResponse.json({ error: 'Error al borrar quiz' }, { status: 500 });
  }
}
