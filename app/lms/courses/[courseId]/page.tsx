import CourseDetailClient from './CourseDetailClient';
import { courses } from '@/lib/mockData';

export function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id,
  }));
}

export default function CourseDetailPage() {
  return <CourseDetailClient />;
}
