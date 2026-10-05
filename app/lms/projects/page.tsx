'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { FolderKanban, CheckCircle2, Clock, Upload, ExternalLink, Award, FileCode, Check, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  courseTitle: string;
  difficulty: 'Intermediate' | 'Advanced';
  estimatedHours: number;
  description: string;
  deliverables: string[];
  rubric: { criterion: string; weight: number }[];
  status: 'not_started' | 'in_progress' | 'submitted' | 'approved';
  grade?: string;
  feedback?: string;
}

const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Autonomous Multi-Waypoint Survey Mission',
    courseTitle: 'Module 1: Drone Fundamentals & Technology',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    description: 'Design and simulate an automated grid-survey mission using QGroundControl or Mission Planner. Define optimal altitude, forward/side overlap (75%/70%), camera trigger intervals, and safe Return-to-Launch (RTL) fail-safes.',
    deliverables: [
      'Exported flight plan (.plan or .kml format)',
      'Pre-flight risk assessment and airspace authorization checklist',
      'Flight simulation screen recording or field telemetry log (.tlog/.bin)',
    ],
    rubric: [
      { criterion: 'Airspace & GSD calculation precision', weight: 30 },
      { criterion: 'Fail-safe parameters (battery RTL & geofence)', weight: 30 },
      { criterion: 'Flight log documentation & checklist completeness', weight: 40 },
    ],
    status: 'approved',
    grade: '96% (Grade A+)',
    feedback: 'Flawless mission perimeter and terrain-following configuration. Excellent geofence margin buffer.',
  },
  {
    id: 'proj-2',
    title: 'Custom Drone Bill of Materials & Power Budget Engineering',
    courseTitle: 'Module 1: Drone Fundamentals & Technology',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    description: 'Calculate and engineer a complete 5-inch or 450mm drone propulsion powertrain. Calculate thrust-to-weight ratio, all-up-weight (AUW), motor KV vs prop pitch curves, and continuous C-rate draw on a 4S/6S LiPo battery.',
    deliverables: [
      'Propulsion & power calculation spreadsheet (.xlsx or PDF)',
      'Electrical schematic diagram with wiring gauge specifications',
      'Component vendor justification & budget breakdown',
    ],
    rubric: [
      { criterion: 'Thrust-to-weight & hover throttle calculation', weight: 35 },
      { criterion: 'LiPo discharge & thermal management analysis', weight: 35 },
      { criterion: 'Wiring diagram & safety fuse integration', weight: 30 },
    ],
    status: 'submitted',
    feedback: 'Currently under review by Chief Flight Instructor.',
  },
  {
    id: 'proj-3',
    title: 'Autonomous Precision Agriculture & Orthomosaic Capstone',
    courseTitle: 'Module 2: Advanced Drone Engineering & Commercial Operations',
    difficulty: 'Advanced',
    estimatedHours: 14,
    description: 'Process raw aerial RGB or multispectral imagery using photogrammetry tools (WebODM / Pix4D / Agisoft) to generate a geo-referenced 2D Orthomosaic map, Digital Surface Model (DSM), and NDVI vegetation health index.',
    deliverables: [
      'Processed Orthomosaic TIFF / GeoTIFF link',
      'NDVI crop stress heat-map analysis report',
      'Ground Control Point (GCP) accuracy report (< 3cm RMSE)',
    ],
    rubric: [
      { criterion: 'Photogrammetric alignment & GCP alignment precision', weight: 40 },
      { criterion: 'NDVI crop stress index interpretation', weight: 35 },
      { criterion: 'Client-ready commercial flight report', weight: 25 },
    ],
    status: 'in_progress',
  },
];

