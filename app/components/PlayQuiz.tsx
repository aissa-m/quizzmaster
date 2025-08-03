// File: components/PlayQuiz.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  category: { name: string };
  questions: Question[];
}

interface PlayQuizProps {
  quizId: number;
}

export default function PlayQuiz({ quizId }: PlayQuizProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; optionId: number }[]>([]);
  const [timeStart] = useState(() => Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [finished, setFinished] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    fetch(`/api/public/quizzes/${quizId}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [quizId]);

  // Timer: only while quiz is not finished
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - timeStart) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeStart, finished]);

  if (!quiz) {
    return <div>Cargando quiz...</div>;
  }

  if (finished) {
    return (
      <main className="min-h-screen px-6 py-20 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">¡Quiz completado!</h1>
        <p className="text-lg mb-2">
          Tiempo empleado: <span className="font-semibold">{timeElapsed} segundos</span>
        </p>
        <p className="text-lg">
          Preguntas respondidas: <span className="font-semibold">{answers.length} / {quiz.questions.length}</span>
        </p>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => router.push('/quizzes')}
        >
          Volver a quizzes
        </button>
      </main>
    );
  }

  const question = quiz.questions[current];

  const handleOptionClick = (optionId: number) => {
    setSelected(optionId);
  };

  const submitAttempt = async () => {
    const payload = { answers, timeElapsed };
    const res = await fetch(`/api/public/quizzes/${quizId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Error enviando intento');
      return;
    }
    const data = await res.json();
    console.log('Intento registrado:', data);
  };

  const handleNext = () => {
    if (selected === null) return;
    setAnswers((prev) => [...prev, { questionId: question.id, optionId: selected }]);
    setSelected(null);
    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      submitAttempt().then(() => setFinished(true));
    }
  };

  return (
    <main className="min-h-screen px-6 py-20 bg-gradient-to-br from-sky-900 to-indigo-950 text-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
        <p className="mb-6">{quiz.description}</p>
        <div className="mb-4">
          <span>Pregunta {current + 1} / {quiz.questions.length}</span>
          <span className="float-right">Tiempo: {timeElapsed}s</span>
        </div>
        <div className="bg-white/10 p-6 rounded-xl mb-6">
          <p className="mb-4">{question.text}</p>
          <div className="grid gap-4">
            {question.options.map((opt) => (
              <button
                key={opt.id}
                className={`w-full text-left p-3 border rounded ${selected === opt.id ? 'border-blue-400 bg-white/20' : 'border-transparent'}`}
                onClick={() => handleOptionClick(opt.id)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`px-5 py-2 rounded ${selected !== null ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'}`}
          disabled={selected === null}
          onClick={handleNext}
        >
          {current + 1 < quiz.questions.length ? 'Siguiente' : 'Finalizar'}
        </button>
      </div>
    </main>
  );
}
