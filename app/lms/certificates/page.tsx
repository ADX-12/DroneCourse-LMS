'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, Download, Share2, CheckCircle, ExternalLink, QrCode } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { certificates, courses } from '@/lib/mockData';
import { getUserEnrollments, getCourseProgress } from '@/lib/dataHelpers';

export default function CertificatesPage() {
  const { user } = useAuthStore();
  const [userCerts, setUserCerts] = useState<typeof certificates>([]);
  const [enrolledProgress, setEnrolledProgress] = useState<Array<{ course: any; progress: any; enrolled: boolean }>>([]);
  const [viewingCert, setViewingCert] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const myCerts = certificates.filter(c => c.userId === user.id);
    setUserCerts(myCerts);
    
    const enrollments = getUserEnrollments(user.id);
    const data = courses.map(course => ({
      course,
      progress: getCourseProgress(user.id, course.id),
      enrolled: enrollments.some(e => e.courseId === course.id),
    }));
    setEnrolledProgress(data);
  }, [user]);

  const viewingCertData = viewingCert ? userCerts.find(c => c.id === viewingCert) : null;
  const viewingCourse = viewingCertData ? courses.find(c => c.id === viewingCertData.courseId) : null;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>Certificates</h1>
        <p style={{ color: '#64748b' }}>Your earned certificates and progress toward unlocking new ones.</p>
      </div>

      {/* Earned Certificates */}
      {userCerts.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={18} color="#f59e0b" /> Earned Certificates ({userCerts.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {userCerts.map((cert) => {
              const course = courses.find(c => c.id === cert.courseId);
              return (
                <div key={cert.id} style={{
                  background: 'linear-gradient(145deg, #0a1628, #1a2d54)',
                  borderRadius: 20, padding: '28px', position: 'relative', overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(10,22,40,0.25)',
                }}>
                  {/* Decorative elements */}
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, background: 'radial-gradient(circle, rgba(29,106,229,0.2), transparent)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent)', borderRadius: '50%' }} />
                  
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div style={{ fontSize: 40 }}>🏆</div>
                      <span style={{ background: '#f59e0b', color: '#0a1628', borderRadius: 99, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 800 }}>CERTIFIED</span>
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Certificate of Completion</p>
                      <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.0625rem', color: 'white', lineHeight: 1.3 }}>{cert.courseName}</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                      {[
                        { label: 'Student', value: cert.studentName },
                        { label: 'Issued', value: new Date(cert.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                        { label: 'Certificate ID', value: cert.certificateNumber },
                        { label: 'Instructor', value: cert.instructorName },
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.label}</span>
                          <span style={{ fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setViewingCert(viewingCert === cert.id ? null : cert.id)}
                        style={{ flex: 1, padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                        👁 View
                      </button>
                      <button style={{ flex: 1, padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', border: 'none', color: 'white', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <Download size={14} /> Download
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {viewingCertData && viewingCourse && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={() => setViewingCert(null)}>
          <div style={{ background: 'white', borderRadius: 24, overflow: 'hidden', maxWidth: 720, width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', animation: 'fadeIn 0.3s ease' }}
            onClick={(e) => e.stopPropagation()}>
            {/* Certificate Design */}
            <div style={{ background: 'linear-gradient(145deg, #0a1628, #132040)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
              {/* Border frame */}
              <div style={{ position: 'absolute', inset: 12, border: '2px solid rgba(245,158,11,0.3)', borderRadius: 16, pointerEvents: 'none' }} />
              
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: 48, marginBottom: 10, filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.5))' }}>🏆</div>
                <p style={{ color: '#f59e0b', fontWeight: 700, letterSpacing: '3px', fontSize: '0.75rem', marginBottom: 8, textTransform: 'uppercase' }}>Certificate of Completion</p>
                <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 900, fontSize: '2rem', color: 'white', marginBottom: 4 }}>Drone Academy India</h2>
                <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)', margin: '16px 0' }} />
                
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: 8 }}>This is to certify that</p>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 900, fontSize: '1.875rem', color: '#f59e0b', marginBottom: 8 }}>{viewingCertData.studentName}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: 8 }}>has successfully completed</p>
                <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.25rem', color: 'white', marginBottom: 16 }}>{viewingCertData.courseName}</h4>
                
                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '16px 0' }} />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Date Issued</p>
                    <p style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 600 }}>{new Date(viewingCertData.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Certificate ID</p>
                    <p style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 600, fontFamily: 'monospace' }}>{viewingCertData.certificateNumber}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Instructor</p>
                    <p style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 600 }}>{viewingCertData.instructorName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '20px 28px', display: 'flex', gap: 12 }}>
              <button onClick={() => setViewingCert(null)} className="btn-ghost" style={{ flex: 1 }}>Close</button>
              <button className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Share2 size={15} /> Share
              </button>
              <button className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Download size={15} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress toward next certificate */}
      <div>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 16 }}>
          🎯 Certificate Progress
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {enrolledProgress.filter(d => d.enrolled).map(({ course, progress }) => {
            const hasCert = userCerts.some(c => c.courseId === course.id);
            return (
              <div key={course.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0a1628' }}>{course.shortTitle}</h3>
                  {hasCert ? (
                    <span className="badge badge-green"><CheckCircle size={12} /> Earned</span>
                  ) : (
                    <span className="badge badge-gray">{progress.percentage}%</span>
                  )}
                </div>
                <div className="progress-bar" style={{ marginBottom: 10 }}>
                  <div className="progress-fill" style={{ width: `${progress.percentage}%` }} />
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {hasCert ? '✓ Certificate issued' : `${progress.completedLessons}/${progress.totalLessons} lessons completed`}
                </p>
                {!hasCert && progress.percentage < 100 && (
                  <Link href={`/lms/courses/${course.id}`} style={{ display: 'block', marginTop: 10, fontSize: '0.8125rem', color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>
                    Continue learning →
                  </Link>
                )}
              </div>
            );
          })}

          {enrolledProgress.filter(d => d.enrolled).length === 0 && (
            <div style={{ background: 'white', borderRadius: 16, border: '2px dashed #e2e8f0', padding: '30px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🏆</div>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enroll in a course to start earning certificates.</p>
              <Link href="/courses" className="btn-primary" style={{ display: 'inline-flex', marginTop: 12 }}>Explore Courses</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
