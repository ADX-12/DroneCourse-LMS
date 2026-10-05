'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { getQuiz, submitQuiz, getUserQuizAttempts } from '@/lib/dataHelpers';
import type { QuizAttempt } from '@/lib/types';

type QuizState = 'intro' | 'taking' | 'submitted';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const quizId = params.quizId as string;

  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<QuizAttempt | null>(null);
  const [pastAttempts, setPastAttempts] = useState<QuizAttempt[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const quiz = getQuiz(quizId);

  useEffect(() => {
    if (!user) { router.push('/auth/signin'); return; }
    if (!quiz) return;
    
    setPastAttempts(getUserQuizAttempts(user.id, quizId));
    if (quiz.timeLimit) setTimeLeft(quiz.timeLimit * 60);
  }, [user, quiz, quizId, router]);

  useEffect(() => {
    if (quizState !== 'taking' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  if (!quiz) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <h2 style={{ color: '#0a1628', marginBottom: 12 }}>Quiz not found</h2>
        <Link href="/lms" className="btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!user || submitting) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    
    try {
      const attempt = submitQuiz({ quizId, userId: user.id, answers });
      setResult(attempt);
      setQuizState('submitted');
      setPastAttempts(prev => [attempt, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalMarks = quiz.questions.reduce((sum, q) => sum + q.marks, 0);
  const question = quiz.questions[currentQuestion];

  // Intro Screen
  if (quizState === 'intro') {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ background: 'linear-gradient(135deg, #0a1628, #1a2d54)', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>📝</div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.5rem', color: 'white', marginBottom: 8 }}>{quiz.title}</h1>
            {quiz.description && <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{quiz.description}</p>}
          </div>

          <div style={{ padding: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
              {[
                { icon: '❓', label: 'Questions', value: quiz.questions.length },
                { icon: '⭐', label: 'Total Marks', value: totalMarks },
                { icon: '✅', label: 'Passing Score', value: `${quiz.passingScore}%` },
                { icon: '⏱', label: 'Time Limit', value: quiz.timeLimit ? `${quiz.timeLimit} min` : 'No Limit' },
              ].map((info, i) => (
                <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: 22 }}>{info.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#0a1628' }}>{info.value}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{info.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {pastAttempts.length > 0 && (
              <div style={{ background: '#f0f7ff', borderRadius: 12, padding: '14px 16px', marginBottom: 20, border: '1px solid #dbeafe' }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1d6ae5', marginBottom: 8 }}>Previous Attempts</p>
                {pastAttempts.slice(0, 3).map((att, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#475569', marginBottom: 4 }}>
                    <span>Attempt {pastAttempts.length - i}</span>
                    <span style={{ fontWeight: 700, color: att.passed ? '#10b981' : '#ef4444' }}>
                      {att.score}/{att.totalMarks} ({att.percentage}%) – {att.passed ? '✓ Passed' : '✗ Failed'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: '#fffbeb', borderRadius: 12, padding: '12px 16px', marginBottom: 24, border: '1px solid #fde68a', display: 'flex', gap: 10 }}>
              <AlertTriangle size={16} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: '0.8125rem', color: '#92400e', lineHeight: 1.5 }}>
                Once started, the timer begins. Make sure you have a stable connection before starting.
                {quiz.allowRetake && ' You can retake this quiz if needed.'}
              </p>
            </div>

            <button onClick={() => { setQuizState('taking'); setCurrentQuestion(0); setAnswers({}); }}
              className="btn-primary" style={{ width: '100%', height: 50, fontSize: '1.0625rem' }}>
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (quizState === 'submitted' && result) {
    return (
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {/* Result Header */}
          <div style={{
            background: result.passed ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
            padding: '36px', textAlign: 'center', color: 'white',
          }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>{result.passed ? '🏆' : '📚'}</div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.75rem', marginBottom: 8 }}>
              {result.passed ? 'Congratulations! You Passed!' : 'Keep Practicing!'}
            </h1>
            <p style={{ opacity: 0.85, fontSize: '1rem' }}>
              {result.passed ? 'Well done! You have successfully completed this quiz.' : `You need ${quiz.passingScore}% to pass. Review the material and try again.`}
            </p>
          </div>

          {/* Score Summary */}
          <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, borderBottom: '1px solid #f1f5f9' }}>
            {[
              { label: 'Score', value: `${result.score}/${result.totalMarks}`, color: '#0a1628' },
              { label: 'Percentage', value: `${result.percentage}%`, color: result.passed ? '#10b981' : '#ef4444' },
              { label: 'Status', value: result.passed ? 'PASSED' : 'FAILED', color: result.passed ? '#10b981' : '#ef4444' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '16px', background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 900, fontSize: '1.75rem', color: item.color }}>{item.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4, fontWeight: 600 }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Question Review */}
          <div style={{ padding: '24px 28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 16 }}>Question Review</h3>
            {quiz.questions.map((q, i) => {
              const userAns = answers[q.id];
              const isCorrect = Array.isArray(q.correctAnswer)
                ? JSON.stringify([...(userAns as string[] || [])].sort()) === JSON.stringify([...q.correctAnswer].sort())
                : userAns === q.correctAnswer;
              
              return (
                <div key={q.id} style={{
                  padding: '16px', borderRadius: 12, marginBottom: 12,
                  background: isCorrect ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`,
                }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                    {isCorrect ? <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} /> : <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />}
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.4 }}>
                      Q{i + 1}. {q.question}
                    </p>
                  </div>
                  <div style={{ paddingLeft: 28 }}>
                    <p style={{ fontSize: '0.8125rem', color: isCorrect ? '#065f46' : '#991b1b', fontWeight: 600 }}>
                      Your answer: {Array.isArray(userAns) ? userAns.join(', ') : userAns || 'Not answered'}
                    </p>
                    {!isCorrect && (
                      <p style={{ fontSize: '0.8125rem', color: '#10b981', fontWeight: 600 }}>
                        Correct: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                      </p>
                    )}
                    {q.explanation && (
                      <p style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: 6, lineHeight: 1.5 }}>
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {quiz.allowRetake && (
                <button onClick={() => { setQuizState('intro'); setAnswers({}); setCurrentQuestion(0); }}
                  className="btn-secondary" style={{ flex: 1 }}>
                  Retake Quiz
                </button>
              )}
              <Link href="/lms" className="btn-primary" style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Taking Quiz Screen
  const answered = Object.keys(answers).length;
  const progress = (currentQuestion / quiz.questions.length) * 100;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Quiz Header */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '16px 24px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628' }}>{quiz.title}</h2>
          <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Question {currentQuestion + 1} of {quiz.questions.length} · {answered} answered</p>
        </div>
        {quiz.timeLimit && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: timeLeft < 120 ? '#fef2f2' : '#f0f7ff', padding: '8px 14px', borderRadius: 10, border: `1px solid ${timeLeft < 120 ? '#fecaca' : '#dbeafe'}` }}>
            <Clock size={16} color={timeLeft < 120 ? '#ef4444' : '#1d6ae5'} />
            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem', color: timeLeft < 120 ? '#ef4444' : '#1d6ae5' }}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="progress-bar" style={{ marginBottom: 16 }}>
        <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }} />
      </div>

      {/* Question Card */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 16, animation: 'fadeIn 0.2s ease' }}>
        {/* Question Number Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.875rem', flexShrink: 0 }}>
            {currentQuestion + 1}
          </span>
          <div>
            <span className="badge badge-blue">{question.type === 'mcq' ? 'Multiple Choice' : question.type === 'true-false' ? 'True / False' : question.type === 'multi-answer' ? 'Multi-Answer' : 'Short Answer'}</span>
            <span style={{ marginLeft: 8, fontSize: '0.8125rem', color: '#94a3b8' }}>{question.marks} {question.marks === 1 ? 'mark' : 'marks'}</span>
          </div>
        </div>

        <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1.0625rem', color: '#0a1628', lineHeight: 1.5, marginBottom: 24 }}>
          {question.question}
        </h3>

        {/* Options */}
        {question.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {question.options.map((option, oi) => {
              const isSelected = question.type === 'multi-answer'
                ? (answers[question.id] as string[] || []).includes(option)
                : answers[question.id] === option;

              return (
                <button
                  key={oi}
                  onClick={() => {
                    if (question.type === 'multi-answer') {
                      const current = (answers[question.id] as string[] || []);
                      const updated = current.includes(option)
                        ? current.filter(a => a !== option)
                        : [...current, option];
                      setAnswers({ ...answers, [question.id]: updated });
                    } else {
                      setAnswers({ ...answers, [question.id]: option });
                    }
                  }}
                  style={{
                    padding: '14px 18px', borderRadius: 12, border: `2px solid ${isSelected ? '#1d6ae5' : '#e2e8f0'}`,
                    background: isSelected ? '#e8f0fd' : 'white', textAlign: 'left',
                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12,
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#93c5fd'; }}
                  onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; } }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: question.type === 'multi-answer' ? 4 : '50%',
                    border: `2px solid ${isSelected ? '#1d6ae5' : '#cbd5e1'}`,
                    background: isSelected ? '#1d6ae5' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {isSelected && <div style={{ width: 8, height: 8, borderRadius: question.type === 'multi-answer' ? 2 : '50%', background: 'white' }} />}
                  </div>
                  <span style={{ fontSize: '0.9375rem', color: isSelected ? '#1d4ed8' : '#1e293b', fontWeight: isSelected ? 600 : 400 }}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Short Answer */}
        {question.type === 'short-answer' && (
          <textarea
            value={(answers[question.id] as string) || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            placeholder="Type your answer here..."
            style={{ width: '100%', minHeight: 120, padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.9375rem', fontFamily: 'Inter', resize: 'vertical', outline: 'none', lineHeight: 1.6 }}
            onFocus={(e) => e.target.style.borderColor = '#1d6ae5'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="btn-ghost" style={{ opacity: currentQuestion === 0 ? 0.4 : 1 }}>
          <ChevronLeft size={16} /> Previous
        </button>

        {/* Question dots */}
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {quiz.questions.map((q, i) => (
            <button key={i} onClick={() => setCurrentQuestion(i)}
              style={{
                width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: i === currentQuestion ? '#1d6ae5' : answers[q.id] ? '#10b981' : '#f1f5f9',
                color: (i === currentQuestion || answers[q.id]) ? 'white' : '#94a3b8',
                fontWeight: 700, fontSize: '0.8125rem', transition: 'all 0.2s',
              }}>
              {i + 1}
            </button>
          ))}
        </div>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
            className="btn-primary">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', fontSize: '0.9375rem' }}>
            {submitting ? '⏳ Submitting...' : '✓ Submit Quiz'}
          </button>
        )}
      </div>
    </div>
  );
}
