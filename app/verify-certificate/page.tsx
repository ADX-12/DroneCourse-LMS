'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, CheckCircle2, AlertCircle, Search, ExternalLink } from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import { certificates } from '@/lib/mockData';

function VerifyCertificateContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('cert') || '';
  const [certInput, setCertInput] = useState(initialQuery);
  const [searchedCert, setSearchedCert] = useState<string | null>(initialQuery || null);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    setVerifying(true);
    setTimeout(() => {
      setSearchedCert(certInput.trim());
      setVerifying(false);
    }, 600);
  };

  // Find matching certificate
  const matchedCertificate = certificates.find(
    c => c.certificateNumber.toLowerCase() === (searchedCert || '').toLowerCase() ||
         c.id.toLowerCase() === (searchedCert || '').toLowerCase()
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <PublicNav />

      <main style={{ flex: 1, paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 20px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 99,
              background: '#eff6ff',
              color: '#1d6ae5',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: 16,
              border: '1px solid #bfdbfe',
            }}>
              <Shield size={14} />
              <span>Official DGCA Credential Verification System</span>
            </div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.25rem', color: '#0a1628', marginBottom: 12 }}>
              Verify Certificate Authenticity
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 600, margin: '0 auto' }}>
              Confirm the validity of drone training credentials, pilot licenses, and course completion certificates issued by the Academy.
            </p>
          </div>

          {/* Search Box */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            padding: '28px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            marginBottom: 36,
          }}>
            <form onSubmit={handleVerify} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Certificate ID (e.g. DA-2024-M2-00001)"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  style={{ paddingLeft: 46, fontSize: '0.95rem', height: 48 }}
                />
              </div>
              <button
                type="submit"
                disabled={verifying}
                style={{
                  height: 48,
                  padding: '0 28px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  cursor: verifying ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(29,106,229,0.3)',
                  transition: 'all 0.2s',
                }}
              >
                {verifying ? 'Verifying...' : 'Verify Now'}
              </button>
            </form>

            {/* Quick Sample Queries */}
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Try sample certificate:</span>
              <button
                type="button"
                onClick={() => { setCertInput('DA-2024-M2-00001'); setSearchedCert('DA-2024-M2-00001'); }}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#1d6ae5',
                  background: '#f0f7ff',
                  border: '1px solid #dbeafe',
                  padding: '3px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                DA-2024-M2-00001
              </button>
            </div>
          </div>

          {/* Verification Result */}
          {searchedCert && (
            matchedCertificate ? (
              <div style={{
                background: 'white',
                borderRadius: 20,
                border: '2px solid #bbf7d0',
                padding: '36px',
                boxShadow: '0 12px 36px rgba(16,185,129,0.1)',
                animation: 'fadeIn 0.3s ease-in-out',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: '#dcfce7',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Official Certificate Verified
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0a1628', margin: 0 }}>
                      Authentic Credential Confirmed
                    </h2>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 28, background: '#f8fafc', padding: '24px', borderRadius: 14, border: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Student Name</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0a1628' }}>{matchedCertificate.studentName}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Certificate Number</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1d6ae5', fontFamily: 'monospace' }}>{matchedCertificate.certificateNumber}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Program / Module</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0a1628' }}>{matchedCertificate.courseName}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Issue Date</div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0a1628' }}>
                      {new Date(matchedCertificate.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Authorizing Faculty</div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0a1628' }}>{matchedCertificate.instructorName}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>Cryptographic Status</div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#16a34a' }}>Valid & Tamper-Proof</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Registered under Drone Academy DGCA RPTO Training Roster #IN-2024-UAV-441
                  </div>
                  <Link
                    href={`/lms/certificates`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#1d6ae5',
                      textDecoration: 'none',
                    }}
                  >
                    <span>View Student Certificate Portal</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'white',
                borderRadius: 20,
                border: '2px solid #fecaca',
                padding: '36px',
                textAlign: 'center',
                boxShadow: '0 8px 30px rgba(239,68,68,0.06)',
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <AlertCircle size={30} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a1628', marginBottom: 6 }}>
                  Certificate Not Found
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: 500, margin: '0 auto 20px' }}>
                  No record matches Certificate ID <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>{searchedCert}</code>. Please double-check the spelling or contact academic support.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 18px',
                    borderRadius: 8,
                    background: '#f8fafc',
                    color: '#0a1628',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Contact Registrar Office
                </Link>
              </div>
            )
          )}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

export default function VerifyCertificatePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading verification system...</div>}>
      <VerifyCertificateContent />
    </Suspense>
  );
}
