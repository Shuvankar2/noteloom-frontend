// COMPLETE WORKING App.jsx - Individual Students + Remove Book Icon

import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Settings,
  CheckCircle,
  GraduationCap
} from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ClsContentDetails from './components/ClsContentDetails';
import StandaloneViewer from './components/StandaloneViewer';
import ClassroomView from './pages/ClassroomView';
import VideoStandalone from './pages/VideoStandalone';
import NoteloomAi from './components/NoteloomAi';
import FacultyLeave from './components/LeaveManager/FacultyLeave';
import AdminLeaveManager from './components/LeaveManager/AdminLeaveManager';

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




// --- Custom Video Player Page ---
const VideoPlayerPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Data from navigation
  const videoUrl = state?.videoUrl;
  const title = state?.title || "Video Player";

  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000); // Hide after 3s of inactivity
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  // Handle Video Events
  const handleTimeUpdate = () => setCurrentTime(videoRef.current?.currentTime || 0);
  const handleLoadedMetadata = () => setDuration(videoRef.current?.duration || 0);

  // Controls Logic
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const changeSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!videoUrl) return <div className="text-white bg-black h-screen flex items-center justify-center">No Video Source</div>;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col font-sans">
      {/* Header (Back Button) */}
      <div className={`absolute top-0 left-0 right-0 p-4 z-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={() => navigate(-1)} className="flex items-center text-white/80 hover:text-white bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Classroom
        </button>
      </div>

      {/* Video Element */}
      <div className="flex-1 relative flex items-center justify-center bg-black group" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full max-h-screen object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Center Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 pb-6 pt-16 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-4 group/timeline cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = percent * duration;
          }}>
          <span className="text-xs font-mono text-white/80 w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full relative overflow-hidden group-hover/timeline:h-2.5 transition-all">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-white/80 w-10">{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
              {isPlaying ? <span className="w-8 h-8 flex items-center justify-center"><div className="w-3 h-8 bg-white rounded-sm mr-1"></div><div className="w-3 h-8 bg-white rounded-sm"></div></span> : <Play className="w-8 h-8 fill-white" />}
            </button>

            <button onClick={() => skip(-10)} className="text-white hover:text-blue-400 flex flex-col items-center group">
              <RotateCcw className="w-6 h-6" />
              <span className="text-[10px] opacity-0 group-hover:opacity-100 absolute -bottom-4">-10s</span>
            </button>

            <button onClick={() => skip(10)} className="text-white hover:text-blue-400 flex flex-col items-center group">
              <div className="transform scale-x-[-1]"><RotateCcw className="w-6 h-6" /></div>
              <span className="text-[10px] opacity-0 group-hover:opacity-100 absolute -bottom-4">+10s</span>
            </button>

            <div className="flex items-center gap-2 group/vol relative">
              <div className="p-2"><Volume2Icon className="w-6 h-6 text-white" /></div>
              <input
                type="range" min="0" max="1" step="0.1"
                value={volume}
                onChange={(e) => { setVolume(e.target.value); videoRef.current.volume = e.target.value; }}
                className="w-0 overflow-hidden group-hover/vol:w-24 transition-all h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-white font-bold truncate max-w-md opacity-80 mr-4 hidden md:block">{title}</div>

            {/* Speed Control */}
            <div className="relative">
              <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors">
                {playbackSpeed}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 border border-white/10 rounded-lg p-1 min-w-[100px] flex flex-col">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(s => (
                    <button key={s} onClick={() => changeSpeed(s)} className={`px-4 py-2 text-sm text-left hover:bg-white/20 rounded ${playbackSpeed === s ? 'text-blue-400 font-bold' : 'text-white'}`}>
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Control (Visual Only for Local Files) */}
            <div className="relative">
              <button onClick={() => setShowQualityMenu(!showQualityMenu)} className="text-white hover:text-blue-400">
                <Settings className="w-6 h-6" />
              </button>
              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 border border-white/10 rounded-lg p-1 min-w-[120px] flex flex-col">
                  <div className="px-4 py-2 text-xs text-white/50 uppercase tracking-widest font-bold">Quality</div>
                  <button className="px-4 py-2 text-sm text-left hover:bg-white/20 rounded text-blue-400 font-bold flex justify-between">
                    Original <CheckCircle className="w-4 h-4" />
                  </button>
                  <button disabled className="px-4 py-2 text-sm text-left rounded text-white/30 cursor-not-allowed">1080p (HD)</button>
                  <button disabled className="px-4 py-2 text-sm text-left rounded text-white/30 cursor-not-allowed">720p</button>
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} className="text-white hover:text-blue-400">
              {isFullscreen ? <MinimizeIcon className="w-6 h-6" /> : <MaximizeIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons specific to Video Player
const Volume2Icon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>;
const MaximizeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>;
const MinimizeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>;



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