import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export const GET = async (_: Request, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const numericId = Number(id);
  const category = await prisma.category.findUnique({ where: { id: numericId } });
  if (!category) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(category);
};

export const PUT = async (req: Request, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const numericId = Number(id);

  const { name }: { name: string } = await req.json();
  if (!name || name.trim().length < 1) {
    return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });
  }

  const category = await prisma.category.update({
    where: { id: numericId },
    data: { name: name.trim() }
  });

  return NextResponse.json(category);
};

export const DELETE = async (_: Request, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const numericId = Number(id);

  await prisma.category.delete({ where: { id: numericId } });
  return NextResponse.json({ success: true });
};
