import { 
  users, enrollments, lessonProgress, curriculum, quizAttempts, 
  courses, certificates, orders, coupons, quizzes
} from './mockData';
import type { 
  User, CourseProgress, StudentStats, LessonProgress, Enrollment, Order, Coupon, QuizAttempt
} from './types';

// ─── AUTH HELPERS ────────────────────────────────────────────────────────────

export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}

export function authenticateUser(email: string, password: string): User | null {
  const user = users.find(u => u.email === email && u.passwordHash === password && u.isActive);
  return user || null;
}

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function registerUser(data: {
  name: string; email: string; phone: string; password: string;
}): User {
  const existing = users.find(u => u.email === data.email);
  if (existing) throw new Error('Email already registered');
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    passwordHash: data.password,
    role: 'student',
    name: data.name,
    phone: data.phone,
    isActive: true,
    emailVerified: false,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

// ─── ENROLLMENT HELPERS ──────────────────────────────────────────────────────

export function getUserEnrollments(userId: string): Enrollment[] {
  return enrollments.filter(e => e.userId === userId && e.status !== 'suspended');
}

export function isEnrolled(userId: string, courseId: string): boolean {
  return enrollments.some(
    e => e.userId === userId && e.courseId === courseId && e.status === 'active'
  );
}

export function enrollUser(userId: string, courseId: string, orderId: string): Enrollment {
  const existing = enrollments.find(e => e.userId === userId && e.courseId === courseId);
  if (existing) return existing;
  
  const enrollment: Enrollment = {
    id: `enr-${Date.now()}`,
    userId,
    courseId,
    enrolledAt: new Date().toISOString(),
    status: 'active',
    orderId,
  };
  enrollments.push(enrollment);
  return enrollment;
}

// ─── PROGRESS HELPERS ────────────────────────────────────────────────────────

export function getUserLessonProgress(userId: string, courseId?: string): LessonProgress[] {
  if (courseId) {
    return lessonProgress.filter(lp => lp.userId === userId && lp.courseId === courseId);
  }
  return lessonProgress.filter(lp => lp.userId === userId);
}

export function getCourseProgress(userId: string, courseId: string): CourseProgress {
  const course = courses.find(c => c.id === courseId);
  const mod = curriculum.find(m => m.courseId === courseId);
  
  if (!course || !mod) {
    return { courseId, totalLessons: 0, completedLessons: 0, percentage: 0, isCompleted: false };
  }
  
  const allLessons = mod.chapters.flatMap(ch => ch.lessons);
  const userProgress = lessonProgress.filter(lp => lp.userId === userId && lp.courseId === courseId);
  const completedIds = new Set(userProgress.filter(lp => lp.isCompleted).map(lp => lp.lessonId));
  
  const completedLessons = allLessons.filter(l => completedIds.has(l.id)).length;
  const totalLessons = allLessons.length;
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  // Find last accessed lesson
  const lastProgress = userProgress.sort((a, b) => 
    new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
  )[0];
  
  let lastLesson;
  if (lastProgress) {
    for (const chapter of mod.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lastProgress.lessonId);
      if (lesson) {
        lastLesson = { id: lesson.id, title: lesson.title, chapterTitle: chapter.title };
        break;
      }
    }
  }

  return { courseId, totalLessons, completedLessons, percentage, lastLesson, isCompleted: percentage === 100 };
}

export function getStudentStats(userId: string): StudentStats {
  const userEnrollments = getUserEnrollments(userId);
  let totalLessons = 0;
  let completedLessons = 0;
  let completedCourses = 0;
  
  for (const enrollment of userEnrollments) {
    const progress = getCourseProgress(userId, enrollment.courseId);
    totalLessons += progress.totalLessons;
    completedLessons += progress.completedLessons;
    if (progress.isCompleted) completedCourses++;
  }
  
  const overallProgress = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;
    
  const certs = certificates.filter(c => c.userId === userId);
  
  return {
    enrolledCourses: userEnrollments.length,
    completedCourses,
    totalLessonsCompleted: completedLessons,
    totalLessons,
    certificatesEarned: certs.length,
    overallProgress,
  };
}

export function markLessonComplete(userId: string, lessonId: string, courseId: string): LessonProgress {
  const existing = lessonProgress.find(lp => lp.userId === userId && lp.lessonId === lessonId);
  if (existing) {
    existing.isCompleted = true;
    existing.completedAt = new Date().toISOString();
    existing.lastAccessedAt = new Date().toISOString();
    return existing;
  }
  const newProgress: LessonProgress = {
    id: `lp-${Date.now()}`,
    userId,
    lessonId,
    courseId,
    isCompleted: true,
    completedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
  };
  lessonProgress.push(newProgress);
  return newProgress;
}

