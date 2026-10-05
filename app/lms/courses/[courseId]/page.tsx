'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronDown, ChevronRight, CheckCircle, Play, Lock, FileText, 
  HelpCircle, BookOpen, ArrowLeft, Clock
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { isEnrolled, getCourseProgress, getCurriculum, getUserLessonProgress } from '@/lib/dataHelpers';
import { courses } from '@/lib/mockData';

export default function CourseDetailLMS() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const courseId = params.courseId as string;

  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['ch1-1', 'ch2-1']));
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, boolean>>({});

  const course = courses.find(c => c.id === courseId);
  const curriculum = getCurriculum(courseId);
  const enrolled = user ? isEnrolled(user.id, courseId) : false;
  const progress = user ? getCourseProgress(user.id, courseId) : null;
  const userProgress = user ? getUserLessonProgress(user.id, courseId) : [];

  useEffect(() => {
    if (!user) { router.push('/auth/signin'); return; }
    if (!enrolled) { router.push('/courses'); return; }
    
    const map: Record<string, boolean> = {};
    userProgress.forEach(lp => { map[lp.lessonId] = lp.isCompleted; });
    setLessonProgressMap(map);

    // Auto-expand first chapter
    if (curriculum?.chapters.length) {
      setExpandedChapters(new Set([curriculum.chapters[0].id]));
    }
  }, [user, enrolled, curriculum, userProgress]);

  if (!course || !curriculum) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <h2 style={{ color: '#0a1628', marginBottom: 12 }}>Course not found</h2>
        <Link href="/lms/courses" className="btn-primary">Back to Courses</Link>
      </div>
    );
  }

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  const allLessons = curriculum.chapters.flatMap(ch => ch.lessons);
  const completedCount = allLessons.filter(l => lessonProgressMap[l.id]).length;
  const currentLessonId = userProgress.sort((a, b) => 
    new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
  )[0]?.lessonId;

  return (
    <div>
      {/* Back + Header */}
      <div style={{ marginBottom: 24 }}>
        <Link href="/lms/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', marginBottom: 12, fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1d6ae5')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          <ArrowLeft size={14} /> Back to My Courses
        </Link>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.5rem', color: '#0a1628', marginBottom: 6 }}>{course.title}</h1>
            <div style={{ display: 'flex', gap: 16, fontSize: '0.875rem', color: '#64748b', flexWrap: 'wrap' }}>
              <span>📚 {allLessons.length} Lessons</span>
              <span>⏱ {course.duration}</span>
              <span style={{ textTransform: 'capitalize' }}>📊 {course.level}</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>✅ {completedCount}/{allLessons.length} Completed</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.75rem', color: '#1d6ae5' }}>{progress?.percentage || 0}%</div>
            <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar" style={{ marginTop: 16, height: 10 }}>
          <div className="progress-fill" style={{ width: `${progress?.percentage || 0}%` }} />
        </div>
      </div>

      {/* Continue Button */}
      {currentLessonId && (
        <div style={{ background: 'linear-gradient(135deg, #e8f0fd, #dbeafe)', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #bfdbfe' }}>
          <div>
            <p style={{ fontSize: '0.8125rem', color: '#1d6ae5', fontWeight: 700, marginBottom: 2 }}>▶ Continue where you left off</p>
            <p style={{ fontSize: '0.875rem', color: '#475569' }}>
              {allLessons.find(l => l.id === currentLessonId)?.title}
            </p>
          </div>
          <Link href={`/lms/lesson/${currentLessonId}?courseId=${courseId}`} className="btn-primary btn-sm">
            Continue <ChevronRight size={14} />
          </Link>
        </div>
      )}

      {/* Curriculum */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628' }}>Course Curriculum</h2>
          <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{curriculum.chapters.length} chapters · {allLessons.length} lessons</span>
        </div>

        {curriculum.chapters.map((chapter, chIdx) => {
          const chapterCompleted = chapter.lessons.filter(l => lessonProgressMap[l.id]).length;
          const isExpanded = expandedChapters.has(chapter.id);

          return (
            <div key={chapter.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              {/* Chapter Header */}
              <button onClick={() => toggleChapter(chapter.id)} className="accordion-trigger">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: chapterCompleted === chapter.lessons.length ? '#d1fae5' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {chapterCompleted === chapter.lessons.length ? (
                      <CheckCircle size={16} color="#10b981" />
                    ) : (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>{chIdx + 1}</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', textAlign: 'left' }}>{chapter.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>
                      {chapterCompleted}/{chapter.lessons.length} lessons · {chapter.lessons.reduce((sum, l) => sum + parseInt(l.duration), 0)} min
                    </div>
                  </div>
                </div>
                <ChevronDown size={16} color="#94a3b8" style={{ transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }} />
              </button>

              {/* Lessons */}
              {isExpanded && (
                <div style={{ animation: 'fadeIn 0.2s ease' }}>
                  {chapter.lessons.map((lesson) => {
                    const completed = lessonProgressMap[lesson.id];
                    const isCurrent = lesson.id === currentLessonId;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/lms/lesson/${lesson.id}?courseId=${courseId}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '13px 24px 13px 60px',
                          textDecoration: 'none',
                          background: isCurrent ? '#f0f7ff' : 'white',
                          borderLeft: isCurrent ? '3px solid #1d6ae5' : '3px solid transparent',
                          borderBottom: '1px solid #f8fafc',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = '#f8fafc'; }}
                        onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = 'white'; }}
                      >
                        {/* Status Icon */}
                        <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: completed ? '#d1fae5' : isCurrent ? '#e8f0fd' : '#f1f5f9' }}>
                          {completed ? (
                            <CheckCircle size={16} color="#10b981" />
                          ) : isCurrent ? (
                            <Play size={14} color="#1d6ae5" />
                          ) : (
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#cbd5e1' }} />
                          )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: isCurrent ? 700 : 500, fontSize: '0.875rem', color: isCurrent ? '#1d6ae5' : completed ? '#475569' : '#1e293b', marginBottom: 3 }}>
                            {lesson.title}
                          </div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Clock size={11} color="#94a3b8" />
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lesson.duration}</span>
                            {lesson.hasVideo && <span className="badge badge-blue" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>📹 Video</span>}
                            {lesson.hasQuiz && <span className="badge badge-yellow" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>📝 Quiz</span>}
                            {lesson.hasReading && <span className="badge badge-gray" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>📄 Notes</span>}
                          </div>
                        </div>

                        <ChevronRight size={14} color="#cbd5e1" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
