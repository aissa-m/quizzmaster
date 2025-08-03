// app/api/admin/quizzes/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { title, description, categoryId } = body

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        categoryId,
      },
    })
    return NextResponse.json(quiz)
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el quiz' }, { status: 500 })
  }
}
export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(quizzes)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los quizzes' }, { status: 500 })
  }
}