'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { findUserByEmail, registerUser } from '@/lib/dataHelpers';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthColors = ['#ef4444', '#f97316', '#f59e0b', '#10b981'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    const existing = findUserByEmail(form.email);
    if (existing) {
      setError('An account with this email already exists. Please sign in.');
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    try {
      const newUser = registerUser({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      login(newUser);
      router.push('/lms');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 480, background: 'white', borderRadius: 24, padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 28 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🚁</div>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, color: '#0a1628', fontSize: '1.0625rem' }}>Drone Academy India</span>
          </Link>

          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>Create Your Account</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 28 }}>
            Already have an account?{' '}
            <Link href="/auth/signin" style={{ color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 14px', marginBottom: 20, animation: 'fadeIn 0.2s ease' }}>
              <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: '0.875rem', color: '#991b1b' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input id="name" type="text" className="form-input" placeholder="Arjun Sharma"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="form-label" htmlFor="email">Email *</label>
                <input id="email" type="email" className="form-input" placeholder="you@example.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="form-label" htmlFor="phone">Mobile Number *</label>
                <input id="phone" type="tel" className="form-input" placeholder="+91 98765 43210"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="password">Password *</label>
              <div style={{ position: 'relative' }}>
                <input id="password" type={showPassword ? 'text' : 'password'} className="form-input" placeholder="Min. 6 characters"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required style={{ paddingRight: 48 }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < strength ? strengthColors[strength - 1] : '#e2e8f0', transition: 'all 0.3s' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: strengthColors[strength - 1] || '#94a3b8', fontWeight: 600 }}>
                    {form.password.length > 0 ? strengthLabels[strength - 1] || 'Too Weak' : ''}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="form-label" htmlFor="confirm">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input id="confirm" type={showConfirm ? 'text' : 'password'} className="form-input" placeholder="Repeat your password"
                  value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required style={{ paddingRight: 48 }} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p style={{ fontSize: '0.8125rem', color: '#ef4444', marginTop: 4 }}>Passwords do not match</p>
              )}
              {form.confirmPassword && form.password === form.confirmPassword && (
                <p style={{ fontSize: '0.8125rem', color: '#10b981', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={13} /> Passwords match
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <input id="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#1d6ae5', cursor: 'pointer', marginTop: 2 }} />
              <label htmlFor="terms" style={{ fontSize: '0.8125rem', color: '#475569', cursor: 'pointer', lineHeight: 1.6 }}>
                I agree to the{' '}
                <Link href="/terms" style={{ color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>Terms & Conditions</Link>
                {' '}and{' '}
                <Link href="/privacy" style={{ color: '#1d6ae5', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', height: 50, fontSize: '1rem', marginTop: 4 }} disabled={loading}>
              {loading ? (
                <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creating Account...</>
              ) : 'Create Account'}
            </button>
          </form>
        </div>
      </div>

      {/* Right Info Panel */}
      <div style={{ width: 440, background: 'linear-gradient(145deg, #0a1628, #1a2d54)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px', position: 'relative', overflow: 'hidden' }} className="signup-right">
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(29,106,229,0.2), transparent)', borderRadius: '50%' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🎓</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.75rem', color: 'white', marginBottom: 16 }}>Start Learning Drone Technology Today</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 32 }}>
            Join students building real-world drone expertise through our structured online curriculum.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '✅', text: 'Lifetime LMS access after enrollment' },
              { icon: '📱', text: 'Learn on desktop, tablet, or mobile' },
              { icon: '🏆', text: 'Industry-recognized digital certificate' },
              { icon: '🔒', text: 'Secure, encrypted data protection' },
              { icon: '💬', text: 'Dedicated student support' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { .signup-right { display: none !important; } }
      `}</style>
    </div>
  );
}
