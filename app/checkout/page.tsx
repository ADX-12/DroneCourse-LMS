'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, CheckCircle, Tag, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import { courses } from '@/lib/mockData';
import { useAuthStore } from '@/lib/store';
import { validateCoupon, createOrder, confirmPayment, enrollUser, isEnrolled } from '@/lib/dataHelpers';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const courseId = searchParams.get('courseId') || '';

  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<{ valid: boolean; discount?: number; message?: string } | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [billingInfo, setBillingInfo] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  
  const course = courses.find(c => c.id === courseId);
  const alreadyEnrolled = user ? isEnrolled(user.id, courseId) : false;

  useEffect(() => {
    if (user) {
      setBillingInfo({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    }
  }, [user]);

  useEffect(() => {
    if (alreadyEnrolled) router.push('/lms/courses');
  }, [alreadyEnrolled, router]);

  if (!course) {
    return (
      <div>
        <PublicNav />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, paddingTop: 100 }}>
          <div style={{ fontSize: 56 }}>🔍</div>
          <h2 style={{ color: '#0a1628' }}>Course not found</h2>
          <Link href="/courses" className="btn-primary">Browse Courses</Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const discount = couponResult?.valid ? (couponResult.discount || 0) : 0;
  const finalAmount = Math.max(0, course.price - discount);

  const handleCouponValidate = async () => {
    if (!couponCode.trim()) return;
    setValidatingCoupon(true);
    await new Promise(r => setTimeout(r, 600));
    const result = validateCoupon(couponCode, courseId, course.price);
    setCouponResult(result);
    setValidatingCoupon(false);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      router.push(`/auth/signin?redirect=/checkout?courseId=${courseId}`);
      return;
    }
    if (!billingInfo.name || !billingInfo.email || !billingInfo.phone) return;
    
    setProcessing(true);
    
    // Simulate Razorpay flow
    await new Promise(r => setTimeout(r, 1200));
    
    const order = createOrder({
      userId: user.id, courseId,
      amount: course.price,
      discountAmount: discount,
      finalAmount,
      couponCode: couponResult?.valid ? couponCode : undefined,
    });
    
    // Simulate payment confirmation (in production: verify with Razorpay webhook)
    const confirmedOrder = confirmPayment(order.id, `pay_demo_${Date.now()}`);
    
    if (confirmedOrder) {
      enrollUser(user.id, courseId, order.id);
      setOrderComplete(true);
    }
    setProcessing(false);
  };

  if (orderComplete) {
    return (
      <div>
        <PublicNav />
        <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 100, paddingBottom: 60 }}>
          <div style={{ maxWidth: 520, width: '100%', padding: '0 24px', textAlign: 'center', animation: 'fadeIn 0.6s ease' }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, margin: '0 auto 24px', boxShadow: '0 20px 40px rgba(16,185,129,0.3)' }}>
              🎉
            </div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2rem', color: '#0a1628', marginBottom: 12 }}>
              Enrollment Confirmed!
            </h1>
            <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: 8 }}>
              Welcome to <strong>{course.title}</strong>
            </p>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 32 }}>
              Your payment was successful and your course is now unlocked. Head to your LMS dashboard to start learning!
            </p>
            
            <div style={{ background: '#f0f7ff', borderRadius: 16, padding: '20px', marginBottom: 28, border: '1px solid #dbeafe' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Course</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>{course.title}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Amount Paid</span>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#10b981' }}>₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Status</span>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#10b981' }}>✓ Paid & Enrolled</span>
              </div>
            </div>

            <Link href="/lms" className="btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Go to My LMS Dashboard →
            </Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div>
      <PublicNav />
      <div style={{ paddingTop: 100, paddingBottom: 80, background: '#f8fafc', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', marginBottom: 24, fontWeight: 500 }}>
            <ArrowLeft size={14} /> Back to Courses
          </Link>

          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.75rem', color: '#0a1628', marginBottom: 8 }}>Secure Checkout</h1>
          <p style={{ color: '#64748b', marginBottom: 32 }}>You're one step away from unlocking your drone training course.</p>

          {!isAuthenticated && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 10 }}>
              <AlertCircle size={18} color="#d97706" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.9rem', color: '#92400e' }}>
                You need to{' '}
                <Link href={`/auth/signin?redirect=/checkout?courseId=${courseId}`} style={{ color: '#d97706', fontWeight: 700, textDecoration: 'underline' }}>sign in</Link>
                {' '}or{' '}
                <Link href="/auth/signup" style={{ color: '#d97706', fontWeight: 700, textDecoration: 'underline' }}>create an account</Link>
                {' '}to complete your purchase.
              </p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'flex-start' }}>
            {/* Left: Billing + Coupon */}
            <div>
              {/* Billing Info */}
              <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', padding: '24px', marginBottom: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 20 }}>Billing Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input type="text" className="form-input" placeholder="Arjun Sharma"
                      value={billingInfo.name} onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" placeholder="you@example.com"
                      value={billingInfo.email} onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Mobile Number *</label>
                    <input type="tel" className="form-input" placeholder="+91 98765 43210"
                      value={billingInfo.phone} onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })} required />
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag size={18} color="#1d6ae5" /> Coupon Code
                </h2>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input type="text" className="form-input" placeholder="e.g. DRONE10"
                    value={couponCode} onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponResult(null); }}
                    style={{ flex: 1, textTransform: 'uppercase' }} />
                  <button onClick={handleCouponValidate} disabled={validatingCoupon || !couponCode.trim()}
                    className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    {validatingCoupon ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Apply'}
                  </button>
                </div>
                {couponResult && (
                  <div style={{
                    marginTop: 12, padding: '10px 14px', borderRadius: 10,
                    background: couponResult.valid ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${couponResult.valid ? '#a7f3d0' : '#fecaca'}`,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    {couponResult.valid ? <CheckCircle size={16} color="#10b981" /> : <AlertCircle size={16} color="#ef4444" />}
                    <p style={{ fontSize: '0.875rem', color: couponResult.valid ? '#065f46' : '#991b1b', fontWeight: 600 }}>
                      {couponResult.valid ? `✓ Coupon applied! You save ₹${couponResult.discount?.toLocaleString('en-IN')}` : couponResult.message}
                    </p>
                  </div>
                )}
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 8 }}>Try: DRONE10, WELCOME20, FLAT500</p>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'sticky', top: 24 }}>
              {/* Course Info */}
              <div style={{ background: 'linear-gradient(135deg, #0a1628, #1a2d54)', padding: '20px 24px' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🚁</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: 4 }}>{course.title}</h3>
                <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>📚 {course.totalLessons} Lessons</span>
                  <span>⏱ {course.duration}</span>
                </div>
              </div>

              <div style={{ padding: '20px 24px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0a1628', marginBottom: 16 }}>Order Summary</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Course Price</span>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>₹{course.price.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: '#10b981' }}>Coupon Discount</span>
                      <span style={{ fontWeight: 600, color: '#10b981' }}>– ₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Tax (GST included)</span>
                    <span style={{ color: '#64748b' }}>Included</span>
                  </div>
                </div>

                <div style={{ height: 1, background: '#f1f5f9', marginBottom: 16 }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0a1628' }}>Total Amount</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 900, fontSize: '1.5rem', color: '#1d6ae5' }}>
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Course Highlights */}
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                  {course.highlights.slice(0, 5).map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: '0.8125rem' }}>
                      <CheckCircle size={13} color="#10b981" />
                      <span style={{ color: '#475569' }}>{h}</span>
                    </div>
                  ))}
                </div>

                <button onClick={handleCheckout} disabled={processing || !isAuthenticated}
                  className="btn-primary"
                  style={{ width: '100%', height: 52, fontSize: '1.0625rem', opacity: !isAuthenticated ? 0.6 : 1 }}>
                  {processing ? (
                    <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
                  ) : (
                    `🔒 Pay ₹${finalAmount.toLocaleString('en-IN')}`
                  )}
                </button>

                {!isAuthenticated && (
                  <p style={{ textAlign: 'center', marginTop: 10, fontSize: '0.8125rem', color: '#64748b' }}>
                    <Link href="/auth/signin" style={{ color: '#1d6ae5', fontWeight: 600 }}>Sign in</Link> to complete purchase
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
                  <Shield size={14} color="#94a3b8" />
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Secure payment via Razorpay</span>
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
                  {['Visa', 'Mastercard', 'UPI', 'Net Banking', 'EMI'].map(p => (
                    <span key={p} style={{ fontSize: '0.6875rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: 4, color: '#64748b', fontWeight: 600 }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PublicFooter />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={32} color="#1d6ae5" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
