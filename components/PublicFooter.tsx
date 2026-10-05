import Link from 'next/link';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0a1628', color: '#cbd5e1' }}>
      {/* Main Footer */}
      <div className="container" style={{ padding: '64px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
          
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>🚁</div>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.125rem', color: 'white' }}>Drone Academy</div>
                <div style={{ fontSize: '0.6875rem', color: '#64748b', letterSpacing: '0.5px' }}>INDIA</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#94a3b8', marginBottom: 20 }}>
              India&apos;s premier drone technology training platform. Building the next generation of UAV professionals.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: 12 }}>
              {['🔗', '📘', '🐦', '📺', '💼'].map((icon, i) => (
                <a key={i} href="#"
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, transition: 'all 0.2s', cursor: 'pointer', textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(29,106,229,0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', marginBottom: 16, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Courses</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Drone Technology – Module 1', href: '/courses/drone-technology-module-1' },
                { label: 'Advanced Drone – Module 2', href: '/courses/advanced-drone-technology-module-2' },
                { label: 'Full Curriculum', href: '/curriculum' },
                { label: 'Course Comparison', href: '/courses#comparison' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', marginBottom: 16, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Student Login', href: '/auth/signin' },
                { label: 'My LMS Dashboard', href: '/lms' },
                { label: 'Certificate Verification', href: '/verify-certificate' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Support', href: '/lms/support' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', marginBottom: 16, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Refund Policy', href: '/refund' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            © {currentYear} Drone Academy India. All rights reserved.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Made with ❤️ in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
