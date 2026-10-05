'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  ArrowRight, CheckCircle, Play, ChevronDown, Star, 
  BookOpen, Video, Award, Users, BarChart3, Shield,
  Zap, Target, Globe, ChevronRight
} from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import { courses } from '@/lib/mockData';

const trustIndicators = [
  { icon: '📚', label: 'Structured Learning' },
  { icon: '🔬', label: 'Practical Projects' },
  { icon: '🏭', label: 'Industry-Relevant' },
  { icon: '💻', label: 'Online LMS Access' },
  { icon: '📝', label: 'Assessments' },
  { icon: '🏆', label: 'Certificate' },
];

const whyChoose = [
  { icon: <Target size={22} />, title: 'Structured Curriculum', desc: 'Every lesson is carefully sequenced to build on the previous one, ensuring solid conceptual and practical understanding.' },
  { icon: <Video size={22} />, title: 'Video-First Learning', desc: 'High-quality video lectures supported by detailed notes, diagrams, and downloadable resources for every lesson.' },
  { icon: <BarChart3 size={22} />, title: 'Real-Time Progress', desc: 'Track your learning journey with detailed progress analytics, quiz scores, and assignment feedback.' },
  { icon: <Award size={22} />, title: 'Industry Certificate', desc: 'Earn a verified digital certificate upon course completion, showcasing your drone technology expertise.' },
  { icon: <Globe size={22} />, title: 'Regulation Focused', desc: 'Deep coverage of Indian DGCA drone regulations, registration, and compliance for real-world readiness.' },
  { icon: <Shield size={22} />, title: 'Lifetime Access', desc: 'Once enrolled, access your course materials, resources, and updates for as long as you need.' },
];

const steps = [
  { num: '01', title: 'Choose Your Course', desc: 'Select Module 1 (Foundational) or Module 2 (Advanced) based on your current knowledge level and goals.', icon: '🎯' },
  { num: '02', title: 'Create Your Account', desc: 'Sign up with your details. Your account becomes your learning profile tied to your enrolled courses.', icon: '👤' },
  { num: '03', title: 'Complete Payment', desc: 'Secure checkout via Razorpay. Apply coupon codes for discounts. Instant enrollment on payment confirmation.', icon: '💳' },
  { num: '04', title: 'Access Your LMS', desc: 'Unlock your personalized dashboard with all lessons, videos, quizzes, assignments, and resources.', icon: '🖥️' },
  { num: '05', title: 'Learn & Earn Certificate', desc: 'Complete lessons, pass quizzes, submit assignments, and earn your verified certificate of completion.', icon: '🏆' },
];

