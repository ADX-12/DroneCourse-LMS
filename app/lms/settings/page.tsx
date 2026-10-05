'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { Settings, Lock, Bell, Eye, CheckCircle2, Shield, Smartphone, HardDrive, Save } from 'lucide-react';

export default function LMSSettingsPage() {
  const { user } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  // Notification states
  const [emailAnnouncements, setEmailAnnouncements] = useState(true);
  const [emailGrades, setEmailGrades] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsFlightAlerts, setSmsFlightAlerts] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Video playback
  const [autoPlay, setAutoPlay] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0');
  const [hdVideo, setHdVideo] = useState(true);

  if (!user) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    if (newPassword.length < 6) {
      setPwError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match.');
      return;
    }

    setPwSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwSuccess(false), 3500);
  };

  const handleSavePreferences = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>
          Platform Settings & Security
        </h1>
        <p style={{ color: '#64748b' }}>
          Customize your learning experience, notification alerts, and account credentials.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800 }}>
        {/* Notifications & Flight Alerts */}
        <div style={{
          background: 'white',
          borderRadius: 18,
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Bell size={18} color="#1d6ae5" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Notification Preferences
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                title: 'DGCA & Academy Announcements',
                desc: 'Receive immediate updates regarding new airspace circulars, schedule changes, and guest webinars.',
                checked: emailAnnouncements,
                onChange: () => setEmailAnnouncements(!emailAnnouncements),
              },
              {
                title: 'Assignment & Project Grading Notices',
                desc: 'Get notified when an instructor posts marks and feedback on your submitted deliverables.',
                checked: emailGrades,
                onChange: () => setEmailGrades(!emailGrades),
              },
              {
                title: 'Quiz & Lesson Weekly Digest',
                desc: 'Keep momentum with smart reminders if you have uncompleted chapters pending.',
                checked: emailReminders,
                onChange: () => setEmailReminders(!emailReminders),
              },
              {
                title: 'SMS Weather & Field Flight Alerts',
                desc: 'Important SMS broadcast if outdoor test flights are delayed due to rain or wind.',
                checked: smsFlightAlerts,
                onChange: () => setSmsFlightAlerts(!smsFlightAlerts),
              },
            ].map((item, idx) => (
              <label
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={item.onChange}
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: '#1d6ae5' }}
                />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0a1628' }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>{item.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8125rem', color: '#16a34a', fontWeight: 600 }}>
              {settingsSaved && '✓ Preferences saved successfully!'}
            </span>
            <button
              onClick={handleSavePreferences}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
                borderRadius: 8,
                background: '#1d6ae5',
                color: 'white',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              <Save size={14} />
              Save Notifications
            </button>
          </div>
        </div>

        {/* Video Player Preferences */}
        <div style={{
          background: 'white',
          borderRadius: 18,
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Eye size={18} color="#1d6ae5" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Flight Classroom Player Settings
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <div style={{ padding: '14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Auto-play next video</div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#64748b', cursor: 'pointer' }}>
                <input type="checkbox" checked={autoPlay} onChange={() => setAutoPlay(!autoPlay)} style={{ accentColor: '#1d6ae5' }} />
                Automatically load next lecture
              </label>
            </div>

            <div style={{ padding: '14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Default Playback Speed</div>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(e.target.value)}
                className="form-input"
                style={{ padding: '6px 10px', fontSize: '0.8125rem' }}
              >
                <option value="1.0">1.0x (Normal speed)</option>
                <option value="1.25">1.25x (Brisk pace)</option>
                <option value="1.5">1.5x (Fast review)</option>
                <option value="1.75">1.75x</option>
              </select>
            </div>

            <div style={{ padding: '14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>High Definition Video</div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#64748b', cursor: 'pointer' }}>
                <input type="checkbox" checked={hdVideo} onChange={() => setHdVideo(!hdVideo)} style={{ accentColor: '#1d6ae5' }} />
                Always stream 1080p (if available)
              </label>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div style={{
          background: 'white',
          borderRadius: 18,
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Lock size={18} color="#1d6ae5" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Update Security Password
            </h2>
          </div>

          {pwSuccess && (
            <div style={{ padding: '10px 14px', background: '#dcfce7', color: '#166534', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem', fontWeight: 600 }}>
              Password updated successfully!
            </div>
          )}

          {pwError && (
            <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#991b1b', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem', fontWeight: 600 }}>
              {pwError}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  New Password
                </label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 20px',
                borderRadius: 8,
                background: '#0a1628',
                color: 'white',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              <Shield size={14} />
              Update Account Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
