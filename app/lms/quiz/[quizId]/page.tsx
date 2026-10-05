import QuizTakerClient from './QuizTakerClient';
import { quizzes } from '@/lib/mockData';

export function generateStaticParams() {
  return quizzes.map((quiz) => ({
    quizId: quiz.id,
  }));
}

export default function QuizPage() {
  return <QuizTakerClient />;
}
