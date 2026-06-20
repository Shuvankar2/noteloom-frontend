# 🎓 Note Loom — College Management Platform

**Note Loom** is a multi-tenant college management platform that covers academics, examinations, attendance, library management, AI-powered study tools, and a complete internal IT administration panel — all under a single unified system.

This is a Beta build it's prone to bugs and dosen't represents the final built.

Copyright &copy; 2026 Note Loom. All Rights Reserved.

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Architecture](#project-architecture)
4. [Directory Structure](#directory-structure)
5. [Multi-Tenancy Design](#multi-tenancy-design)
6. [Authentication & Session System](#authentication--session-system)
7. [Role System](#role-system)
8. [Backend — All Modules Explained](#backend--all-modules-explained)
9. [AI Feature — Deep Dive](#ai-feature--deep-dive)
10. [Frontend Overview](#frontend-overview)
11. [Database Models](#database-models)
12. [API Reference Summary](#api-reference-summary)
13. [Environment Variables](#environment-variables)
14. [Running the Project Locally](#running-the-project-locally)
15. [How Everything Connects](#how-everything-connects)

---

## 🧠 Project Overview

Note Loom is designed to serve **multiple colleges simultaneously** using a multi-tenant architecture. Each college (tenant) is isolated — their students, faculty, data, and features are completely separate from other colleges on the same platform.

The platform has **three user-facing portals**:
- **College Portal** — for Students, Faculty, and College Admins
- **IT Portal** — for Note Loom system administrators (Noteloom Admins & Managers)
- **AI Assistant** — embedded within the college portal, powered by Google Gemini + Cloudflare AI

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | Core UI framework |
| **Vite 7** | Build tool & dev server |
| **React Router DOM v6** | Client-side routing |
| **Tailwind CSS 3** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Icon library |
| **React Markdown** | Rendering AI markdown responses |
| **Mermaid.js** | Rendering AI-generated mind maps |
| **React PDF** | In-browser PDF viewer |
| **React Player** | Embedded video player |
| **jsPDF + AutoTable** | PDF export (admit cards, reports) |
| **React QR Code** | QR code generation |
| **React Barcode** | Barcode generation |
| **date-fns** | Date formatting utilities |
| **Supabase JS** | Storage (profile pictures) |
| **Firebase** | Additional cloud services |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB Atlas** | Primary database |
| **Mongoose** | ODM / schema management |
| **JWT (jsonwebtoken)** | Token signing |
| **bcryptjs** | Password hashing |
| **Multer** | File upload handling |
| **Nodemailer** | Email delivery (OTP verification) |
| **@google/generative-ai** | Google Gemini AI SDK |
| **Cloudflare AI (Workers AI)** | AI fallback provider |
| **Tesseract.js** | Local OCR engine |
| **pdf-parse** | Digital PDF text extraction |
| **pdf-poppler** | PDF-to-image conversion (for scanned PDF OCR) |
| **mammoth** | Word (.docx) text extraction |
| **ExcelJS** | Excel (.xlsx) text extraction |
| **officeparser** | PowerPoint (.pptx) text extraction |
| **fluent-ffmpeg + ffmpeg-static** | Video-to-audio extraction |
| **sharp** | Image resizing/compression |
| **adm-zip** | ZIP file inspection (scanned DOCX) |
| **nodemon** | Dev auto-restart |

---

## 🏗 Project Architecture

```
Browser (React SPA)
        │
        │ HTTP (Axios)
        ▼
Express REST API (Node.js) ── port 4000
        │
        ├── authMiddleware (setTenantContext / setITContext)
        │         └── Validates Session Token → populates req.user, req.tenant, req.role
        │
        ├── Route Handlers (16 route files)
        │         └── Interact with MongoDB via Mongoose models
        │
        ├── AI Routes (aiRoutes.js)
        │         ├── Google Gemini 2.5 Flash Lite (primary)
        │         └── Cloudflare Workers AI (fallback)
        │
        └── MongoDB Atlas
                  └── 33 Mongoose Collections
```

---

## 📁 Directory Structure

```
iem-notes-fullstack/
├── src/                        # React frontend
│   ├── App.jsx                 # Monolithic main component (~360KB)
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles
│   ├── components/             # Shared UI components
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page-level components
│   └── utils/                  # Frontend utility functions
│
├── backend/
│   ├── server.js               # Express app entry point
│   ├── config/
│   │   ├── db.js               # MongoDB Atlas connection
│   │   ├── masterFeatures.js   # Feature flags per role
│   │   └── systemRoles.js      # Role definitions
│   ├── routes/                 # 16 route files (one per domain)
│   ├── models/                 # 33 Mongoose schemas
│   ├── middleware/
│   │   └── authMiddleware.js   # Session validation (tenant & IT)
│   ├── services/
│   │   └── LocalOCR.js         # Tesseract.js wrapper
│   ├── utils/
│   │   └── userDTO.js          # Data Transfer Object for users
│   ├── scripts/
│   │   └── seed.js             # Database seeder
│   └── .env                    # Backend environment variables
│
├── webdata/                    # Static file storage (uploads, videos)
├── temp/                       # Temporary files for AI processing
├── package.json                # Frontend dependencies (Vite)
└── vite.config.js              # Vite configuration
```

---

## 🏢 Multi-Tenancy Design

This is the **most critical architectural pattern** in the system.

### How it works:

1. **Tenant** = a College. Each college is a `Tenant` document in MongoDB with a unique `collegeCode` (e.g., `1001`, `1002`).
2. Every user belongs to a college via the **Membership** collection (`userId` + `tenantId` + `role`).
3. Every piece of data (notices, classrooms, batches, library books, exam sessions, etc.) is tagged with a `tenantId` field.
4. When a user logs in, they provide their **college code**. The backend finds the matching tenant and creates a **Session** document linking `userId` + `tenantId`.
5. Every subsequent API request includes this session token. The `setTenantContext` middleware validates it and injects `req.tenant`, `req.user`, and `req.role` into every request — ensuring all database queries are automatically scoped to that college.

### Key Models for Multi-Tenancy:
| Model | Role |
|---|---|
| `Tenant` | Represents a college (name, code, logo, status) |
| `Membership` | Links user ↔ tenant with a role |
| `Session` | Active login session token with expiry |
| `SystemConfig` | Per-tenant feature flag configuration |

---

## 🔐 Authentication & Session System

### Sign-Up Flow
1. User enters email → backend checks if already registered (`/api/auth/check-email`)
2. A 6-digit OTP is generated, stored in `EmailVerification` collection with a 10-minute TTL, and sent via **Nodemailer** (Gmail SMTP)
3. User enters OTP → backend verifies and marks code as used
4. User submits full registration form with college code → backend:
   - Creates `User` document (hashed password via bcrypt)
   - Finds `Tenant` by college code
   - Creates `Membership` record linking user to tenant with role
   - Creates a role-specific **Profile** (StudentProfile / FacultyProfile / AdminProfile)
   - Auto-generates a unique **UID** (format: `{collegeCode}{year}{sequentialNumber}`)

### Sign-In Flow
1. User submits email + password + college code
2. Backend verifies credentials with `bcrypt.compare`
3. Finds the tenant by college code and validates user's membership in that tenant
4. Signs a **JWT** (`{ userId, tenantId, collegeCode }`) with 24-hour expiry
5. Creates a `Session` document in MongoDB storing the token + expiry
6. Returns the `sessionToken` to the frontend, which stores it in `localStorage`

### Request Authentication
Every protected API request sends `Authorization: Bearer <sessionToken>`.
The `setTenantContext` middleware:
- Looks up the session token in the `Session` collection (checks expiry)
- Populates `req.user` (id, name, email), `req.tenant` (id, name, code), `req.role`
- Updates `session.lastActivity` timestamp
- Calls `next()` — or returns 401/403 on failure

### IT Portal Authentication
Uses a separate `setITContext` middleware that checks if the membership role is `it_admin` or `it_user`. The frontend role labels (`noteloom_admin`, `noteloom_manager`) are mapped server-side for compatibility.

### Automated Cleanup (Scheduled Tasks)
The server runs two `setInterval` jobs every hour:
- Deletes expired `EmailVerification` records
- Permanently deletes `PhysicalBook` records scheduled for deletion after their 48-hour buffer

---

## 👥 Role System

| Role (DB) | Frontend Label | Access Level |
|---|---|---|
| `student` | Student | College portal — student features |
| `faculty` | Faculty | College portal — faculty features |
| `college_admin` | College Admin | Full college management |
| `it_user` | Noteloom Manager | IT portal — limited access |
| `it_admin` | Noteloom Admin | IT portal — full system control |

Features visible to each role are controlled by `masterFeatures.js` (backend config) and stored per-tenant in `SystemConfig`. The IT Admin can toggle any feature ON/OFF for any college and role via the Feature Manager panel.

---

## 📦 Backend — All Modules Explained

### 1. `authRoutes.js` — `/api/auth`
Handles the full authentication lifecycle:
- `POST /check-email` — Checks if email is already registered
- `POST /send-verification` — Sends OTP via Nodemailer
- `POST /verify-email` — Validates OTP
- `POST /role-signup` — Full registration (User + Membership + Profile)
- `POST /signin` — Login, JWT creation, Session creation
- `POST /signout` — Deletes session from DB
- `GET /verify-token` — Validates JWT on page refresh
- `GET /public/colleges` — Lists all active colleges for the login screen

### 2. `aiRoutes.js` — `/api/ai`
The entire AI system. See [AI Feature Deep Dive](#ai-feature--deep-dive) below.

### 3. `lmsRoutes.js` — `/api`
Learning Management System:
- Manages **ClassModules** (chapters/units within a classroom)
- Manages **ClassContent** (files, YouTube links, text per module)
- Tracks **student progress** per content item (`ContentProgress`)
- Faculty can upload files (stored in `webdata/uploads/classrooms/`)
- Faculty can toggle download permissions per content item
- Students can mark content as completed

### 4. `coeRoutes.js` — `/api/coe`
Controller of Examinations (full exam management):
- **Exam Sessions** — Create, activate (only one active at a time), archive, edit
- **Student Eligibility** — Checks student's batch, semester, cycle (Odd/Even), then builds a list of regular + backlog subjects dynamically from the Subject collection
- **Exam Form Submission** — Student selects subjects and submits form
- **Question Bank** — Faculty upload previous question papers (PDF/file)
- **Results** — Marks upload (bulk via array), publish toggle, per-student results
- **Admin Reports** — All submitted forms, exam status (submitted vs pending per student)
- **Student-Subject Allocation** — Admin maps subjects to students per batch/semester

### 5. `libraryRoutes.js` — `/api/library`
Dual library management:

**Digital Library:**
- Store/manage external resource links (PDFs, videos, books by URL)
- Faculty uploads → status `Pending` (requires admin approval)
- Students/Admin uploads → auto `Approved`
- Admin can approve/reject pending resources

**Physical Library:**
- Inventory of physical books with copy-level tracking
- Each copy has: `copyId`, `status` (Available/Issued/Removed), `issuedTo` (embedded user data)
- Lookup user by email, UID, roll number, or employee ID
- Checkout: issues a copy to a user (sets 14-day due date)
- Return: atomic MongoDB `$set` update to reset copy status
- Scheduled deletion: copies marked `Removed` are permanently deleted after a buffer period

### 6. `attendanceRoutes.js` — `/api/attendance`
- Faculty initializes attendance for a batch + date
- System fetches today's class routine (periods, subjects, faculty)
- Faculty marks each student Present/Absent/Late per period
- Upserts `Attendance` document per batch + period + date
- Supports backdated attendance marking

### 7. `timetableRoutes.js` — `/api`
Manages academic calendar and class routines:
- Weekly routine builder (day → periods → subject/faculty mapping)
- Lesson plan tracking
- Academic calendar events

### 8. `noticeRoutes.js` — `/api/notices`
Notice board system:
- Create/read/delete notices
- Role-filtered (departmental notices vs staff notices)
- Tenant-scoped

### 9. `leaveRoutes.js` — `/api/leave`
Faculty leave management:
- Faculty applies for casual/sick leave
- College Admin views and approves/rejects
- Tenant-scoped leave records

### 10. `departmentRoutes.js` — `/api/departments`
- CRUD for college departments
- Each department has streams and links to subjects and batches

### 11. `classroomRoutes.js` — `/api/classrooms`
- Virtual classrooms for each course/batch combination
- Enroll/unenroll students
- Link to LMS modules

### 12. `batchRoutes.js` — `/api/batches`
- Manage student batches (year-based groups)
- Track current term/semester
- Batch ↔ Department ↔ Subject relationships

### 13. `collegeAdminRoutes.js` — `/api/college-admin`
- User management (view all students, faculty, admins)
- Profile approvals (approve pending faculty accounts)
- Account creation management

### 14. `itAdminRoutes.js` — `/it-admin`
IT system administration:
- Login/logout for IT staff
- **College Management**: create colleges (auto-generates incremental college codes starting from 1001), edit details, suspend, schedule deletion (90-day buffer)
- **Feature Manager**: configure which features are visible to each role per tenant (stored in `SystemConfig`)
- **User Management**: view all IT staff accounts
- **Request Handling**: college admin requests, manager requests

### 15. `sessionRoutes.js` — `/session`
Provides session info lookup (user profile, tenant details) using the session token.

### 16. `systemRoutes.js` — `/`
Health check and system-level endpoints.

---

## 🤖 AI Feature — Deep Dive

The AI system is in `backend/routes/aiRoutes.js`. It uses a **primary + fallback dual-AI strategy**.

### Primary AI: Google Gemini 2.5 Flash Lite
- Configured via `GEMINI_API_KEY`
- Model: `gemini-2.5-flash-lite`
- Handles text prompts, multimodal (image, audio, video, PDF)
- Rate limit handling: automatic retry up to 3 times with 4-second delay on 429/503 errors

### Fallback AI: Cloudflare Workers AI
- Configured via `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN`
- Text: `@cf/meta/llama-3-8b-instruct`
- Vision: `@cf/meta/llama-3.2-11b-vision-instruct`
- Audio: `@cf/openai/whisper`

---

### Endpoint 1: `POST /api/ai/chat` — AI Study Buddy
Three modes:

| Mode | Behavior |
|---|---|
| `default` | Friendly assistant ("Noteloom AI") |
| `tutor` | Socratic tutor — asks guiding questions instead of giving answers directly |
| `mindmap` | Generates a Mermaid.js flowchart for any topic |

**Mind Map Flow:**
1. Gemini generates Mermaid.js `graph TD` code
2. Backend sanitizes the code (`cleanMermaidCode()`) — fixes arrow syntax, removes code fences
3. Response is wrapped with `:::MERMAID_Start:::...:::MERMAID_End:::` tags
4. Frontend detects the tags and renders a `<MermaidDiagram />` component

---

### Endpoint 2: `POST /api/ai/summarize-file` — Summarize & Solve
Accepts any file upload (up to 50MB) and summarizes or solves it.

**File Processing Pipeline:**

```
Upload File
    │
    ▼
What type?
    ├── PDF / Image / Audio / Video
    │       └── ATTEMPT 1: Upload to Gemini File API → Wait for PROCESSING state → Generate content
    │               └── FAIL? → ATTEMPT 2: Cloudflare fallback
    │
    └── DOCX / XLSX / PPTX / Text
            └── Extract text locally first:
                    ├── .docx → mammoth (text) → if <50 chars → Tesseract OCR on embedded images
                    ├── .xlsx → ExcelJS
                    ├── .pptx → officeparser
                    └── Send extracted text to Gemini → FAIL? → Cloudflare Llama 3
```

**Scanned Document OCR (for Cloudflare fallback):**
- **Scanned PDF**: Uses `pdf-poppler` to convert each page to PNG → Tesseract.js reads each PNG → merges text. **25-page limit enforced.**
- **Scanned DOCX**: Opens the `.docx` ZIP container, finds `word/media/` images → Tesseract.js reads each. **25-image limit enforced.**
- **Images**: Resize to max 1024×1024px via `sharp` → send to Cloudflare Vision AI → fallback to local Tesseract OCR

---

### Endpoint 3: `POST /api/ai/transcribe-local-video` — Lecture Video AI
Analyzes locally stored classroom video files.

**Strategy:**
```
Video File (from webdata/uploads/classrooms/)
    │
    ▼
STRATEGY A: Upload to Gemini File API
    → Wait for PROCESSING
    → Generate: summary + bullet points of lecture content
    │
    └── FAIL? → STRATEGY B: FFmpeg fallback
            ├── Extract audio track → WAV (mono, 16kHz, via ffmpeg-static)
            ├── Send WAV to Cloudflare Whisper (speech-to-text)
            ├── Empty transcript? → "Silent video" message
            └── Has transcript? → Send to Cloudflare Llama 3 to summarize
```

### Local OCR Service (`services/LocalOCR.js`)
A thin wrapper around **Tesseract.js** that:
- Accepts an image buffer
- Runs English OCR locally (no external API)
- Used as a last-resort fallback when cloud AI is unavailable

---

## 🖥 Frontend Overview

The frontend is a **React SPA** served by Vite. The main file is `src/App.jsx` — a large monolithic component that handles routing and all major page rendering.

### Key Frontend Capabilities:
- **Multi-portal routing** — College portal vs IT portal vs public landing/login pages
- **Session persistence** — `localStorage` for session token; auto-verifies on reload
- **Role-based UI** — Dashboard features toggled based on role + SystemConfig from backend
- **AI Chat Panel** — Floating assistant with chat history, file upload, mindmap rendering
- **PDF Generation** — jsPDF for admit cards, fee receipts, reports
- **QR/Barcode** — Library book cards with QR codes and barcodes
- **Video Player** — react-player for streaming classroom videos
- **In-browser PDF viewer** — react-pdf for document preview
- **Mermaid rendering** — Dynamic mind map diagrams from AI output

---

## 🗄 Database Models

| Model | Purpose |
|---|---|
| `User` | Core user (email, hashed password, role) |
| `Tenant` | College entity (name, code, logo, status) |
| `Membership` | User ↔ Tenant ↔ Role relationship |
| `Session` | Active login sessions with expiry |
| `EmailVerification` | OTP codes (10-min TTL) |
| `StudentProfile` | Student details (roll no, UID, batch, semester) |
| `FacultyProfile` | Faculty details (employee ID, department, designation) |
| `AdminProfile` | College admin details |
| `ITUserProfile` | IT staff profile |
| `ITAdminProfile` | IT admin profile |
| `Department` | College departments with streams |
| `Subject` | Subjects (code, credits, semester, type) |
| `Batch` | Student batch (year, current term, department) |
| `Classroom` | Virtual classroom entity |
| `ClassModule` | Module/chapter within a classroom |
| `ClassContent` | Content item (file, link, video) per module |
| `ContentProgress` | Student progress per content item |
| `Routine` | Weekly class routine (day → periods) |
| `Attendance` | Attendance records per batch + period + date |
| `ExamSession` | Examination session (name, cycle, fees) |
| `StudentExamForm` | Submitted exam form per student per session |
| `ExamResult` | Marks per student per subject |
| `QuestionBank` | Uploaded question papers (file) |
| `StudentSubjectMap` | Subject allocation per student per semester |
| `COE_Extended` | Extended exam data models |
| `Notice` | Notice board entries |
| `LeaveApplication` | Faculty leave requests |
| `Library (3 models)` | `LibraryCredential`, `DigitalResource`, `PhysicalBook` |
| `SystemConfig` | Per-tenant feature flag configuration |
| `CollegeAdminRequest` | Requests to create college admin accounts |
| `NoteloomManagerRequest` | Requests to create IT manager accounts |
| `Counter` | Auto-increment counter utility |

---

## 🔌 API Reference Summary

| Prefix | Module |
|---|---|
| `GET /health` | Health check |
| `/api/auth/*` | Authentication (signup, signin, OTP, signout) |
| `/api/ai/*` | AI chat, file summarize, video transcribe |
| `/api/departments/*` | Department CRUD |
| `/api/classrooms/*` | Classroom management |
| `/api/batches/*` | Batch management |
| `/api/notices/*` | Notice board |
| `/api/coe/*` | Exam sessions, forms, results, question bank |
| `/api/leave/*` | Faculty leave applications |
| `/api/library/*` | Digital + Physical library |
| `/api/attendance/*` | Attendance marking and reports |
| `/api/modules, /api/content` | LMS (via lmsRoutes) |
| `/api/college-admin/*` | College admin panel |
| `/it-admin/*` | IT admin panel (colleges, features, users) |
| `/it-auth/*` | IT authentication |
| `/session/*` | Session data lookup |
| `/webdata/*` | Static file serving (uploads) |

---

## 🚀 Project Details

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key
- Gmail account with App Password enabled


## 🔗 How Everything Connects

```
USER LOGS IN
    │ POST /api/auth/signin  (email + password + collegeCode)
    ▼
Backend: Finds User → Finds Tenant → Validates Membership → Creates Session
    │ Returns: sessionToken (JWT)
    ▼
FRONTEND stores sessionToken in localStorage

EVERY API REQUEST
    │ Header: Authorization: Bearer <sessionToken>
    ▼
setTenantContext middleware:
    Session.findOne(token) → populate User + Tenant → find Membership
    → injects req.user, req.tenant, req.role into every route handler
    ▼
Route handler runs DB query SCOPED to req.tenant.id
    → Only returns data belonging to that college
    ▼
Response sent to React frontend
    → UI renders based on req.role (student / faculty / college_admin)

AI FEATURE FLOW
    │ User uploads file or types message
    ▼
POST /api/ai/summarize-file OR /api/ai/chat
    → Try Google Gemini (primary)
    → If fails (429, 503, quota) → Try Cloudflare Workers AI (fallback)
    → If image/PDF is scanned → Tesseract.js local OCR (last resort)
    → If video lecture → FFmpeg audio extraction → Whisper transcription → Llama 3 summary
    ▼
Response streamed back to React → Markdown rendered → Mermaid diagram rendered if mindmap
```

---

## 📋 Key Design Decisions

| Decision | Reasoning |
|---|---|
| **Session in DB (not stateless JWT only)** | Allows instant session invalidation (logout, suspension) without waiting for JWT expiry |
| **Dual AI strategy (Gemini + Cloudflare)** | Ensures 99%+ uptime for AI features even during Gemini rate limits or outages |
| **Local Tesseract OCR** | Zero-cost fallback for scanned documents; no third-party API dependency |
| **25-page OCR limit** | Prevents memory exhaustion and extreme processing times on the server |
| **Embedded `issuedTo` in PhysicalBook copies** | Avoids expensive joins on every book lookup; snapshot-style data at time of issue |
| **`masterFeatures.js` + `SystemConfig`** | Decouples feature list (code) from feature activation (database), allowing IT to toggle features without code deploys |
| **Incremental college codes (1001, 1002...)** | Predictable, human-readable IDs for college identification instead of random numbers |
| **`setInterval` cleanup jobs** | Prevents database bloat from expired OTPs and soft-deleted records without a separate job scheduler |

---

## 👤 Author

**Shuvankar**
Project: Note Loom - Beta
Version: `V1.0.43`

---

Generated at: 2026-05-27T22:57:01.112752 UTC
