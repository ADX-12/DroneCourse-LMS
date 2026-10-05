'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, ChevronUp, Play, BookOpen, Clock, 
  HelpCircle, FileText, CheckCircle2, Search, ArrowRight, Download, Eye
} from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import { curriculum, courses } from '@/lib/mockData';

export default function CurriculumPage() {
  const [selectedCourseId, setSelectedCourseId] = useState('course-module-1');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'ch1-1': true,
    'ch1-2': true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const activeModule = curriculum.find(m => m.courseId === selectedCourseId);
  const activeCourse = courses.find(c => c.id === selectedCourseId);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const expandAll = () => {
    if (!activeModule) return;
    const allOpen: Record<string, boolean> = {};
    activeModule.chapters.forEach(ch => { allOpen[ch.id] = true; });
    setExpandedChapters(allOpen);
  };

  const collapseAll = () => {
    setExpandedChapters({});
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <PublicNav />

      <main style={{ flex: 1, paddingTop: 100 }}>
        {/* Header */}
        <section style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
          padding: '60px 20px 40px',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#eff6ff',
              color: '#1d6ae5',
              padding: '4px 14px',
              borderRadius: 99,
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: 14,
              border: '1px solid #dbeafe',
            }}>
              <BookOpen size={14} />
              <span>Full Flight Syllabus Breakdown</span>
            </span>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.4rem', color: '#0a1628', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Comprehensive Training Curriculum
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
              Explore every chapter, lesson, lab session, and practical assessment included in our professional drone pilot certification programs.
            </p>
          </div>
        </section>

        {/* Content Explorer */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 20px 80px' }}>
          {/* Module Selector Switch */}
          <div style={{
            display: 'flex',
            background: '#e2e8f0',
            borderRadius: 12,
            padding: 4,
            marginBottom: 32,
            maxWidth: 600,
            margin: '0 auto 32px',
          }}>
            {courses.map(c => {
              const isSelected = selectedCourseId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 9,
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    background: isSelected ? 'white' : 'transparent',
                    color: isSelected ? '#1d6ae5' : '#64748b',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {c.shortTitle} ({c.level})
                </button>
              );
            })}
          </div>

          {/* Module Header Card */}
          {activeCourse && (
            <div style={{
              background: 'white',
              borderRadius: 18,
              border: '1px solid #e2e8f0',
              padding: '28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1d6ae5', background: '#eff6ff', padding: '3px 10px', borderRadius: 99 }}>
                    {activeCourse.shortTitle}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>• {activeCourse.duration}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>• {activeCourse.totalLessons} Total Lessons</span>
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0a1628', margin: 0 }}>
                  {activeCourse.title}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Link
                  href={`/checkout?courseId=${activeCourse.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 22px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(29,106,229,0.3)',
                  }}
                >
                  <span>Enroll for ₹{activeCourse.price.toLocaleString('en-IN')}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}

          {/* Controls Bar: Search & Expand/Collapse */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ minWidth: 280, position: 'relative' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                placeholder="Filter syllabus by keywords (e.g. ArduPilot, LiPo, ESC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 42, background: 'white' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={expandAll}
                style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #cbd5e1', background: 'white', color: '#475569', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #cbd5e1', background: 'white', color: '#475569', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Chapter Accordions */}
          {activeModule && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {activeModule.chapters.map(chapter => {
                const isOpen = !!expandedChapters[chapter.id];
                const filteredLessons = chapter.lessons.filter(l => 
                  !searchQuery.trim() || 
                  l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  (l.description && l.description.toLowerCase().includes(searchQuery.toLowerCase()))
                );

                if (searchQuery.trim() && filteredLessons.length === 0) return null;

                return (
                  <div
                    key={chapter.id}
                    style={{
                      background: 'white',
                      borderRadius: 14,
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    }}
                  >
                    {/* Chapter Accordion Header */}
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: isOpen ? '#f8fafc' : 'white',
                        border: 'none',
                        borderBottom: isOpen ? '1px solid #e2e8f0' : 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                          {chapter.order}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
                            {chapter.title}
                          </h3>
                          {chapter.description && (
                            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '3px 0 0' }}>
                              {chapter.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                          {chapter.lessons.length} lessons
                        </span>
                        {isOpen ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                      </div>
                    </button>

                    {/* Lessons list inside chapter */}
                    {isOpen && (
                      <div style={{ padding: '8px 24px 16px' }}>
                        {filteredLessons.map(lesson => (
                          <div
                            key={lesson.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 0',
                              borderBottom: '1px solid #f1f5f9',
                              gap: 16,
                              flexWrap: 'wrap',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 260, flex: 1 }}>
                              <div style={{ color: lesson.hasVideo ? '#1d6ae5' : '#64748b' }}>
                                {lesson.hasVideo ? <Play size={16} fill="#eff6ff" /> : <FileText size={16} />}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a1628' }}>
                                  {lesson.title}
                                </div>
                                {lesson.description && (
                                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>
                                    {lesson.description}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                              {lesson.isFreePreview && (
                                <span style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  color: '#16a34a',
                                  background: '#dcfce7',
                                  padding: '2px 8px',
                                  borderRadius: 4,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 4,
                                }}>
                                  <Eye size={12} />
                                  Free Preview
                                </span>
                              )}

                              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: '#94a3b8' }}>
                                <Clock size={13} />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
