import {
  User, Course, Module, Chapter, Lesson, Resource, Enrollment, LessonProgress,
  Order, Coupon, Quiz, Question, QuizAttempt, Assignment, AssignmentSubmission,
  Project, ProjectSubmission, Certificate, Announcement, SupportTicket, Notification
} from './types';

// ─── USERS ─────────────────────────────────────────────────────────────────

export const users: User[] = [
  {
    id: 'user-admin-1',
    email: 'admin@droneacademy.in',
    passwordHash: 'admin123', // in real app: bcrypt hash
    role: 'admin',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    city: 'Bengaluru',
    isActive: true,
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastActive: '2026-10-05T08:00:00Z',
  },
  {
    id: 'user-instructor-1',
    email: 'instructor@droneacademy.in',
    passwordHash: 'instructor123',
    role: 'instructor',
    name: 'Dr. Ananya Singh',
    phone: '+91 98765 11111',
    city: 'Hyderabad',
    occupation: 'UAV Systems Engineer',
    bio: 'PhD in Aerospace Engineering with 12+ years of UAV research and industry experience.',
    isActive: true,
    emailVerified: true,
    createdAt: '2024-01-05T00:00:00Z',
    lastActive: '2026-10-04T15:00:00Z',
  },
  {
    id: 'user-student-1',
    email: 'student@droneacademy.in',
    passwordHash: 'student123',
    role: 'student',
    name: 'Arjun Sharma',
    phone: '+91 99887 65432',
    city: 'Pune',
    education: 'B.Tech in Electronics Engineering',
    occupation: 'Engineering Student',
    bio: 'Passionate about drone technology and autonomous systems.',
    isActive: true,
    emailVerified: true,
    createdAt: '2024-03-10T00:00:00Z',
    lastActive: '2026-10-05T09:30:00Z',
  },
  {
    id: 'user-student-2',
    email: 'priya@example.com',
    passwordHash: 'test123',
    role: 'student',
    name: 'Priya Nair',
    phone: '+91 88776 55443',
    city: 'Chennai',
    education: 'M.Sc. Physics',
    occupation: 'Research Assistant',
    isActive: true,
    emailVerified: true,
    createdAt: '2024-04-15T00:00:00Z',
    lastActive: '2026-10-03T12:00:00Z',
  },
];

// ─── COURSES ────────────────────────────────────────────────────────────────

