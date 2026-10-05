'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, CheckCircle, Play, Clock, BookOpen } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { getUserEnrollments, getCourseProgress, isEnrolled } from '@/lib/dataHelpers';
import { courses } from '@/lib/mockData';
import type { CourseProgress } from '@/lib/types';

export default function MyCoursesPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<Array<{ course: any; progress: CourseProgress; enrolled: boolean }>>([]);

  useEffect(() => {
    if (!user) return;
    const allData = courses.map(course => ({
      course,
      progress: getCourseProgress(user.id, course.id),
      enrolled: isEnrolled(user.id, course.id),
    }));
    setData(allData);
  }, [user]);

  const enrolled = data.filter(d => d.enrolled);
  const notEnrolled = data.filter(d => !d.enrolled);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>My Courses</h1>
        <p style={{ color: '#64748b' }}>Manage your enrolled courses and continue learning.</p>
      </div>

      {/* Enrolled Courses */}
      {enrolled.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={18} color="#10b981" /> Enrolled Courses
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {enrolled.map(({ course, progress }) => (
              <div key={course.id} style={{ background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {/* Course Header */}
                <div style={{ background: 'linear-gradient(135deg, #0a1628, #1a2d54)', padding: '24px 20px', position: 'relative' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🚁</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: 4 }}>{course.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{course.duration}</span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#475569' }} />
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{course.totalLessons} Lessons</span>
                  </div>
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <span style={{ background: '#10b981', color: 'white', borderRadius: 99, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700 }}>✓ Enrolled</span>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Progress</span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1d6ae5' }}>{progress.percentage}%</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: 8, height: 8 }}>
                    <div className="progress-fill" style={{ width: `${progress.percentage}%` }} />
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginBottom: 16 }}>
                    {progress.completedLessons} / {progress.totalLessons} Lessons Completed
                  </p>

                  {progress.isCompleted ? (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <Link href={`/lms/certificates`} className="btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', borderColor: '#10b981', color: '#10b981' }}>
                        🏆 Certificate
                      </Link>
                      <Link href={`/lms/courses/${course.id}`} className="btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                        Review
                      </Link>
                    </div>
                  ) : (
                    <Link href={`/lms/courses/${course.id}`} className="btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                      <Play size={14} /> Continue Course
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Not Enrolled Courses */}
      {notEnrolled.length > 0 && (
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={18} color="#94a3b8" /> Available Courses
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {notEnrolled.map(({ course }) => (
              <div key={course.id} style={{ background: 'white', borderRadius: 18, border: '2px dashed #e2e8f0', padding: 24, opacity: 0.85, transition: 'all 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderStyle = 'solid'; e.currentTarget.style.borderColor = '#1d6ae5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.borderStyle = 'dashed'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, filter: 'grayscale(0.3)' }}>🚁</div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0a1628', marginBottom: 2 }}>{course.title}</h3>
                    <span className="badge badge-gray">
                      <Lock size={10} /> Not Enrolled
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.8125rem', color: '#64748b', marginBottom: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} /> {course.duration}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><BookOpen size={13} /> {course.totalLessons} Lessons</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.25rem', color: '#1d6ae5' }}>
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                  <Link href={`/checkout?courseId=${course.id}`} className="btn-primary btn-sm">
                    Enroll Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
