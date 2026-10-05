'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Trophy, CheckCircle, Clock, TrendingUp, Bell, ChevronRight, Play } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { 
  getUserEnrollments, getStudentStats, getCourseProgress, 
  getUserLessonProgress 
} from '@/lib/dataHelpers';
import { courses, announcements } from '@/lib/mockData';
import type { CourseProgress } from '@/lib/types';

export default function LMSDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ enrolledCourses: 0, completedCourses: 0, totalLessonsCompleted: 0, totalLessons: 0, certificatesEarned: 0, overallProgress: 0 });
  const [enrolledCourses, setEnrolledCourses] = useState<Array<{ course: any; progress: CourseProgress }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const userStats = getStudentStats(user.id);
    setStats(userStats);
    
    const enrollments = getUserEnrollments(user.id);
    const coursesWithProgress = enrollments.map(enrollment => {
      const course = courses.find(c => c.id === enrollment.courseId);
      const progress = getCourseProgress(user.id, enrollment.courseId);
      return { course, progress };
    }).filter(item => item.course);
    
    setEnrolledCourses(coursesWithProgress as any);
    setLoading(false);
  }, [user]);

  const recentAnnouncements = announcements.slice(0, 2);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name.split(' ')[0] || 'Student';

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #1d6ae5', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ color: '#64748b' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.75rem', color: '#0a1628', marginBottom: 6 }}>
              {greeting}, {firstName}! 👋
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>
              {stats.enrolledCourses > 0 
                ? `You've completed ${stats.totalLessonsCompleted} of ${stats.totalLessons} lessons. Keep going!`
                : 'Welcome to your learning dashboard. Enroll in a course to get started!'}
            </p>
          </div>
          {stats.enrolledCourses === 0 && (
            <Link href="/courses" className="btn-primary">
              Browse Courses <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Enrolled Courses', value: stats.enrolledCourses, icon: <BookOpen size={22} />, color: '#1d6ae5', bg: '#e8f0fd', suffix: '' },
          { label: 'Overall Progress', value: stats.overallProgress, icon: <TrendingUp size={22} />, color: '#8b5cf6', bg: '#ede9fe', suffix: '%' },
          { label: 'Lessons Completed', value: `${stats.totalLessonsCompleted} / ${stats.totalLessons}`, icon: <CheckCircle size={22} />, color: '#10b981', bg: '#d1fae5', suffix: '' },
          { label: 'Certificates Earned', value: stats.certificatesEarned, icon: <Trophy size={22} />, color: '#f59e0b', bg: '#fef3c7', suffix: '' },
        ].map((card, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 16, padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, marginBottom: 14 }}>
              {card.icon}
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', lineHeight: 1 }}>
              {card.value}{card.suffix}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500, marginTop: 4 }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        {/* Left: Courses */}
        <div>
          {/* Continue Learning */}
          {enrolledCourses.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.125rem', color: '#0a1628' }}>Continue Learning</h2>
                <Link href="/lms/courses" style={{ fontSize: '0.875rem', color: '#1d6ae5', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              {enrolledCourses.map(({ course, progress }) => (
                <div key={course.id} style={{
                  background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: 20, marginBottom: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #0a1628, #1a2d54)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                      🚁
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }}>
                        <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0a1628', lineHeight: 1.3 }}>{course.title}</h3>
                        <span className="badge badge-blue">{progress.percentage}%</span>
                      </div>
                      
                      {progress.lastLesson && (
                        <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: 10 }}>
                          Last: <span style={{ color: '#475569', fontWeight: 600 }}>{progress.lastLesson.title}</span>
                        </p>
                      )}

                      <div className="progress-bar" style={{ marginBottom: 12 }}>
                        <div className="progress-fill" style={{ width: `${progress.percentage}%` }} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                          {progress.completedLessons} / {progress.totalLessons} lessons
                        </span>
                        <Link href={`/lms/courses/${course.id}`} className="btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Play size={14} /> Continue
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Courses State */}
          {enrolledCourses.length === 0 && (
            <div style={{ background: 'white', borderRadius: 16, border: '2px dashed #e2e8f0', padding: 48, textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📚</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0a1628', marginBottom: 8 }}>No Courses Yet</h3>
              <p style={{ color: '#64748b', marginBottom: 24, fontSize: '0.9rem' }}>Enroll in a drone course to start your learning journey.</p>
              <Link href="/courses" className="btn-primary">Browse Courses <ArrowRight size={16} /></Link>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.125rem', color: '#0a1628', marginBottom: 16 }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { icon: '📝', label: 'Take a Quiz', href: '/lms/quiz', color: '#8b5cf6', bg: '#ede9fe' },
                { icon: '📋', label: 'View Assignments', href: '/lms/assignments', color: '#f59e0b', bg: '#fef3c7' },
                { icon: '📁', label: 'Resources', href: '/lms/resources', color: '#10b981', bg: '#d1fae5' },
                { icon: '🏆', label: 'Certificates', href: '/lms/certificates', color: '#ef4444', bg: '#fee2e2' },
                { icon: '🔧', label: 'Projects', href: '/lms/projects', color: '#1d6ae5', bg: '#e8f0fd' },
                { icon: '🎧', label: 'Get Support', href: '/lms/support', color: '#64748b', bg: '#f1f5f9' },
              ].map((action, i) => (
                <Link key={i} href={action.href}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 12px', background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', textDecoration: 'none', transition: 'all 0.2s', textAlign: 'center' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = action.bg; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <span style={{ fontSize: 24 }}>{action.icon}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#475569' }}>{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Announcements + Achievements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Announcements */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0a1628' }}>📢 Announcements</h3>
              <Link href="/lms/announcements" style={{ fontSize: '0.8125rem', color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>View all</Link>
            </div>
            {recentAnnouncements.map((ann, i) => (
              <div key={ann.id} style={{ padding: '12px 0', borderBottom: i < recentAnnouncements.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <h4 style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b', marginBottom: 4, lineHeight: 1.4 }}>{ann.title}</h4>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5 }}>{ann.content.slice(0, 80)}...</p>
              </div>
            ))}
          </div>

          {/* Progress Overview */}
          {enrolledCourses.length > 0 && (
            <div style={{ background: 'linear-gradient(135deg, #0a1628, #1a2d54)', borderRadius: 16, padding: 20, color: 'white' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'white', marginBottom: 16 }}>Overall Progress</h3>
              <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 16px' }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - stats.overallProgress / 100)}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>{stats.overallProgress}%</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Complete</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Lessons Done', value: stats.totalLessonsCompleted },
                  { label: 'Remaining', value: stats.totalLessons - stats.totalLessonsCompleted },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'white' }}>{item.value}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Not enrolled nudge */}
          {enrolledCourses.length === 0 && (
            <div style={{ background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', borderRadius: 16, padding: 20, color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
              <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 8 }}>Ready to Start?</h3>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>
                Choose Module 1 or Module 2 to begin your drone training journey.
              </p>
              <Link href="/courses" style={{ display: 'block', background: 'white', color: '#1d6ae5', padding: '10px 16px', borderRadius: 10, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f7ff')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
              >
                Browse Courses →
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { 
          [style*="gridTemplateColumns: '1fr 320px'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
