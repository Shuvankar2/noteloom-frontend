// COMPLETE WORKING App.jsx - Individual Students + Remove Book Icon

import React, { useEffect, useState, useRef } from "react";
import { GraduationCap } from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ClsContentDetails from './components/ClsContentDetails';
import StandaloneViewer from './components/StandaloneViewer';
import ClassroomView from './pages/ClassroomView';
import VideoStandalone from './pages/VideoStandalone';
import NoteloomAi from './components/NoteloomAi';
import FacultyLeave from './components/LeaveManager/FacultyLeave';
import AdminLeaveManager from './components/LeaveManager/AdminLeaveManager';
import VideoPlayerPage from './pages/dashboard/VideoPlayerPage';

// --- Pages ---
// Auth & Public
import { ErrorPopupProvider } from './context/ErrorPopupContext';
import LandingPage from './pages/public/LandingPage';
import CollegeSelection from './pages/auth/CollegeSelection';
import LoginPage from './pages/auth/LoginPage';
import ITLoginPage from './pages/auth/ITLoginPage';
import TimetableDashboard from "./pages/dashboard/TimetableDashboard";

// IT Admin
import ITAdminDashboard from './pages/admin/ITAdminDashboard';
import FeatureManager from './pages/admin/FeatureManager';
import AddEditContentPage from './pages/admin/AddEditContentPage';

// Dashboard
import CollegeDashboard from './pages/dashboard/CollegeDashboard';
import ManageDepartments from './pages/dashboard/ManageDepartments';
import ManageUsers from './pages/dashboard/ManageUsers';
import AccountCreationManager from './pages/dashboard/AccountCreationManager';
import NoticeBoard from './pages/dashboard/NoticeBoard';
import MyClasses from './pages/dashboard/MyClasses';
import MyCourses from './pages/dashboard/MyCourses';
import SessionExpiredPage from './components/common/SessionExpiredPage';

import MarkAttendance from './pages/dashboard/MarkAttendance';
import DigitalLibrary from './pages/dashboard/DigitalLibrary';
import Chat from './pages/dashboard/Chat';

import Attendance from './pages/dashboard/Attendance';
import ExamForm from './pages/dashboard/ExamForm';
import FeesTrackRecords from './pages/dashboard/FeesTrackRecords';
import ExamManagement from './pages/dashboard/ExamManagement';
import AdmitCard from './pages/dashboard/AdmitCard';
import SemesterFeedback from './pages/dashboard/SemesterFeedback';
import UniversityMarks from './pages/dashboard/UniversityMarks';
import PaymentHistory from './pages/dashboard/PaymentHistory';
import PaymentDetails from './pages/dashboard/PaymentDetails';
import AcademicCalendar from './pages/dashboard/AcademicCalendar';
import AdminUniversityMarks from './pages/dashboard/AdminUniversityMarks';

//COE imports
import COEManager from './components/coe/COEManager';
import FacultyQuestionBank from './components/coe/FacultyQuestionBank';
import StudentExamPortal from './components/coe/StudentExamPortal';

// API Base URL
const API_BASE = 'https://noteloom-api.vercel.app';

// Session timeout in milliseconds (30 minutes of inactivity)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// COLLEGE CONFIGURATION - Change these values for individual colleges
const COLLEGE_CONFIG = {
  // Set either logoUrl OR bannerUrl (not both)
  logoUrl: "/webdata/clg-logo/IEM-Kolkata.png", // College Logo
  bannerUrl: "", // College Banner Image (set this to use banner instead of logo)
  collegeName: "Institute of Engineering Management Kolkata",
  // For IT Dashboard - uses separate IT footer
  useDefaultFooter: false
};



