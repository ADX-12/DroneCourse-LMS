// Core Types for Drone LMS Platform

export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  name: string;
  phone?: string;
  city?: string;
  education?: string;
  occupation?: string;
  linkedin?: string;
  bio?: string;
  avatar?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastActive?: string;
}

export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  totalLessons: number;
  totalVideos: number;
  moduleNumber: 1 | 2;
  badge?: string;
  highlights: string[];
  outcomes: string[];
  requirements: string[];
  whoShouldEnroll: string[];
  instructorId: string;
  isPublished: boolean;
  thumbnail?: string;
  createdAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoProvider?: 'youtube' | 'vimeo' | 'upload';
  content?: string;
  duration: string; // e.g. "12 min"
  hasVideo: boolean;
  hasReading: boolean;
  hasQuiz: boolean;
  isFreePreview: boolean;
  order: number;
  resources: Resource[];
  quizId?: string;
  assignmentId?: string;
  isPublished: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'link' | 'image' | 'other';
  url: string;
  size?: string;
  lessonId?: string;
  courseId?: string;
  category: string;
  isPublic: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'suspended';
  completedAt?: string;
  orderId: string;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  isCompleted: boolean;
  completedAt?: string;
  watchedSeconds?: number;
  lastAccessedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  discountAmount: number;
  finalAmount: number;
  couponCode?: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  paymentMethod?: string;
  createdAt: string;
  paidAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate?: string;
  maxUses?: number;
  usedCount: number;
  courseId?: string; // null = applies to all
  minPurchase?: number;
  isActive: boolean;
  createdAt: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description?: string;
  passingScore: number; // percentage
  allowRetake: boolean;
  timeLimit?: number; // minutes
  questions: Question[];
  isPublished: boolean;
}

export interface Question {
  id: string;
  quizId: string;
  type: 'mcq' | 'multi-answer' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  marks: number;
  order: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, string | string[]>;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  timeTaken?: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  instructions: string;
  deadline?: string;
  maxMarks: number;
  allowedFormats: string[];
  isPublished: boolean;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  textResponse?: string;
  fileUrls?: string[];
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'graded';
  marks?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface Project {
  id: string;
  courseId: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: string;
  components: string[];
  instructions: string;
  resources: string[];
  isPublished: boolean;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  userId: string;
  reportUrl?: string;
  imageUrls?: string[];
  videoUrl?: string;
  codeUrl?: string;
  comments?: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'approved' | 'revision_requested';
  feedback?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateNumber: string;
  issuedAt: string;
  studentName: string;
  courseName: string;
  instructorName: string;
  verificationUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  targetAudience: 'all' | 'module1' | 'module2' | string;
  courseId?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  category: 'course_question' | 'technical' | 'payment' | 'certificate' | 'other';
  message: string;
  attachmentUrl?: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  authorId: string;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'lesson' | 'assignment' | 'quiz' | 'announcement' | 'certificate' | 'payment' | 'grade';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

// Progress summary
export interface CourseProgress {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  lastLesson?: {
    id: string;
    title: string;
    chapterTitle: string;
  };
  isCompleted: boolean;
}

export interface StudentStats {
  enrolledCourses: number;
  completedCourses: number;
  totalLessonsCompleted: number;
  totalLessons: number;
  certificatesEarned: number;
  overallProgress: number;
}
