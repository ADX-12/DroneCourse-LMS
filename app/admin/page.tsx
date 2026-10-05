'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, DollarSign, TrendingUp, Tag, Plus, CheckCircle, 
  Search, Shield, Bell, ArrowUpRight, BarChart3, LogOut, Lock
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { users, courses, orders, coupons as initialCoupons, enrollments, announcements as initialAnnouncements } from '@/lib/mockData';
import { getStudentStats } from '@/lib/dataHelpers';

export default function AdminDashboardPage() {
  const { user, login, logout } = useAuthStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'students' | 'orders' | 'coupons' | 'announcements'>('students');
  const [studentSearch, setStudentSearch] = useState('');
  const [couponsList, setCouponsList] = useState(initialCoupons);
  const [announcementsList, setAnnouncementsList] = useState(initialAnnouncements);

  // New Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('20');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [couponCreatedMsg, setCouponCreatedMsg] = useState(false);

  // New Announcement form
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnAudience, setNewAnnAudience] = useState<'all' | 'module1' | 'module2'>('all');
  const [annCreatedMsg, setAnnCreatedMsg] = useState(false);

  // Handle if not logged in as admin - provide quick switch
  const isAdmin = user && user.role === 'admin';

  const handleAdminQuickLogin = () => {
    const adminUser = users.find(u => u.role === 'admin');
    if (adminUser) login(adminUser);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newC = {
      id: `coupon-${Date.now()}`,
      code: newCouponCode.toUpperCase().trim(),
      discountType: newCouponType,
      discountValue: parseInt(newCouponDiscount) || 10,
      maxUses: 100,
      usedCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setCouponsList([newC, ...couponsList]);
    setNewCouponCode('');
    setCouponCreatedMsg(true);
    setTimeout(() => setCouponCreatedMsg(false), 3000);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    const newA = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      content: newAnnContent,
      authorId: user?.id || 'admin',
      targetAudience: newAnnAudience,
      isPublished: true,
      createdAt: new Date().toISOString(),
    };

    setAnnouncementsList([newA, ...announcementsList]);
    setNewAnnTitle('');
    setNewAnnContent('');
    setAnnCreatedMsg(true);
    setTimeout(() => setAnnCreatedMsg(false), 3000);
  };

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: 20 }}>
        <div style={{
          background: 'white',
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          padding: '40px',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0a1628', marginBottom: 8 }}>
            Administrator Access Required
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.5 }}>
            You must be signed in with an administrative drone academy account to access system governance, student enrollments, and sales financials.
          </p>

          <button
            onClick={handleAdminQuickLogin}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(29,106,229,0.3)',
              marginBottom: 12,
            }}
          >
            Sign In as Admin (Rajesh Sharma)
          </button>

          <Link href="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Return to Public Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = orders.filter(o => o.status === 'paid').reduce((acc, o) => acc + o.finalAmount, 0);
  const students = users.filter(u => u.role === 'student');
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
    s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Admin Top Header */}
      <header style={{
        background: '#0a1628',
        color: 'white',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'white' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              Drone Academy <span style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: 600, background: 'rgba(59,130,246,0.2)', padding: '2px 8px', borderRadius: 4, marginLeft: 4 }}>ADMIN</span>
            </span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Logged in as <strong style={{ color: 'white' }}>{user.name}</strong>
          </div>
          <Link href="/lms" style={{ fontSize: '0.8rem', color: '#93c5fd', textDecoration: 'none', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: 6 }}>
            View Student LMS
          </Link>
          <button
            onClick={() => { logout(); router.push('/'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '32px 20px' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Total Paid Enrollments</span>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0a1628' }}>{enrollments.length}</div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: 4 }}>+18% from last month</div>
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Gross Academy Revenue</span>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0a1628' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: 4 }}>100% collected via Razorpay</div>
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Active Flight Cadets</span>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0a1628' }}>{students.length} Pilots</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>Registered student accounts</div>
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Promo Coupons Active</span>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tag size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0a1628' }}>{couponsList.filter(c => c.isActive).length} Coupons</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>e.g. EARLYBIRD, DRONEPILOT</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #e2e8f0', marginBottom: 24 }}>
          {[
            { id: 'students', label: 'Student Cadets Roster' },
            { id: 'orders', label: 'Payment Orders & Invoices' },
            { id: 'coupons', label: 'Discount Coupons' },
            { id: 'announcements', label: 'Broadcast Announcements' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 18px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: activeTab === tab.id ? '#1d6ae5' : '#64748b',
                borderBottom: `2px solid ${activeTab === tab.id ? '#1d6ae5' : 'transparent'}`,
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Students Roster */}
        {activeTab === 'students' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a1628', margin: 0 }}>
                Enrolled Cadets & Learning Trajectory
              </h2>
              <div style={{ minWidth: 260, position: 'relative' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search students by name or email..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  style={{ paddingLeft: 42, background: '#f8fafc' }}
                />
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '12px 16px' }}>Student Name</th>
                    <th style={{ padding: '12px 16px' }}>Contact Email</th>
                    <th style={{ padding: '12px 16px' }}>Enrolled Courses</th>
                    <th style={{ padding: '12px 16px' }}>Lessons Done</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(st => {
                    const stStats = getStudentStats(st.id);
                    return (
                      <tr key={st.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0a1628' }}>
                          {st.name}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#64748b' }}>
                          {st.email}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ background: '#eff6ff', color: '#1d6ae5', padding: '2px 8px', borderRadius: 4, fontWeight: 600, fontSize: '0.75rem' }}>
                            {stStats.enrolledCourses} Enrolled
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                          {stStats.totalLessonsCompleted} of {stStats.totalLessons || 19}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.72rem' }}>
                            ACTIVE
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Orders */}
        {activeTab === 'orders' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a1628', marginBottom: 20 }}>
              Recent Razorpay Transactions
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '12px 16px' }}>Order ID</th>
                    <th style={{ padding: '12px 16px' }}>Course</th>
                    <th style={{ padding: '12px 16px' }}>Amount</th>
                    <th style={{ padding: '12px 16px' }}>Coupon Used</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const course = courses.find(c => c.id === order.courseId);
                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0a1628', fontFamily: 'monospace' }}>
                          {order.id}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 600 }}>
                          {course?.title || order.courseId}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0a1628' }}>
                          ₹{order.finalAmount.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          {order.couponCode ? (
                            <span style={{ background: '#fdf2f8', color: '#db2777', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.75rem' }}>
                              {order.couponCode}
                            </span>
                          ) : (
                            <span style={{ color: '#94a3b8' }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.72rem' }}>
                            PAID
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#64748b' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Coupons */}
        {activeTab === 'coupons' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) 1fr', gap: 24, alignItems: 'start' }}>
            {/* Create Coupon Form */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0a1628', marginBottom: 6 }}>
                Create New Coupon
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 18 }}>
                Generate promotional codes for students and corporate batches.
              </p>

              {couponCreatedMsg && (
                <div style={{ padding: '8px 12px', background: '#dcfce7', color: '#166534', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, marginBottom: 14 }}>
                  ✓ Coupon code created successfully!
                </div>
              )}

              <form onSubmit={handleCreateCoupon}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Coupon Code (e.g. FLASH30)
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="SUMMER2024"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Discount Type
                  </label>
                  <select
                    className="form-input"
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value as any)}
                  >
                    <option value="percentage">Percentage Off (%)</option>
                    <option value="fixed">Fixed INR Amount (₹)</option>
                  </select>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Discount Value ({newCouponType === 'percentage' ? '%' : '₹'})
                  </label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 8,
                    background: '#1d6ae5',
                    color: 'white',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Publish Coupon Code
                </button>
              </form>
            </div>

            {/* Coupons List */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0a1628', marginBottom: 16 }}>
                Active Promotional Codes
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {couponsList.map(cp => (
                  <div
                    key={cp.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: 10,
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', color: '#1d6ae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Tag size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0a1628', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                          {cp.code}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {cp.discountType === 'percentage' ? `${cp.discountValue}% Off` : `₹${cp.discountValue} Flat Discount`} • Used {cp.usedCount} times
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCouponsList(prev => prev.map(c => c.id === cp.id ? { ...c, isActive: !c.isActive } : c));
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        background: cp.isActive ? '#dcfce7' : '#fee2e2',
                        color: cp.isActive ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {cp.isActive ? 'ACTIVE' : 'DISABLED'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Announcements */}
        {activeTab === 'announcements' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 400px) 1fr', gap: 24, alignItems: 'start' }}>
            {/* Create Announcement Form */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0a1628', marginBottom: 6 }}>
                Broadcast Announcement
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 18 }}>
                Post critical flight circulars or schedule notices directly to cadet dashboards.
              </p>

              {annCreatedMsg && (
                <div style={{ padding: '8px 12px', background: '#dcfce7', color: '#166534', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, marginBottom: 14 }}>
                  ✓ Announcement broadcasted successfully!
                </div>
              )}

              <form onSubmit={handleCreateAnnouncement}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Announcement Headline
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. DGCA Airspace Map Update V2.4"
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Target Audience
                  </label>
                  <select
                    className="form-input"
                    value={newAnnAudience}
                    onChange={(e) => setNewAnnAudience(e.target.value as any)}
                  >
                    <option value="all">All Enrolled Cadets</option>
                    <option value="module1">Module 1 Students Only</option>
                    <option value="module2">Module 2 Students Only</option>
                  </select>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Full Notice Body
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="form-input"
                    placeholder="Write detailed flight advisory or lesson release bulletin..."
                    value={newAnnContent}
                    onChange={(e) => setNewAnnContent(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 8,
                    background: '#0a1628',
                    color: 'white',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Broadcast Bulletin
                </button>
              </form>
            </div>

            {/* Existing Announcements */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0a1628', marginBottom: 16 }}>
                Active Broadcast Bulletins
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {announcementsList.map(ann => (
                  <div
                    key={ann.id}
                    style={{
                      padding: '18px',
                      borderRadius: 12,
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
                        {ann.title}
                      </h4>
                      <span style={{ fontSize: '0.72rem', background: '#eff6ff', color: '#1d6ae5', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                        {ann.targetAudience.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.825rem', lineHeight: 1.5, margin: '6px 0 10px' }}>
                      {ann.content}
                    </p>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Posted on {new Date(ann.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