export const courses: Course[] = [
  {
    id: 'course-module-1',
    title: 'Drone Technology – Module 1',
    shortTitle: 'Module 1',
    slug: 'drone-technology-module-1',
    description: 'A comprehensive foundational program covering everything you need to know about drone technology. From basic principles to practical assembly and flight, this course builds the solid foundation required for a career in UAV systems.',
    price: 8999,
    level: 'beginner',
    duration: '8 Weeks',
    totalLessons: 25,
    totalVideos: 22,
    moduleNumber: 1,
    highlights: [
      '25 Structured Lessons',
      '22 Video Lectures',
      'Study Material & PDFs',
      '3 Quizzes',
      '2 Assignments',
      'LMS Access',
      'Progress Tracking',
      'Certificate of Completion',
      'Community Support',
    ],
    outcomes: [
      'Understand drone technology fundamentals',
      'Identify and explain drone components',
      'Apply basic aerodynamic principles',
      'Understand battery and power systems',
      'Configure and understand flight controllers',
      'Perform basic drone assembly',
      'Apply drone safety protocols',
      'Understand Indian drone regulations',
    ],
    requirements: [
      'No prior drone experience required',
      'Basic understanding of electronics helpful',
      'Laptop or computer for LMS access',
      'Eagerness to learn',
    ],
    whoShouldEnroll: [
      'Engineering students (ECE, EEE, ME, Aerospace)',
      'Drone enthusiasts and hobbyists',
      'Working professionals exploring drone technology',
      'Entrepreneurs interested in drone industry',
      'Teachers and researchers',
    ],
    instructorId: 'user-instructor-1',
    isPublished: true,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'course-module-2',
    title: 'Advanced Drone Technology – Module 2',
    shortTitle: 'Module 2',
    slug: 'advanced-drone-technology-module-2',
    description: 'An advanced professional program designed for students who have completed Module 1 or have equivalent experience. Covers autonomous systems, mission planning, drone programming, computer vision, and industry-level applications.',
    price: 15999,
    level: 'advanced',
    duration: '12 Weeks',
    totalLessons: 38,
    totalVideos: 35,
    moduleNumber: 2,
    badge: 'ADVANCED PROGRAM',
    highlights: [
      '38 Structured Lessons',
      '35 Video Lectures',
      'Advanced Study Material',
      '5 Quizzes',
      '4 Assignments',
      '3 Practical Projects',
      'LMS Access',
      'Progress Tracking',
      'Industry Certificate',
      'Priority Support',
    ],
    outcomes: [
      'Design and analyze UAV system architecture',
      'Configure advanced flight controllers (Pixhawk, ArduPilot)',
      'Implement GPS navigation and waypoint missions',
      'Plan and execute autonomous flight missions',
      'Integrate payloads (cameras, sensors)',
      'Program drones using Python/MAVLink',
      'Apply computer vision to drone applications',
      'Understand Indian and international drone regulations',
      'Work on industry-level drone projects',
    ],
    requirements: [
      'Completion of Module 1 or equivalent knowledge',
      'Basic programming knowledge helpful',
      'Laptop with Python/development environment',
      'Strong motivation to learn advanced topics',
    ],
    whoShouldEnroll: [
      'Module 1 graduates',
      'Engineering graduates (Aerospace, ECE, CS)',
      'R&D professionals working with drones',
      'Drone startup founders',
      'Defense and agriculture drone professionals',
    ],
    instructorId: 'user-instructor-1',
    isPublished: true,
    createdAt: '2024-01-10T00:00:00Z',
  },
];

// ─── CURRICULUM (Modules, Chapters, Lessons) ────────────────────────────────