export function accessLesson(userId: string, lessonId: string, courseId: string): LessonProgress {
  const existing = lessonProgress.find(lp => lp.userId === userId && lp.lessonId === lessonId);
  if (existing) {
    existing.lastAccessedAt = new Date().toISOString();
    return existing;
  }
  const newProgress: LessonProgress = {
    id: `lp-${Date.now()}`,
    userId,
    lessonId,
    courseId,
    isCompleted: false,
    lastAccessedAt: new Date().toISOString(),
  };
  lessonProgress.push(newProgress);
  return newProgress;
}

// ─── ORDER HELPERS ────────────────────────────────────────────────────────────

export function createOrder(data: {
  userId: string; courseId: string; amount: number; discountAmount: number;
  finalAmount: number; couponCode?: string;
}): Order {
  const order: Order = {
    id: `order-${Date.now()}`,
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

export function confirmPayment(orderId: string, paymentId: string): Order | null {
  const order = orders.find(o => o.id === orderId);
  if (!order) return null;
  order.status = 'paid';
  order.paymentId = paymentId;
  order.paidAt = new Date().toISOString();
  return order;
}

// ─── COUPON HELPERS ───────────────────────────────────────────────────────────

export function validateCoupon(code: string, courseId?: string, amount?: number): { 
  valid: boolean; coupon?: Coupon; discount?: number; message?: string 
} {
  const coupon = coupons.find(c => c.code === code.toUpperCase());
  if (!coupon) return { valid: false, message: 'Invalid coupon code' };
  if (!coupon.isActive) return { valid: false, message: 'Coupon is inactive' };
  if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
    return { valid: false, message: 'Coupon has expired' };
  }
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, message: 'Coupon usage limit reached' };
  }
  if (coupon.courseId && courseId && coupon.courseId !== courseId) {
    return { valid: false, message: 'Coupon not valid for this course' };
  }
  if (coupon.minPurchase && amount && amount < coupon.minPurchase) {
    return { valid: false, message: `Minimum purchase of ₹${coupon.minPurchase} required` };
  }
  
  const discount = coupon.discountType === 'percentage'
    ? Math.round((amount || 0) * coupon.discountValue / 100)
    : coupon.discountValue;
    
  return { valid: true, coupon, discount };
}

// ─── QUIZ HELPERS ─────────────────────────────────────────────────────────────

export function getQuiz(quizId: string) {
  return quizzes.find(q => q.id === quizId);
}

export function submitQuiz(data: {
  quizId: string; userId: string; answers: Record<string, string | string[]>;
}): QuizAttempt {
  const quiz = quizzes.find(q => q.id === data.quizId);
  if (!quiz) throw new Error('Quiz not found');
  
  let score = 0;
  let totalMarks = 0;
  
  for (const question of quiz.questions) {
    totalMarks += question.marks;
    const userAnswer = data.answers[question.id];
    const correct = question.correctAnswer;
    
    if (Array.isArray(correct) && Array.isArray(userAnswer)) {
      if (JSON.stringify([...userAnswer].sort()) === JSON.stringify([...correct].sort())) {
        score += question.marks;
      }
    } else if (userAnswer === correct) {
      score += question.marks;
    }
  }
  
  const percentage = Math.round((score / totalMarks) * 100);
  const passed = percentage >= quiz.passingScore;
  
  const attempt: QuizAttempt = {
    id: `attempt-${Date.now()}`,
    quizId: data.quizId,
    userId: data.userId,
    answers: data.answers,
    score,
    totalMarks,
    percentage,
    passed,
    submittedAt: new Date().toISOString(),
  };
  quizAttempts.push(attempt);
  return attempt;
}

export function getUserQuizAttempts(userId: string, quizId: string): QuizAttempt[] {
  return quizAttempts.filter(a => a.userId === userId && a.quizId === quizId);
}

// ─── CURRICULUM HELPERS ───────────────────────────────────────────────────────

export function getCurriculum(courseId: string) {
  return curriculum.find(m => m.courseId === courseId);
}

export function getLesson(lessonId: string) {
  for (const mod of curriculum) {
    for (const chapter of mod.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) return { lesson, chapter, module: mod };
    }
  }
  return null;
}

export function getLessonNavigation(lessonId: string, courseId: string) {
  const mod = curriculum.find(m => m.courseId === courseId);
  if (!mod) return { prev: null, next: null };
  
  const allLessons = mod.chapters.flatMap(ch => ch.lessons);
  const idx = allLessons.findIndex(l => l.id === lessonId);
  
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}
