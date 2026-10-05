'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, CheckCircle, Clock, MessageSquare, 
  Video, User, FileText, Send, Lock, LogOut, ArrowRight
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { assignments, assignmentSubmissions as initialSubmissions, users, courses } from '@/lib/mockData';

export default function InstructorDashboardPage() {
  const { user, login, logout } = useAuthStore();
  const router = useRouter();

  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [activeTab, setActiveTab] = useState<'grading' | 'doubts' | 'sessions'>('grading');
  
  // Grading modal state
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [marksGiven, setMarksGiven] = useState('18');
  const [feedbackGiven, setFeedbackGiven] = useState('');
  const [gradeSuccess, setGradeSuccess] = useState(false);

  // Doubts mock state
  const [doubts, setDoubts] = useState([
    {
      id: 'd-1',
      student: 'Rahul Verma',
      course: 'Module 1: Drone Fundamentals',
      question: 'What is the exact maximum allowed flight altitude under DGCA Green Zone without requiring prior ATC clearance?',
      answer: '',
      date: '2 hours ago',
    },
    {
      id: 'd-2',
      student: 'Amit Patel',
      course: 'Module 1: Drone Fundamentals',
      question: 'During ESC calibration with 4S LiPo, the motor beeps continuously three times. What does this error chime signify?',
      answer: 'Three rapid beeps typically indicate throttle signal detected is not zero, or throttle trim needs centering in your radio controller.',
      date: 'Yesterday',
    },
  ]);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const isInstructor = user && (user.role === 'instructor' || user.role === 'admin');

  const handleInstructorQuickLogin = () => {
    const instUser = users.find(u => u.role === 'instructor');
    if (instUser) login(instUser);
  };

  const handleSaveGrade = (subId: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: 'graded',
          marks: parseInt(marksGiven) || 15,
          feedback: feedbackGiven || 'Good work on following the flight principles.',
          gradedAt: new Date().toISOString(),
          gradedBy: user?.id || 'instructor',
        };
      }
      return s;
    }));
    setGradeSuccess(true);
    setTimeout(() => {
      setGradeSuccess(false);
      setGradingSubId(null);
      setMarksGiven('18');
      setFeedbackGiven('');
    }, 1200);
  };

  const handleSendReply = (doubtId: string) => {
    const text = replyText[doubtId];
    if (!text?.trim()) return;
    setDoubts(prev => prev.map(d => d.id === doubtId ? { ...d, answer: text } : d));
    setReplyText(prev => ({ ...prev, [doubtId]: '' }));
  };

  if (!isInstructor) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: 20 }}>
        <div style={{
          background: 'white',
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          padding: '40px',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <GraduationCap size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
            Flight Faculty Portal
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.5 }}>
            Please sign in with your Certified Flight Instructor account to review student project submissions, conduct evaluations, and respond to technical doubts.
          </p>

          <button
            onClick={handleInstructorQuickLogin}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(29,106,229,0.3)',
              marginBottom: 12,
            }}
          >
            Sign In as Dr. Ananya Singh (Chief Instructor)
          </button>

          <Link href="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Return to Public Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{
        background: '#0a1628',
        color: 'white',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'white' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={18} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              Drone Academy <span style={{ color: '#93c5fd', fontSize: '0.8rem', fontWeight: 600, background: 'rgba(59,130,246,0.2)', padding: '2px 8px', borderRadius: 4, marginLeft: 4 }}>INSTRUCTOR DESK</span>
            </span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Instructor: <strong style={{ color: 'white' }}>{user.name}</strong>
          </div>
          <Link href="/lms" style={{ fontSize: '0.8rem', color: '#93c5fd', textDecoration: 'none', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: 6 }}>
            Student LMS Preview
          </Link>
          <button
            onClick={() => { logout(); router.push('/'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>
            Faculty Flight Desk
          </h1>
          <p style={{ color: '#64748b' }}>
            Evaluate cadet deliverables, answer technical avionics questions, and coordinate live ground school webinars.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #e2e8f0', marginBottom: 28 }}>
          {[
            { id: 'grading', label: `Pending Evaluations (${submissions.filter(s => s.status === 'submitted').length})` },
            { id: 'doubts', label: `Cadet Q&A Desk (${doubts.filter(d => !d.answer).length} New)` },
            { id: 'sessions', label: 'Live Flight Webinars' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 18px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: activeTab === tab.id ? '#1d6ae5' : '#64748b',
                borderBottom: `2px solid ${activeTab === tab.id ? '#1d6ae5' : 'transparent'}`,
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Grading Desk */}
        {activeTab === 'grading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {submissions.map(sub => {
              const asgn = assignments.find(a => a.id === sub.assignmentId);
              const student = users.find(u => u.id === sub.userId);
              const isGraded = sub.status === 'graded';

              return (
                <div
                  key={sub.id}
                  style={{
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d6ae5', background: '#eff6ff', padding: '2px 8px', borderRadius: 4 }}>
                          {asgn?.title || 'Assignment Deliverable'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Submitted by <strong style={{ color: '#0a1628' }}>{student?.name || 'Cadet'}</strong> ({student?.email})
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
                        {sub.textResponse || 'Project PDF and telemetry files attached'}
                      </h3>
                    </div>

                    <div>
                      {isGraded ? (
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: 6, fontWeight: 700, fontSize: '0.8rem' }}>
                            <CheckCircle size={14} /> Graded: {sub.marks} / {asgn?.maxMarks || 20}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setGradingSubId(sub.id)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: 8,
                            background: '#1d6ae5',
                            color: 'white',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '0.8125rem',
                            cursor: 'pointer',
                          }}
                        >
                          Grade Submission
                        </button>
                      )}
                    </div>
                  </div>

                  {sub.feedback && (
                    <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: '0.825rem', color: '#334155' }}>
                      <strong style={{ color: '#0a1628' }}>Your Feedback:</strong> {sub.feedback}
                    </div>
                  )}

                  {/* Inline Grading Form */}
                  {gradingSubId === sub.id && (
                    <div style={{ marginTop: 18, padding: 18, borderRadius: 12, background: '#f0f7ff', border: '1px solid #bfdbfe' }}>
                      {gradeSuccess ? (
                        <div style={{ color: '#166534', fontWeight: 700, fontSize: '0.9rem' }}>
                          ✓ Evaluation recorded and synced to cadet portal!
                        </div>
                      ) : (
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>
                            Evaluate Submission (Max Marks: {asgn?.maxMarks || 20})
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, marginBottom: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>Score</label>
                              <input
                                type="number"
                                max={asgn?.maxMarks || 20}
                                min={0}
                                className="form-input"
                                value={marksGiven}
                                onChange={(e) => setMarksGiven(e.target.value)}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>Detailed Faculty Feedback</label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="Praise strengths, cite flight principles, and recommend improvements..."
                                value={feedbackGiven}
                                onChange={(e) => setFeedbackGiven(e.target.value)}
                              />
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <button
                              onClick={() => handleSaveGrade(sub.id)}
                              style={{ padding: '8px 16px', borderRadius: 6, background: '#1d6ae5', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}
                            >
                              Confirm & Post Grade
                            </button>
                            <button
                              onClick={() => setGradingSubId(null)}
                              style={{ padding: '8px 16px', borderRadius: 6, background: 'white', color: '#64748b', border: '1px solid #cbd5e1', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Doubts & Q&A */}
        {activeTab === 'doubts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {doubts.map(d => (
              <div
                key={d.id}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 700, color: '#0a1628', fontSize: '0.9rem' }}>{d.student}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>• {d.course}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{d.date}</span>
                </div>

                <p style={{ color: '#0a1628', fontWeight: 600, fontSize: '0.95rem', marginBottom: 16, lineHeight: 1.5 }}>
                  "{d.question}"
                </p>

                {d.answer ? (
                  <div style={{ background: '#f0fdf4', padding: '14px 16px', borderRadius: 10, border: '1px solid #bbf7d0', fontSize: '0.85rem', color: '#166534' }}>
                    <strong>Your Response:</strong> {d.answer}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Type instructor clarification or link to lesson..."
                      value={replyText[d.id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [d.id]: e.target.value })}
                    />
                    <button
                      onClick={() => handleSendReply(d.id)}
                      style={{
                        padding: '0 20px',
                        borderRadius: 8,
                        background: '#1d6ae5',
                        color: 'white',
                        border: 'none',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        flexShrink: 0,
                      }}
                    >
                      <Send size={14} />
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Webinars */}
        {activeTab === 'sessions' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0a1628', marginBottom: 16 }}>
              Upcoming Live Ground School & Flight Sessions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { title: 'Live Flight Controller Telemetry Diagnostics with ArduPilot', time: 'Tomorrow • 6:00 PM IST', attendees: 48, status: 'Scheduled' },
                { title: 'DGCA Remote Pilot Exam Prep & Mock Q&A Roundtable', time: 'Saturday • 11:00 AM IST', attendees: 84, status: 'Scheduled' },
              ].map((sess, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Video size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '0.95rem' }}>{sess.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{sess.time} • {sess.attendees} Cadets Registered</div>
                    </div>
                  </div>
                  <button style={{ padding: '8px 16px', borderRadius: 8, background: '#1d6ae5', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}>
                    Launch Zoom Room
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
