// File: app/admin/layout.tsx

import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-900 to-indigo-950 text-white">
      <aside className="w-64 p-6 bg-blue-900/40 backdrop-blur-md border-r border-blue-300/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">🔧 Panel Admin</h2>
        <nav className="flex flex-col gap-3">
          <Link href="/admin/categories" className="hover:text-blue-300 transition">
            📂 Categorías
          </Link>
          <Link href="/admin/quizzes" className="hover:text-blue-300 transition">
            📚 Quizzes
          </Link>
          <Link href="/admin/questions" className="hover:text-blue-300 transition">
            📄 Preguntas
          </Link>
          <Link href="/admin/users" className="hover:text-blue-300 transition">
            👥 Usuarios
          </Link>
          <Link href="/admin/stats" className="hover:text-blue-300 transition">
            📊 Estadísticas
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
