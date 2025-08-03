import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

interface Params { params: { id: string } }

export const GET = async (_: Request, { params }: Params) => {
  const id = Number(params.id)
  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(category)
}

export const PUT = async (req: Request, { params }: Params) => {
  const id = Number(params.id)
  const { name }: { name: string } = await req.json()
  if (!name || name.trim().length < 1) {
    return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
  }
  const category = await prisma.category.update({
    where: { id },
    data: { name: name.trim() }
  })
  return NextResponse.json(category)
}

export const DELETE = async (_: Request, { params }: Params) => {
  const id = Number(params.id)
  await prisma.category.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
