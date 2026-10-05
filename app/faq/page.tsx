'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  MessageSquare, ArrowRight, Shield, Award, Laptop, CreditCard, Briefcase
} from 'lucide-react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  // DGCA & Licensing
  {
    id: 'f1',
    category: 'DGCA & Licensing',
    question: 'Is the certificate issued by Drone Academy recognized for DGCA compliance?',
    answer: 'Yes! Our syllabus is strictly structured according to the latest Drone Rules 2021 published by the Directorate General of Civil Aviation (DGCA) and the Ministry of Civil Aviation. Upon passing our Module assessments, you receive an authorized RPTO training credential with tamper-proof cryptographic verification on our portal.',
  },
  {
    id: 'f2',
    category: 'DGCA & Licensing',
    question: 'What is the minimum age and education requirement to become a certified drone pilot in India?',
    answer: 'Under DGCA guidelines, candidates must be at least 18 years old and have passed Class 10th (secondary school) from a recognized educational board. A valid government ID (such as Aadhaar or Passport) is required for pilot registration on DigitalSky.',
  },
  {
    id: 'f3',
    category: 'DGCA & Licensing',
    question: 'What are the airspace zones (Green, Yellow, Red) and NPNT protocols?',
    answer: 'DGCA divides Indian airspace into Green (up to 400 ft without prior permission), Yellow (requires ATC / airport authority clearance), and Red (strictly prohibited without central government authorization). Module 1 covers these airspace protocols, DigitalSky flight approvals, and No-Permission No-Takeoff (NPNT) compliance in detail.',
  },

  // Hardware & Simulators
  {
    id: 'f4',
    category: 'Hardware & Simulators',
    question: 'Do I need to own a physical drone to complete the courses?',
    answer: 'No, owning a drone is not mandatory! All flight physics, mission planning, and autopilot configurations are conducted using industry-standard simulation software like QGroundControl, Mission Planner, and SITL (Software-In-The-Loop) environments that run on any standard laptop or PC.',
  },
  {
    id: 'f5',
    category: 'Hardware & Simulators',
    question: 'What are the minimum computer/laptop requirements for this course?',
    answer: 'You will need a computer running Windows 10/11, macOS, or Linux with at least 8 GB RAM, an Intel Core i3/i5 (or Apple Silicon / AMD equivalent) processor, and a reliable internet connection for video streaming and software labs.',
  },

  // Curriculum & Access
  {
    id: 'f6',
    category: 'Curriculum & Access',
    question: 'Can working professionals take these courses along with their jobs?',
    answer: 'Absolutely. All lectures, reading material, and practical exercises are 100% self-paced. You have lifetime access to the LMS portal, meaning you can study in the evenings or over weekends according to your personal availability.',
  },
  {
    id: 'f7',
    category: 'Curriculum & Access',
    question: 'What is the key difference between Module 1 and Module 2?',
    answer: 'Module 1 provides foundational ground school training (aerodynamics, LiPo battery safety, frame geometry, Betaflight tuning, and basic DGCA rules). Module 2 is advanced commercial training covering Pixhawk avionics, ArduPilot, autonomous waypoint grid surveys, MAVLink Python scripting, and aerial photogrammetry.',
  },

  // Payments & Enrollment
  {
    id: 'f8',
    category: 'Payments & Enrollments',
    question: 'What payment modes are accepted during checkout?',
    answer: 'We support all major payment options via Razorpay including Credit Cards (Visa, MasterCard, RuPay, Amex), Debit Cards, UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ banks, and no-cost EMI options on eligible cards.',
  },
  {
    id: 'f9',
    category: 'Payments & Enrollments',
    question: 'Can I apply a coupon or promotional discount code?',
    answer: 'Yes! During checkout on the payment review screen, enter valid coupon codes like EARLYBIRD, DRONEPILOT, or AERO25 to apply instant percentage or fixed discounts.',
  },

  // Career & Opportunities
  {
    id: 'f10',
    category: 'Career & Opportunities',
    question: 'What career opportunities exist after graduating from this academy?',
    answer: 'Graduates pursue roles as Commercial Drone Pilots, UAV Systems Engineers, Aerial Survey & Photogrammetry Specialists, Precision Agriculture Consultants, and Drone Assembly & Maintenance Technicians with salaries ranging from ₹4.5 LPA to ₹12 LPA depending on specialization.',
  },
];

const categories = ['All Questions', 'DGCA & Licensing', 'Hardware & Simulators', 'Curriculum & Access', 'Payments & Enrollments', 'Career & Opportunities'];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Questions');
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>('f1');

  const toggle = (id: string) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  const filtered = faqs.filter(item => {
    if (selectedCategory !== 'All Questions' && item.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

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
              <HelpCircle size={14} />
              <span>Pilot Knowledgebase & Help Desk</span>
            </span>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.4rem', color: '#0a1628', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 28px' }}>
              Everything you need to know about drone flight regulations, simulator software, syllabus structure, and licensing certification.
            </p>

            {/* Live Search */}
            <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                placeholder="Search queries (e.g. DGCA rules, laptop, coupons, license)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 46, height: 48, fontSize: '0.925rem', background: 'white' }}
              />
            </div>
          </div>
        </section>

        {/* Categories & Accordions */}
        <section style={{ maxWidth: 940, margin: '0 auto', padding: '40px 20px 80px' }}>
          {/* Category Chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 99,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: `1px solid ${selectedCategory === cat ? '#1d6ae5' : '#e2e8f0'}`,
                  background: selectedCategory === cat ? '#1d6ae5' : 'white',
                  color: selectedCategory === cat ? 'white' : '#64748b',
                  transition: 'all 0.2s',
                  boxShadow: selectedCategory === cat ? '0 2px 8px rgba(29,106,229,0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', background: 'white', borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontWeight: 700, color: '#0a1628', marginBottom: 6 }}>No answers found</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Try clearing your search term or select "All Questions".</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.map(faq => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    style={{
                      background: 'white',
                      borderRadius: 14,
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <button
                      onClick={() => toggle(faq.id)}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: isOpen ? '#f8fafc' : 'white',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: 16,
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d6ae5', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 4 }}>
                          {faq.category}
                        </span>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0a1628', margin: 0, lineHeight: 1.4 }}>
                          {faq.question}
                        </h3>
                      </div>
                      <div style={{ color: '#64748b', flexShrink: 0 }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 24px 20px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                        <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.65, margin: '14px 0 0' }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Need more help banner */}
          <div style={{
            marginTop: 48,
            background: 'white',
            borderRadius: 18,
            border: '1px solid #e2e8f0',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>
                Still have an unanswered question?
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
                Our flight advisors are available on WhatsApp and phone Monday through Saturday.
              </p>
            </div>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 20px',
                borderRadius: 8,
                background: '#0a1628',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              <span>Contact Flight Support</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
