import prisma from "@/app/lib/prisma";
import BotonBorrar from "./BotonBorrar";
import { Pencil, Plus } from "lucide-react";

export default async function AdminQuestionsPage() {
  const questions = await prisma.question.findMany({
    include: { quiz: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-white">📋 Gestión de Preguntas</h1>
      <div className="mb-4">
        <a href="/admin/questions/new"
          className="p-3 items-center gap-2 px-4 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow backdrop-blur-md transition text-sm font-medium">
          {/* <Plus className="w-4 h-4" /> */}
          Nueva Pregunta
          
        </a>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Texto</th>
              <th className="px-4 py-3 text-left">Quiz</th>
              <th className="px-4 py-3 text-left">Orden</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => (
              <tr
                key={q.id}
                className={`border-t border-white/10 ${i % 2 === 0 ? "bg-white/5" : "bg-white/10"} hover:bg-white/20 transition`}
              >
                <td className="px-4 py-3">{q.id}</td>
                <td className="px-4 py-3">{q.text}</td>
                <td className="px-4 py-3">{q.quiz.title}</td>
                <td className="px-4 py-3">{q.order}</td>
                <td className="px-4 py-3 space-x-2">
                  <a
                    href={`/admin/questions/${q.id}/edit`}
                    className="px-3 py-1 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition text-xs"
                  >
                    Editar
                  </a>
                  <BotonBorrar id={q.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
