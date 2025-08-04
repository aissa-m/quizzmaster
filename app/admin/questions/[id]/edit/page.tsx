"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Quiz {
  id: number;
  title: string;
}

interface Option {
  id?: number;
  text: string;
  isCorrect: boolean;
}

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [text, setText] = useState("");
  const [quizId, setQuizId] = useState("");
  const [order, setOrder] = useState(1);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  // Cargar quizzes
  useEffect(() => {
    fetch("/api/admin/quizzes")
      .then((res) => res.json())
      .then(setQuizzes);
  }, []);

  // Cargar datos de la pregunta
  useEffect(() => {
    fetch(`/api/admin/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setText(data.text);
        setQuizId(data.quizId.toString());
        setOrder(data.order);
        setOptions(data.options);
      });
  }, [id]);

  const handleOptionChange = (index: number, field: "text" | "isCorrect", value: string | boolean) => {
    let newOptions = [...options];
    if (field === "text") {
      newOptions[index].text = value as string;
    } else {
      newOptions = newOptions.map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
      }));
    }
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        quizId: Number(quizId),
        order,
        options,
      }),
    });

    if (res.ok) router.push("/admin/questions");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-blue-900/30 text-white shadow-xl rounded-2xl backdrop-blur-md border border-blue-300/30">
      <h2 className="text-2xl font-bold mb-4">✏️ Editar Pregunta</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Igual que el formulario de creación, puedes copiar los <input> tal cual */}
        {/* ... */}
        <div>
          <label className="block text-sm mb-1">Texto de la pregunta</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 bg-blue-800/40 border border-blue-300/20 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Selecciona el Quiz</label>
          <select
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            className="w-full px-3 py-2 bg-blue-800/40 border border-blue-300/20 rounded-md"
            required
          >
            <option value="">-- Selecciona un quiz --</option>
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Orden</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full px-3 py-2 bg-blue-800/40 border border-blue-300/20 rounded-md"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">Opciones</label>
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Opción ${idx + 1}`}
                value={opt.text}
                onChange={(e) => handleOptionChange(idx, "text", e.target.value)}
                className="flex-1 px-3 py-2 bg-blue-800/40 border border-blue-300/20 rounded-md"
              />
              <input
                type="radio"
                name="correct"
                checked={opt.isCorrect}
                onChange={() => handleOptionChange(idx, "isCorrect", true)}
              />
              <span className="text-sm">Correcta</span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setOptions([...options, { text: "", isCorrect: false }])}
            className="text-sm text-blue-200 hover:text-white mt-2"
          >
            ➕ Añadir opción
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-md font-semibold transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
