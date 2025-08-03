'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Quiz {
  id: number;
  title: string;
  description: string;
  category: { name: string };
}

export default function HomePage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const [featuredQuizzes, setFeaturedQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetch('/api/public/featured-quizzes')
      .then((res) => res.json())
      .then((data) => setFeaturedQuizzes(data))
      .catch((err) => console.error('Error cargando quizzes destacados', err));
  }, []);


  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-900 to-indigo-950 text-white">
      {/* Hero / Intro */}
      {!isLoggedIn && (
        <section className="text-center py-20 px-6">
          <h2 className="text-4xl font-bold mb-4">Aprende jugando con quizzes interactivos 🎯</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Regístrate gratis y comienza a practicar tus conocimientos en historia, ciencia, cultura y más.
          </p>
          <a
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold text-white transition"
          >
            🚀 Empezar Gratis
          </a>
        </section>
      )}

      {/* Propósito de la web */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">🧠 ¿Para qué sirve QuizzMaster?</h3>
          <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
            QuizzMaster es una plataforma interactiva diseñada para ayudarte a <span className="text-emerald-300 font-semibold">aprender y reforzar tus conocimientos</span> en múltiples áreas como historia, ciencia, cultura general y más. A través de quizzes dinámicos y puntuación gamificada, puedes <span className="text-emerald-300 font-semibold">poner a prueba lo que sabes</span> mientras te diviertes y compites con otros.
          </p>
        </div>
      </section>

      {/* Quizzes destacados */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-6">🔥 Quizzes Destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="rounded-xl p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col"
            >
              <h4 className="text-xl font-semibold mb-2">{quiz.title}</h4>
              <p className="text-sm text-white/80 mb-4 line-clamp-3">{quiz.description}</p>
              <span className="text-xs text-white/50 mb-4">Categoría: {quiz.category.name}</span>
              <a
                href={`/play/${quiz.id}`}
                className="mt-auto text-sm font-medium text-blue-300 hover:text-white transition"
              >
                Jugar →
              </a>
            </div>
          ))}
          {featuredQuizzes.length === 0 && (
            <p className="col-span-3 text-white/70">No hay quizzes destacados disponibles.</p>
          )}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-16 px-6 bg-sky-950/40 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">🧩 ¿Cómo funciona?</h3>
          <div className="grid gap-6 md:grid-cols-3 text-left">
            <div>
              <h4 className="font-semibold mb-2">1. Crea una cuenta</h4>
              <p className="text-sm text-white/80">Regístrate en segundos para acceder a todos los quizzes.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Elige un quiz</h4>
              <p className="text-sm text-white/80">Explora categorías y selecciona el quiz que más te interese.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Responde y aprende</h4>
              <p className="text-sm text-white/80">Responde preguntas, acumula puntos y mejora tus estadísticas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios o info adicional */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-center">💬 Lo que dicen nuestros usuarios</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <blockquote className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur">
            <p className="text-sm italic mb-2">"Me encanta la forma en que puedo practicar temas de forma divertida y rápida."</p>
            <footer className="text-xs text-white/60">– Marta, estudiante de Historia</footer>
          </blockquote>
          <blockquote className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur">
            <p className="text-sm italic mb-2">"Desde que uso QuizZone he mejorado mis resultados en clase."</p>
            <footer className="text-xs text-white/60">– Pablo, estudiante de 2º de ESO</footer>
          </blockquote>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="py-20 px-6 bg-sky-950/60 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">📬 ¿Tienes alguna pregunta?</h3>
          <p className="text-white/70 mb-10">Rellena el formulario y te responderemos lo antes posible.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Mensaje enviado (simulado)");
            }}
            className="grid gap-6 md:grid-cols-2 text-left"
          >
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">Nombre</label>
              <input type="text" required className="w-full px-4 py-2 rounded-md bg-blue-900/40 border border-white/20" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-2 rounded-md bg-blue-900/40 border border-white/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Mensaje</label>
              <textarea rows={4} required className="w-full px-4 py-2 rounded-md bg-blue-900/40 border border-white/20" />
            </div>
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
