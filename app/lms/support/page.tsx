'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { MessageSquare, Headphones, CheckCircle, Loader2 } from 'lucide-react';

const categories = [
  { value: 'course_question', label: 'Course Question', icon: '📚' },
  { value: 'technical', label: 'Technical Issue', icon: '⚙️' },
  { value: 'payment', label: 'Payment Issue', icon: '💳' },
  { value: 'certificate', label: 'Certificate Issue', icon: '🏆' },
  { value: 'other', label: 'Other', icon: '💬' },
];

const faqItems = [
  { q: 'How do I reset my progress?', a: 'Contact support with your enrollment details and we will assist you.' },
  { q: 'My video is not loading', a: 'Check your internet connection and try refreshing the page. Clear browser cache if the issue persists.' },
  { q: 'I cannot access a lesson', a: 'Ensure you have an active enrollment. Contact support if the issue continues.' },
  { q: 'How do I download my certificate?', a: 'Go to the Certificates section in your LMS and click "Download Certificate".' },
];

export default function SupportPage() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({ subject: '', category: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>Support</h1>
        </div>
        <div style={{ maxWidth: 520, textAlign: 'center', margin: '40px auto', background: 'white', borderRadius: 20, padding: '40px', border: '1px solid #e2e8f0' }}>
          <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.5rem', color: '#0a1628', marginBottom: 10 }}>Ticket Submitted!</h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>
            Your support ticket has been submitted. Our team will review and respond to you within 24 hours via email.
          </p>
          <button onClick={() => { setSubmitted(false); setForm({ subject: '', category: '', message: '' }); }}
            className="btn-primary">Submit Another Ticket</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>Support Center</h1>
        <p style={{ color: '#64748b' }}>Get help with your courses, technical issues, and more.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        {/* Ticket Form */}
        <div>
          <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageSquare size={18} color="#1d6ae5" /> Submit a Support Ticket
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 24 }}>Describe your issue and our team will get back to you.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label className="form-label">Category *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {categories.map(cat => (
                    <button type="button" key={cat.value}
                      onClick={() => setForm({ ...form, category: cat.value })}
                      style={{
                        padding: '12px 8px', borderRadius: 10, textAlign: 'center',
                        border: `2px solid ${form.category === cat.value ? '#1d6ae5' : '#e2e8f0'}`,
                        background: form.category === cat.value ? '#e8f0fd' : 'white',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}>{cat.icon}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: form.category === cat.value ? '#1d6ae5' : '#64748b' }}>
                        {cat.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="subject">Subject *</label>
                <input id="subject" type="text" className="form-input" placeholder="Brief description of your issue"
                  value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
              </div>

              <div>
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea id="message" className="form-input" placeholder="Describe your issue in detail..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required
                  style={{ minHeight: 140, resize: 'vertical' }} />
              </div>

              <button type="submit" disabled={submitting || !form.category || !form.subject || !form.message}
                className="btn-primary">
                {submitting ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</> : '📤 Submit Ticket'}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ & Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0a1628', marginBottom: 16 }}>Common Questions</h3>
            {faqItems.map((item, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < faqItems.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b', marginBottom: 4 }}>❓ {item.q}</p>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0a1628, #1a2d54)', borderRadius: 16, padding: '20px', color: 'white' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🎧</div>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 8 }}>Need Faster Help?</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 16 }}>
              Email us directly at support@droneacademy.in for urgent queries.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📧', label: 'support@droneacademy.in' },
                { icon: '⏰', label: 'Response within 24 hours' },
                { icon: '📅', label: 'Mon–Sat, 9 AM – 6 PM IST' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: '#cbd5e1' }}>
                  <span>{item.icon}</span> {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