const faqs = [
  { q: 'What is this drone course?', a: 'Drone Academy India offers structured online drone technology training through two modules: a foundational Module 1 and an advanced Module 2. Each module includes video lectures, study material, quizzes, assignments, and a certificate.' },
  { q: 'Who can enroll?', a: 'Anyone interested in drone technology can enroll. We welcome engineering students, working professionals, researchers, entrepreneurs, and enthusiastic hobbyists.' },
  { q: 'Do I need prior drone experience?', a: 'No prior experience is required for Module 1. Module 2 is designed for students who have completed Module 1 or have equivalent foundational knowledge.' },
  { q: 'Is training fully online?', a: 'Yes. The entire program is conducted online through our LMS platform. You can learn at your own pace from any device.' },
  { q: 'What is the difference between Module 1 and Module 2?', a: 'Module 1 covers drone fundamentals: components, aerodynamics, basic electronics, and regulations. Module 2 covers advanced topics: autonomous flight, drone programming, computer vision, GPS navigation, and industry applications.' },
  { q: 'Will I receive a certificate?', a: 'Yes. A verified digital certificate is issued upon successful completion of all lessons, quizzes, and assessments. The certificate can be verified online.' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{ background: 'white' }}>
      <PublicNav />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 120, paddingBottom: 80,
        background: 'linear-gradient(160deg, #f0f7ff 0%, #ffffff 50%, #f8fafc 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 600, height: 600, background: 'radial-gradient(circle, rgba(29,106,229,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Left Content */}
          <div style={{ animation: 'fadeIn 0.7s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e8f0fd', color: '#1d6ae5', borderRadius: 99, padding: '6px 16px', marginBottom: 20, fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.5px' }}>
              <span>🚁</span> India&apos;s Premier Drone Training Platform
            </div>

            <h1 style={{
              fontFamily: 'Plus Jakarta Sans', fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              lineHeight: 1.1, marginBottom: 20, color: '#0a1628',
            }}>
              Build Your Career<br />in{' '}
              <span style={{ background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Drone Technology
              </span>
            </h1>

            <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
              Learn drone technology through structured lessons, practical projects, assessments, and industry-focused training designed to take you from fundamentals to real-world applications.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href="/courses" className="btn-primary btn-lg">
                Explore Course <ArrowRight size={18} />
              </Link>
              <Link href="/courses#enroll" className="btn-secondary btn-lg">
                Enroll Now
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { value: '2', label: 'Course Modules', icon: '📦' },
                { value: '63+', label: 'Structured Lessons', icon: '📖' },
                { value: '100%', label: 'Online Access', icon: '🌐' },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '16px', background: 'white', borderRadius: 14,
                  border: '1px solid #e2e8f0', textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{stat.icon}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#1d6ae5' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'float 4s ease-in-out infinite' }}>
            <div style={{
              width: '100%', maxWidth: 480,
              background: 'linear-gradient(145deg, #0a1628, #1a2d54)',
              borderRadius: 24, padding: 32,
              boxShadow: '0 40px 80px rgba(10,22,40,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Drone visual */}
              <div style={{ textAlign: 'center', fontSize: 100, marginBottom: 20, filter: 'drop-shadow(0 0 20px rgba(29,106,229,0.5))' }}>🚁</div>
              
              {/* Course cards overlay */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '▶️', text: 'Lesson: UAV System Architecture', badge: 'Module 2', progress: 68 },
                  { icon: '📝', text: 'Quiz: Flight Controllers', badge: 'Module 1', score: '8/10' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px',
                    border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{item.icon}</span>
                        <span style={{ fontSize: '0.8125rem', color: '#e2e8f0', fontWeight: 500 }}>{item.text}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(29,106,229,0.3)', color: '#93c5fd', padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>
                        {'score' in item ? item.score : item.badge}
                      </span>
                    </div>
                    {'progress' in item && (
                      <div style={{ background: 'rgba(255,255,255,0.1)', height: 4, borderRadius: 99 }}>
                        <div style={{ width: `${item.progress}%`, height: '100%', background: 'linear-gradient(90deg, #1d6ae5, #3b82f6)', borderRadius: 99 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white', borderRadius: 99, padding: '4px 12px',
                fontSize: '0.75rem', fontWeight: 700,
              }}>
                ✓ Certificate Ready
              </div>

              {/* Background glow */}
              <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(29,106,229,0.3), transparent)', borderRadius: '50%', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="container" style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', gap: 0, background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', flexWrap: 'wrap' }}>
            {trustIndicators.map((item, i) => (
              <div key={i} style={{
                flex: 1, minWidth: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '18px 16px', textAlign: 'center',
                borderRight: i < trustIndicators.length - 1 ? '1px solid #e2e8f0' : 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f7ff')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COURSES OVERVIEW ──────────────────────────────────────────────────── */}
      <section className="section" id="courses" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">Learning Modules</div>
            <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Master Drone Technology<br />Step by Step</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              Our training program is structured into two progressive modules. Select the level most appropriate for your experience and career goals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 28 }}>
            {courses.map((course) => (
              <div key={course.id} style={{
                borderRadius: 20, overflow: 'hidden',
                border: course.moduleNumber === 2 ? '2px solid #1d6ae5' : '1px solid #e2e8f0',
                background: 'white',
                boxShadow: course.moduleNumber === 2 ? '0 12px 40px rgba(29,106,229,0.15)' : '0 4px 20px rgba(0,0,0,0.06)',
                position: 'relative', transition: 'all 0.3s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = course.moduleNumber === 2 ? '0 20px 60px rgba(29,106,229,0.2)' : '0 16px 48px rgba(0,0,0,0.10)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = course.moduleNumber === 2 ? '0 12px 40px rgba(29,106,229,0.15)' : '0 4px 20px rgba(0,0,0,0.06)'; }}
              >
                {/* Card Header */}
                <div style={{ padding: '28px 28px 20px', background: course.moduleNumber === 2 ? 'linear-gradient(135deg, #0a1628, #1a2d54)' : 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                  {course.badge && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', borderRadius: 99, padding: '4px 14px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.5px', marginBottom: 16 }}>
                      ⭐ {course.badge}
                    </div>
                  )}
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.25rem', color: course.moduleNumber === 2 ? 'white' : '#0a1628', marginBottom: 6 }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: course.moduleNumber === 2 ? '#94a3b8' : '#64748b', lineHeight: 1.6 }}>
                    {course.description.slice(0, 100)}...
                  </p>
                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 900, fontSize: '2.25rem', color: course.moduleNumber === 2 ? '#60a5fa' : '#1d6ae5' }}>
                      ₹{course.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: 28 }}>
                  {/* Key Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                    {[
                      { label: 'Lessons', value: course.totalLessons },
                      { label: 'Duration', value: course.duration },
                      { label: 'Level', value: course.level.charAt(0).toUpperCase() + course.level.slice(1) },
                    ].map((stat, i) => (
                      <div key={i} style={{ textAlign: 'center', padding: '12px 8px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0a1628' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div style={{ marginBottom: 24 }}>
                    {course.highlights.slice(0, 6).map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <CheckCircle size={15} color="#10b981" />
                        <span style={{ fontSize: '0.875rem', color: '#475569' }}>{h}</span>
                      </div>
                    ))}
                    {course.highlights.length > 6 && (
                      <div style={{ fontSize: '0.8125rem', color: '#1d6ae5', fontWeight: 600, marginTop: 8 }}>
                        +{course.highlights.length - 6} more features
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <Link href="/curriculum" className="btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                      View Curriculum
                    </Link>
                    <Link href={`/checkout?courseId=${course.id}`} className={course.moduleNumber === 2 ? 'btn-primary btn-sm' : 'btn-primary btn-sm'} style={{ flex: 1.5, justifyContent: 'center' }}>
                      Enroll – ₹{course.price.toLocaleString('en-IN')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─────────────────────────────────────────────────── */}
      <section className="section" id="comparison" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Compare Modules</div>
            <h2 className="section-title" style={{ margin: '0 auto 12px' }}>Choose the Right Module for You</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <thead>
                <tr>
                  <th style={{ padding: '20px 24px', textAlign: 'left', fontWeight: 700, fontSize: '0.9rem', color: '#64748b', borderBottom: '1px solid #e2e8f0', width: '34%' }}>Feature</th>
                  <th style={{ padding: '20px 24px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', color: '#1d6ae5', borderBottom: '1px solid #e2e8f0', width: '33%', background: '#f0f7ff' }}>
                    Module 1<br /><span style={{ fontSize: '0.875rem', fontWeight: 600 }}>₹8,999</span>
                  </th>
                  <th style={{ padding: '20px 24px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.2)', width: '33%', background: 'linear-gradient(135deg, #0a1628, #1a2d54)' }}>
                    Module 2<br /><span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#93c5fd' }}>₹15,999</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Difficulty Level', 'Beginner', 'Advanced'],
                  ['Number of Lessons', '25', '38'],
                  ['Video Lectures', '22 Videos', '35 Videos'],
                  ['Study Material', '✓', '✓ Enhanced'],
                  ['Quizzes', '3 Quizzes', '5 Quizzes'],
                  ['Assignments', '2 Assignments', '4 Assignments'],
                  ['Practical Projects', '1 Project', '3 Projects'],
                  ['Assessments', 'Module 1 Final', 'Module 2 Final'],
                  ['LMS Access', '✓', '✓'],
                  ['Progress Tracking', '✓', '✓ Detailed'],
                  ['Certificate', '✓', '✓ Advanced'],
                  ['Support', 'Community', 'Priority Support'],
                  ['Recommended For', 'Students & Beginners', 'Engineers & Professionals'],
                ].map(([feature, m1, m2], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                    <td style={{ padding: '14px 24px', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{feature}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.875rem', color: '#475569', borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fafcff' : '#f5f9ff' }}>
                      {m1 === '✓' ? <CheckCircle size={18} color="#10b981" style={{ margin: '0 auto' }} /> : m1}
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.875rem', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
                      {m2.startsWith('✓') ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                          <CheckCircle size={18} color="#10b981" />
                          {m2.length > 1 ? <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{m2.slice(2)}</span> : null}
                        </div>
                      ) : m2}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: '20px 24px' }}></td>
                  <td style={{ padding: '20px 24px', background: '#fafcff' }}>
                    <Link href="/checkout?courseId=course-module-1" className="btn-secondary" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                      Enroll – ₹8,999
                    </Link>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <Link href="/checkout?courseId=course-module-2" className="btn-primary" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                      Enroll – ₹15,999
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="section" id="how-it-works" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">Process</div>
            <h2 className="section-title" style={{ margin: '0 auto 12px' }}>How It Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              From exploring the course to earning your certificate — here&apos;s your learning journey in 5 simple steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
            {steps.map((step, i) => (
              <div key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  padding: '32px 24px', textAlign: 'center', cursor: 'pointer',
                  borderRadius: 0,
                  background: activeStep === i ? 'linear-gradient(135deg, #f0f7ff, #e8f0fd)' : 'white',
                  borderRight: i < steps.length - 1 ? '1px solid #e2e8f0' : 'none',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
              >
                {/* Step number */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', margin: '0 auto 16px',
                  background: activeStep === i ? 'linear-gradient(135deg, #1d6ae5, #3b82f6)' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, transition: 'all 0.3s',
                  boxShadow: activeStep === i ? '0 6px 20px rgba(29,106,229,0.3)' : 'none',
                }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: activeStep === i ? '#1d6ae5' : '#94a3b8', letterSpacing: '1px', marginBottom: 8 }}>{step.num}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0a1628', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>

                {/* Active indicator */}
                {activeStep === i && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d6ae5, #3b82f6)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">Why Drone Academy</div>
            <h2 className="section-title" style={{ margin: '0 auto 12px' }}>Built for Serious Learners</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {whyChoose.map((item, i) => (
              <div key={i} style={{
                padding: '28px', background: 'white', borderRadius: 16,
                border: '1px solid #e2e8f0', transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#1d6ae5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                <div style={{ width: 48, height: 48, background: '#e8f0fd', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d6ae5', marginBottom: 16 }}>
                  {item.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Common Questions</div>
            <h2 className="section-title" style={{ margin: '0 auto 12px' }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', transition: 'all 0.2s', boxShadow: openFaq === i ? '0 4px 16px rgba(0,0,0,0.06)' : 'none' }}>
                <button
                  className="accordion-trigger"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={{ fontWeight: 600, color: openFaq === i ? '#1d6ae5' : '#1e293b', fontSize: '0.9375rem' }}>{faq.q}</span>
                  <ChevronDown size={18} color="#64748b" style={{ transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 20px', fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, borderTop: '1px solid #f1f5f9', paddingTop: 16, animation: 'fadeIn 0.2s ease' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/faq" style={{ color: '#1d6ae5', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
              View all FAQs <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d54 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 400, height: 400, background: 'radial-gradient(circle, rgba(29,106,229,0.2), transparent)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 350, height: 350, background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)', borderRadius: '50%' }} />
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🚁</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'white', marginBottom: 16 }}>
            Ready to Start Your Drone Career?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Join our structured drone training program. Learn at your pace, earn your certificate, and build real-world expertise.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses#enroll" className="btn-primary btn-lg">
              Enroll Now <ArrowRight size={18} />
            </Link>
            <Link href="/curriculum" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, fontSize: '1.0625rem', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
