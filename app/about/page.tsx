'use client';

import Link from 'next/link';
import { Shield, Award, Users, Compass, CheckCircle2, ArrowRight, MapPin, Building2, Target, HeartHandshake } from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';

export default function AboutUsPage() {
  const stats = [
    { value: '2,400+', label: 'Certified Drone Pilots' },
    { value: '98.4%', label: 'DGCA Examination Pass Rate' },
    { value: '12 Acres', label: 'Dedicated Flight Testing Airfield' },
    { value: '45+', label: 'Commercial UAV Industry Partners' },
  ];

  const faculty = [
    {
      name: 'Dr. Ananya Singh',
      role: 'Chief Flight Instructor & Aerodynamics Lead',
      bio: 'Ph.D. in Aerospace Engineering with over 12 years of UAV research experience. Former payload systems consultant for aerospace projects and DGCA master flight instructor.',
      initials: 'AS',
    },
    {
      name: 'Capt. Rajesh Sharma',
      role: 'DGCA Regulatory & Flight Operations Director',
      bio: 'Senior aviation examiner and commercial pilot with 18+ years in civil aviation. Oversees DigitalSky compliance, remote pilot licensing standards, and airfield safety protocols.',
      initials: 'RS',
    },
    {
      name: 'Vikram Mehta',
      role: 'Avionics, ESC & Autonomous Systems Faculty',
      bio: 'Specialist in ArduPilot, PX4 autopilot hardware, MAVLink telemetry, and Pixhawk firmware. Mentored over 1,500 students in custom autonomous quadcopter construction.',
      initials: 'VM',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <PublicNav />

      <main style={{ flex: 1, paddingTop: 100 }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
          padding: '60px 20px 50px',
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
              <span>Pioneering UAV Education in India</span>
            </span>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.5rem', color: '#0a1628', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Building the Future of Unmanned Aerial Systems
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 680, margin: '0 auto' }}>
              Drone Academy is India’s premier Remote Pilot Training Organization (RPTO) dedicated to advancing drone engineering, avionics mastery, and safe airspace operations.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section style={{ maxWidth: 1100, margin: '-30px auto 60px', padding: '0 20px' }}>
          <div style={{
            background: 'white',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            padding: '32px 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}>
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1d6ae5', marginBottom: 4 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Mission & Values */}
        <section style={{ maxWidth: 1100, margin: '0 auto 60px', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Target size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a1628', marginBottom: 10 }}>
                Aviation-Grade Standards
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                We bridge the critical gap between academic theory and practical commercial flight. Every lesson is engineered to align with Directorate General of Civil Aviation (DGCA) regulations and international UAV standards.
              </p>
            </div>

            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Building2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a1628', marginBottom: 10 }}>
                World-Class Flight Facilities
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Our students practice in both high-fidelity digital simulators and our authorized 12-acre outdoor flight test range equipped with RTK base stations, telemetry test stands, and thermal imaging cameras.
              </p>
            </div>

            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a1628', marginBottom: 10 }}>
                Career Placement Ecosystem
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                We actively connect our certified pilots with leading drone manufacturers, defense contractors, mapping enterprises, and agricultural surveying firms across the country.
              </p>
            </div>
          </div>
        </section>

        {/* Flight Faculty */}
        <section style={{ maxWidth: 1100, margin: '0 auto 70px', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
              Learn from Renowned Flight Instructors
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Our faculty members are aerospace veterans, DGCA examiners, and active UAV research scientists.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {faculty.map((f, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 18,
                  border: '1px solid #e2e8f0',
                  padding: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  boxShadow: '0 4px 14px rgba(29,106,229,0.25)',
                }}>
                  {f.initials}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>
                  {f.name}
                </h3>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d6ae5', marginBottom: 14 }}>
                  {f.role}
                </div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  {f.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section style={{ maxWidth: 1100, margin: '0 auto 80px', padding: '0 20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0a1628, #1a2d54)',
            borderRadius: 20,
            padding: '40px',
            color: 'white',
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 12 }}>
              Ready to Earn Your Remote Pilot Wings?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: 560, margin: '0 auto 24px' }}>
              Join thousands of aspiring aviators and UAV engineers trained by the nation's leading drone flight faculty.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/courses" className="btn-primary">
                Browse Training Courses <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="btn-secondary" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                Visit Flight Airfield
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
