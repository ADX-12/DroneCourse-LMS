'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { getUserEnrollments, getUserLessonProgress, getCurriculum } from '@/lib/dataHelpers';
import { courses } from '@/lib/mockData';
import { Play, CheckCircle2, Clock, BookOpen, Search, ArrowRight, Video, FileText } from 'lucide-react';

export default function MyLessonsPage() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  if (!user) return null;

  const enrollments = getUserEnrollments(user.id);
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const allProgress = getUserLessonProgress(user.id);
  const completedIds = new Set(allProgress.filter(p => p.isCompleted).map(p => p.lessonId));

  // Collect all lessons across enrolled courses
  interface FlattenedLesson {
    courseId: string;
    courseTitle: string;
    chapterTitle: string;
    id: string;
    title: string;
    duration: string;
    hasVideo: boolean;
    isCompleted: boolean;
  }

  const allLessons: FlattenedLesson[] = [];

  for (const c of enrolledCourses) {
    const cur = getCurriculum(c.id);
    if (!cur) continue;
    for (const chapter of cur.chapters) {
      for (const lesson of chapter.lessons) {
        allLessons.push({
          courseId: c.id,
          courseTitle: c.title,
          chapterTitle: chapter.title,
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration,
          hasVideo: lesson.hasVideo,
          isCompleted: completedIds.has(lesson.id),
        });
      }
    }
  }

  const filtered = allLessons.filter(lesson => {
    if (selectedCourse !== 'all' && lesson.courseId !== selectedCourse) return false;
    if (filter === 'completed' && !lesson.isCompleted) return false;
    if (filter === 'pending' && lesson.isCompleted) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.chapterTitle.toLowerCase().includes(q) ||
        lesson.courseTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const completedCount = allLessons.filter(l => l.isCompleted).length;
  const progressPercent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>
          My Learning Curriculum
        </h1>
        <p style={{ color: '#64748b' }}>
          Explore, watch, and track every video lecture and lesson in your drone certification training.
        </p>
      </div>

      {/* Progress Metric Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0a1628, #1a2d54)',
        borderRadius: 16,
        padding: '24px 28px',
        color: 'white',
        marginBottom: 28,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        boxShadow: '0 8px 30px rgba(10,22,40,0.15)',
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 99, background: 'rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: '0.75rem', fontWeight: 600, marginBottom: 8 }}>
            <BookOpen size={13} />
            <span>Overall Syllabus Tracking</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '4px 0 6px' }}>
            {completedCount} of {allLessons.length} Lessons Finished
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Keep up the consistent flight theory progress to unlock your DGCA Certification exam.
          </p>
        </div>

        <div style={{ minWidth: 200, flex: 1, maxWidth: 300 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 6, fontWeight: 600 }}>
            <span style={{ color: '#cbd5e1' }}>Overall Completion</span>
            <span style={{ color: '#60a5fa' }}>{progressPercent}%</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: 99, transition: 'width 0.4s' }} />
          </div>
        </div>
      </div>

      {/* Controls & Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          <div style={{ minWidth: 260, flex: 1, position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search by topic, chapter or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 42, background: 'white' }}
            />
          </div>

          {enrolledCourses.length > 1 && (
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="form-input"
              style={{ width: 'auto', minWidth: 200, background: 'white' }}
            >
              <option value="all">All Enrolled Courses</option>
              {enrolledCourses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {(['all', 'pending', 'completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: `1px solid ${filter === tab ? '#1d6ae5' : '#e2e8f0'}`,
                background: filter === tab ? '#1d6ae5' : 'white',
                color: filter === tab ? 'white' : '#64748b',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'all' ? 'All Lessons' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px', background: 'white', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>✈️</div>
          <h3 style={{ fontWeight: 700, color: '#0a1628', marginBottom: 6 }}>No lessons found</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Try clearing filters or search keywords.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((lesson, idx) => (
            <div
              key={lesson.id}
              style={{
                background: 'white',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
                transition: 'all 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#93c5fa';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(29,106,229,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 260, flex: 1 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: lesson.isCompleted ? '#dcfce7' : '#eff6ff',
                  color: lesson.isCompleted ? '#16a34a' : '#2563eb',
                }}>
                  {lesson.isCompleted ? <CheckCircle2 size={18} /> : (lesson.hasVideo ? <Video size={18} /> : <FileText size={18} />)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4 }}>
                      {lesson.chapterTitle}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: '#1d6ae5', fontWeight: 500 }}>
                      {lesson.courseTitle}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
                    {lesson.title}
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: '0.8125rem' }}>
                  <Clock size={14} />
                  <span>{lesson.duration}</span>
                </div>

                <Link
                  href={`/lms/lesson/${lesson.id}?courseId=${lesson.courseId}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: lesson.isCompleted ? '#f8fafc' : 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                    color: lesson.isCompleted ? '#334155' : 'white',
                    border: lesson.isCompleted ? '1px solid #cbd5e1' : 'none',
                    boxShadow: lesson.isCompleted ? 'none' : '0 2px 8px rgba(29,106,229,0.2)',
                  }}
                >
                  {lesson.isCompleted ? (
                    <>
                      <span>Review</span>
                      <ArrowRight size={13} />
                    </>
                  ) : (
                    <>
                      <Play size={13} fill="white" />
                      <span>Start Lesson</span>
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
