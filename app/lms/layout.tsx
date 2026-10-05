'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, BookOpen, Play, FileText, HelpCircle, 
  FolderKanban, Library, Award, Bell, Headphones, User,
  Settings, LogOut, Menu, X, ChevronRight, Search
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { notifications as allNotifications } from '@/lib/mockData';

const navItems = [
  { href: '/lms', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { href: '/lms/courses', icon: <BookOpen size={18} />, label: 'My Courses' },
  { href: '/lms/lessons', icon: <Play size={18} />, label: 'My Learning' },
  { href: '/lms/assignments', icon: <FileText size={18} />, label: 'Assignments' },
  { href: '/lms/quiz', icon: <HelpCircle size={18} />, label: 'Quizzes' },
  { href: '/lms/projects', icon: <FolderKanban size={18} />, label: 'Projects' },
  { href: '/lms/resources', icon: <Library size={18} />, label: 'Resources' },
  { href: '/lms/certificates', icon: <Award size={18} />, label: 'Certificates' },
  { href: '/lms/announcements', icon: <Bell size={18} />, label: 'Announcements' },
  { href: '/lms/support', icon: <Headphones size={18} />, label: 'Support' },
];

const bottomItems = [
  { href: '/lms/profile', icon: <User size={18} />, label: 'Profile' },
  { href: '/lms/settings', icon: <Settings size={18} />, label: 'Settings' },
];

interface LMSLayoutProps { children: React.ReactNode; }

export default function LMSLayout({ children }: LMSLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const userNotifications = allNotifications.filter(n => n.userId === user?.id);
  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth/signin');
      return;
    }
    if (user.role === 'admin') router.push('/admin');
    if (user.role === 'instructor') router.push('/instructor');
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || user.role !== 'student') return null;

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}>
          <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🚁</div>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '0.9375rem', color: 'white' }}>Drone Academy</div>
            <div style={{ fontSize: '0.625rem', color: '#475569', letterSpacing: '0.5px' }}>STUDENT LMS</div>
          </div>
        </Link>

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: '0.9375rem', flexShrink: 0,
          }}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name.split(' ')[0]}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Student</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#475569', letterSpacing: '1px', padding: '0 8px', marginBottom: 8, textTransform: 'uppercase' }}>
          Learning
        </div>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link key={item.href} href={item.href}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10, marginBottom: 2,
                textDecoration: 'none',
                color: active ? 'white' : '#94a3b8',
                background: active ? 'rgba(29,106,229,0.25)' : 'transparent',
                fontWeight: active ? 700 : 500,
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = active ? 'white' : '#94a3b8'; }}
            >
              <span style={{ color: active ? '#60a5fa' : 'inherit' }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.label === 'Announcements' && unreadCount > 0 && (
                <span style={{ background: '#ef4444', color: 'white', borderRadius: 99, fontSize: '0.6875rem', fontWeight: 700, padding: '1px 7px', minWidth: 18, textAlign: 'center' }}>
                  {unreadCount}
                </span>
              )}
              {active && <ChevronRight size={14} color="#60a5fa" />}
            </Link>
          );
        })}

        <div style={{ marginTop: 20, marginBottom: 8 }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#475569', letterSpacing: '1px', padding: '0 8px', marginBottom: 8, textTransform: 'uppercase' }}>
            Account
          </div>
          {bottomItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10, marginBottom: 2,
                  textDecoration: 'none',
                  color: active ? 'white' : '#94a3b8',
                  background: active ? 'rgba(29,106,229,0.25)' : 'transparent',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.875rem', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = active ? 'white' : '#94a3b8'; }}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
          <button onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, width: '100%',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', fontWeight: 500, fontSize: '0.875rem',
              transition: 'all 0.2s', textAlign: 'left',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#fca5a5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="lms-layout">
      {/* Sidebar */}
      <aside className="lms-sidebar" style={{ background: '#0a1628' }}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)} />
      )}
      {sidebarOpen && (
        <aside style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 280, background: '#0a1628', zIndex: 50, overflowY: 'auto', animation: 'slideIn 0.3s ease' }}>
          <button onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'white' }}>
            <X size={18} />
          </button>
          <SidebarContent />
        </aside>
      )}

      {/* Main Content */}
      <main className="lms-main">
        {/* Top Bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(248,250,252,0.95)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 24px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mobile menu */}
            <button onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'none', color: '#64748b' }}
              className="mobile-menu-btn"
            >
              <Menu size={20} />
            </button>
            
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem' }}>
              <Link href="/lms" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>LMS</Link>
              <ChevronRight size={14} color="#94a3b8" />
              <span style={{ color: '#1e293b', fontWeight: 600 }}>
                {navItems.find(n => isActive(n.href, n.exact))?.label || 
                 bottomItems.find(n => isActive(n.href))?.label || 'Dashboard'}
              </span>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Notifications */}
            <Link href="/lms/announcements" style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: 8, borderRadius: 10, background: 'white', border: '1px solid #e2e8f0', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', color: 'white', borderRadius: 99, fontSize: '0.625rem', fontWeight: 700, padding: '1px 5px', minWidth: 16, textAlign: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link href="/lms/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 10, background: 'white', border: '1px solid #e2e8f0', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>
                {user.name[0].toUpperCase()}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{user.name.split(' ')[0]}</span>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '28px 24px', minHeight: 'calc(100vh - 62px)', animation: 'fadeIn 0.4s ease' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) { .mobile-menu-btn { display: flex !important; } }
      `}</style>
    </div>
  );
}