export const curriculum: Module[] = [
  // MODULE 1 CURRICULUM
  {
    id: 'mod1',
    courseId: 'course-module-1',
    title: 'Drone Technology – Module 1',
    description: 'Foundational drone technology curriculum',
    order: 1,
    chapters: [
      {
        id: 'ch1-1',
        moduleId: 'mod1',
        title: 'Chapter 1: Introduction to Drone Technology',
        description: 'Get started with the world of drones',
        order: 1,
        lessons: [
          { id: 'l1', chapterId: 'ch1-1', title: 'What is a Drone?', description: 'Overview of unmanned aerial vehicles and their basic principles', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoProvider: 'youtube', content: 'A drone, formally known as an unmanned aerial vehicle (UAV)...', duration: '12 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: true, order: 1, resources: [], isPublished: true },
          { id: 'l2', chapterId: 'ch1-1', title: 'History of UAV Technology', description: 'From military origins to civilian applications', duration: '10 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: true, order: 2, resources: [], isPublished: true },
          { id: 'l3', chapterId: 'ch1-1', title: 'Types of Drones', description: 'Fixed-wing, rotary-wing, multi-rotor, and hybrid configurations', duration: '15 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
          { id: 'l4', chapterId: 'ch1-1', title: 'Applications of Drones', description: 'Agriculture, surveillance, delivery, photography and more', duration: '14 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 4, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch1-2',
        moduleId: 'mod1',
        title: 'Chapter 2: Drone Components',
        order: 2,
        lessons: [
          { id: 'l5', chapterId: 'ch1-2', title: 'Frame and Body Design', description: 'Understanding drone frames, materials and geometry', duration: '13 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l6', chapterId: 'ch1-2', title: 'Motors, ESCs and Propellers', description: 'Brushless motors, ESC operation and propeller selection', duration: '18 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
          { id: 'l7', chapterId: 'ch1-2', title: 'Batteries and Power Systems', description: 'LiPo batteries, battery ratings, and power distribution', duration: '16 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
          { id: 'l8', chapterId: 'ch1-2', title: 'Flight Controllers Overview', description: 'Introduction to flight controller hardware and firmware', duration: '20 min', hasVideo: true, hasReading: false, hasQuiz: true, isFreePreview: false, order: 4, resources: [], quizId: 'quiz-1', isPublished: true },
        ],
      },
      {
        id: 'ch1-3',
        moduleId: 'mod1',
        title: 'Chapter 3: Aerodynamics and Flight Principles',
        order: 3,
        lessons: [
          { id: 'l9', chapterId: 'ch1-3', title: 'Basic Aerodynamics', description: 'Lift, drag, thrust, weight and their interaction', duration: '22 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l10', chapterId: 'ch1-3', title: 'Multi-rotor Flight Physics', description: 'How quadcopters achieve stable flight', duration: '18 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
          { id: 'l11', chapterId: 'ch1-3', title: 'Sensors in Drones', description: 'IMU, barometer, GPS, magnetometer basics', duration: '20 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch1-4',
        moduleId: 'mod1',
        title: 'Chapter 4: Communication Systems',
        order: 4,
        lessons: [
          { id: 'l12', chapterId: 'ch1-4', title: 'RC Transmitter and Receiver', description: 'Radio control systems and protocols', duration: '15 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l13', chapterId: 'ch1-4', title: 'Communication Protocols', description: 'PWM, PPM, SBUS, DSMX protocols explained', duration: '17 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
          { id: 'l14', chapterId: 'ch1-4', title: 'Ground Station Basics', description: 'Introduction to mission control software', duration: '12 min', hasVideo: false, hasReading: true, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch1-5',
        moduleId: 'mod1',
        title: 'Chapter 5: Assembly, Safety & Regulations',
        order: 5,
        lessons: [
          { id: 'l15', chapterId: 'ch1-5', title: 'Drone Assembly Basics', description: 'Step-by-step guide to assembling a quadcopter', duration: '30 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l16', chapterId: 'ch1-5', title: 'Pre-flight Safety Checks', description: 'Standard operating procedures and checklists', duration: '14 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
          { id: 'l17', chapterId: 'ch1-5', title: 'Indian Drone Regulations (DGCA)', description: 'Understanding NPNT, registration, and legal flying zones', duration: '25 min', hasVideo: true, hasReading: true, hasQuiz: true, isFreePreview: false, order: 3, resources: [], quizId: 'quiz-2', isPublished: true },
          { id: 'l18', chapterId: 'ch1-5', title: 'Basic Troubleshooting', description: 'Diagnosing and fixing common drone issues', duration: '20 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 4, resources: [], isPublished: true },
          { id: 'l19', chapterId: 'ch1-5', title: 'Module 1 – Final Assessment', description: 'Comprehensive assessment covering all Module 1 topics', duration: '45 min', hasVideo: false, hasReading: false, hasQuiz: true, isFreePreview: false, order: 5, resources: [], quizId: 'quiz-3', isPublished: true },
        ],
      },
    ],
  },

  // MODULE 2 CURRICULUM
  {
    id: 'mod2',
    courseId: 'course-module-2',
    title: 'Advanced Drone Technology – Module 2',
    description: 'Advanced UAV systems curriculum',
    order: 1,
    chapters: [
      {
        id: 'ch2-1',
        moduleId: 'mod2',
        title: 'Chapter 1: Advanced UAV Systems',
        order: 1,
        lessons: [
          { id: 'l20', chapterId: 'ch2-1', title: 'UAV System Architecture', description: 'Comprehensive overview of modern UAV architecture', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoProvider: 'youtube', duration: '25 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: true, order: 1, resources: [], isPublished: true },
          { id: 'l21', chapterId: 'ch2-1', title: 'Advanced Flight Controllers', description: 'Pixhawk, ArduPilot, and PX4 deep dive', duration: '30 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
          { id: 'l22', chapterId: 'ch2-1', title: 'Sensor Fusion and IMU', description: 'Kalman filters, sensor fusion algorithms', duration: '28 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch2-2',
        moduleId: 'mod2',
        title: 'Chapter 2: GPS Navigation & Autonomous Flight',
        order: 2,
        lessons: [
          { id: 'l23', chapterId: 'ch2-2', title: 'GPS Systems and RTK', description: 'GPS, GLONASS, RTK and precision navigation', duration: '22 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l24', chapterId: 'ch2-2', title: 'Waypoint Mission Planning', description: 'Creating and executing autonomous waypoint missions', duration: '35 min', hasVideo: true, hasReading: true, hasQuiz: true, isFreePreview: false, order: 2, resources: [], quizId: 'quiz-4', isPublished: true },
          { id: 'l25', chapterId: 'ch2-2', title: 'Autonomous Flight Modes', description: 'Loiter, auto, guided, RTL modes explained', duration: '28 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
          { id: 'l26', chapterId: 'ch2-2', title: 'Geofencing and Airspace Management', description: 'Setting up virtual boundaries and airspace integration', duration: '20 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 4, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch2-3',
        moduleId: 'mod2',
        title: 'Chapter 3: Telemetry & Payload Integration',
        order: 3,
        lessons: [
          { id: 'l27', chapterId: 'ch2-3', title: 'Telemetry Systems', description: 'Real-time telemetry, data links, and ground stations', duration: '24 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l28', chapterId: 'ch2-3', title: 'Camera and Gimbal Integration', description: 'Integrating FPV, thermal, and survey cameras', duration: '30 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
          { id: 'l29', chapterId: 'ch2-3', title: 'Sensors and Data Acquisition', description: 'LiDAR, multispectral, and chemical sensors', duration: '26 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch2-4',
        moduleId: 'mod2',
        title: 'Chapter 4: Drone Programming',
        order: 4,
        lessons: [
          { id: 'l30', chapterId: 'ch2-4', title: 'Introduction to MAVLink Protocol', description: 'MAVLink communication protocol fundamentals', duration: '22 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l31', chapterId: 'ch2-4', title: 'Python Drone Programming', description: 'Using DroneKit-Python for autonomous control', duration: '40 min', hasVideo: true, hasReading: true, hasQuiz: true, isFreePreview: false, order: 2, resources: [], quizId: 'quiz-5', isPublished: true },
          { id: 'l32', chapterId: 'ch2-4', title: 'SITL Simulation', description: 'Software-in-the-loop simulation with ArduPilot', duration: '35 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch2-5',
        moduleId: 'mod2',
        title: 'Chapter 5: Computer Vision & AI',
        order: 5,
        lessons: [
          { id: 'l33', chapterId: 'ch2-5', title: 'Introduction to Computer Vision', description: 'OpenCV basics for drone applications', duration: '30 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l34', chapterId: 'ch2-5', title: 'Object Detection with Drones', description: 'YOLO and real-time detection from UAV footage', duration: '38 min', hasVideo: true, hasReading: false, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
        ],
      },
      {
        id: 'ch2-6',
        moduleId: 'mod2',
        title: 'Chapter 6: Industry Applications & Regulations',
        order: 6,
        lessons: [
          { id: 'l35', chapterId: 'ch2-6', title: 'Agriculture Drone Applications', description: 'Precision agriculture, spraying missions, NDVI mapping', duration: '28 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 1, resources: [], isPublished: true },
          { id: 'l36', chapterId: 'ch2-6', title: 'Survey and Mapping', description: 'Photogrammetry, 3D mapping with drones', duration: '32 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 2, resources: [], isPublished: true },
          { id: 'l37', chapterId: 'ch2-6', title: 'Drone Regulations & Compliance', description: 'Advanced DGCA regulations, BVLOS, certification', duration: '25 min', hasVideo: true, hasReading: true, hasQuiz: false, isFreePreview: false, order: 3, resources: [], isPublished: true },
          { id: 'l38', chapterId: 'ch2-6', title: 'Module 2 – Final Assessment', description: 'Comprehensive advanced assessment', duration: '60 min', hasVideo: false, hasReading: false, hasQuiz: true, isFreePreview: false, order: 4, resources: [], quizId: 'quiz-6', isPublished: true },
        ],
      },
    ],
  },
];

// ─── ENROLLMENTS ────────────────────────────────────────────────────────────

export const enrollments: Enrollment[] = [
  {
    id: 'enr-1',
    userId: 'user-student-1',
    courseId: 'course-module-1',
    enrolledAt: '2024-03-15T10:00:00Z',
    status: 'active',
    orderId: 'order-1',
  },
  {
    id: 'enr-2',
    userId: 'user-student-2',
    courseId: 'course-module-2',
    enrolledAt: '2024-04-20T10:00:00Z',
    status: 'active',
    orderId: 'order-2',
  },
];

// ─── LESSON PROGRESS ────────────────────────────────────────────────────────

export const lessonProgress: LessonProgress[] = [
  { id: 'lp-1', userId: 'user-student-1', lessonId: 'l1', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-16T10:00:00Z', lastAccessedAt: '2024-03-16T10:00:00Z' },
  { id: 'lp-2', userId: 'user-student-1', lessonId: 'l2', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-16T11:00:00Z', lastAccessedAt: '2024-03-16T11:00:00Z' },
  { id: 'lp-3', userId: 'user-student-1', lessonId: 'l3', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-17T09:00:00Z', lastAccessedAt: '2024-03-17T09:00:00Z' },
  { id: 'lp-4', userId: 'user-student-1', lessonId: 'l4', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-17T10:00:00Z', lastAccessedAt: '2024-03-17T10:00:00Z' },
  { id: 'lp-5', userId: 'user-student-1', lessonId: 'l5', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-18T09:00:00Z', lastAccessedAt: '2024-03-18T09:00:00Z' },
  { id: 'lp-6', userId: 'user-student-1', lessonId: 'l6', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-18T10:30:00Z', lastAccessedAt: '2024-03-18T10:30:00Z' },
  { id: 'lp-7', userId: 'user-student-1', lessonId: 'l7', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-19T09:00:00Z', lastAccessedAt: '2024-03-19T09:00:00Z' },
  { id: 'lp-8', userId: 'user-student-1', lessonId: 'l8', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-19T11:00:00Z', lastAccessedAt: '2024-03-19T11:00:00Z' },
  { id: 'lp-9', userId: 'user-student-1', lessonId: 'l9', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-20T09:00:00Z', lastAccessedAt: '2024-03-20T09:00:00Z' },
  { id: 'lp-10', userId: 'user-student-1', lessonId: 'l10', courseId: 'course-module-1', isCompleted: true, completedAt: '2024-03-20T11:00:00Z', lastAccessedAt: '2024-03-20T11:00:00Z' },
  { id: 'lp-11', userId: 'user-student-1', lessonId: 'l11', courseId: 'course-module-1', isCompleted: false, lastAccessedAt: '2024-03-21T09:30:00Z' },
];

// ─── ORDERS ─────────────────────────────────────────────────────────────────

export const orders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-student-1',
    courseId: 'course-module-1',
    amount: 8999,
    discountAmount: 0,
    finalAmount: 8999,
    status: 'paid',
    paymentId: 'pay_demo_001',
    paymentMethod: 'razorpay',
    createdAt: '2024-03-15T09:50:00Z',
    paidAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'order-2',
    userId: 'user-student-2',
    courseId: 'course-module-2',
    amount: 15999,
    discountAmount: 1600,
    finalAmount: 14399,
    couponCode: 'DRONE10',
    status: 'paid',
    paymentId: 'pay_demo_002',
    paymentMethod: 'razorpay',
    createdAt: '2024-04-20T09:50:00Z',
    paidAt: '2024-04-20T10:00:00Z',
  },
];

// ─── COUPONS ─────────────────────────────────────────────────────────────────

export const coupons: Coupon[] = [
  {
    id: 'coup-1',
    code: 'DRONE10',
    discountType: 'percentage',
    discountValue: 10,
    expiryDate: '2025-12-31T23:59:59Z',
    maxUses: 100,
    usedCount: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'coup-2',
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    expiryDate: '2025-06-30T23:59:59Z',
    maxUses: 50,
    usedCount: 5,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'coup-3',
    code: 'FLAT500',
    discountType: 'fixed',
    discountValue: 500,
    maxUses: 200,
    usedCount: 12,
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
  },
];

// ─── QUIZZES ─────────────────────────────────────────────────────────────────

export const quizzes: Quiz[] = [
  {
    id: 'quiz-1',
    courseId: 'course-module-1',
    lessonId: 'l8',
    title: 'Flight Controllers Quiz',
    description: 'Test your knowledge on flight controllers and their components',
    passingScore: 60,
    allowRetake: true,
    timeLimit: 15,
    isPublished: true,
    questions: [
      {
        id: 'q1-1', quizId: 'quiz-1', type: 'mcq', order: 1, marks: 2,
        question: 'What is the primary function of a flight controller in a drone?',
        options: ['Power distribution', 'Stabilization and autopilot control', 'Video transmission', 'Battery management'],
        correctAnswer: 'Stabilization and autopilot control',
        explanation: 'The flight controller reads sensor data and adjusts motor speeds to maintain stable flight.',
      },
      {
        id: 'q1-2', quizId: 'quiz-1', type: 'mcq', order: 2, marks: 2,
        question: 'Which firmware is most commonly used with Pixhawk flight controllers?',
        options: ['Betaflight', 'Cleanflight', 'ArduPilot / PX4', 'KISS'],
        correctAnswer: 'ArduPilot / PX4',
        explanation: 'Pixhawk hardware runs ArduPilot or PX4 firmware for advanced autonomous features.',
      },
      {
        id: 'q1-3', quizId: 'quiz-1', type: 'true-false', order: 3, marks: 1,
        question: 'An IMU (Inertial Measurement Unit) is always included in a flight controller.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'All flight controllers include an IMU for measuring acceleration and angular velocity.',
      },
      {
        id: 'q1-4', quizId: 'quiz-1', type: 'mcq', order: 4, marks: 2,
        question: 'What does ESC stand for in drone terminology?',
        options: ['Electronic Speed Controller', 'Engine Speed Computer', 'Electric Signal Control', 'Emergency Stop Circuit'],
        correctAnswer: 'Electronic Speed Controller',
        explanation: 'ESC regulates power delivery to brushless motors based on flight controller signals.',
      },
      {
        id: 'q1-5', quizId: 'quiz-1', type: 'mcq', order: 5, marks: 2,
        question: 'Which communication protocol is commonly used between flight controller and ESC?',
        options: ['UART', 'PWM / DSHOT', 'I2C', 'SPI'],
        correctAnswer: 'PWM / DSHOT',
        explanation: 'PWM (traditional) and DSHOT (digital) are the standard ESC communication protocols.',
      },
    ],
  },
  {
    id: 'quiz-3',
    courseId: 'course-module-1',
    lessonId: 'l19',
    title: 'Module 1 – Final Assessment',
    description: 'Comprehensive assessment for Module 1 certification',
    passingScore: 70,
    allowRetake: true,
    timeLimit: 45,
    isPublished: true,
    questions: [
      {
        id: 'q3-1', quizId: 'quiz-3', type: 'mcq', order: 1, marks: 2,
        question: 'What is the minimum safe distance from an airport for recreational drone flight in India?',
        options: ['3 km', '5 km', '8 km', '10 km'],
        correctAnswer: '5 km',
        explanation: 'DGCA regulations require minimum 5km distance from airports for most drone operations.',
      },
      {
        id: 'q3-2', quizId: 'quiz-3', type: 'mcq', order: 2, marks: 2,
        question: 'What does LiPo stand for?',
        options: ['Lithium Polymer', 'Light Power', 'Linear Polymer', 'Lithium Phosphate'],
        correctAnswer: 'Lithium Polymer',
        explanation: 'LiPo (Lithium Polymer) batteries are widely used in drones for their high energy density.',
      },
      {
        id: 'q3-3', quizId: 'quiz-3', type: 'true-false', order: 3, marks: 1,
        question: 'All drones in India must be registered under the DGCA Digital Sky platform.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'DGCA mandates registration of all drones except nano category on the Digital Sky platform.',
      },
    ],
  },
];

// ─── QUIZ ATTEMPTS ────────────────────────────────────────────────────────────

export const quizAttempts: QuizAttempt[] = [
  {
    id: 'attempt-1',
    quizId: 'quiz-1',
    userId: 'user-student-1',
    answers: { 'q1-1': 'Stabilization and autopilot control', 'q1-2': 'ArduPilot / PX4', 'q1-3': 'True', 'q1-4': 'Electronic Speed Controller', 'q1-5': 'PWM / DSHOT' },
    score: 9,
    totalMarks: 9,
    percentage: 100,
    passed: true,
    submittedAt: '2024-03-20T10:30:00Z',
    timeTaken: 8,
  },
];

// ─── ASSIGNMENTS ──────────────────────────────────────────────────────────────

export const assignments: Assignment[] = [
  {
    id: 'asgn-1',
    courseId: 'course-module-1',
    lessonId: 'l6',
    title: 'Motor and ESC Analysis Report',
    instructions: 'Research and document at least 3 different brushless motor specifications. Include KV rating, efficiency, and suitable applications. Submit a PDF report of minimum 500 words with diagrams.',
    deadline: '2024-04-05T23:59:59Z',
    maxMarks: 20,
    allowedFormats: ['pdf', 'doc', 'docx'],
    isPublished: true,
  },
  {
    id: 'asgn-2',
    courseId: 'course-module-1',
    lessonId: 'l17',
    title: 'Indian Drone Regulations Summary',
    instructions: 'Create a comprehensive summary of Indian drone regulations. Cover: 1) Drone categories 2) Registration process 3) No-fly zones 4) Pilot requirements. Submit as PDF.',
    deadline: '2024-04-20T23:59:59Z',
    maxMarks: 25,
    allowedFormats: ['pdf', 'doc', 'docx'],
    isPublished: true,
  },
];

export const assignmentSubmissions: AssignmentSubmission[] = [
  {
    id: 'asub-1',
    assignmentId: 'asgn-1',
    userId: 'user-student-1',
    textResponse: 'Submitted comprehensive motor analysis report.',
    submittedAt: '2024-04-03T15:00:00Z',
    status: 'graded',
    marks: 18,
    feedback: 'Excellent analysis! Your comparison of Sunnysky and T-Motor specifications was thorough. Minor improvement needed on efficiency curve analysis.',
    gradedAt: '2024-04-06T10:00:00Z',
    gradedBy: 'user-instructor-1',
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'proj-1',
    courseId: 'course-module-1',
    title: 'Quadcopter Frame Design & Assembly Plan',
    description: 'Design a complete quadcopter build plan including component selection, wiring diagram, and assembly sequence.',
    difficulty: 'medium',
    estimatedDuration: '1 Week',
    components: ['Frame selection', 'Motor sizing', 'Propeller matching', 'ESC selection', 'Battery selection', 'FC selection'],
    instructions: 'Create a detailed build plan document including: 1) Component specifications and reasons for selection, 2) Complete wiring diagram, 3) Estimated total cost in INR, 4) Assembly sequence with safety notes.',
    resources: ['Component selection guide', 'Wiring diagram template', 'Sample BOM sheet'],
    isPublished: true,
  },
];

// ─── RESOURCES ────────────────────────────────────────────────────────────────

export const resources: Resource[] = [
  { id: 'res-1', title: 'Module 1 – Complete Lecture Notes', type: 'pdf', url: '#', size: '4.2 MB', courseId: 'course-module-1', category: 'Lecture Notes', isPublic: false },
  { id: 'res-2', title: 'Drone Components Reference Guide', type: 'pdf', url: '#', size: '2.1 MB', courseId: 'course-module-1', category: 'Drone Guides', isPublic: false },
  { id: 'res-3', title: 'DGCA Drone Regulations 2021', type: 'pdf', url: '#', size: '1.8 MB', courseId: 'course-module-1', category: 'Technical Documents', isPublic: false },
  { id: 'res-4', title: 'Pre-flight Safety Checklist', type: 'pdf', url: '#', size: '0.5 MB', courseId: 'course-module-1', category: 'Checklists', isPublic: false },
  { id: 'res-5', title: 'LiPo Battery Care Guide', type: 'pdf', url: '#', size: '0.8 MB', courseId: 'course-module-1', category: 'Reference Material', isPublic: false },
  { id: 'res-6', title: 'Module 2 – Advanced Systems Notes', type: 'pdf', url: '#', size: '6.5 MB', courseId: 'course-module-2', category: 'Lecture Notes', isPublic: false },
  { id: 'res-7', title: 'ArduPilot Setup Guide', type: 'pdf', url: '#', size: '3.2 MB', courseId: 'course-module-2', category: 'Technical Documents', isPublic: false },
  { id: 'res-8', title: 'DroneKit Python Reference', type: 'pdf', url: '#', size: '2.4 MB', courseId: 'course-module-2', category: 'Reference Material', isPublic: false },
];

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    userId: 'user-student-2',
    courseId: 'course-module-2',
    certificateNumber: 'DA-2024-M2-00001',
    issuedAt: '2024-08-15T10:00:00Z',
    studentName: 'Priya Nair',
    courseName: 'Advanced Drone Technology – Module 2',
    instructorName: 'Dr. Ananya Singh',
    verificationUrl: 'https://droneacademy.in/verify/DA-2024-M2-00001',
  },
];

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: '🎉 New Lesson Added: Drone Navigation Systems',
    content: 'We are excited to announce that a new detailed lesson on drone navigation systems has been added to Module 2, Chapter 2. This lesson covers advanced GPS integration and RTK positioning.',
    authorId: 'user-instructor-1',
    targetAudience: 'module2',
    courseId: 'course-module-2',
    isPublished: true,
    createdAt: '2024-09-01T10:00:00Z',
  },
  {
    id: 'ann-2',
    title: '📚 Module 1 Study Material Updated',
    content: 'The lecture notes for Chapter 2 (Drone Components) have been updated with additional diagrams and a new section on motor selection criteria. Please download the updated PDF from the Resources section.',
    authorId: 'user-admin-1',
    targetAudience: 'module1',
    courseId: 'course-module-1',
    isPublished: true,
    createdAt: '2024-08-20T09:00:00Z',
  },
  {
    id: 'ann-3',
    title: '🏆 Congratulations to Our First Batch Graduates!',
    content: 'We are thrilled to announce the successful completion of our first batch of Module 2 students. Certificates have been issued to all qualifying students. Well done to everyone!',
    authorId: 'user-admin-1',
    targetAudience: 'all',
    isPublished: true,
    createdAt: '2024-08-16T10:00:00Z',
  },
];

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-student-1',
    title: 'Assignment Graded',
    message: 'Your Motor and ESC Analysis Report has been graded. Score: 18/20',
    type: 'grade',
    isRead: false,
    link: '/lms/assignments',
    createdAt: '2024-04-06T10:05:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-student-1',
    title: 'New Announcement',
    message: 'Module 1 Study Material has been updated with new diagrams',
    type: 'announcement',
    isRead: true,
    link: '/lms/announcements',
    createdAt: '2024-08-20T09:05:00Z',
  },
  {
    id: 'notif-3',
    userId: 'user-student-1',
    title: 'Enrollment Confirmed',
    message: 'You have been successfully enrolled in Drone Technology – Module 1',
    type: 'payment',
    isRead: true,
    link: '/lms/courses',
    createdAt: '2024-03-15T10:05:00Z',
  },
];
