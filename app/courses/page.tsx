'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, ArrowRight, Shield, Award, Clock, BookOpen, 
  Video, Sparkles, CheckCircle2, ChevronRight, Zap, Compass
} from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import { courses } from '@/lib/mockData';

export default function CoursesCatalogPage() {
  const [selectedPlan, setSelectedPlan] = useState<'both' | 'module1' | 'module2'>('both');

  const comparisonFeatures = [
    { name: 'Target Level', m1: 'Beginner / Intermediate', m2: 'Advanced / Professional' },
    { name: 'Program Duration', m1: '8 Weeks (Self-paced)', m2: '12 Weeks (Self-paced)' },
    { name: 'Video Lectures & Lessons', m1: '25 Lessons (22 HD Videos)', m2: '38 Lessons (35 HD Videos)' },
    { name: 'DGCA Indian Drone Regulations', m1: 'Basic Airspace & NPNT', m2: 'Commercial Operator & Pilot Ops' },
    { name: 'Flight Controller Stack', m1: 'Betaflight & Basic FCs', m2: 'Pixhawk, ArduPilot & PX4' },
    { name: 'Autonomous Missions', m1: 'Introduction', m2: 'Full Waypoint & Grid Surveys' },
    { name: 'MAVLink & Python SDK Programming', m1: '—', m2: 'Included (DroneKit & Telemetry)' },
    { name: 'Practical Capstone Projects', m1: '1 Hardware Build Plan', m2: '3 Industry Field Projects' },
    { name: 'Quizzes & Graded Assignments', m1: '3 Quizzes, 2 Assignments', m2: '5 Quizzes, 4 Assignments' },
    { name: 'Official Certificate', m1: 'DGCA RPTO Certified Cadet', m2: 'Advanced Commercial UAV Specialist' },
    { name: 'Instructor Doubt Support', m1: 'Standard Forum Support', m2: 'Priority 1-on-1 Faculty Desk' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <PublicNav />

      <main style={{ flex: 1, paddingTop: 100 }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
          padding: '60px 20px 50px',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 99,
              background: '#e0f2fe',
              color: '#0284c7',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: 16,
              border: '1px solid #bae6fd',
            }}>
              <Compass size={14} />
              <span>Industry-Accredited Curriculum</span>
            </div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.5rem', color: '#0a1628', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Certified Drone Training Programs
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 680, margin: '0 auto 28px' }}>
              Master drone aerodynamics, avionics assembly, autonomous navigation, and DGCA regulations. Choose the track designed for your flight career.
            </p>
          </div>
        </section>

        {/* Course Cards Section */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '50px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 32, marginBottom: 60 }}>
            {courses.map((course, idx) => {
              const isModule2 = course.id === 'course-module-2';
              return (
                <div
                  key={course.id}
                  style={{
                    background: 'white',
                    borderRadius: 20,
                    border: isModule2 ? '2px solid #1d6ae5' : '1px solid #e2e8f0',
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isModule2 ? '0 12px 40px rgba(29,106,229,0.12)' : '0 4px 20px rgba(0,0,0,0.04)',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isModule2 && (
                    <div style={{
                      position: 'absolute',
                      top: -14,
                      right: 28,
                      background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                      color: 'white',
                      padding: '4px 14px',
                      borderRadius: 99,
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      boxShadow: '0 4px 12px rgba(29,106,229,0.3)',
                    }}>
                      MOST COMPREHENSIVE
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: isModule2 ? '#1d6ae5' : '#475569',
                        background: isModule2 ? '#eff6ff' : '#f1f5f9',
                        padding: '4px 10px',
                        borderRadius: 6,
                        textTransform: 'uppercase',
                      }}>
                        {course.shortTitle}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>• {course.duration}</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>• {course.level.toUpperCase()}</span>
                    </div>

                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0a1628', marginBottom: 12, lineHeight: 1.35 }}>
                      {course.title}
                    </h2>

                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 24 }}>
                      {course.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 28 }}>
                      <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0a1628' }}>
                        ₹{course.price.toLocaleString('en-IN')}
                      </span>
                      <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                        ₹{(course.price * 1.45).toFixed(0)}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: 4 }}>
                        30% Off
                      </span>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 20, marginBottom: 28 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>
                        What's Included:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {course.highlights.map((h, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: '#334155' }}>
                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Check size={12} strokeWidth={3} />
                            </div>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/checkout?courseId=${course.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        width: '100%',
                        padding: '14px',
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                        background: isModule2 ? 'linear-gradient(135deg, #1d6ae5, #3b82f6)' : '#0a1628',
                        color: 'white',
                        boxShadow: isModule2 ? '0 6px 20px rgba(29,106,229,0.3)' : '0 4px 14px rgba(10,22,40,0.15)',
                        transition: 'all 0.2s',
                        marginBottom: 10,
                      }}
                    >
                      <span>Enroll in {course.shortTitle}</span>
                      <ArrowRight size={16} />
                    </Link>

                    <Link
                      href="/curriculum"
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        fontSize: '0.8125rem',
                        color: '#64748b',
                        fontWeight: 600,
                        textDecoration: 'none',
                        padding: '6px',
                      }}
                    >
                      View Detailed Syllabus Breakdown →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side-by-Side Comparison Table */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            padding: '36px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            marginBottom: 60,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
                Side-by-Side Program Comparison
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                Compare key components, hardware exposure, and career outcomes across both modules.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontWeight: 700, width: '36%' }}>Feature / Topic</th>
                    <th style={{ padding: '16px 20px', color: '#0a1628', fontWeight: 800, width: '32%', background: '#f8fafc', borderRadius: '10px 0 0 0' }}>Module 1: Fundamentals</th>
                    <th style={{ padding: '16px 20px', color: '#1d6ae5', fontWeight: 800, width: '32%', background: '#eff6ff', borderRadius: '0 10px 0 0' }}>Module 2: Advanced Systems</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#334155' }}>{row.name}</td>
                      <td style={{ padding: '14px 20px', color: '#475569', background: '#f8fafc' }}>{row.m1}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#1d6ae5', background: '#eff6ff' }}>{row.m2}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: '20px' }}></td>
                    <td style={{ padding: '20px', background: '#f8fafc' }}>
                      <Link href="/checkout?courseId=course-module-1" className="btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                        Enroll in Module 1
                      </Link>
                    </td>
                    <td style={{ padding: '20px', background: '#eff6ff' }}>
                      <Link href="/checkout?courseId=course-module-2" className="btn-primary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                        Enroll in Module 2
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Need help choosing banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0a1628, #1a2d54)',
            borderRadius: 20,
            padding: '36px 40px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 8 }}>
                Unsure which drone course fits your background?
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.925rem', maxWidth: 600 }}>
                Speak with our Chief Flight Counselor for free guidance on syllabus match, DGCA remote pilot requirements, and commercial career paths.
              </p>
            </div>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 10,
                background: 'white',
                color: '#0a1628',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              }}
            >
              <span>Schedule Free Counseling</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
