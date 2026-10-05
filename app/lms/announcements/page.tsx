'use client';

import { announcements } from '@/lib/mockData';
import { useAuthStore } from '@/lib/store';
import { getUserEnrollments } from '@/lib/dataHelpers';
import { Bell, Megaphone } from 'lucide-react';

export default function AnnouncementsPage() {
  const { user } = useAuthStore();
  const enrollments = user ? getUserEnrollments(user.id) : [];
  const enrolledCourseIds = enrollments.map(e => e.courseId);

  const myAnnouncements = announcements.filter(ann => {
    if (!ann.isPublished) return false;
    if (ann.targetAudience === 'all') return true;
    if (ann.targetAudience === 'module1' && enrolledCourseIds.includes('course-module-1')) return true;
    if (ann.targetAudience === 'module2' && enrolledCourseIds.includes('course-module-2')) return true;
    return false;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>Announcements</h1>
        <p style={{ color: '#64748b' }}>Latest updates, news, and course announcements.</p>
      </div>

      {myAnnouncements.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          <Megaphone size={48} color="#e2e8f0" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>No Announcements</h3>
          <p style={{ color: '#64748b' }}>Check back later for updates and news.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {myAnnouncements.map((ann, i) => (
            <div key={ann.id} style={{
              background: 'white', borderRadius: 16, border: '1px solid #e2e8f0',
              padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              borderLeft: '4px solid #1d6ae5',
              animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 12 }}>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1rem', color: '#0a1628', lineHeight: 1.4, flex: 1 }}>{ann.title}</h3>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                  <span className="badge badge-blue">
                    {ann.targetAudience === 'all' ? 'All Students' : ann.targetAudience === 'module1' ? 'Module 1' : 'Module 2'}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.75, marginBottom: 14 }}>{ann.content}</p>
              <div style={{ display: 'flex', gap: 12, fontSize: '0.8125rem', color: '#94a3b8' }}>
                <span>📅 {new Date(ann.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                {i === 0 && <span style={{ color: '#ef4444', fontWeight: 600 }}>🔴 New</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
