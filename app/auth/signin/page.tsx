'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { authenticateUser } from '@/lib/dataHelpers';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 600)); // simulate network

    const user = authenticateUser(form.email, form.password);
    if (!user) {
      setError('Invalid email or password. Try: student@droneacademy.in / student123');
      setLoading(false);
      return;
    }

    login(user);
    
    // Role-based redirect
    if (user.role === 'admin') router.push('/admin');
    else if (user.role === 'instructor') router.push('/instructor');
    else router.push('/lms');
  };

  const quickFill = (type: 'student' | 'instructor' | 'admin') => {
    const creds = {
      student: { email: 'student@droneacademy.in', password: 'student123' },
      instructor: { email: 'instructor@droneacademy.in', password: 'instructor123' },
      admin: { email: 'admin@droneacademy.in', password: 'admin123' },
    };
    setForm(creds[type]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'white' }}>
      {/* Left Panel */}
      <div style={{
        background: 'linear-gradient(145deg, #0a1628, #1a2d54)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '40px', position: 'relative', overflow: 'hidden',
      }} className="signin-left">
        {/* Background decoration */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(29,106,229,0.2), transparent)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -100, left: -100, width: 350, height: 350, background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)', borderRadius: '50%' }} />
        </div>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', position: 'relative' }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚁</div>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.125rem', color: 'white' }}>Drone Academy</div>
            <div style={{ fontSize: '0.6875rem', color: '#64748b', letterSpacing: '0.5px' }}>INDIA</div>
          </div>
        </Link>

        {/* Center Content */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '4rem', marginBottom: 24 }}>🚁</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2rem', color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Welcome Back to<br />Your Learning Journey
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: 40 }}>
            Access your personalized LMS dashboard, continue lessons, track progress, and earn your certificate.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '📚', text: 'Access all enrolled course lessons' },
              { icon: '📊', text: 'Track your learning progress' },
              { icon: '🏆', text: 'Download your certificates' },
              { icon: '📝', text: 'Submit assignments and quizzes' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.8125rem', position: 'relative' }}>
          © 2024 Drone Academy India. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Sign In Form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 60px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.875rem', color: '#0a1628', marginBottom: 8 }}>Sign In</h1>
            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>
              New to Drone Academy?{' '}
              <Link href="/auth/signup" style={{ color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>Create account</Link>
            </p>
          </div>

          {/* Quick Fill Demo Buttons */}
          <div style={{ background: '#f0f7ff', borderRadius: 12, padding: 14, marginBottom: 24, border: '1px solid #dbeafe' }}>
            <p style={{ fontSize: '0.8125rem', color: '#1d6ae5', fontWeight: 700, marginBottom: 10 }}>🔑 Demo Accounts (click to fill):</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['student', 'instructor', 'admin'] as const).map(role => (
                <button key={role} onClick={() => quickFill(role)}
                  style={{ padding: '5px 14px', borderRadius: 99, border: '1px solid #93c5fd', background: 'white', color: '#1d6ae5', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#dbeafe'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 14px', animation: 'fadeIn 0.2s ease' }}>
                <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: '0.875rem', color: '#991b1b', lineHeight: 1.5 }}>{error}</p>
              </div>
            )}

            <div>
              <label className="form-label" htmlFor="email">Email Address</label>
              <input id="email" type="email" className="form-input" placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
                <Link href="/auth/forgot-password" style={{ fontSize: '0.8125rem', color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>Forgot Password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input id="password" type={showPassword ? 'text' : 'password'} className="form-input" placeholder="Enter your password"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
                  style={{ paddingRight: 48 }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input id="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#1d6ae5', cursor: 'pointer' }} />
              <label htmlFor="remember" style={{ fontSize: '0.875rem', color: '#475569', cursor: 'pointer' }}>Remember me</label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', height: 50, fontSize: '1rem' }} disabled={loading}>
              {loading ? (
                <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</>
              ) : 'Sign In to LMS'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: '#94a3b8' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" style={{ color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>Sign up free</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .signin-left { display: none !important; } }
      `}</style>
    </div>
  );
}
