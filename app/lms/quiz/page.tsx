'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { quizzes, courses } from '@/lib/mockData';
import { getUserEnrollments, getUserQuizAttempts } from '@/lib/dataHelpers';
import { HelpCircle, CheckCircle, Clock, Award, Play, RotateCcw, AlertTriangle, ChevronRight } from 'lucide-react';

export default function QuizzesHubPage() {
  const { user } = useAuthStore();
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  if (!user) return null;

  const enrollments = getUserEnrollments(user.id);
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  // Filter quizzes by enrolled courses
  const userQuizzes = quizzes.filter(q => enrolledCourseIds.includes(q.courseId));

  const filteredQuizzes = userQuizzes.filter(q => {
    if (selectedCourse !== 'all' && q.courseId !== selectedCourse) return false;
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>
          Module Quizzes & Assessments
        </h1>
        <p style={{ color: '#64748b' }}>
          Evaluate your theoretical comprehension of aerodynamics, avionics, flight laws, and mission planning.
        </p>
      </div>

      {/* Filter by course if multiple */}
      {enrolledCourses.length > 1 && (
        <div style={{ marginBottom: 24 }}>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="form-input"
            style={{ width: 'auto', minWidth: 220, background: 'white' }}
          >
            <option value="all">All Enrolled Courses</option>
            {enrolledCourses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Quiz Grid */}
      {filteredQuizzes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px', background: 'white', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>📝</div>
          <h3 style={{ fontWeight: 700, color: '#0a1628', marginBottom: 6 }}>No quizzes available</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Quizzes will appear here as you progress through course modules.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {filteredQuizzes.map(quiz => {
            const attempts = getUserQuizAttempts(user.id, quiz.id);
            const latestAttempt = attempts[attempts.length - 1];
            const hasPassed = attempts.some(a => a.passed);
            const course = courses.find(c => c.id === quiz.courseId);

            return (
              <div
                key={quiz.id}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(29,106,229,0.09)';
                  e.currentTarget.style.borderColor = '#bfdbfe';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#1d6ae5',
                      background: '#eff6ff',
                      padding: '3px 10px',
                      borderRadius: 99,
                    }}>
                      {course?.title || 'Drone Module'}
                    </span>

                    {hasPassed ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#16a34a', fontSize: '0.75rem', fontWeight: 700, background: '#dcfce7', padding: '3px 8px', borderRadius: 6 }}>
                        <CheckCircle size={13} /> Passed
                      </span>
                    ) : latestAttempt ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#dc2626', fontSize: '0.75rem', fontWeight: 700, background: '#fee2e2', padding: '3px 8px', borderRadius: 6 }}>
                        <AlertTriangle size={13} /> {latestAttempt.percentage}% Score
                      </span>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                        Not Attempted
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a1628', marginBottom: 8, lineHeight: 1.4 }}>
                    {quiz.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 18, lineHeight: 1.5 }}>
                    {quiz.description}
                  </p>

                  <div style={{ display: 'flex', gap: 16, padding: '12px 14px', background: '#f8fafc', borderRadius: 10, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#475569' }}>
                      <HelpCircle size={14} color="#64748b" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    {quiz.timeLimit && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#475569' }}>
                        <Clock size={14} color="#64748b" />
                        <span>{quiz.timeLimit} Mins</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#475569' }}>
                      <Award size={14} color="#64748b" />
                      <span>Pass: {quiz.passingScore}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  {latestAttempt && (
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                      <span>Best Score: <strong>{Math.max(...attempts.map(a => a.percentage))}%</strong></span>
                      <span>Total Attempts: <strong>{attempts.length}</strong></span>
                    </div>
                  )}

                  <Link
                    href={`/lms/quiz/${quiz.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '11px',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      background: hasPassed ? 'white' : 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                      color: hasPassed ? '#1d6ae5' : 'white',
                      border: hasPassed ? '1px solid #1d6ae5' : 'none',
                      boxShadow: hasPassed ? 'none' : '0 4px 12px rgba(29,106,229,0.25)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {hasPassed ? (
                      <>
                        <RotateCcw size={15} />
                        <span>Retake Practice Quiz</span>
                      </>
                    ) : latestAttempt ? (
                      <>
                        <RotateCcw size={15} />
                        <span>Retake Quiz to Pass</span>
                      </>
                    ) : (
                      <>
                        <Play size={15} fill="white" />
                        <span>Start Assessment</span>
                      </>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
