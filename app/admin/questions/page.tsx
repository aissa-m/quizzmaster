import prisma from "@/app/lib/prisma";
import BotonBorrar from "./BotonBorrar";

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    quizId?: string;
    category?: string;
    search?: string;
    orderBy?: string;
  }>;
}) {
  const { quizId, category, search, orderBy } = await searchParams;

  const quizzes = await prisma.quiz.findMany({
    include: { category: true },
  });

  const uniqueCategories = [...new Set(quizzes.map((q) => q.category.name))];

  const where: any = {};
  if (quizId) where.quizId = parseInt(quizId);
  if (search) where.text = { contains: search, mode: "insensitive" };
  if (category) {
    where.quiz = {
      category: {
        name: category,
      },
    };
  }

  const orderByClause = (() => {
    switch (orderBy) {
      case "text":
        return { text: "asc" as const };
      default:
        return { id: "asc" as const };
    }
  })();

  const questions = await prisma.question.findMany({
    where,
    include: { quiz: { include: { category: true } } },
    orderBy: orderByClause,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-white">📋 Gestión de Preguntas</h1>

      <form method="GET" className="mb-6 flex flex-wrap gap-4 items-end text-sm">
        <div>
          <label className="text-white block mb-1">Buscar</label>
          <input
            name="search"
            defaultValue={search ?? ""}
            placeholder="Texto de la pregunta..."
            className="px-3 py-2 rounded bg-white/10 text-white border border-white/20 w-60"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Quiz</label>
          <select
            name="quizId"
            defaultValue={quizId ?? ""}
            className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
          >
            <option value="" className="text-black">Todos</option>
            {quizzes.map((q) => (
              <option className="text-black" key={q.id} value={q.id}>
                {q.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-white block mb-1">Categoría</label>
          <select
            name="category"
            defaultValue={category ?? ""}
            className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
          >
            <option value="" className="text-black">Todas</option>
            {uniqueCategories.map((c) => (
              <option className="text-black" key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-white block mb-1">Ordenar por</label>
          <select
            name="orderBy"
            defaultValue={orderBy ?? ""}
            className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
          >
            <option className="text-black" value="id">ID</option>
            <option className="text-black" value="text">Alfabético (A-Z)</option>
          </select>
        </div>

        <button
          type="submit"
          className="h-10 px-4 rounded bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow backdrop-blur-md font-medium"
        >
          Filtrar
        </button>

        {/* Botón alineado a la derecha */}
        <div className="w-full flex justify-end">
          <a
            href="/admin/questions/new"
            className="h-10 px-4 rounded bg-emerald-500/20 text-white hover:bg-emerald-500/40 border border-emerald-400/30 shadow backdrop-blur-md font-medium transition flex items-center"
          >
            Nueva Pregunta
          </a>

        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/20">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Texto</th>
              <th className="px-4 py-3 text-left">Quiz</th>
              <th className="px-4 py-3 text-left">Categoría</th>
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
                <td className="px-4 py-3">{q.quiz.category.name}</td>
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
