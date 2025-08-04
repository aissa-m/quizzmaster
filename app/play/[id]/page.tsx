// app/play/[id]/page.tsx
import { type InferGetServerSidePropsType } from "next";
import PlayQuiz from "@/app/components/PlayQuiz";

export default function PlayPage({ params }: any) {
  const quizId = parseInt(params.id, 10);
  return <PlayQuiz quizId={quizId} />;
}
