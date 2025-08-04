import prisma from '@/app/lib/prisma';
import EditPage from './EditPage';
import { notFound } from 'next/navigation';


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const numericId = Number(id);
  if (isNaN(numericId)) return notFound();

  const category = await prisma.category.findUnique({
    where: { id: numericId },
  });

  if (!category) return notFound();

  return <EditPage id={numericId} name={category.name} />;
}
