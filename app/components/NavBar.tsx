"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) =>
    pathname === path ? "text-white font-semibold" : "text-blue-200 hover:text-white";

  return (
    <header className="w-full fixed top-0 z-50 bg-blue-800/30 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold text-white">
            <img width="60" src="favicon.ico" alt="" />
          </Link>
          <Link href="/quizzes" className={isActive("/quizzes")}>Quizzes</Link>
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/profile" className="text-blue-200 hover:text-white">
                Perfil
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 rounded-full hover:bg-white/10 transition"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm text-white transition"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
