import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white/20 backdrop-blur border-r p-4">
        <h2 className="text-xl font-bold mb-4">Panel Admin</h2>
        <nav className="flex flex-col space-y-2">
          <a href="/admin/questions" className="hover:text-blue-600">Preguntas</a>
          <a href="/admin/users" className="hover:text-blue-600">Usuarios</a>
          <a href="/admin/stats" className="hover:text-blue-600">Actividad</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
