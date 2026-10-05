'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, CheckCircle, Play, FileText, 
  Download, BookOpen, HelpCircle, Check, ChevronDown, X, Loader2
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { 
  getLesson, getLessonNavigation, getCurriculum, 
  getUserLessonProgress, markLessonComplete, accessLesson, isEnrolled
} from '@/lib/dataHelpers';

function LessonPlayerContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  
  const lessonId = params.lessonId as string;
  const courseId = searchParams.get('courseId') || '';
  
  const [lessonData, setLessonData] = useState<ReturnType<typeof getLesson>>(null);
  const [nav, setNav] = useState<{ prev: any; next: any }>({ prev: null, next: null });
  const [isCompleted, setIsCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'transcript'>('notes');
  const [markingComplete, setMarkingComplete] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) { router.push('/auth/signin'); return; }
    if (!isEnrolled(user.id, courseId)) { router.push('/lms/courses'); return; }
    
    const data = getLesson(lessonId);
    if (!data) { router.push(`/lms/courses/${courseId}`); return; }
    
    setLessonData(data);
    setNav(getLessonNavigation(lessonId, courseId));
    
    const progress = getUserLessonProgress(user.id, courseId);
    const map: Record<string, boolean> = {};
    progress.forEach(lp => { map[lp.lessonId] = lp.isCompleted; });
    setProgressMap(map);
    setIsCompleted(map[lessonId] || false);
    
    // Mark as accessed
    accessLesson(user.id, lessonId, courseId);
  }, [lessonId, courseId, user, router]);

  const handleMarkComplete = async () => {
    if (!user || !lessonData) return;
    setMarkingComplete(true);
    await new Promise(r => setTimeout(r, 500));
    markLessonComplete(user.id, lessonId, courseId);
    setIsCompleted(true);
    setProgressMap(prev => ({ ...prev, [lessonId]: true }));
    setMarkingComplete(false);
  };

  if (!lessonData) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTop: '3px solid #1d6ae5', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const { lesson, chapter, module: mod } = lessonData;
  const curriculum = getCurriculum(courseId);
  const allLessons = curriculum?.chapters.flatMap(ch => ch.lessons) || [];

  return (
    <div style={{ display: 'flex', gap: 0, height: 'calc(100vh - 62px - 56px)', overflow: 'hidden', margin: '-28px -24px', background: '#f8fafc' }}>
      {/* Curriculum Sidebar */}
      <div style={{
        width: sidebarOpen ? 300 : 0, minWidth: sidebarOpen ? 300 : 0,
        background: 'white', borderRight: '1px solid #e2e8f0',
        overflow: 'hidden', transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
          <Link href={`/lms/courses/${courseId}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Course Overview
          </Link>
          <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0a1628', marginTop: 10, marginBottom: 2 }}>
            {curriculum?.title || 'Course Curriculum'}
          </h3>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            {Object.values(progressMap).filter(Boolean).length}/{allLessons.length} lessons completed
          </div>
          <div className="progress-bar" style={{ marginTop: 8 }}>
            <div className="progress-fill" style={{ width: `${Math.round((Object.values(progressMap).filter(Boolean).length / allLessons.length) * 100)}%` }} />
          </div>
        </div>

        {/* Lesson List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {curriculum?.chapters.map((ch) => (
            <div key={ch.id}>
              <div style={{ padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', fontSize: '0.8125rem', fontWeight: 700, color: '#475569' }}>
                {ch.title}
              </div>
              {ch.lessons.map((l) => {
                const isCurrent = l.id === lessonId;
                const done = progressMap[l.id];
                return (
                  <Link key={l.id}
                    href={`/lms/lesson/${l.id}?courseId=${courseId}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px',
                      textDecoration: 'none', borderBottom: '1px solid #f8fafc',
                      background: isCurrent ? '#f0f7ff' : 'white',
                      borderLeft: isCurrent ? '3px solid #1d6ae5' : '3px solid transparent',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = '#f8fafc'; }}
                    onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = 'white'; }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? '#d1fae5' : isCurrent ? '#e8f0fd' : '#f1f5f9' }}>
                      {done ? <CheckCircle size={14} color="#10b981" /> : isCurrent ? <Play size={10} color="#1d6ae5" /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#cbd5e1' }} />}
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#1d6ae5' : done ? '#64748b' : '#1e293b', lineHeight: 1.4, flex: 1 }}>
                      {l.title}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', flexShrink: 0 }}>{l.duration}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Main Lesson Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <div style={{ padding: '12px 20px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', fontWeight: 600 }}
          >
            {sidebarOpen ? <X size={14} /> : <BookOpen size={14} />}
            {sidebarOpen ? 'Hide' : 'Curriculum'}
          </button>
          <div style={{ flex: 1, fontSize: '0.875rem' }}>
            <span style={{ color: '#94a3b8' }}>{chapter.title}</span>
            <span style={{ color: '#e2e8f0', margin: '0 8px' }}>›</span>
            <span style={{ color: '#0a1628', fontWeight: 600 }}>{lesson.title}</span>
          </div>
          {isCompleted ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontWeight: 700, fontSize: '0.875rem' }}>
              <CheckCircle size={16} /> Completed
            </span>
          ) : (
            <button onClick={handleMarkComplete}
              disabled={markingComplete}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.875rem', cursor: markingComplete ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: markingComplete ? 0.7 : 1 }}
            >
              <Check size={15} /> {markingComplete ? 'Saving...' : 'Mark Complete'}
            </button>
          )}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Video Player */}
          {lesson.hasVideo && lesson.videoUrl && (
            <div style={{ background: '#000', aspectRatio: '16/9', maxHeight: 480 }}>
              <iframe
                src={lesson.videoUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          )}

          {/* Video Placeholder (no URL) */}
          {lesson.hasVideo && !lesson.videoUrl && (
            <div style={{ background: '#0a1628', aspectRatio: '16/9', maxHeight: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(29,106,229,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse-ring 2s ease infinite' }}>
                <Play size={32} color="#3b82f6" />
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{lesson.title}</p>
              <span className="badge badge-blue">Demo Video</span>
            </div>
          )}

          <div style={{ padding: '24px 28px' }}>
            {/* Lesson Header */}
            <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
              <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.375rem', color: '#0a1628', marginBottom: 8 }}>{lesson.title}</h1>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 12 }}>{lesson.description}</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.8125rem', color: '#94a3b8' }}>
                <span>⏱ {lesson.duration}</span>
                <span>👤 Dr. Ananya Singh</span>
                {lesson.hasVideo && <span>📹 Video Lecture</span>}
                {lesson.hasReading && <span>📄 Reading Material</span>}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid #e2e8f0' }}>
              {(['notes', 'resources'] as const).map((tab) => (
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.875rem', fontWeight: activeTab === tab ? 700 : 500,
                    color: activeTab === tab ? '#1d6ae5' : '#64748b',
                    borderBottom: activeTab === tab ? '2px solid #1d6ae5' : '2px solid transparent',
                    marginBottom: -1, textTransform: 'capitalize', transition: 'all 0.2s',
                  }}
                >
                  {tab === 'notes' ? '📝 Lesson Notes' : '📁 Resources'}
                </button>
              ))}
            </div>

            {activeTab === 'notes' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <div style={{ background: '#f8fafc', borderRadius: 14, padding: '20px 24px', border: '1px solid #e2e8f0', marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 14 }}>Lesson Content</h3>
                  <div style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.8 }}>
                    {lesson.content || (
                      <>
                        <p style={{ marginBottom: 12 }}>
                          This lesson covers <strong>{lesson.title}</strong>. The content includes comprehensive explanations, visual diagrams, and practical examples to help you understand this important concept in drone technology.
                        </p>
                        <p style={{ marginBottom: 12 }}>
                          Key concepts covered in this lesson:
                        </p>
                        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <li>Fundamental principles and terminology</li>
                          <li>Practical applications in real drone systems</li>
                          <li>Common configurations and variations</li>
                          <li>Safety considerations and best practices</li>
                          <li>Troubleshooting common issues</li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {lesson.hasQuiz && lesson.quizId && (
                  <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', borderRadius: 14, padding: '16px 20px', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📝</div>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#92400e' }}>Quiz Available</h4>
                        <p style={{ fontSize: '0.8125rem', color: '#b45309' }}>Test your understanding of this lesson</p>
                      </div>
                    </div>
                    <Link href={`/lms/quiz/${lesson.quizId}`} className="btn-primary btn-sm">Take Quiz</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'resources' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                {lesson.resources.length > 0 ? (
                  lesson.resources.map((res, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#f8fafc', borderRadius: 10, marginBottom: 10, border: '1px solid #e2e8f0' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#e8f0fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d6ae5' }}>
                        <FileText size={16} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>{res.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{res.type.toUpperCase()} · {res.size}</div>
                      </div>
                      <a href={res.url} className="btn-ghost btn-sm">
                        <Download size={14} /> Download
                      </a>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No downloadable resources for this lesson.</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.8125rem', marginTop: 4 }}>Check the Resources section for course-wide materials.</p>
                    <Link href="/lms/resources" style={{ display: 'inline-block', marginTop: 12, color: '#1d6ae5', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>Browse Resources →</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <div style={{ padding: '14px 24px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          {nav.prev ? (
            <Link href={`/lms/lesson/${nav.prev.id}?courseId=${courseId}`} className="btn-ghost btn-sm">
              <ChevronLeft size={14} /> Previous: {nav.prev.title.length > 30 ? nav.prev.title.slice(0, 30) + '...' : nav.prev.title}
            </Link>
          ) : <div />}

          {!isCompleted && (
            <button onClick={handleMarkComplete} disabled={markingComplete}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
              <Check size={14} /> Mark Complete & Next
            </button>
          )}

          {nav.next ? (
            <Link href={`/lms/lesson/${nav.next.id}?courseId=${courseId}`} className="btn-primary btn-sm">
              Next: {nav.next.title.length > 30 ? nav.next.title.slice(0, 30) + '...' : nav.next.title} <ChevronRight size={14} />
            </Link>
          ) : (
            <Link href={`/lms/courses/${courseId}`} className="btn-secondary btn-sm">
              🏁 Finish Course
            </Link>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function LessonPlayer() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a1628', color: 'white' }}>
        <Loader2 className="animate-spin" size={36} color="#3b82f6" />
      </div>
    }>
      <LessonPlayerContent />
    </Suspense>
  );
}
