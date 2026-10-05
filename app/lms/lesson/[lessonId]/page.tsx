import LessonPlayer from './LessonPlayerClient';
import { curriculum } from '@/lib/mockData';

export function generateStaticParams() {
  const allLessons = curriculum.flatMap((m) =>
    m.chapters.flatMap((ch) => ch.lessons)
  );
  return allLessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default function LessonPage() {
  return <LessonPlayer />;
}
