'use client';

import { useState } from 'react';
import { resources } from '@/lib/mockData';
import { useAuthStore } from '@/lib/store';
import { getUserEnrollments } from '@/lib/dataHelpers';
import { Download, Search, Filter } from 'lucide-react';

const categoryIcons: Record<string, string> = {
  'Lecture Notes': '📚', 'PDFs': '📄', 'Drone Guides': '🚁',
  'Checklists': '✅', 'Technical Documents': '⚙️', 'Reference Material': '📖',
  'Project Resources': '🔧',
};

export default function ResourcesPage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const enrollments = user ? getUserEnrollments(user.id) : [];
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  
  const myResources = resources.filter(r => !r.courseId || enrolledCourseIds.includes(r.courseId));
  const categories = ['All', ...new Set(myResources.map(r => r.category))];
  
  const filtered = myResources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>Learning Resources</h1>
        <p style={{ color: '#64748b' }}>Download and access all your course materials, guides, and documents.</p>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" className="form-input" placeholder="Search resources..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 44 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px', borderRadius: 99, cursor: 'pointer',
                background: selectedCategory === cat ? 'linear-gradient(135deg, #1d6ae5, #3b82f6)' : 'white',
                color: selectedCategory === cat ? 'white' : '#64748b',
                fontWeight: 600, fontSize: '0.8125rem',
                border: `1px solid ${selectedCategory === cat ? 'transparent' : '#e2e8f0'}`,
                transition: 'all 0.2s',
              }}>
              {categoryIcons[cat] || '📁'} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px', background: 'white', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>No resources found</h3>
          <p style={{ color: '#64748b' }}>Try a different search or category filter.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map((resource) => (
            <div key={resource.id} style={{
              background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '18px',
              transition: 'all 0.25s', display: 'flex', flexDirection: 'column', gap: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#e8f0fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {categoryIcons[resource.category] || '📁'}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1e293b', marginBottom: 4, lineHeight: 1.4 }}>{resource.title}</h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span className="badge badge-gray" style={{ fontSize: '0.6875rem' }}>{resource.category}</span>
                    <span className="badge badge-blue" style={{ fontSize: '0.6875rem' }}>{resource.type.toUpperCase()}</span>
                    {resource.size && <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{resource.size}</span>}
                  </div>
                </div>
              </div>
              
              <button style={{ width: '100%', padding: '10px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e8f0fd'; e.currentTarget.style.color = '#1d6ae5'; e.currentTarget.style.borderColor = '#1d6ae5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                <Download size={15} /> Download Resource
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
