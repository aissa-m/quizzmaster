import prisma from "@/app/lib/prisma";

export default async function AdminQuestionsPage() {
  const questions = await prisma.question.findMany({
    include: { quiz: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestionar Preguntas</h1>
      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Texto</th>
            <th className="p-2">Quiz</th>
            <th className="p-2">Orden</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} className="border-t">
              <td className="p-2">{q.id}</td>
              <td className="p-2">{q.text}</td>
              <td className="p-2">{q.quiz.title}</td>
              <td className="p-2">{q.order}</td>
              <td className="p-2">
                <a href={`/admin/questions/${q.id}/edit`} className="text-blue-600 mr-2">Editar</a>
                <button className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
