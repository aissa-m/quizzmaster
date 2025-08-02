'use client'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white relative">
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center backdrop-blur bg-white/5 rounded-b-xl">
          <h1 className="text-xl font-bold">QuizMaster</h1>
          <nav className="flex space-x-6 text-sm">
            <Link href="#features">Características</Link>
            <Link href="#screenshots">Capturas</Link>
            <Link href="#about">Sobre Nosotros</Link>
            {session ? (
              <Link href="/dashboard" className="text-green-400 font-semibold">
                Ir al panel
              </Link>
            ) : (
              <>
                <Link href="/login">Iniciar sesión</Link>
                <Link
                  href="/register"
                  className="bg-white text-black px-4 py-1 rounded-full hover:bg-gray-200"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Aprende jugando. Mejora practicando.
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Una plataforma de aprendizaje basada en quizzes inteligentes para mejorar tus conocimientos y evaluar tu progreso.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/register"
            className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200"
          >
            ¡Empieza gratis ahora!
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: '🧠 Quizzes personalizados',
              desc: 'Aprende con quizzes adaptados a tu nivel y temas favoritos.',
            },
            {
              title: '📈 Estadísticas de progreso',
              desc: 'Visualiza tu evolución con gráficos e historial de intentos.',
            },
            {
              title: '🔒 Roles y acceso seguro',
              desc: 'Sistema de login con control de roles para usuarios y admins.',
            },
          ].map(({ title, desc }, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Capturas del sistema</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((img) => (
            <motion.div
              key={img}
              className="overflow-hidden rounded-xl border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={`/screenshots/screenshot${img}.png`}
                alt={`Screenshot ${img}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">¿Quiénes somos?</h2>
        <p className="text-gray-300">
          QuizMaster es un proyecto creado por desarrolladores apasionados por la educación. Buscamos que aprender sea simple, visual y efectivo. Nuestra plataforma combina tecnología moderna con métodos de evaluación efectivos.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} QuizMaster. Todos los derechos reservados.
      </footer>
    </main>
  );
}