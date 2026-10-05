# Drone Training Course Web Platform & Learning Management System (LMS)

A production-quality **Drone Training Course Platform + LMS** built with Next.js (App Router), TypeScript, and Tailwind CSS. Designed with modern aviation and aerospace aesthetics, light-mode design tokens, and a complete suite of educational tools for aspiring commercial drone pilots and UAV engineers.

---

## 🚀 Key Features

### 1. Public Marketing & Admissions
- **Aviation Landing Page**: Hero section, stats, interactive curriculum preview, pricing cards, testimonials, and trust pillars.
- **Courses Catalog (`/courses`)**: Detailed comparison between **Module 1 (Foundations)** and **Module 2 (Advanced Systems)** with feature matrix.
- **Interactive Curriculum (`/curriculum`)**: Searchable, expandable chapter accordions with lesson durations and free preview markers.
- **About Us (`/about`)**: DGCA accreditation, 12-acre test airfield facilities, and chief flight faculty bios.
- **FAQ Center (`/faq`)**: Live search and category filters covering licensing, hardware requirements, and career paths.
- **Admissions Contact (`/contact`)**: Consultation booking form, airfield GPS coordinates, hotline, and safety guidelines.
- **Certificate Verification (`/verify-certificate`)**: Public portal to verify authenticity of issued drone pilot credentials.

### 2. E-Commerce & Checkout
- **Checkout Flow (`/checkout`)**: Multi-payment simulator (UPI, Credit/Debit cards, Net Banking, EMI) via Razorpay.
- **Promotional Coupons**: Real-time coupon validator supporting percentage (`EARLYBIRD`) and fixed amount discounts (`DRONEPILOT`, `AERO500`).
- **Instant Enrollment**: Automatic course enrollment upon successful payment.

### 3. Student Learning Management System (LMS)
- **Student Dashboard (`/lms`)**: Overall completion tracking, enrolled courses, next recommended lesson launcher, and study stats.
- **My Courses (`/lms/courses`)**: Enrolled courses and chapter syllabus progress.
- **My Learning Hub (`/lms/lessons`)**: Filterable lesson list (completed vs pending, video vs article).
- **Classroom Player (`/lms/lesson/[lessonId]`)**: Embedded video player, lecture notes, transcripts, downloadable resources, and next/prev lesson navigation.
- **Quizzes Hub (`/lms/quiz` & `/lms/quiz/[quizId]`)**: Timed assessments, automatic scoring, pass/fail thresholds, and question explanations.
- **Assignments (`/lms/assignments`)**: File uploads and text response submissions with faculty feedback.
- **Field Projects (`/lms/projects`)**: Capstone projects (autonomous waypoint missions, propulsion BOM, photogrammetry) with rubric scoring.
- **Certificates (`/lms/certificates`)**: Dynamic certificate generator, downloadable credentials, and verification links.
- **Resource Downloads (`/lms/resources`)**: DGCA regulations PDFs, pre-flight checklists, and technical documentation.
- **Announcements (`/lms/announcements`)**: Airspace circulars and batch broadcast notices.
- **Support Desk (`/lms/support`)**: Student doubt submission and FAQ lookup.
- **Pilot Cadet Profile (`/lms/profile`)**: Flight simulator hours, pilot ID card, achievements, and badges.
- **Settings (`/lms/settings`)**: Notification preferences, video playback speed, and security credentials.

### 4. Role Portals
- **Admin Dashboard (`/admin`)**: Student roster, gross sales analytics, promotional coupon manager, and announcement broadcasting.
- **Instructor Desk (`/instructor`)**: Evaluation queue for cadet deliverables, student doubt answering desk, and live webinar scheduler.

---

## 🔑 Demo Accounts

| Role | Name | Email | Password | Access Route |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Rahul Verma | `rahul@example.com` | `student123` | `/lms` |
| **Instructor** | Dr. Ananya Singh | `instructor@droneacademy.in` | `instructor123` | `/instructor` |
| **Administrator** | Rajesh Sharma | `admin@droneacademy.in` | `admin123` | `/admin` |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Custom CSS Variables (Light-mode Aviation Palette)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```
