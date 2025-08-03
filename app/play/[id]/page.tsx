import PlayQuiz from "@/app/components/PlayQuiz";

interface PlayPageProps {
  params: { id: string };
}

export default function PlayPage({ params }: PlayPageProps) {
  const quizId = parseInt(params.id, 10);
  return <PlayQuiz quizId={quizId} />;
}