export default function PracticalProjectsPage() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalProject) return;
    setSubmitting(true);

    setTimeout(() => {
      setProjects(prev => prev.map(p => {
        if (p.id === activeModalProject.id) {
          return {
            ...p,
            status: 'submitted',
            feedback: 'Project submitted successfully! Flight faculty will review within 48 hours.',
          };
        }
        return p;
      }));
      setSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setActiveModalProject(null);
        setSubmissionUrl('');
        setSubmissionNotes('');
      }, 1500);
    }, 800);
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.625rem', color: '#0a1628', marginBottom: 6 }}>
          Practical Flight & Engineering Projects
        </h1>
        <p style={{ color: '#64748b' }}>
          Apply flight theory through mission simulations, CAD propulsion design, and photogrammetry workflows.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
        {projects.map(proj => {
          const isDone = proj.status === 'approved';
          const isSubmitted = proj.status === 'submitted';
          const isInProgress = proj.status === 'in_progress';

          return (
            <div
              key={proj.id}
              style={{
                background: 'white',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.25s',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 99,
                    background: proj.difficulty === 'Advanced' ? '#fdf2f8' : '#eff6ff',
                    color: proj.difficulty === 'Advanced' ? '#db2777' : '#1d6ae5',
                  }}>
                    {proj.difficulty} • {proj.estimatedHours} hrs
                  </span>

                  {isDone ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#16a34a', fontSize: '0.75rem', fontWeight: 700, background: '#dcfce7', padding: '3px 9px', borderRadius: 6 }}>
                      <CheckCircle2 size={13} /> {proj.grade || 'Approved'}
                    </span>
                  ) : isSubmitted ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#d97706', fontSize: '0.75rem', fontWeight: 700, background: '#fef3c7', padding: '3px 9px', borderRadius: 6 }}>
                      <Clock size={13} /> Under Review
                    </span>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                      In Progress
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.75rem', color: '#1d6ae5', fontWeight: 600, marginBottom: 4 }}>
                  {proj.courseTitle}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a1628', marginBottom: 10, lineHeight: 1.4 }}>
                  {proj.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 16, lineHeight: 1.55 }}>
                  {proj.description}
                </p>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Required Deliverables:
                  </div>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>
                    {proj.deliverables.map((del, i) => (
                      <li key={i}>{del}</li>
                    ))}
                  </ul>
                </div>

                {proj.feedback && (
                  <div style={{
                    padding: '12px',
                    borderRadius: 8,
                    background: isDone ? '#f0fdf4' : '#fffbeb',
                    border: `1px solid ${isDone ? '#bbf7d0' : '#fef08a'}`,
                    marginBottom: 16,
                    fontSize: '0.8rem',
                    color: isDone ? '#166534' : '#92400e',
                  }}>
                    <strong>Faculty Feedback:</strong> {proj.feedback}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setActiveModalProject(proj)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: isDone ? '#f8fafc' : 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                    color: isDone ? '#475569' : 'white',
                    border: isDone ? '1px solid #cbd5e1' : 'none',
                    boxShadow: isDone ? 'none' : '0 4px 12px rgba(29,106,229,0.25)',
                  }}
                >
                  <Upload size={15} />
                  <span>{isDone ? 'View Submission / Resubmit' : isSubmitted ? 'Update Submission' : 'Submit Project Files'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {activeModalProject && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10,22,40,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: 20,
        }}>
          <div style={{
            background: 'white',
            borderRadius: 20,
            maxWidth: 580,
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a1628', marginBottom: 6 }}>
              Submit: {activeModalProject.title}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 20 }}>
              Provide your cloud drive (Google Drive, GitHub repo, Dropbox, or OneDrive) containing all mission logs, telemetry, and flight plans.
            </p>

            {submittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontWeight: 700, color: '#0a1628' }}>Submission Received!</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Your project is now in the review queue.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Cloud Deliverables Link (Google Drive / GitHub / OneDrive) *
                  </label>
                  <input
                    type="url"
                    required
                    className="form-input"
                    placeholder="https://drive.google.com/drive/folders/... or https://github.com/..."
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                  />
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 4 }}>
                    Ensure permissions are set to "Anyone with link can view".
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Pilot Notes / Mission Execution Summary
                  </label>
                  <textarea
                    rows={4}
                    className="form-input"
                    placeholder="Briefly describe flight conditions, aircraft configuration, wind speed, mission success metrics..."
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(null)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      background: 'white',
                      color: '#475569',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: '10px 22px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'linear-gradient(135deg, #1d6ae5, #3b82f6)',
                      color: 'white',
                      fontWeight: 700,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Upload & Confirm Submission'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
