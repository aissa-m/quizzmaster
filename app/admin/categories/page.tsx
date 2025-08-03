import React from 'react';
import prisma from '@/app/lib/prisma';
import Link from 'next/link';
import { Pencil, PencilLine } from "lucide-react";
import DeleteCategoryButton from './DeleteCategoryButton';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <div className="space-y-8 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📂 Categorías</h1>
        <Link
          href="/admin/categories/new"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-xl shadow-lg transition-all duration-200"
        >
          + Nueva
        </Link>
      </div>

      <ul className="space-y-4">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-md hover:shadow-lg transition"
          >
            <span className="text-lg font-medium">{cat.name}</span>
            <div className="flex gap-3">
              <Link
                href={`/admin/categories/${cat.id}/edit`}
                className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow backdrop-blur-md transition text-sm font-medium"
              >
                <Pencil className="w-4 h-4" />
                <span>Editar</span>
              </Link>
              {/* <Plus /> */}

              {/* <DeleteCategoryButton id={cat.id} /> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
