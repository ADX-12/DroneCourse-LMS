'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { getUserEnrollments, getStudentStats } from '@/lib/dataHelpers';
import { courses } from '@/lib/mockData';
import { User, Mail, Phone, Shield, Award, CheckCircle, Calendar, Compass, Clock, BookOpen, Edit2, Save } from 'lucide-react';

export default function StudentProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState('Aspiring commercial drone pilot focusing on aerial mapping, photogrammetry, and precision agriculture surveying.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) return null;

  const enrollments = getUserEnrollments(user.id);
  const stats = getStudentStats(user.id);

  const badges = [
    { title: 'Aeronautics Basics', icon: '✈️', date: 'March 2024', desc: 'Completed basic principles of aerodynamics' },
    { title: 'DGCA Regulations', icon: '📜', date: 'March 2024', desc: 'Passed Indian drone airspace regulations quiz' },
    { title: 'Avionics & ESC Pro', icon: '⚡', date: 'April 2024', desc: 'Assembled and analyzed brushless powertrain' },
    { title: 'Waypoint Navigator', icon: '🎯', date: 'May 2024', desc: 'Configured automated grid survey mission' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone });
    setEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>
          Pilot Cadet Profile
        </h1>
        <p style={{ color: '#64748b' }}>
          Manage your student credentials, aviation achievements, and pilot licensing details.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          padding: '12px 18px',
          background: '#dcfce7',
          color: '#166534',
          borderRadius: 10,
          marginBottom: 20,
          fontWeight: 600,
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <CheckCircle size={16} />
          Profile updated successfully!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 24, alignItems: 'start' }}>
        {/* Left Column: ID Card & Quick Bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Pilot Badge Card */}
          <div style={{
            background: 'white',
            borderRadius: 18,
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            textAlign: 'center',
          }}>
            <div style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '4px solid #eff6ff',
              boxShadow: '0 4px 14px rgba(29,106,229,0.3)',
            }}>
              {user.name.charAt(0)}
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>
              {user.name}
            </h2>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#eff6ff',
              color: '#1d6ae5',
              padding: '3px 12px',
              borderRadius: 99,
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: 16,
            }}>
              <Shield size={12} />
              <span>Certified Cadet • Batch 2024</span>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: 20 }}>
              {bio}
            </p>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Pilot ID:</span>
                <span style={{ fontWeight: 700, color: '#0a1628', fontFamily: 'monospace' }}>UAV-{user.id.slice(-6).toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>DigitalSky Reg:</span>
                <span style={{ fontWeight: 600, color: '#16a34a' }}>Verified Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Enrolled Programs:</span>
                <span style={{ fontWeight: 700, color: '#0a1628' }}>{enrollments.length} Courses</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Member Since:</span>
                <span style={{ fontWeight: 600, color: '#0a1628' }}>April 2024</span>
              </div>
            </div>
          </div>

          {/* Flight Hours Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0a1628, #1a2d54)',
            borderRadius: 18,
            padding: '22px',
            color: 'white',
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Compass size={16} color="#60a5fa" />
              <span>Flight Sim & Field Stats</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: 2 }}>Simulator Time</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa' }}>18.5 hrs</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: 2 }}>Lessons Watched</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{stats.totalLessonsCompleted}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: 2 }}>Airspace Pass</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24' }}>100%</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: 2 }}>Certificates</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a78bfa' }}>{stats.certificatesEarned}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Details & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Personal Information */}
          <div style={{
            background: 'white',
            borderRadius: 18,
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
                Pilot Account Information
              </h3>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    background: 'white',
                    color: '#1d6ae5',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Edit2 size={13} />
                  <span>Edit Details</span>
                </button>
              ) : (
                <button
                  onClick={() => setEditing(false)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSave}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>Full Name</label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>Phone Number</label>
                    <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>Pilot Bio & Interests</label>
                  <textarea rows={3} className="form-input" value={bio} onChange={(e) => setBio(e.target.value)} style={{ resize: 'vertical' }} />
                </div>

                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 20px',
                    borderRadius: 8,
                    background: '#1d6ae5',
                    color: 'white',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Save size={14} />
                  Save Changes
                </button>
              </form>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 4 }}>Full Name</div>
                  <div style={{ fontWeight: 700, color: '#0a1628' }}>{user.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 4 }}>Email Address</div>
                  <div style={{ fontWeight: 600, color: '#0a1628' }}>{user.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 4 }}>Phone Contact</div>
                  <div style={{ fontWeight: 600, color: '#0a1628' }}>{user.phone || '+91 98765 43210'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 4 }}>Account Role</div>
                  <div style={{ fontWeight: 600, color: '#1d6ae5', textTransform: 'capitalize' }}>{user.role}</div>
                </div>
              </div>
            )}
          </div>

          {/* Aviation Badges & Honors */}
          <div style={{
            background: 'white',
            borderRadius: 18,
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a1628', marginBottom: 16 }}>
              Aviation Milestones & Badges
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #f1f5f9',
                    borderRadius: 12,
                    padding: '14px',
                    background: '#f8fafc',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                  }}
                >
                  <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>{b.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0a1628', margin: '0 0 2px' }}>
                      {b.title}
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '0 0 6px', lineHeight: 1.4 }}>
                      {b.desc}
                    </p>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#1d6ae5' }}>
                      Earned {b.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
