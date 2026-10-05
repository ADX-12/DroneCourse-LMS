'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { assignments, assignmentSubmissions } from '@/lib/mockData';
import { getUserEnrollments } from '@/lib/dataHelpers';
import { Upload, Clock, CheckCircle, AlertCircle, FileText, ChevronRight } from 'lucide-react';

const statusConfig = {
  not_started: { label: 'Not Started', color: '#94a3b8', bg: '#f1f5f9', icon: '⭕' },
  submitted: { label: 'Submitted', color: '#3b82f6', bg: '#eff6ff', icon: '📤' },
  under_review: { label: 'Under Review', color: '#f59e0b', bg: '#fffbeb', icon: '🔍' },
  graded: { label: 'Graded', color: '#10b981', bg: '#f0fdf4', icon: '✅' },
};

export default function AssignmentsPage() {
  const { user } = useAuthStore();
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [submission, setSubmission] = useState({ text: '', file: null as File | null });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());

  const enrollments = user ? getUserEnrollments(user.id) : [];
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const myAssignments = assignments.filter(a => enrolledCourseIds.includes(a.courseId));
  const mySubmissions = assignmentSubmissions.filter(s => s.userId === user?.id);

  const getSubmission = (assignmentId: string) => mySubmissions.find(s => s.assignmentId === assignmentId);
  const getStatus = (assignmentId: string): keyof typeof statusConfig => {
    if (submitted.has(assignmentId)) return 'submitted';
    const sub = getSubmission(assignmentId);
    if (!sub) return 'not_started';
    return sub.status as keyof typeof statusConfig;
  };

  const handleSubmit = async (assignmentId: string) => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(prev => new Set([...prev, assignmentId]));
    setSelectedAssignment(null);
    setSubmission({ text: '', file: null });
    setSubmitting(false);
  };

  const selected = myAssignments.find(a => a.id === selectedAssignment);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>Assignments</h1>
        <p style={{ color: '#64748b' }}>Submit your course assignments and track your grades.</p>
      </div>

      {myAssignments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 16, border: '2px dashed #e2e8f0' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
          <h3 style={{ fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>No Assignments Yet</h3>
          <p style={{ color: '#64748b' }}>Enroll in a course to access assignments.</p>
          <Link href="/courses" className="btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>Browse Courses</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selectedAssignment ? '1fr 1fr' : '1fr', gap: 20 }}>
          {/* Assignment List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {myAssignments.map((asgn) => {
              const status = getStatus(asgn.id);
              const config = statusConfig[status];
              const sub = getSubmission(asgn.id);
              const isSelected = selectedAssignment === asgn.id;

              return (
                <div key={asgn.id}
                  style={{ background: 'white', borderRadius: 16, border: `2px solid ${isSelected ? '#1d6ae5' : '#e2e8f0'}`, padding: '20px', transition: 'all 0.2s', cursor: 'pointer', boxShadow: isSelected ? '0 4px 20px rgba(29,106,229,0.1)' : '0 2px 8px rgba(0,0,0,0.04)' }}
                  onClick={() => setSelectedAssignment(isSelected ? null : asgn.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0a1628', flex: 1, paddingRight: 12, lineHeight: 1.4 }}>{asgn.title}</h3>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: config.bg, color: config.color, borderRadius: 99, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                      {config.icon} {config.label}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6, marginBottom: 12 }}>
                    {asgn.instructions.slice(0, 120)}...
                  </p>

                  <div style={{ display: 'flex', gap: 16, fontSize: '0.8125rem', color: '#94a3b8', flexWrap: 'wrap' }}>
                    {asgn.deadline && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={13} /> Due: {new Date(asgn.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    <span>⭐ Max: {asgn.maxMarks} marks</span>
                  </div>

                  {sub?.marks !== undefined && (
                    <div style={{ marginTop: 12, background: '#f0fdf4', borderRadius: 10, padding: '10px 14px', border: '1px solid #a7f3d0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#065f46' }}>Score: {sub.marks}/{asgn.maxMarks}</span>
                        <span style={{ fontSize: '0.875rem', color: '#065f46' }}>{Math.round((sub.marks / asgn.maxMarks) * 100)}%</span>
                      </div>
                      {sub.feedback && (
                        <p style={{ fontSize: '0.8125rem', color: '#047857', marginTop: 4, lineHeight: 1.5 }}>
                          💬 {sub.feedback}
                        </p>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <span style={{ fontSize: '0.8125rem', color: '#1d6ae5', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {status === 'not_started' ? 'Submit Now' : 'View Details'} <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submission Panel */}
          {selectedAssignment && selected && (
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px', animation: 'fadeIn 0.3s ease', height: 'fit-content', position: 'sticky', top: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 6 }}>{selected.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginBottom: 16 }}>Max marks: {selected.maxMarks}</p>
              
              <div style={{ background: '#f8fafc', borderRadius: 10, padding: '14px 16px', marginBottom: 20, border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>📋 Instructions</p>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.7 }}>{selected.instructions}</p>
              </div>

              {getStatus(selectedAssignment) !== 'not_started' && getStatus(selectedAssignment) !== 'submitted' ? (
                <div style={{ textAlign: 'center', padding: '20px', background: '#f0fdf4', borderRadius: 12, border: '1px solid #a7f3d0' }}>
                  <CheckCircle size={36} color="#10b981" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 700, color: '#065f46' }}>Already Submitted</p>
                  <p style={{ fontSize: '0.8125rem', color: '#047857' }}>Your submission is {getStatus(selectedAssignment).replace('_', ' ')}</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <label className="form-label">Text Response</label>
                    <textarea
                      value={submission.text}
                      onChange={(e) => setSubmission({ ...submission, text: e.target.value })}
                      placeholder="Write your response here..."
                      style={{ width: '100%', minHeight: 100, padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.875rem', fontFamily: 'Inter', resize: 'vertical', outline: 'none' }}
                      onFocus={(e) => e.target.style.borderColor = '#1d6ae5'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label className="form-label">Upload File (PDF, DOC, DOCX)</label>
                    <div style={{ border: '2px dashed #e2e8f0', borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1d6ae5'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload size={24} color="#94a3b8" style={{ margin: '0 auto 8px' }} />
                      <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        {submission.file ? submission.file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>PDF, DOC, DOCX up to 10MB</p>
                      <input id="file-upload" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                        onChange={(e) => setSubmission({ ...submission, file: e.target.files?.[0] || null })} />
                    </div>
                  </div>

                  <button onClick={() => handleSubmit(selectedAssignment)} disabled={submitting || (!submission.text && !submission.file)}
                    className="btn-primary" style={{ width: '100%' }}>
                    {submitting ? '⏳ Submitting...' : '📤 Submit Assignment'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
