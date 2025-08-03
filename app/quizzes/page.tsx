import QuizCard from "../components/QuizCard";

interface Quiz {
  id: number;
  title: string;
  description: string;
  category: {
    name: string;
  };
}

export default async function QuizzesPage() {
  const res = await fetch("http://localhost:3000/api/public/quizzes", {
    cache: "no-store",
  });
  const quizzes: Quiz[] = await res.json();

  return (
    <main className="min-h-screen px-6 py-20 bg-gradient-to-br from-sky-900 to-indigo-950 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">📚 Explora nuestros quizzes</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </main>
  );
}
