import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export const GET = async () => {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(categories)
}

export const POST = async (req: Request) => {
  const { name }: { name: string } = await req.json()
  if (!name || name.trim().length < 1) {
    return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
  }
  const category = await prisma.category.create({ data: { name: name.trim() } })
  return NextResponse.json(category)
}