// Regular Session Manager Hook
const useSessionManager = () => {
  const [isSessionValid, setIsSessionValid] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const lastActivityRef = useRef(Date.now());
  const sessionCheckRef = useRef(null);
  const navigate = useNavigate();

  // Update last activity time
  const updateActivity = () => {
    lastActivityRef.current = Date.now();
    localStorage.setItem('lastActivity', lastActivityRef.current.toString());
  };

  // Fetch session info from MongoDB backend
  const checkSession = async () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      setIsSessionValid(false);
      setLoading(false);
      return false;
    }

    try {
      const response = await fetch(`${API_BASE}/session/info`, {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Set user data
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          uid: data.user.uid
        });

        // Set profile data
        setProfile({
          id: data.user.id,
          role: data.role,
          college: data.tenant.name,
          full_name: data.user.name,
          isIndividual: data.isIndividual
        });

        setIsSessionValid(true);
        setLoading(false);
        return true;
      } else {
        await clearSession();
        return false;
      }
    } catch (error) {
      console.error('Session check failed:', error);
      await clearSession();
      return false;
    }
  };

  // Clear session
  const clearSession = async () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      try {
        await fetch(`${API_BASE}/auth/signout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }

    localStorage.removeItem('sessionToken');
    localStorage.removeItem('lastActivity');
    localStorage.removeItem('sessionStart');
    setUser(null);
    setProfile(null);
    setIsSessionValid(false);
  };

  // Initialize session
  const initializeSession = (loginData) => {
    const now = Date.now();
    localStorage.setItem('sessionToken', loginData.sessionToken);
    localStorage.setItem('sessionStart', now.toString());
    localStorage.setItem('lastActivity', now.toString());
    lastActivityRef.current = now;

    setUser({
      id: loginData.user.id,
      email: loginData.user.email,
      name: loginData.user.name,
      uid: loginData.user.uid
    });

    setProfile({
      id: loginData.user.id,
      role: loginData.role,
      college: loginData.tenant.name,
      full_name: loginData.user.name,
      isIndividual: loginData.isIndividual
    });

    setIsSessionValid(true);
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (mounted) {
        await checkSession();
      }
    };

    initializeAuth();

    // Activity listeners
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Periodic session check
    sessionCheckRef.current = setInterval(async () => {
      if (mounted) {
        await checkSession();
      }
    }, 60000); // Check every minute

    return () => {
      mounted = false;

      if (sessionCheckRef.current) {
        clearInterval(sessionCheckRef.current);
      }

      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, []);

  return {
    user,
    profile,
    loading,
    isSessionValid,
    clearSession,
    updateActivity,
    checkSession,
    initializeSession
  };
};

const iconMap = {
  // Student Icons
  BookOpen,
  ClipboardList,
  MessageSquare,
  Library,
  Calendar,
  Banknote,
  IndianRupee,
  FolderPlus,
  GraduationCap,
  ListTodoIcon,
  FormInputIcon,
  FileText,

  // ADD THESE NEW ICONS:
  Receipt, // For Payment Details
  User,    // For Update Profile

  // Faculty Icons
  Users,
  PenBoxIcon,
  CheckCircle,
  Upload,
  Clock,
  Briefcase: Briefcase,

  // Admin Icons
  Settings,
  ShieldCheck,
  UserPlus,
  Building,
  FileCog,

  // Fallback
  Default: Circle
};


// Continue with IT Dashboard and App components in next part...
// Dashboard Router Component - Routes to Individual or College Dashboard
const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { user, profile, loading, isSessionValid } = useSessionManager();
  const navigate = useNavigate();

  // 🔐 Auth-based dashboard protection (DOMAIN-SAFE)
  useEffect(() => {
    const currentUrl = window.location.pathname;

    // 🚫 NEVER redirect while loading (prevents race conditions)
    if (loading) return;

    // ✅ Redirect ONLY when session is truly invalid
    if (!isSessionValid && currentUrl === "/dashboard") {
      navigate("/college-selection", { replace: true });
    }
  }, [loading, isSessionValid, navigate]);

  // ⏳ Loading state (safe)
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
      >
        <div className="text-center">
          <GraduationCap className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p
            className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ❌ Session expired (only after loading finishes)
  if (!isSessionValid) {
    return (
      <SessionExpiredPage
        onLoginRedirect={() => navigate("/login", { replace: true })}
      />
    );
  }

  // Logic for Individual Student removed. 
  // All valid sessions now direct to CollegeDashboard.
  return <CollegeDashboard />;
};




const App = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <ErrorPopupProvider>
        <Routes>
          <Route path="/dashboard/manage-departments" element={<ManageDepartments />} />
          <Route path="/dashboard/timetable" element={<TimetableDashboard />} />
        // Inside App.jsx routes
          <Route path="/it-admin/features" element={<FeatureManager />} />
          <Route
            path="/"
            element={<LandingPage navigate={navigate} />}
          />
          <Route
            path="/college-selection"
            element={<CollegeSelection navigate={navigate} />}
          />
          <Route path="/dashboard/video-player" element={<VideoPlayerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:college/:role" element={<Dashboard />} />
          <Route path="/dashboard/manage-users" element={<ManageUsers />} />
          <Route path="/dashboard/account-creation" element={<AccountCreationManager />} />
          <Route path="/dashboard/staff-notices" element={<NoticeBoard type="staff" />} />
          <Route path="/dashboard/dept-notices" element={<NoticeBoard type="departmental" />} />
          <Route path="/dashboard/my-classes" element={<MyClasses />} />
          <Route path="/dashboard/classrooms/:id" element={<ClassroomView />} />
          <Route path="/dashboard/courses" element={<MyCourses />} />

          <Route path="dashboard/attendance-marking" element={<MarkAttendance />} />
          <Route path="dashboard/library" element={<DigitalLibrary />} />
          <Route path="/dashboard/chat" element={<Chat />} />

          <Route path="/dashboard/attendance" element={<Attendance />} />

          <Route
            path="/dashboard/classrooms/:classId/content/:contentId"
            element={<ClsContentDetails />}
          />
          <Route path="/pdf-viewer" element={<StandaloneViewer />} />
          <Route path="/video-standalone" element={<VideoStandalone />} />
          <Route path="/dashboard/leave-apply" element={<FacultyLeave />} />
          <Route path="/dashboard/leave-manager" element={<AdminLeaveManager />} />


          {/* COE Routes */}
          <Route path="/dashboard/coe-manage" element={<COEManager />} />
          <Route path="/dashboard/question-bank" element={<FacultyQuestionBank />} />
          <Route path="/dashboard/exam-portal" element={<StudentExamPortal />} />
          {/* <Route path="/dashboard/results" element={<StudentExamPortal />} /> Reusing portal for results tab */}
          <Route path="/dashboard/exam-form" element={<ExamForm />} />
          <Route path="/dashboard/fees-exam-records" element={<FeesTrackRecords />} />
          <Route path="/dashboard/fees" element={<PaymentHistory />} />
          <Route path="/dashboard/payment-details" element={<PaymentDetails />} />
          <Route path="/dashboard/exam-management" element={<ExamManagement />} />
          <Route path="/dashboard/admit-card" element={<AdmitCard />} />
          <Route path="/dashboard/feedback" element={<SemesterFeedback />} />
          <Route path="/dashboard/results" element={<UniversityMarks />} />
          <Route path="/dashboard/org-calendar" element={<AcademicCalendar />} />
          <Route path="/dashboard/university-marks" element={<AdminUniversityMarks />} />

          {/* IT Portal Routes */}
          <Route path="/it-login" element={<ITLoginPage />} />
          <Route path="/it-admin" element={<ITAdminDashboard />} />

        // ADD THESE NEW ROUTES:
          <Route path="/it-admin/content/add" element={<AddEditContentPage />} />
          <Route path="/it-admin/content/edit" element={<AddEditContentPage />} />
          <Route
            path="/it-admin/feature-manager"
            element={<FeatureManager />}
          />

        </Routes>
        <NoteloomAi />
      </ErrorPopupProvider>
    </ThemeProvider>
  );
};

export default App;