'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  Compass, MessageSquare, Headphones, Shield
} from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: 'Module 1: Drone Fundamentals',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseInterest: 'Module 1: Drone Fundamentals',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 700);
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
              <Compass size={14} />
              <span>Admissions & Flight School Office</span>
            </span>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.4rem', color: '#0a1628', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Get in Touch with our Flight Advisors
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Have questions regarding DGCA pilot licensing, curriculum prerequisites, or scheduling an on-site flight airfield tour? We're here to assist.
            </p>
          </div>
        </section>

        {/* Form & Info Section */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '50px 20px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 36, alignItems: 'start' }}>
            {/* Contact Form Card */}
            <div style={{
              background: 'white',
              borderRadius: 20,
              border: '1px solid #e2e8f0',
              padding: '36px',
              boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
            }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0a1628', marginBottom: 6 }}>
                Send an Academic Inquiry
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 24 }}>
                Fill out the form below and an admissions counselor will reach out within 2 business hours.
              </p>

              {submitted && (
                <div style={{
                  padding: '14px 18px',
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
                  <CheckCircle2 size={18} />
                  <span>Thank you! Your inquiry has been dispatched to our flight admissions team.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Aditi Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="aditi@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Program of Interest
                  </label>
                  <select
                    className="form-input"
                    value={formData.courseInterest}
                    onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                  >
                    <option value="Module 1: Drone Fundamentals">Drone Technology – Module 1 (Beginner to Intermediate)</option>
                    <option value="Module 2: Advanced Drone Technology">Advanced Drone Technology – Module 2 (Commercial Ops)</option>
                    <option value="Both Modules (Full Career Track)">Both Modules (Complete Autonomous Pilot Track)</option>
                    <option value="Corporate / Institution Batch Training">Corporate / College Group Training</option>
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Your Message / Specific Question
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="form-input"
                    placeholder="Tell us about your educational background or any questions about hardware, simulator, or licensing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.925rem',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: '0 4px 14px rgba(29,106,229,0.3)',
                  }}
                >
                  <Send size={15} />
                  <span>{submitting ? 'Transmitting Request...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            </div>

            {/* Airfield & Campus Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Info Card */}
              <div style={{
                background: 'white',
                borderRadius: 20,
                border: '1px solid #e2e8f0',
                padding: '32px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0a1628', marginBottom: 20 }}>
                  Flight Training Center Coordinates
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0a1628' }}>Main Aviation Campus</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 2, lineHeight: 1.5 }}>
                        Drone Academy Flight Center, Aerodrome Tech Park, Sector 48, Gurugram, Haryana 122018, India
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Compass size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0a1628' }}>Outdoor Test Airfield</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 2, lineHeight: 1.5 }}>
                        12-Acre DGCA Approved Green Zone Test Range, Sohna Airfield Strip (Entry by prior appointment)
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0a1628' }}>Admissions Hotline</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 2 }}>
                        +91 98765 43210 / WhatsApp Help Desk
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0a1628' }}>Official Email Correspondence</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 2 }}>
                        admissions@droneacademy.in • support@droneacademy.in
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0a1628' }}>Operating Office Hours</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 2 }}>
                        Monday – Saturday: 9:00 AM – 6:30 PM IST (Sunday Closed)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Airfield Map Box */}
              <div style={{
                background: 'linear-gradient(135deg, #0a1628, #1a2d54)',
                borderRadius: 20,
                padding: '24px',
                color: 'white',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Shield size={16} color="#60a5fa" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd' }}>DGCA RPTO #IN-2024-UAV-441</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 6px' }}>
                  Visitors & Airfield Safety Compliance
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.825rem', lineHeight: 1.5, margin: 0 }}>
                  Active flight range visitors must bring a valid government photo ID and adhere to high-visibility safety vest requirements within flight tarmac perimeters.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
