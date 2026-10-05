'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Drone Course', href: '/courses' },
  { label: 'Curriculum', href: '/curriculum' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function PublicNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/auth/signin';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'instructor') return '/instructor';
    return '/lms';
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(255,255,255,0.97)' : 'white',
        borderBottom: isScrolled ? '1px solid #e2e8f0' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 68 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
            boxShadow: '0 4px 12px rgba(29,106,229,0.3)',
          }}>
            🚁
          </div>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.0625rem', color: '#0a1628', lineHeight: 1.2 }}>
              Drone Academy
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.5px' }}>INDIA</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 40, flex: 1 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: '0.875rem',
                fontWeight: 500,
                color: pathname === link.href ? '#1d6ae5' : '#475569',
                textDecoration: 'none',
                transition: 'all 0.2s',
                background: pathname === link.href ? '#e8f0fd' : 'transparent',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href) {
                  (e.target as HTMLElement).style.background = '#f0f7ff';
                  (e.target as HTMLElement).style.color = '#1d6ae5';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href) {
                  (e.target as HTMLElement).style.background = 'transparent';
                  (e.target as HTMLElement).style.color = '#475569';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto', flexShrink: 0 }} className="desktop-nav">
          {isAuthenticated && user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 14px', borderRadius: 10,
                  border: '1.5px solid #e2e8f0', background: 'white',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '0.8125rem',
                }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown size={14} color="#64748b" style={{ transition: 'transform 0.2s', transform: userDropdown ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              {userDropdown && (
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  minWidth: 200, zIndex: 200, overflow: 'hidden',
                  animation: 'fadeIn 0.2s ease',
                }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>{user.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{user.email}</div>
                    <span className="badge badge-blue" style={{ marginTop: 6 }}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                  <div style={{ padding: 8 }}>
                    <Link href={getDashboardLink()} onClick={() => setUserDropdown(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f7ff')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link href="/lms/profile" onClick={() => setUserDropdown(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 500 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f7ff')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <User size={16} /> My Profile
                    </Link>
                    <button onClick={handleLogout}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, color: '#ef4444', fontSize: '0.9rem', fontWeight: 500, background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#fef2f2')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="btn-ghost btn-sm">Sign In</Link>
          )}
          <Link href="/courses#enroll" className="btn-primary btn-sm">Enroll Now</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'none' }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? <X size={22} color="#0a1628" /> : <Menu size={22} color="#0a1628" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div style={{
          background: 'white', borderTop: '1px solid #e2e8f0',
          padding: 16, display: 'flex', flexDirection: 'column', gap: 4,
          animation: 'fadeIn 0.2s ease',
        }} className="mobile-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '11px 16px', borderRadius: 10, fontSize: '0.9375rem', fontWeight: 500,
                color: pathname === link.href ? '#1d6ae5' : '#475569',
                background: pathname === link.href ? '#e8f0fd' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
            {isAuthenticated ? (
              <Link href={getDashboardLink()} className="btn-primary" style={{ flex: 1, textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/signin" className="btn-secondary" style={{ flex: 1, textAlign: 'center' }} onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link href="/courses#enroll" className="btn-primary" style={{ flex: 1, textAlign: 'center' }} onClick={() => setMobileOpen(false)}>Enroll Now</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
