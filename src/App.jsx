// COMPLETE WORKING App.jsx - Individual Students + Remove Book Icon

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogIn,
  UserPlus,
  Shield,
  Sun,
  Moon,
  ChevronDown,
  ArrowLeft,
  Mail,
  Lock,
  School,
  ClipboardList,
  HelpCircle,
  MessageSquare,
  BookOpen,
  FormInputIcon,
  Phone,
  Upload,
  Users,
  Settings,
  PenBoxIcon,
  FileText,
  FileImage,
  FileVideo,
  FileArchive,
  Globe,
  File,
  Search,
  MapPin,
  Send,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Heart,
  Star,
  Play,
  Trash2,
  AlertCircle,
  Wifi,
  WifiOff,
  User,
  Edit,
  Key,
  RotateCcw,
  LogOut,
  Clock,
  Calendar,
  GraduationCap,
  Award,
  TrendingUp,
  CheckCircle,
  Circle,
  PlayCircle,
  Plus,
  // ADD THESE AFTER Plus,
Camera,
Eye,
EyeOff,
ArrowRight,
X,
Building,
UserCheck,
ShieldCheck,
Library,
Receipt,
Banknote,
IndianRupee,
FolderPlus,
Kanban,
ListTodo as ListTodoIcon,
FolderKanban,
FileCog,
Video,
Laptop,
MoreVertical, Volume2, Minimize, Maximize, Briefcase

} from "lucide-react";
import { Routes, Route, useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ReactPlayer from 'react-player';
import ClsContentDetails from './components/ClsContentDetails';
import StandaloneViewer from './components/StandaloneViewer';
import CustomVideoPlayer from './components/CustomVideoPlayer';
import ClassroomView from './pages/ClassroomView';
import VideoStandalone from './pages/VideoStandalone';
import NoteloomAi from './components/NoteloomAi';
import FacultyLeave from './components/LeaveManager/FacultyLeave';
import AdminLeaveManager from './components/LeaveManager/AdminLeaveManager';
import axios from 'axios';

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
import AddEditContentPage from './pages/admin/AddEditContentPage'; // You may need to create this if it was inline before

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
import FeesTrackRecords from './pages/dashboard/FeesTrackRecords'; // Adjust path if needed
import ExamManagement from './pages/dashboard/ExamManagement';
import AdmitCard from './pages/dashboard/AdmitCard';
import SemesterFeedback from './pages/dashboard/SemesterFeedback';
import UniversityMarks from './pages/dashboard/UniversityMarks';
import PaymentHistory from './pages/dashboard/PaymentHistory';
import PaymentDetails from './pages/dashboard/PaymentDetails';
import AcademicCalendar from './pages/dashboard/AcademicCalendar';
import AdminUniversityMarks from './pages/dashboard/AdminUniversityMarks';

// import ClassroomView from './pages/dashboard/ClassroomView';
// import VideoPlayerPage from './pages/dashboard/VideoPlayerPage';

//COE imports
import COEManager from './components/coe/COEManager';
import FacultyQuestionBank from './components/coe/FacultyQuestionBank';
import StudentExamPortal from './components/coe/StudentExamPortal';


// ✅ Helper: Identify system tenant
const isSystemTenant = (tenant) =>
  tenant?.name === 'Note Loom System';


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

// App.jsx - Add this component
// App.jsx - REPLACE the existing FeatureManager component with this

// const FeatureManager = () => {
//   const { isDarkMode } = useTheme();
//   const { itUser, isSessionValid } = useITSessionManager();
//   const navigate = useNavigate();

//   // State for logic
//   const [viewMode, setViewMode] = useState('list'); // 'list' or 'edit'
//   const [tenants, setTenants] = useState([]);
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [activeRoleTab, setActiveRoleTab] = useState('student');
//   const [loading, setLoading] = useState(false);
//   const [saveLoading, setSaveLoading] = useState(false);

  
//   // Configuration State
//   const [configs, setConfigs] = useState({
//     student: [],
//     faculty: [],
//     college_admin: []
//   });

//   // 1. Fetch Tenants on Mount
//   useEffect(() => {
//     const fetchTenants = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/it-admin/tenants-list`, {
//           headers: { 'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}` }
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setTenants(data);
//         }
//       } catch (error) {
//         console.error("Error fetching tenants:", error);
//       }
//     };
//     if (isSessionValid) fetchTenants();
//   }, [isSessionValid]);

//   // 2. Fetch Config when a Tenant is Selected
// // 2. Fetch Config when a Tenant is Selected
// useEffect(() => {
//   if (!selectedTenant) return;

//   const fetchConfig = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${API_BASE}/it-admin/menu-config/${selectedTenant._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('itSessionToken')}`
//           }
//         }
//       );

//       if (!response.ok) throw new Error('Failed to fetch config');

//       const data = await response.json();

//       // ✅ IMPORTANT: Ensure all roles exist
//       setConfigs({
//         student: data.student || [],
//         faculty: data.faculty || [],
//         college_admin: data.college_admin || []
//       });
//     } catch (error) {
//       console.error("Error fetching config:", error);
//       alert("Failed to load feature configuration.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchConfig();
// }, [selectedTenant]);


//   // Handle entering edit mode
//   const handleSelectCollege = (tenant) => {
//     setSelectedTenant(tenant);
//     setViewMode('edit');
//     setActiveRoleTab('student'); // Reset to first tab
//   };

//   // Handle going back to list
//   const handleBackToList = () => {
//     setSelectedTenant(null);
//     setViewMode('list');
//     setConfigs({ student: [], faculty: [], college_admin: [] }); // Clear data
//   };

//   // Handle Toggle Switch
// const handleToggle = (role, index) => {
//   setConfigs(prev => {
//     const updated = [...prev[role]];
//     updated[index] = {
//       ...updated[index],
//       isActive: !updated[index].isActive
//     };
//     return { ...prev, [role]: updated };
//   });
// };


//   // Save Changes
//   const handleSave = async () => {
//     setSaveLoading(true);
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/menu-config`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           tenantId: selectedTenant._id,
//           role: activeRoleTab,
//           tabs: configs[activeRoleTab]
//         })
//       });

//       if (response.ok) {
//         alert(`${activeRoleTab.toUpperCase()} settings saved for ${selectedTenant.name}!`);
//       } else {
//         alert("Failed to save configuration.");
//       }
//     } catch (error) {
//       console.error("Error saving:", error);
//       alert("Error saving configuration.");
//     } finally {
//       setSaveLoading(false);
//     }
//   };

//   if (!isSessionValid) return null;

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//                <button onClick={() => navigate('/it-admin')} className="p-2 rounded-lg hover:bg-gray-700/50">
//                  <ArrowLeft className="w-5 h-5"/>
//                </button>
//                <h1 className="text-xl font-bold">Feature Access Manager</h1>
//             </div>
//             <ThemeToggle />
//         </div>
//       </GlassHeader>

//       <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        
//         {/* VIEW 1: COLLEGE LIST */}
//         {viewMode === 'list' && (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold mb-2">Select a College</h2>
//               <p className="opacity-70">Choose an institution to manage its features and menus</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {tenants.map((tenant) => (
//                 <div 
//                   key={tenant._id}
//                   onClick={() => handleSelectCollege(tenant)}
//                   className={`relative group p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
//                     isDarkMode 
//                       ? 'bg-gray-800/70 border-gray-700 hover:border-blue-500/50' 
//                       : 'bg-white border-gray-200 hover:border-blue-500/50'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-4">
//                      {/* Logo Placeholder */}
//                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
//                         {tenant.logoUrl ? (
//                           <img src={tenant.logoUrl} alt="logo" className="w-full h-full object-cover" />
//                         ) : (
//                           <School className="w-8 h-8 text-gray-500" />
//                         )}
//                      </div>
//                      <div>
//                        <h3 className="font-bold text-lg line-clamp-1">{tenant.name}</h3>
//                       {isSystemTenant(tenant) ? (
//   <span className="text-xs px-2 py-1 rounded-full bg-indigo-700 text-indigo-100 font-semibold">
//     SYSTEM
//   </span>
// ) : (
//   <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//     Active
//   </span>
// )}
//                      </div>
//                   </div>
//                   {!isSystemTenant(tenant) && (
//   <div className="mt-4 flex justify-end">
//     <span className="text-sm text-blue-500 font-medium group-hover:underline">
//       Manage Features →
//     </span>
//   </div>
// )}

//                 </div>
//               ))}
//             </div>

//             {tenants.length === 0 && (
//                <div className="text-center py-12 opacity-50">No colleges found.</div>
//             )}
//           </div>
//         )}

//         {/* VIEW 2: EDITOR */}
//         {viewMode === 'edit' && selectedTenant && (
//           <div className={`rounded-xl border backdrop-blur-md overflow-hidden ${
//              isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white border-gray-200'
//           }`}>
//             {/* Editor Header */}
//             <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                <div className="flex items-center space-x-4">
//                  <button 
//                    onClick={handleBackToList}
//                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
//                    }`}
//                  >
//                    ← Change College
//                  </button>
//                  <div>
//                    <div className="flex items-center gap-3">
//   <h2 className="text-xl font-bold">{selectedTenant.name}</h2>

//   {isSystemTenant(selectedTenant) && (
//     <span className="text-xs px-2 py-1 rounded-full bg-indigo-700 text-indigo-100 font-semibold">
//       SYSTEM
//     </span>
//   )}
// </div>

//                    <p className="text-xs opacity-60">Managing Access Control</p>
//                  </div>
//                </div>
               
//                {/* Role Tabs */}
//                <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
//                  {['student', 'faculty', 'college_admin'].map(role => (
//                     <button
//                       key={role}
//                       onClick={() => setActiveRoleTab(role)}
//                       className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
//                         activeRoleTab === role 
//                           ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' 
//                           : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
//                       }`}
//                     >
//                       {role.replace('_', ' ')}
//                     </button>
//                  ))}
//                </div>
//             </div>

//             {/* Feature List Content */}
//             <div className="p-6">
//               {loading ? (
//                 <div className="text-center py-12">
//                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
//                    <p>Loading features...</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex justify-between items-center mb-6">
//                     <h3 className="font-semibold text-lg capitalize">{activeRoleTab.replace('_', ' ')} Dashboard Menu</h3>
// {!isSystemTenant(selectedTenant) && (
//   <button
//     onClick={handleSave}
//     disabled={saveLoading}
//     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg transition-all flex items-center space-x-2"
//   >
//     {saveLoading ? <span>Saving...</span> : (
//       <>
//         <ShieldCheck className="w-4 h-4" />
//         <span>Save Changes</span>
//       </>
//     )}
//   </button>
// )}

//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//                     {configs[activeRoleTab]?.map((item, index) => (
//                       <div key={item.key} className={`p-4 rounded-xl border transition-all duration-200 ${
//                         item.isActive 
//                           ? (isDarkMode ? 'bg-blue-900/20 border-blue-500/50' : 'bg-blue-50 border-blue-200')
//                           : (isDarkMode ? 'bg-gray-800 border-gray-700 opacity-60' : 'bg-gray-50 border-gray-200 opacity-60')
//                       }`}>
//                         <div className="flex items-start justify-between">
//                            <div className="flex items-center space-x-3">
//                               <div className={`p-2 rounded-lg ${
//                                 item.isActive ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
//                               }`}>
//                                 <Settings className="w-5 h-5" />
//                               </div>
//                               <div>
//                                 <h4 className={`font-bold ${item.isActive ? 'text-blue-500' : ''}`}>{item.title}</h4>
//                                 <p className="text-xs opacity-70 mt-0.5 line-clamp-1">{item.description}</p>
//                               </div>
//                            </div>

//                            {/* The Switch */}
// <button
//   disabled={isSystemTenant(selectedTenant)}
//   onClick={() =>
//     !isSystemTenant(selectedTenant) &&
//     handleToggle(activeRoleTab, index)
//   }
//   className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
//     item.isActive ? 'bg-green-500' : 'bg-gray-400'
//   } ${isSystemTenant(selectedTenant) ? 'opacity-50 cursor-not-allowed' : ''}`}
// >

//                               <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
//                                 item.isActive ? 'translate-x-6' : 'translate-x-0'
//                               }`} />
//                            </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// // Theme Toggle Component
// const ThemeToggle = ({ className = "" }) => {
//   const { isDarkMode, toggleTheme } = useTheme();
  
//   return (
//     <button
//       onClick={toggleTheme}
//       className={`p-2 rounded-lg transition-all duration-300 ${
//         isDarkMode 
//           ? 'bg-gray-700/70 hover:bg-gray-600/70 backdrop-blur-md border border-gray-600/50' 
//           : 'bg-white/70 hover:bg-gray-100/70 backdrop-blur-md border border-gray-300/50'
//       } ${className}`}
//     >
//       <AnimatePresence mode="wait" initial={false}>
//         {isDarkMode ? (
//           <motion.span
//             key="sun"
//             initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             className="flex"
//           >
//             <Sun className="w-5 h-5 text-yellow-400" />
//           </motion.span>
//         ) : (
//           <motion.span
//             key="moon"
//             initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             className="flex"
//           >
//             <Moon className="w-5 h-5 text-gray-600" />
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </button>
//   );
// };

// Glass Header Component
// const GlassHeader = ({ children, className = "", isDarker = false, isLandingPage = false }) => {
//   const { isDarkMode } = useTheme();
  
//   return (
//     <div className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
//       isLandingPage 
//         ? '' // No background and no border for landing page
//         : isDarker 
//           ? (isDarkMode 
//             ? 'bg-gray-800/90 border-gray-700/50' 
//             : 'bg-gray-200/90 border-gray-300/50') // FIXED: Light mode header = footer color
//           : (isDarkMode 
//             ? 'bg-gray-900/30 border-gray-700/50' 
//             : 'bg-white/30 border-gray-200/50')
//     } ${isLandingPage ? '' : 'border-b'} ${className}`}>
//       {children}
//     </div>
//   );
// };

// User Profile Dropdown Component
const UserProfileDropdown = ({ user, onOptionClick }) => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user initials for placeholder
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const menuOptions = [
    { id: 'modify', label: 'Modify My Details', icon: Edit },
    { id: 'change-password', label: 'Change Password', icon: Key },
    { id: 'reset-password', label: 'Reset Password', icon: RotateCcw },
    { id: 'delete-account', label: 'Delete Account', icon: Trash2, danger: true },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${
          isDarkMode 
            ? 'hover:bg-gray-600/50 text-white' 
            : 'hover:bg-gray-300/50 text-gray-900' // FIXED: Light mode text color
        }`}
      >
        {/* User Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-blue-500 ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900' // FIXED: Light mode colors
        }`}>
          <span className="text-sm font-semibold">{getUserInitials()}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl backdrop-blur-md border z-50 ${
              isDarkMode 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}
          >
            {/* User Info */}
            <div className={`px-4 py-3 border-b ${
              isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
            }`}>
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.name || 'User'}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {user?.email || ''}
              </p>

              {user?.uid && (
                // CHANGED: text-[10px] -> text-xs
                <div className={`mt-2 inline-block px-2 py-0.5 rounded text-xs font-mono tracking-wide ${
                  isDarkMode ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'
                }`}>
                  ID: {user.uid}
                </div>
              )}
            </div>

            {/* Menu Options */}
            <div className="py-2">
              {menuOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setIsOpen(false);
                    onOptionClick(option.id);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors ${
                    option.danger
                      ? 'hover:bg-red-500/10 text-red-500'
                      : (isDarkMode 
                        ? 'hover:bg-gray-700/50 text-gray-300' 
                        : 'hover:bg-gray-100/50 text-gray-700')
                  }`}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Logo Component with Error Handling
const LogoWithFallback = ({ collegeLogoUrl, collegeName, className, fallbackClassName }) => {
  const [logoError, setLogoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default Note Loom logo URL
  const noteLoomLogoUrl = "/webdata/clg-logo/Note-Loom.svg";

  const handleLogoError = () => {
    setLogoError(true);
    setIsLoading(false);
  };

  const handleLogoLoad = () => {
    setIsLoading(false);
  };

  // Reset error state when collegeLogoUrl changes
  useEffect(() => {
    if (collegeLogoUrl) {
      setLogoError(false);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [collegeLogoUrl]);

  return (
    <div className="relative">
      {isLoading && collegeLogoUrl && (
        <div className={`${className} bg-gray-200 animate-pulse rounded-full flex items-center justify-center`}>
          <School className="w-8 h-8 text-gray-400" />
        </div>
      )}
      
      {collegeLogoUrl && !logoError ? (
        <img
          src={collegeLogoUrl}
          alt={`${collegeName} logo`}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleLogoError}
          onLoad={handleLogoLoad}
        />
      ) : (
        <img
          src={noteLoomLogoUrl}
          alt="Note Loom Logo"
          className={`${fallbackClassName || className} opacity-100 transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      )}
    </div>
  );
};

// // College Banner/Logo Component
// const CollegeBannerLogo = ({ className = "" }) => {
//   const [bannerError, setBannerError] = useState(false);
//   const [logoError, setLogoError] = useState(false);
  
//   // Get image source based on configuration
//   const getImageSrc = () => {
//     // If banner URL is set, use it first
//     if (COLLEGE_CONFIG.bannerUrl && !bannerError) return COLLEGE_CONFIG.bannerUrl;
//     // Otherwise use logo URL
//     if (COLLEGE_CONFIG.logoUrl && !logoError) return COLLEGE_CONFIG.logoUrl;
//     // Fallback to Note Loom
//     return "webdata/clg-logo/Note-Loom.svg";
//   };

//   return (
//     <div className={`flex items-center ${className}`}>
//       <img
//         src={getImageSrc()}
//         alt={COLLEGE_CONFIG.collegeName || "Note Loom"}
//         className="h-8 w-auto object-contain max-w-32"
//         onError={(e) => {
//           if (COLLEGE_CONFIG.bannerUrl && !bannerError) {
//             setBannerError(true);
//           } else if (COLLEGE_CONFIG.logoUrl && !logoError) {
//             setLogoError(true);
//           }
//         }}
//       />
//     </div>
//   );
// };

// // Session Expired Component
// const SessionExpiredPage = ({ onLoginRedirect }) => {
//   const { isDarkMode } = useTheme();
  
//   return (
//     <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//     }`}>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl text-center backdrop-blur-md border transition-all duration-300 ${
//           isDarkMode 
//             ? 'bg-yellow-900/20 border-yellow-500/50' 
//             : 'bg-yellow-100/70 border-yellow-300/50'
//         }`}
//       >
//         <div>
//           <WifiOff className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`} />
//           <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Expired</h2>
//           <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Your session has expired due to inactivity or page refresh. Please login again to continue.
//           </p>
//         </div>

//         <div className={`rounded-lg p-4 backdrop-blur-sm border ${
//           isDarkMode 
//             ? 'bg-yellow-900/30 border-yellow-500/30' 
//             : 'bg-yellow-100/50 border-yellow-400/30'
//         }`}>
//           <p className={`text-sm ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
//             For security reasons, you are automatically logged out after 30 minutes of inactivity or when the page is refreshed.
//           </p>
//         </div>

//         <button
//           onClick={onLoginRedirect}
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
//         >
//           Go to Login
//         </button>
//       </motion.div>
//     </div>
//   );
// };

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

// IT session system
const useITSessionManager = () => {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [itUser, setITUser] = useState(null);
  const [isITAuthenticated, setIsITAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize navigation
  const navigate = useNavigate();

  // --- Check IT Session (Unified Auth) ---
  const checkITSession = async () => {
    try {
      const token = localStorage.getItem('itSessionToken');
      
      if (!token) {
        setITUser(null);
        setIsITAuthenticated(false);
        setLoading(false); // <--- FIX 1: Stop loading immediately if no token
        return false;
      }

      // 1. Call standard session info (with Token Header)
      const res = await axios.get('https://noteloom-api.vercel.app/session/info', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      // 2. Validate Role
      // Backend now translates 'it_admin' -> 'noteloom_admin' etc.
      // We accept both standard DB roles and translated roles just in case.
      const validRoles = ['it_admin', 'it_user', 'noteloom_admin', 'noteloom_manager'];
      
      if (res.data.user && validRoles.includes(res.data.role)) {
        setITUser(res.data.user);
        setIsITAuthenticated(true);
        setIsSessionValid(true); // <--- FIX 2: Ensure this is set
        return true;
      } else {
        console.warn('Session valid but not an IT role');
        clearITSession(); 
        return false;
      }
    } catch (error) {
      console.error('IT Session check failed:', error);
      clearITSession(); 
      return false;
    } finally {
      setLoading(false); // <--- FIX 3: Critical - Always stop loading when check is done
    }
  };

  // --- IT Sign Out ---
  const clearITSession = async () => {
    try {
      const token = localStorage.getItem('itSessionToken');
      if (token) {
        await axios.post('https://noteloom-api.vercel.app/auth/signout', {}, {
           headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      localStorage.removeItem('itSessionToken');
      setITUser(null);
      setIsITAuthenticated(false);
      setIsSessionValid(false);
      setLoading(false); // Ensure loading stops on logout
      navigate('/it-login'); 
    }
  };

  useEffect(() => {
    checkITSession();
  }, []);

  return { 
    itUser,
    loading, 
    isITAuthenticated, 
    isSessionValid, 
    clearITSession,
    checkITSession
  };
};

// Footer Component
const Footer = () => {
  const { isDarkMode } = useTheme();
  
  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const companyLinks = ["About Us", "Contact Us", "Pricing", "Careers"];
  const ourServices = ["for Institutions", "for Students"];
  const administrators = ["IT Login", "Request IT Signup"];

  return (
    <footer className={`pt-12 pb-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Left Section - Company Info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-xl font-bold">Note Loom</span>
              </div>
              <p className={`mb-6 leading-relaxed text-sm sm:text-base ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We understand that every student has unique needs and abilities, that's why our curriculum is designed to adapt to your needs and help you grow!
                <br />
                Empowering educational institutions with comprehensive learning management solutions.
                <br /><br />
                <strong>Email:</strong> support@noteloom.in
              </p>
            </div>
            
            {/* Social Links */}
<div>
  <h4 className="font-semibold mb-4">Let's get social ♡</h4>
  <div className="flex flex-wrap gap-3">
    {socialLinks.map((social) => (
      <a
        key={social.label}
        href={social.href}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600' 
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
        aria-label={social.label}
      >
        <social.icon className="w-5 h-5" />
      </a>
    ))}
  </div>
</div>

          </div>
          
          {/* Right Section - Links */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Links */}
<div>
  <h4 className="font-semibold mb-4 text-lg">Company</h4>
  <ul className="space-y-3">
    {companyLinks.map((link) => (
      <li key={link}>
        <a 
          href="#"
          className={`transition-colors text-sm sm:text-base ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {link}
        </a>
      </li>
    ))}
  </ul>
</div>

              
              {/* Our Services */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Our Services</h4>
                <ul className="space-y-3">
  {ourServices.map((link) => (
    <li key={link}>
      <a 
        href="#"
        className={`transition-colors text-sm sm:text-base ${
          isDarkMode 
            ? 'text-gray-400 hover:text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {link}
      </a>
    </li>
  ))}
</ul>

              </div>
              
              {/* Administrators */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Administrators</h4>
                <ul className="space-y-3">
  {administrators.map((link) => (
    <li key={link}>
      <Link 
        to={link === "IT Login" ? "/it-login" : "#"}
        className={`transition-colors text-sm sm:text-base ${
          isDarkMode 
            ? 'text-gray-400 hover:text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {link}
      </Link>
    </li>
  ))}
</ul>

              </div>
              
              {/* Connect With Us */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Connect With Us</h4>
                <div className="space-y-2">
                  <a 
                    href="#" 
                    className={`block transition-colors text-sm sm:text-base ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Email Us
                  </a>
                  <a 
                    href="#" 
                    className={`block transition-colors text-sm sm:text-base ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    X (Twitter) Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className={`border-t pt-6 transition-colors duration-300 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-xs sm:text-sm flex items-center text-center md:text-left ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span>© 2026 Note Loom. All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
              <a 
                href="#" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Terms & Conditions
              </a>
              <a 
                href="#" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Landing Page Component  
// const LandingPage = ({ navigate }) => {
//   const { isDarkMode } = useTheme();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     "Welcome to Note Loom",
//     "Your Personalized Learning Platform",
//     "Learn, Connect, Excel"
//   ];

//   // Updated team members - Only 2 members now
//   const teamMembers = [
//     {
//       name: "Ritav Banerjee",
//       role: "Management Lead", 
//       description: "Expert in business management, managing multiple businesses along with marketing aspects.",
//       image: "webdata/ritav.jpg"
//     },
//     {
//       name: "Shuvankar Debnath",
//       role: "Technical Lead",
//       description: "Managing technical aspects for the creation and deployment of the platform.",
//       image: "webdata/shuv.jpeg"
//     }
//   ];

//   const [contactForm, setContactForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide(prev => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleContactSubmit = (e) => {
//     e.preventDefault();
//     console.log("Contact form submitted:", contactForm);
//     alert("Thank you for your message! We'll get back to you soon.");
//     setContactForm({ name: "", email: "", subject: "", message: "" });
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
//     }`}>
//       {/* Navigation with no background and no border */}
//       <GlassHeader isLandingPage={true}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <BookOpen className="w-8 h-8 text-blue-500" />
//               <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Note Loom</span>
//               <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-green-400/70 to-green-600/70 text-white border border-green-500/70">
//                 Beta
//               </span>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <ThemeToggle />
              
//               <button
//                 onClick={() => navigate('/college-selection')}
//                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-white"
//               >
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>
//       </GlassHeader>

//       {/* Hero Section with Video Background */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         {/* Video Background */}
//         <div className="absolute inset-0 z-0">
//           <video autoPlay muted loop className="w-full h-full object-cover">
//             <source src="https://cdn.pixabay.com/video/2015/09/27/846-140823862_large.mp4" type="video/mp4" />
//           </video>
//           <div className="absolute inset-0 bg-black/60"></div>
//         </div>
        
//         {/* Hero Content */}
//         <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
//           <AnimatePresence mode="wait">
//             <motion.h1
//               key={currentSlide}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
//             >
//               {slides[currentSlide]}
//             </motion.h1>
//           </AnimatePresence>
          
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="text-xl md:text-2xl mb-8 text-gray-300"
//           >
//             Revolutionizing education through personalized learning experiences
//           </motion.p>
          
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//             onClick={() => navigate('/college-selection')}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-white"
//           >
//             Select College to Get Started
//             <ArrowLeft className="w-5 h-5 ml-2 rotate-180 inline" />
//           </motion.button>
//         </div>
//       </section>

//       {/* Meet the Team Section - Updated for 2 members */}
//       <section className={`py-20 transition-colors duration-300 ${
//         isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Heading */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Team</h2>
//             <p className={`text-xl max-w-2xl mx-auto ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Our passionate team of entrepreneurs and technologists working to transform your learning experience
//             </p>
//           </motion.div>
          
//           {/* Team Grid - Updated for responsive 2 member layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {teamMembers.map((member, index) => (
//   <motion.div
//     key={member.name}
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ delay: index * 0.1, duration: 0.6 }}
//     className={`rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 relative backdrop-blur-md border ${
//       isDarkMode 
//         ? 'bg-gray-700/70 border-gray-600/50' 
//         : 'bg-white/70 border-gray-200/50'
//     }`}
//   >

//                 {/* Profile Image */}
//                 <div className="flex justify-center mb-6">
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-500 shadow-lg bg-white object-cover"
//                     onError={(e) => {
//                       e.target.src = "webdata/clg-logo/Note-Loom.svg"; // Fallback image
//                     }}
//                   />
//                 </div>
                
//                 {/* Text Content */}
//                 <div className="text-center">
//                   <h3 className="text-xl md:text-2xl font-bold mb-2">{member.name}</h3>
//                   <p className="text-blue-400 font-semibold mb-4 text-lg">{member.role}</p>
//                   <p className={`text-base leading-relaxed ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {member.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className={`py-20 transition-colors duration-300 ${
//         isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//       }`}>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact for All in One Learning Management</h2>
//             <p className={`text-xl max-w-2xl mx-auto ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Ready to transform your educational experience? Get in touch with us today!
//             </p>
//           </motion.div>
          
//           <motion.form
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             onSubmit={handleContactSubmit}
//             className={`rounded-2xl p-8 shadow-xl backdrop-blur-md border transition-all duration-300 ${
//               isDarkMode 
//                 ? 'bg-gray-800/70 border-gray-700/50' 
//                 : 'bg-white/70 border-gray-200/50'
//             }`}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   required
//                   value={contactForm.name}
//                   onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
//                   className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
//                     isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 text-white' 
//                       : 'bg-white border-gray-300 text-gray-900'
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   required
//                   value={contactForm.email}
//                   onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
//                   className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
//                     isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 text-white' 
//                       : 'bg-white border-gray-300 text-gray-900'
//                   }`}
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-semibold mb-2">Subject</label>
//               <input
//                 type="text"
//                 required
//                 value={contactForm.subject}
//                 onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
//                 className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white' 
//                     : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//                 placeholder="What's this about?"
//               />
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-semibold mb-2">Message</label>
//               <textarea
//                 required
//                 rows={6}
//                 value={contactForm.message}
//                 onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
//                 className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
//                   isDarkMode 
//                     ? 'bg-gray-700 border-gray-600 text-white' 
//                     : 'bg-white border-gray-300 text-gray-900'
//                 }`}
//                 placeholder="Tell us more about your inquiry..."
//               />
//             </div>
            
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-white"
//             >
//               <Send className="w-5 h-5 mr-2" />
//               Send Message
//             </button>
//           </motion.form>
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// College Selection Component - Updated with Logo Support
// const CollegeSelection = ({ navigate }) => {
//   const { isDarkMode } = useTheme();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   // Updated colleges array with Individual Student option and logo URLs
//   const colleges = [
//     {
//       name: "Individual Student",
//       location: "Personal Learning",
//       type: "Individual",
//       featured: true,
//       logoUrl: "webdata/clg-logo/Note-Loom.svg",
//       isIndividual: true
//     },
//     { 
//       name: "Institute of Engineering Management Kolkata", 
//       location: "Kolkata, West Bengal", 
//       type: "Engineering", 
//       featured: false,
//       logoUrl: "webdata/clg-logo/IEM-Kolkata.png",
//       isIndividual: false
//     },
//     { 
//       name: "Indian Institute of Technology Delhi", 
//       location: "New Delhi", 
//       type: "Engineering",
//       logoUrl: "webdata/clg-logo/IIT-Delhi.png",
//       isIndividual: false
//     },
//     { 
//       name: "Delhi University", 
//       location: "New Delhi", 
//       type: "University",
//       logoUrl: "webdata/clg-logo/DU.png",
//       isIndividual: false
//     },
//     { 
//       name: "Jawaharlal Nehru University", 
//       location: "New Delhi", 
//       type: "University",
//       logoUrl: "webdata/clg-logo/JNU.png",
//       isIndividual: false
//     },
//     { 
//       name: "Banaras Hindu University", 
//       location: "Varanasi, Uttar Pradesh", 
//       type: "University",
//       logoUrl: "webdata/clg-logo/BHU.png",
//       isIndividual: false
//     },
//     { 
//       name: "Aligarh Muslim University", 
//       location: "Aligarh, Uttar Pradesh", 
//       type: "University",
//       logoUrl: "webdata/clg-logo/AMU.png",
//       isIndividual: false
//     },
//     { 
//       name: "Anna University", 
//       location: "Chennai, Tamil Nadu", 
//       type: "Engineering",
//       logoUrl: "webdata/clg-logo/Anna-Univ.png",
//       isIndividual: false
//     },
//     { 
//       name: "Birla Institute of Technology", 
//       location: "Ranchi, Jharkhand", 
//       type: "Engineering",
//       logoUrl: "webdata/clg-logo/BIT.png",
//       isIndividual: false
//     },
//     { 
//       name: "Christ University", 
//       location: "Bangalore, Karnataka", 
//       type: "University",
//       logoUrl: "webdata/clg-logo/Christ-Univ.png",
//       isIndividual: false
//     },
//     { 
//       name: "Dayalbagh Educational Institute", 
//       location: "Agra, Uttar Pradesh", 
//       type: "University",
//       logoUrl: "webdata/clg-logo/DEI.png",
//       isIndividual: false
//     }
//   ];

//   const alphabetFilters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//   const filteredColleges = colleges.filter(college => {
//     const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = selectedFilter === "All" || college.name.charAt(0).toUpperCase() === selectedFilter;
//     return matchesSearch && matchesFilter;
//   });

//   const handleCollegeSelect = (college) => {
//     localStorage.setItem('selectedCollege', college.name);
//     localStorage.setItem('selectedCollegeLogo', college.logoUrl || '');
//     localStorage.setItem('isIndividualStudent', college.isIndividual ? 'true' : 'false');
//     navigate('/login');
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
//     }`}>
//       {/* Navigation */}
//       <GlassHeader>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => navigate('/')}
//                 className={`p-1 rounded-md transition-colors ${
//                   isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
//                 }`}
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <BookOpen className="w-8 h-8 text-blue-500" />
//               <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Note Loom</span>
//               <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-green-400/70 to-green-600/70 text-white border border-green-500/70">
//                 Beta
//               </span>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <ThemeToggle />
              
//               <button
//                 onClick={() => navigate('/college-selection')}
//                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-white"
//               >
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>
//       </GlassHeader>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[136px] pb-12">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Select Your College</h1>
//           <p className={`text-xl max-w-2xl mx-auto ${
//             isDarkMode ? 'text-gray-400' : 'text-gray-600'
//           }`}>
//             Choose your institution to access personalized learning resources and connect with your academic community
//           </p>
//         </motion.div>

//         {/* Search Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="relative mb-8"
//         >
//           <div className="relative group">
//             <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
//               isDarkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-500'
//             }`} />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search for colleges and universities..."
//               className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none transition-all shadow-lg hover:shadow-xl group-hover:shadow-2xl group-hover:border-blue-400 ${
//                 isDarkMode 
//                   ? 'bg-gray-800/70 backdrop-blur-md border-gray-600 text-white hover:border-blue-400 focus:border-blue-500' 
//                   : 'bg-white/70 backdrop-blur-md border-gray-300 text-gray-900 hover:border-blue-400 focus:border-blue-500'
//               }`}
//             />
//           </div>
//         </motion.div>

//         {/* Alphabet Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="flex flex-wrap justify-center gap-2 mb-12"
//         >
//           <button
//             onClick={() => setSelectedFilter("All")}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//               selectedFilter === "All" 
//                 ? 'bg-blue-600 text-white shadow-lg' 
//                 : isDarkMode 
//                   ? 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/70 backdrop-blur-md' 
//                   : 'bg-gray-200/70 text-gray-700 hover:bg-gray-300/70 backdrop-blur-md'
//             }`}
//           >
//             All
//           </button>
//           {alphabetFilters.map(letter => (
//             <button
//               key={letter}
//               onClick={() => setSelectedFilter(letter)}
//               className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
//                 selectedFilter === letter 
//                   ? 'bg-blue-600 text-white shadow-lg' 
//                   : isDarkMode 
//                     ? 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/70 backdrop-blur-md' 
//                     : 'bg-gray-200/70 text-gray-700 hover:bg-gray-300/70 backdrop-blur-md'
//               }`}
//             >
//               {letter}
//             </button>
//           ))}
//         </motion.div>

//         {/* College Grid */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//  {filteredColleges.map((college, index) => (
//   <motion.div
//     key={college._id}
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: 0.1 * index, duration: 0.6 }}
//     onClick={() => handleCollegeSelect(college)}
//     className={`rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-blue-500 backdrop-blur-md ${
//       isDarkMode 
//         ? 'bg-gray-800/70 hover:bg-gray-700/70' 
//         : 'bg-white/70 hover:bg-gray-100/70'
//     } ${
//       college.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
//     }`}
//   >

//               {college.featured && (
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
//                   <Star className="w-3 h-3 inline mr-1" />
//                   Featured
//                 </div>
//               )}
              
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-3 flex-1">
//                   {/* College Logo with Fallback */}
//                   <LogoWithFallback 
//                     collegeLogoUrl={college.logoUrl}
//                     collegeName={college.name}
//                     className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 flex-shrink-0"
//                     fallbackClassName="w-12 h-12 rounded-full object-cover border-2 border-gray-400 flex-shrink-0"
//                   />
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     isDarkMode 
//                       ? 'bg-gray-700/70 text-gray-300 backdrop-blur-sm' 
//                       : 'bg-gray-100/70 text-gray-600 backdrop-blur-sm'
//                   }`}>
//                     {college.type}
//                   </span>
//                 </div>
//               </div>
              
//               <h3 className="text-lg font-bold mb-2 line-clamp-2">{college.name}</h3>
              
//               <div className={`flex items-center text-sm mb-4 ${
//                 isDarkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
//                 <span>{college.location}</span>
//               </div>
              
//               <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-semibold transition-all transform hover:scale-105">
//                 Select College
//               </button>
//             </motion.div>
//           ))}
//         </motion.div>

//         {filteredColleges.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12"
//           >
//             <School className={`w-16 h-16 mx-auto mb-4 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-500'
//             }`} />
//             <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
//             <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Try adjusting your search criteria</p>
//           </motion.div>
//         )}
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// Continue in next part...
// // College Mismatch Warning Component
// // FIXED College Mismatch Warning Component - Enhanced for Individual Students
// const CollegeMismatchWarning = ({ userCollege, currentCollege, onDeleteAccount, onCancel, isIndividualMismatch }) => {
//   const { isDarkMode } = useTheme();
  
//   // Generate appropriate messages based on mismatch type
//   const getMismatchMessage = () => {
//     if (currentCollege === 'Individual Student' && userCollege !== 'Individual Student') {
//       return {
//         title: 'Account Type Mismatch',
//         subtitle: 'College account detected on Individual page',
//         description: `You're trying to access the Individual Student page, but your account is linked to ${userCollege}. Individual Student accounts and College accounts are separate systems.`,
//         primaryAction: `Go to ${userCollege}`,
//         warning: '⚠️ ACCOUNT TYPE MISMATCH',
//         warningText: 'Individual Student accounts and College accounts use different systems and cannot be accessed interchangeably.'
//       };
//     } else if (userCollege === 'Individual Student' && currentCollege !== 'Individual Student') {
//       return {
//         title: 'Account Type Mismatch', 
//         subtitle: 'Individual account detected on College page',
//         description: `You're trying to access ${currentCollege}, but your account is an Individual Student account. Individual Student accounts and College accounts are separate systems.`,
//         primaryAction: 'Go to Individual Student',
//         warning: '⚠️ ACCOUNT TYPE MISMATCH',
//         warningText: 'Individual Student accounts and College accounts use different systems and cannot be accessed interchangeably.'
//       };
//     } else {
//       return {
//         title: 'College Mismatch',
//         subtitle: 'Account linked to different college',
//         description: `Your account is linked to ${userCollege}, but you selected ${currentCollege}. You can only access your original college dashboard or create a new account for this college.`,
//         primaryAction: `Go to ${userCollege}`,
//         warning: '⚠️ COLLEGE MISMATCH',
//         warningText: 'You can only access your original college dashboard or create a new account for this college.'
//       };
//     }
//   };

//   const mismatchInfo = getMismatchMessage();
  
//   return (
//     <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//     }`}>
//       {/* Glass Header */}
//       <GlassHeader className="flex items-center justify-end px-4">
//         <ThemeToggle />
//       </GlassHeader>
      
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className={`max-w-lg w-full space-y-8 p-8 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
//           isDarkMode 
//             ? 'bg-yellow-900/20 border-yellow-500/50' 
//             : 'bg-yellow-100/70 border-yellow-300/50'
//         }`}
//       >
//         <div className="text-center">
//           <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`} />
//           <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mismatchInfo.title}</h2>
//           <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{mismatchInfo.subtitle}</p>
//         </div>

//         <div className={`rounded-lg p-4 backdrop-blur-sm border ${
//           isDarkMode 
//             ? 'bg-yellow-900/30 border-yellow-500/30' 
//             : 'bg-yellow-100/50 border-yellow-400/30'
//         }`}>
//           <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>{mismatchInfo.warning}</p>
//           <p className={`text-sm mb-3 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
//             {mismatchInfo.description}
//           </p>
//           <p className={`text-sm ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
//             {mismatchInfo.warningText}
//           </p>
//         </div>
        
//         <div className="space-y-3">
//           <button
//             onClick={onDeleteAccount}
//             className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors"
//           >
//             {mismatchInfo.primaryAction}
//           </button>
          
//           <button
//             onClick={onCancel}
//             className={`w-full py-3 rounded-lg font-semibold transition-colors ${
//               isDarkMode 
//                 ? 'bg-gray-600 hover:bg-gray-700 text-white' 
//                 : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
//             }`}
//           >
//             Select Different {isIndividualMismatch ? 'Account Type' : 'College'}
//           </button>
//         </div>

//         {/* Additional Info for Individual Student Mismatches */}
//         {isIndividualMismatch && (
//           <div className={`text-center pt-4 border-t ${
//             isDarkMode ? 'border-gray-600' : 'border-gray-300'
//           }`}>
//             <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               <strong>Need help?</strong> Individual Students and College Students use completely separate systems. 
//               If you need both types of accounts, you'll need separate email addresses.
//             </p>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// Login Page Component - FIXED: Removed book icon, shows only "Note Loom"
// FIXED LoginPage Component - Added Individual Student Mismatch Detection
// const LoginPage = () => {
//   const [selectedCollege, setSelectedCollege] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [role, setRole] = useState('student');
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [isIndividualStudent, setIsIndividualStudent] = useState(false);
//   const [showCollegeMismatch, setShowCollegeMismatch] = useState(false);
//   const [userCollege, setUserCollege] = useState('');
  
//   // Enhanced signup state
//   const [currentStep, setCurrentStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
//   const [verificationSent, setVerificationSent] = useState(false);
//   const [verificationTimer, setVerificationTimer] = useState(90);
//   const [canResendCode, setCanResendCode] = useState(false);
//   const [emailCheckStatus, setEmailCheckStatus] = useState('');
// const [existingUserCollege, setExistingUserCollege] = useState('');
// const [showExistingUserModal, setShowExistingUserModal] = useState(false);
// const [emailCheckLoading, setEmailCheckLoading] = useState(false);
// const emailCheckTimerRef = useRef(null);
// const [emailExists, setEmailExists] = useState(false);
// const [emailChecked, setEmailChecked] = useState(false);

//   // ADD these new state variables RIGHT AFTER:
// const [resendCount, setResendCount] = useState(0);
// const [resendCooldown, setResendCooldown] = useState(0);
// const [isResendCooldownActive, setIsResendCooldownActive] = useState(false);
// const MAX_RESEND_ATTEMPTS = 50;
// const RESEND_COOLDOWN_SECONDS = 90; // 1.5 minutes
// const CODE_EXPIRY_SECONDS = 600;  // 10 minutes (600 seconds)
  
//   // Enhanced role-specific form data
//   const [formData, setFormData] = useState({
//     // Student-specific fields
//     profilePicture: null,
//     profilePicturePreview: '',
//     phoneNumber: '',
//     gender: '',
//     admissionYear: '',
//     course: '',
//     stream: '',
//     year: '',
//     rollNo: '',
//     currentSemester: '',
    
//     // Faculty-specific fields
//     department: '',
//     designation: '',
//     qualification: '',
//     experience: '',
//     specialization: '',
//     employeeId: '',
    
//     // Admin-specific fields
//     adminLevel: '',
//     responsibilities: '',
//     approvalAuthority: '',
//     accessLevel: ''
//   });

//   const fileInputRef = useRef(null);
//   const verificationRefs = useRef([]);
//   const navigate = useNavigate();
//   const { isDarkMode } = useTheme();

//   // Get college info from URL params or localStorage
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const collegeParam = params.get('college');
//     const storedCollege = localStorage.getItem('selectedCollege');
    
//     if (collegeParam) {
//       setSelectedCollege(collegeParam);
//       setIsIndividualStudent(collegeParam === 'individual');
//     } else if (storedCollege) {
//       setSelectedCollege(storedCollege);
//       setIsIndividualStudent(storedCollege === 'individual');
//     } else {
//       navigate('/college-selection');
//     }
//   }, [navigate]);

//   // Enhanced course options
//   const courses = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'MBA', 'B.Sc', 'M.Sc'];
//   const streams = {
//     'B.Tech': ['Computer Science', 'Electronics & Communication', 'Electrical', 'Mechanical', 'Civil'],
//     'M.Tech': ['Computer Science', 'Electronics', 'Power Systems', 'Structural Engineering'],
//     'BCA': ['Computer Applications'],
//     'MCA': ['Computer Applications'],
//     'MBA': ['General Management', 'Finance', 'Marketing', 'HR'],
//     'B.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
//     'M.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Computer Science']
//   };

//   const departments = [
//     'Computer Science & Engineering',
//     'Electronics & Communication Engineering',
//     'Electrical Engineering',
//     'Mechanical Engineering',
//     'Civil Engineering',
//     'Information Technology',
//     'Management Studies',
//     'Basic Sciences',
//     'Humanities'
//   ];

//   const designations = [
//     'Professor',
//     'Associate Professor',
//     'Assistant Professor',
//     'Lecturer',
//     'Senior Lecturer',
//     'Visiting Faculty',
//     'Guest Lecturer'
//   ];

//   const qualifications = [
//     'Ph.D',
//     'M.Tech/M.E',
//     'M.Sc',
//     'MBA',
//     'MCA',
//     'Others'
//   ];

//   const adminLevels = [
//     'Department Admin',
//     'Section Admin',
//     'College Admin',
//     'Super Admin'
//   ];

//   // Timer effect for verification
// // Timer effect for verification and resend cooldown
// useEffect(() => {
//   let interval;
  
// // Verification code timer
// if (verificationSent && verificationTimer > 0) {
//   interval = setInterval(() => {
//     setVerificationTimer(prev => {
//       const newTime = prev - 1;
      
//       // Show resend button when timer reaches 0 (after 90 seconds)
//       if (newTime <= 0) {
//         setCanResendCode(true);
//         return 0;
//       }
      
//       return newTime;
//     });
//   }, 1000);
// }

  
//   // Resend cooldown timer
//   if (isResendCooldownActive && resendCooldown > 0) {
//     const cooldownInterval = setInterval(() => {
//       setResendCooldown(prev => {
//         if (prev <= 1) {
//           setIsResendCooldownActive(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
    
//     return () => {
//       clearInterval(interval);
//       clearInterval(cooldownInterval);
//     };
//   }
  
//   return () => clearInterval(interval);
// }, [verificationSent, verificationTimer, isResendCooldownActive, resendCooldown]);


//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 51200) {
//         setErrors(prev => ({
//           ...prev,
//           profilePicture: 'File size must be under 50KB'
//         }));
//         return;
//       }

//       if (!file.type.startsWith('image/')) {
//         setErrors(prev => ({
//           ...prev,
//           profilePicture: 'Please upload a valid image file'
//         }));
//         return;
//       }

//       setFormData(prev => ({
//         ...prev,
//         profilePicture: file,
//         profilePicturePreview: URL.createObjectURL(file)
//       }));
      
//       setErrors(prev => ({
//         ...prev,
//         profilePicture: ''
//       }));
//     }
//   };

//   const removeProfilePicture = () => {
//     setFormData(prev => ({
//       ...prev,
//       profilePicture: null,
//       profilePicturePreview: ''
//     }));
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleVerificationCodeChange = (index, value) => {
//     if (value.length <= 1 && /^[0-9]*$/.test(value)) {
//       const newCode = [...verificationCode];
//       newCode[index] = value;
//       setVerificationCode(newCode);

//       if (value && index < 5) {
//         verificationRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleVerificationKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
//       verificationRefs.current[index - 1]?.focus();
//     }
//   };

//   const validateStep = (step) => {
//     const newErrors = {};

//     switch (step) {
//       case 1:
//   // Basic info validation
//   if (!fullName.trim()) {
//     newErrors.fullName = 'Full name is required';
//   }
//   if (!email.trim()) {
//     newErrors.email = 'Email is required';
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     newErrors.email = 'Please enter a valid email';
//   } else if (emailExists) {
//     newErrors.email = 'This email is already registered. Please use a different email.';
//   }
//   if (!password) {
//     newErrors.password = 'Password is required';
//   } else if (password.length < 8) {
//     newErrors.password = 'Password must be at least 8 characters';
//   }
//   if (password !== confirmPassword) {
//     newErrors.confirmPassword = 'Passwords do not match';
//   }
//   break;

//       case 2:
//         // Role-specific validation
//         if (role === 'student') {
//           if (!formData.phoneNumber.trim()) {
//             newErrors.phoneNumber = 'Phone number is required';
//           } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
//             newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
//           }
//           if (!formData.gender) {
//             newErrors.gender = 'Gender is required';
//           }
//           if (!formData.admissionYear) {
//             newErrors.admissionYear = 'Admission year is required';
//           }
//           if (!formData.course) {
//             newErrors.course = 'Course is required';
//           }
//           if (!formData.stream) {
//             newErrors.stream = 'Stream is required';
//           }
//           if (!formData.year) {
//             newErrors.year = 'Current year is required';
//           }
//           if (!formData.rollNo.trim()) {
//             newErrors.rollNo = 'Roll number is required';
//           }
//           if (!formData.currentSemester) {
//             newErrors.currentSemester = 'Current semester is required';
//           }
//         } else if (role === 'faculty') {
//           if (!formData.department) {
//             newErrors.department = 'Department is required';
//           }
//           if (!formData.designation) {
//             newErrors.designation = 'Designation is required';
//           }
//           if (!formData.qualification) {
//             newErrors.qualification = 'Qualification is required';
//           }
//           if (!formData.employeeId.trim()) {
//             newErrors.employeeId = 'Employee ID is required';
//           }
//         } else if (role === 'college_admin') {
//           if (!formData.adminLevel) {
//             newErrors.adminLevel = 'Admin level is required';
//           }
//           if (!formData.employeeId.trim()) {
//             newErrors.employeeId = 'Employee ID is required';
//           }
//           if (!formData.responsibilities.trim()) {
//             newErrors.responsibilities = 'Responsibilities are required';
//           }
//         }
//         break;

//       case 3:
//         const codeString = verificationCode.join('');
//         if (codeString.length !== 6) {
//           newErrors.verificationCode = 'Please enter the complete 6-digit code';
//         }
//         break;
//     }

//  setErrors(newErrors);
//   const isValid = Object.keys(newErrors).length === 0;
  
//   // ADD DEBUG LOGGING
//   console.log(`Step ${step} validation:`, {
//     isValid,
//     errors: newErrors,
//     formData: step === 1 ? {fullName, email, password, confirmPassword} : formData
//   });
  
//   return isValid;
//   };

// const nextStep = () => {
//   // Block next step if email exists or email check is in progress
//   if (currentStep === 1 && (emailExists || emailCheckLoading)) {
//     if (emailExists) {
//       setErrors(prev => ({
//         ...prev,
//         general: 'Please resolve the email issue before proceeding.'
//       }));
//     }
//     return;
//   }

//   if (validateStep(currentStep)) {
//     if (currentStep === 1) {
//       // Double-check email doesn't exist before proceeding to step 2
//       if (emailExists) {
//         setErrors(prev => ({
//           ...prev,
//           general: 'Cannot proceed with registration. Email already exists.'
//         }));
//         return;
//       }
//       // Just move to step 2, don't send verification yet
//       setCurrentStep(2);
//     } else if (currentStep === 2) {
//       // Send verification email when moving to step 3
//       sendVerificationEmail();
//       setCurrentStep(3);
//     } else if (currentStep === 3) {
//       // For step 3, handle verification and registration
//       verifyAndRegister();
//     }
//   }
// };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

// // Check if email exists in any college
// const checkEmailExists = async (emailToCheck) => {
//   if (!emailToCheck || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToCheck)) {
//     setEmailExists(false);
//     setEmailChecked(false);
//     return false;
//   }

//   setEmailCheckLoading(true);
//   try {
//     const response = await fetch(`${API_BASE}/api/auth/check-email`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: emailToCheck.trim(),
//         currentCollege: isIndividualStudent ? 'Individual Student' : selectedCollege
//       })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       if (data.exists) {
//         setEmailExists(true);
//         setEmailChecked(true);
//         setErrors(prev => ({
//           ...prev,
//           email: `This email is already registered to ${data.collegeName}. Please use a different email address.`
//         }));
//         return true; // Email exists
//       } else {
//         setEmailExists(false);
//         setEmailChecked(true);
//         setErrors(prev => ({ ...prev, email: '' }));
//         return false; // Email doesn't exist
//       }
//     } else {
//       setEmailExists(false);
//       setEmailChecked(false);
//       setErrors(prev => ({ ...prev, email: '' }));
//       return false; // Assume email doesn't exist if check fails
//     }
//   } catch (error) {
//     console.error('Email check error:', error);
//     setEmailExists(false);
//     setEmailChecked(false);
//     setErrors(prev => ({ ...prev, email: '' }));
//     return false; // Assume email doesn't exist if check fails
//   } finally {
//     setEmailCheckLoading(false);
//   }
// };


// const sendVerificationEmail = async () => {
//   try {
//     setEmailCheckLoading(true);
//     setErrors({}); // clear previous errors

//     const response = await fetch(`${API_BASE}/api/auth/send-verification`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         name: fullName,
//         collegeName: selectedCollege,
//         role,
//         type: 'signup',
//       }),
//     });

//     const data = await response.json();
//     setEmailCheckLoading(false);

//     if (response.ok) {
//       // ✅ Proceed only if verification email was successfully sent
//       setVerificationSent(true);
//     } else {
//       // 🛑 Stop flow if backend reports duplicate registration
//       if (data.error && data.error.includes('User already registered')) {
//         setErrors({
//           email: data.error, // show this below email field
//         });
//         setVerificationSent(false);
//         return; // prevent moving to verification page
//       }

//       // Other errors (generic)
//       setErrors({
//         general: data.error || 'Failed to send verification email',
//       });
//       setVerificationSent(false);
//     }
//   } catch (error) {
//     console.error('Verification request failed:', error);
//     setEmailCheckLoading(false);
//     setErrors({ general: 'An unexpected error occurred.' });
//   }
// };




// const resendVerificationCode = async () => {
//   if (resendCount >= MAX_RESEND_ATTEMPTS) {
//     setErrors({ 
//       verificationCode: `Maximum resend limit (${MAX_RESEND_ATTEMPTS}) reached. Please try again later.` 
//     });
//     return;
//   }

//   if (isResendCooldownActive) {
//     return; // Still in cooldown
//   }

//   setLoading(true);
// try {
//   console.log(`📧 Resend attempt ${resendCount + 1}/${MAX_RESEND_ATTEMPTS}`);
  
//   // Reset verification code input
//   setVerificationCode(['', '', '', '', '', '']);
  
//   // Real API call
//   const response = await fetch(`${API_BASE}/api/auth/send-verification`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email: email,
//       type: 'signup'
//     })
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error || 'Failed to resend verification code');
//   }

//   // Update counters and timers
//   setResendCount(prev => prev + 1);
//   setVerificationTimer(90); // Reset to 1.5 minutes
//   setCanResendCode(false);
  
//   // Start cooldown (1 minute before next resend)
//   setResendCooldown(RESEND_COOLDOWN_SECONDS);
//   setIsResendCooldownActive(true);
  
//   // Clear any existing errors
//   setErrors(prev => ({ ...prev, verificationCode: '' }));
  
//   // Focus first input
//   setTimeout(() => {
//     verificationRefs.current[0]?.focus();
//   }, 100);
  
//   console.log('✅ Verification code resent successfully');

// } catch (error) {
//   console.error('❌ Resend verification error:', error);
//   setErrors({ 
//     verificationCode: 'Failed to resend verification code. Please try again.' 
//   });
// }

//   setLoading(false);
// };


//   const verifyAndRegister = async () => {
//     if (!validateStep(3)) return;

//     setLoading(true);
//     try {
//       // First verify email
//       const verifyResponse = await fetch(`${API_BASE}/api/auth/verify-email`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: email,
//           code: verificationCode.join(''),
//           type: 'signup'
//         })
//       });

//       if (!verifyResponse.ok) {
//         const error = await verifyResponse.json();
//         setErrors({ verificationCode: error.message || 'Invalid verification code' });
//         setLoading(false);
//         return;
//       }

//       // Now register user
//       await registerUser();
//     } catch (error) {
//       setErrors({ verificationCode: 'Verification failed' });
//       setLoading(false);
//     }
//   };

//   const registerUser = async () => {
//     try {
//       const formDataToSend = new FormData();
      
//       // Add common fields
//       formDataToSend.append('fullName', fullName);
//       formDataToSend.append('email', email);
//       formDataToSend.append('password', password);
//       formDataToSend.append('role', role);
//       formDataToSend.append('collegeName', isIndividualStudent ? 'Individual Student' : selectedCollege);
//       formDataToSend.append('collegeCode', 'IEM');

//       // Add role-specific fields
//       if (role === 'student') {
//         if (formData.profilePicture) {
//           formDataToSend.append('profilePicture', formData.profilePicture);
//         }
//         formDataToSend.append('phoneNumber', formData.phoneNumber);
//         formDataToSend.append('gender', formData.gender);
//         formDataToSend.append('admissionYear', formData.admissionYear);
//         formDataToSend.append('course', formData.course);
//         formDataToSend.append('stream', formData.stream);
//         formDataToSend.append('year', formData.year);
//         formDataToSend.append('rollNo', formData.rollNo);
//         formDataToSend.append('currentSemester', formData.currentSemester);
//       } else if (role === 'faculty') {
//         formDataToSend.append('department', formData.department);
//         formDataToSend.append('designation', formData.designation);
//         formDataToSend.append('qualification', formData.qualification);
//         formDataToSend.append('experience', formData.experience);
//         formDataToSend.append('specialization', formData.specialization);
//         formDataToSend.append('employeeId', formData.employeeId);
//       } else if (role === 'college_admin') {
//         formDataToSend.append('adminLevel', formData.adminLevel);
//         formDataToSend.append('responsibilities', formData.responsibilities);
//         formDataToSend.append('approvalAuthority', formData.approvalAuthority);
//         formDataToSend.append('accessLevel', formData.accessLevel);
//         formDataToSend.append('employeeId', formData.employeeId);
//       }

//      const response = await fetch(`${API_BASE}/api/auth/role-signup`, {
//   method: 'POST',
//   body: formDataToSend
// });

// const data = await response.json();
// if (response.ok) {
//   setCurrentStep(4);
// } else {
//   if (data.error && data.error.includes('User already registered')) {
//     setExistingUserCollege(data.collegeName || 'Unknown College');
//     setEmailCheckStatus(data.role ? 'same_college' : 'different_college');
//     setShowExistingUserModal(true);
//   } else {
//     setErrors({ general: data.error || 'Registration failed' });
//   }
// }

//     } catch (error) {
//       setErrors({ general: 'Registration failed' });
//     }
//     setLoading(false);
//   };

//   // Your existing handleSubmit for login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isLogin) {
//         // Handle login - Updated to use MongoDB backend
//         const response = await fetch(`${API_BASE}/auth/signin`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: email.trim(),
//             password: password,
//             collegeName: isIndividualStudent ? 'Individual Student' : selectedCollege,
//             role: isIndividualStudent ? 'individual_student' : role
//           }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           // Check if user belongs to selected college
//           if (data.tenant.name !== selectedCollege && !isIndividualStudent) {
//             setUserCollege(data.tenant.name);
//             setShowCollegeMismatch(true);
//             setLoading(false);
//             return;
//           }

//           // Initialize session and navigate to dashboard
//           localStorage.setItem('sessionToken', data.sessionToken);
//           const now = Date.now();
//           localStorage.setItem('sessionStart', now.toString());
//           localStorage.setItem('lastActivity', now.toString());
//           navigate('/dashboard');
//         } else {
//           throw new Error(data.error || 'Login failed');
//         }
// } else {
//   // For signup - don't call handleSubmit logic, let the button handle it
//   console.log('Signup form submitted, but should be handled by button logic');
// }


//     } catch (error) {
//       console.error('Authentication error:', error);
//       alert(error.message || 'An error occurred during authentication');
//     } finally {
//       if (isLogin || currentStep === 3) {
//         setLoading(false);
//       }
//     }
//   };

//   const handleForgotPassword = async () => {
//     alert('Password reset functionality will be implemented with MongoDB backend in a future update.');
//   };

//   const handleDeleteAccount = () => {
//     setShowCollegeMismatch(false);
//     navigate('/college-selection');
//   };

//   const handleCancelDeleteAccount = () => {
//     setShowCollegeMismatch(false);
//     navigate('/college-selection');
//   };

//   const selectedCollegeLogo = `webdata/clg-logo/${selectedCollege.replace(/\s+/g, '-')}.png`;

//   // Show college mismatch warning if needed
//   if (showCollegeMismatch) {
//     return <CollegeMismatchWarning 
//       userCollege={userCollege}
//       currentCollege={selectedCollege}
//       onDeleteAccount={handleDeleteAccount}
//       onCancel={handleCancelDeleteAccount}
//       isIndividualMismatch={selectedCollege === 'Individual Student' && userCollege !== 'Individual Student'}
//     />;
//   }

//   // Show college mismatch warning if needed
// if (showCollegeMismatch) {
//   return <CollegeMismatchWarning 
//     userCollege={userCollege}
//     currentCollege={selectedCollege}
//     onDeleteAccount={handleDeleteAccount}
//     onCancel={handleCancelDeleteAccount}
//     isIndividualMismatch={selectedCollege === 'Individual Student' && userCollege !== 'Individual Student'}
//   />;
// }

// // ADD THIS NEW SECTION RIGHT HERE:
// // Existing User Modal Component
// const ExistingUserModal = () => {
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const handleDeleteAccount = async () => {
//     setDeleteLoading(true);
//     try {
//       const response = await fetch(`${API_BASE}/api/auth/delete-existing-account`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: email.trim()
//         })
//       });

//       if (response.ok) {
//         alert('Your existing account has been deleted. You can now register with this email.');
//         setShowExistingUserModal(false);
//         setEmailCheckStatus('');
//         setExistingUserCollege('');
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Failed to delete account');
//       }
//     } catch (error) {
//       alert('Failed to delete account. Please try again.');
//     }
//     setDeleteLoading(false);
//   };

//   const handleCancel = () => {
//     setShowExistingUserModal(false);
//     setEmail(''); // Clear email
//     setEmailCheckStatus('');
//     setExistingUserCollege('');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className={`max-w-md w-full mx-4 p-6 rounded-xl shadow-2xl ${
//           isDarkMode ? 'bg-gray-800' : 'bg-white'
//         }`}
//       >
//         <div className="text-center mb-6">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Email Already Registered
//           </h3>
//           <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//             This email is already registered to <strong>{existingUserCollege}</strong>.
//             {emailCheckStatus === 'same_college' 
//               ? ' You cannot create another account with the same email in this college.'
//               : ' You can register here after deleting your existing account.'
//             }
//           </p>
//         </div>

//         <div className="space-y-3">
//           {emailCheckStatus === 'different_college' && (
//             <button
//               onClick={handleDeleteAccount}
//               disabled={deleteLoading}
//               className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
//             >
//               {deleteLoading ? 'Deleting Account...' : 'Delete Existing Account & Continue'}
//             </button>
//           )}
          
//           <button
//             onClick={handleCancel}
//             className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
//               isDarkMode 
//                 ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                 : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//             }`}
//           >
//             {emailCheckStatus === 'same_college' ? 'Use Different Email' : 'Cancel'}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Show existing user modal if needed
// if (showExistingUserModal) {
//   return <ExistingUserModal />;
// }


//   // Enhanced signup form rendering
//   const renderSignupStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             {/* Role Selection - Hidden for Individual Students */}
//             {!isIndividualStudent && (
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   Role
//                 </label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {[
//                     { value: 'student', label: 'Student', icon: GraduationCap },
//                     { value: 'faculty', label: 'Faculty', icon: Users },
//                     { value: 'college_admin', label: 'College Admin', icon: ShieldCheck }
//                   ].map((roleOption) => {
//                     const IconComponent = roleOption.icon;
//                     return (
//                       <label key={roleOption.value} className="relative cursor-pointer">
//                         <input
//                           type="radio"
//                           name="role"
//                           value={roleOption.value}
//                           checked={role === roleOption.value}
//                           onChange={(e) => setRole(e.target.value)}
//                           className="sr-only"
//                         />
//                         <div className={`p-4 border-2 rounded-lg text-center transition-all ${
//                           role === roleOption.value
//                             ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                             : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
//                         }`}>
//                           <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
//                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                             {roleOption.label}
//                           </span>
//                         </div>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   required
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:bg-gray-700/70 dark:border-gray-600 dark:text-white bg-white/70 border-gray-300 text-gray-900 ${
//                     errors.fullName ? 'border-red-500' : ''
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//               )}
//             </div>

// {/* Email */}
// <div>
//   <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//     Email *
//   </label>
//   <div className="relative">
//     <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//     <input
//       type="email"
//       required
//       value={email}
//       onChange={(e) => {
//         const newEmail = e.target.value;
//         setEmail(newEmail);
        
//         // Reset email check status when email changes
//         setEmailExists(false);
//         setEmailChecked(false);
//         setErrors(prev => ({ ...prev, email: '' }));
        
//         // Check email if valid format (with debounce)
//         if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
//           const timer = setTimeout(() => {
//             if (newEmail === email) { // Only check if email hasn't changed
//               checkEmailExists(newEmail);
//             }
//           }, 800); // 800ms debounce
          
//           return () => clearTimeout(timer);
//         }
//       }}
//       onBlur={() => {
//         if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//           checkEmailExists(email);
//         }
//       }}
//       className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:bg-gray-700/70 dark:border-gray-600 dark:text-white bg-white/70 border-gray-300 text-gray-900 ${
//         errors.email || emailExists ? 'border-red-500' : 
//         emailChecked && !emailExists ? 'border-green-500' : ''
//       }`}
//       placeholder="Enter your email address"
//     />
    
//     {/* Email Status Indicator */}
//     <div className="absolute right-3 top-3">
//       {emailCheckLoading ? (
//         <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
//       ) : emailExists ? (
//         <AlertCircle className="h-5 w-5 text-red-500" />
//       ) : emailChecked && !emailExists ? (
//         <CheckCircle className="h-5 w-5 text-green-500" />
//       ) : null}
//     </div>
//   </div>
  
//   {/* Email Error/Success Messages */}
//   {emailCheckLoading && (
//     <p className="mt-1 text-sm text-blue-600">Checking email availability...</p>
//   )}
//   {emailExists && (
//     <div className="mt-1">
//       <p className="text-sm text-red-600 font-medium">
//         ❌ Email already registered
//       </p>
//       <p className="text-xs text-red-500 mt-1">
//         This email address is already associated with an existing account. 
//         Please use a different email address or try logging in instead.
//       </p>
//       <button
//         type="button"
//         onClick={() => setIsLogin(true)}
//         className="text-xs text-blue-600 hover:text-blue-500 underline mt-1"
//       >
//         Switch to Login instead?
//       </button>
//     </div>
//   )}
//   {emailChecked && !emailExists && !errors.email && (
//     <p className="mt-1 text-sm text-green-600">
//       ✅ Email available for registration
//     </p>
//   )}
//   {errors.email && !emailExists && (
//     <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//   )}
// </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Password *
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:bg-gray-700/70 dark:border-gray-600 dark:text-white bg-white/70 border-gray-300 text-gray-900 ${
//                     errors.password ? 'border-red-500' : ''
//                   }`}
//                   placeholder="Create a password (min 8 characters)"
//                   minLength={6}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Confirm Password *
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:bg-gray-700/70 dark:border-gray-600 dark:text-white bg-white/70 border-gray-300 text-gray-900 ${
//                     errors.confirmPassword ? 'border-red-500' : ''
//                   }`}
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
//               )}
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
//             {role === 'student' && (
//               <>
//                 {/* Profile Picture */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Profile Picture (Optional)
//                   </label>
//                   <div className="flex items-center space-x-4">
//                     <div className="relative">
//                       {formData.profilePicturePreview ? (
//                         <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
//                           <img
//                             src={formData.profilePicturePreview}
//                             alt="Profile preview"
//                             className="w-full h-full object-cover"
//                           />
//                           <button
//                             onClick={removeProfilePicture}
//                             className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                           >
//                             <X className="h-3 w-3" />
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
//                           <Camera className="h-6 w-6 text-gray-400" />
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileUpload}
//                         accept="image/*"
//                         className="hidden"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                       >
//                         <Upload className="inline h-4 w-4 mr-1" />
//                         Upload
//                       </button>
//                       <p className="text-xs text-gray-500 mt-1">Max 50KB</p>
//                     </div>
//                   </div>
//                   {errors.profilePicture && (
//                     <p className="mt-1 text-sm text-red-600">{errors.profilePicture}</p>
//                   )}
//                 </div>

//                 {/* Phone Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Phone Number *
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                     <input
//                       type="tel"
//                       value={formData.phoneNumber}
//                       onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                       className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                         errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                       placeholder="Enter 10-digit phone number"
//                     />
//                   </div>
//                   {errors.phoneNumber && (
//                     <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
//                   )}
//                 </div>

//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Gender *
//                   </label>
//                   <div className="grid grid-cols-3 gap-3">
//                     {['Male', 'Female', 'Other'].map((gender) => (
//                       <label key={gender} className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
//                         <input
//                           type="radio"
//                           name="gender"
//                           value={gender}
//                           checked={formData.gender === gender}
//                           onChange={(e) => handleInputChange('gender', e.target.value)}
//                           className="text-blue-600 focus:ring-blue-500"
//                         />
//                         <span className="text-sm text-gray-700 dark:text-gray-300">{gender}</span>
//                       </label>
//                     ))}
//                   </div>
//                   {errors.gender && (
//                     <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
//                   )}
//                 </div>

//                 {/* Academic Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Admission Year *
//                     </label>
//                     <select
//                       value={formData.admissionYear}
//                       onChange={(e) => handleInputChange('admissionYear', e.target.value)}
//                       className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                         errors.admissionYear ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     >
//                       <option value="">Select year</option>
//                       {Array.from({ length: 10 }, (_, i) => {
//                         const year = new Date().getFullYear() - i;
//                         return <option key={year} value={year}>{year}</option>;
//                       })}
//                     </select>
//                     {errors.admissionYear && (
//                       <p className="mt-1 text-sm text-red-600">{errors.admissionYear}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Course *
//                     </label>
//                     <select
//                       value={formData.course}
//                       onChange={(e) => {
//                         handleInputChange('course', e.target.value);
//                         handleInputChange('stream', '');
//                       }}
//                       className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                         errors.course ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     >
//                       <option value="">Select course</option>
//                       {courses.map(course => (
//                         <option key={course} value={course}>{course}</option>
//                       ))}
//                     </select>
//                     {errors.course && (
//                       <p className="mt-1 text-sm text-red-600">{errors.course}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Stream *
//                     </label>
//                     <select
//                       value={formData.stream}
//                       onChange={(e) => handleInputChange('stream', e.target.value)}
//                       disabled={!formData.course}
//                       className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                         errors.stream ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       } ${!formData.course ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       <option value="">Select stream</option>
//                       {formData.course && streams[formData.course]?.map(stream => (
//                         <option key={stream} value={stream}>{stream}</option>
//                       ))}
//                     </select>
//                     {errors.stream && (
//                       <p className="mt-1 text-sm text-red-600">{errors.stream}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Current Year *
//                     </label>
//                     <select
//                       value={formData.year}
//                       onChange={(e) => handleInputChange('year', e.target.value)}
//                       className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                         errors.year ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     >
//                       <option value="">Select year</option>
//                       <option value="1st">1st Year</option>
//                       <option value="2nd">2nd Year</option>
//                       <option value="3rd">3rd Year</option>
//                       <option value="4th">4th Year</option>
//                     </select>
//                     {errors.year && (
//                       <p className="mt-1 text-sm text-red-600">{errors.year}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Roll Number *
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.rollNo}
//                       onChange={(e) => handleInputChange('rollNo', e.target.value)}
//                       className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                         errors.rollNo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                       placeholder="Enter roll number"
//                     />
//                     {errors.rollNo && (
//                       <p className="mt-1 text-sm text-red-600">{errors.rollNo}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Current Semester *
//                     </label>
//                     <select
//                       value={formData.currentSemester}
//                       onChange={(e) => handleInputChange('currentSemester', e.target.value)}
//                       className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                         errors.currentSemester ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     >
//                       <option value="">Select semester</option>
//                       {Array.from({ length: 8 }, (_, i) => i + 1).map(sem => (
//                         <option key={sem} value={sem}>
//                           {sem}{sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester
//                         </option>
//                       ))}
//                     </select>
//                     {errors.currentSemester && (
//                       <p className="mt-1 text-sm text-red-600">{errors.currentSemester}</p>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}

//             {role === 'faculty' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Department *
//                   </label>
//                   <select
//                     value={formData.department}
//                     onChange={(e) => handleInputChange('department', e.target.value)}
//                     className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                       errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                   >
//                     <option value="">Select department</option>
//                     {departments.map(dept => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                   {errors.department && (
//                     <p className="mt-1 text-sm text-red-600">{errors.department}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Designation *
//                   </label>
//                   <select
//                     value={formData.designation}
//                     onChange={(e) => handleInputChange('designation', e.target.value)}
//                     className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                       errors.designation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                   >
//                     <option value="">Select designation</option>
//                     {designations.map(designation => (
//                       <option key={designation} value={designation}>{designation}</option>
//                     ))}
//                   </select>
//                   {errors.designation && (
//                     <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Qualification *
//                   </label>
//                   <select
//                     value={formData.qualification}
//                     onChange={(e) => handleInputChange('qualification', e.target.value)}
//                     className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                       errors.qualification ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                   >
//                     <option value="">Select qualification</option>
//                     {qualifications.map(qual => (
//                       <option key={qual} value={qual}>{qual}</option>
//                     ))}
//                   </select>
//                   {errors.qualification && (
//                     <p className="mt-1 text-sm text-red-600">{errors.qualification}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Employee ID *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.employeeId}
//                     onChange={(e) => handleInputChange('employeeId', e.target.value)}
//                     className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                       errors.employeeId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     placeholder="Enter employee ID"
//                   />
//                   {errors.employeeId && (
//                     <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
//                   )}
//                 </div>
//               </div>
//             )}

//             {role === 'college_admin' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Admin Level *
//                   </label>
//                   <select
//                     value={formData.adminLevel}
//                     onChange={(e) => handleInputChange('adminLevel', e.target.value)}
//                     className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                       errors.adminLevel ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                   >
//                     <option value="">Select admin level</option>
//                     {adminLevels.map(level => (
//                       <option key={level} value={level}>{level}</option>
//                     ))}
//                   </select>
//                   {errors.adminLevel && (
//                     <p className="mt-1 text-sm text-red-600">{errors.adminLevel}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Employee ID *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.employeeId}
//                     onChange={(e) => handleInputChange('employeeId', e.target.value)}
//                     className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                       errors.employeeId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     placeholder="Enter employee ID"
//                   />
//                   {errors.employeeId && (
//                     <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
//                   )}
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Key Responsibilities *
//                   </label>
//                   <textarea
//                     value={formData.responsibilities}
//                     onChange={(e) => handleInputChange('responsibilities', e.target.value)}
//                     className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//                       errors.responsibilities ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     placeholder="Describe your key administrative responsibilities"
//                     rows="3"
//                   />
//                   {errors.responsibilities && (
//                     <p className="mt-1 text-sm text-red-600">{errors.responsibilities}</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                 Email Verification
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 We've sent a 6-digit code to {email}
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
//                   Enter the 6-digit verification code
//                 </label>
//                 <div className="flex justify-center space-x-2">
//   {verificationCode.map((digit, index) => (
//     <input
//       key={`otp-${index}`}
//       ref={ref => verificationRefs.current[index] = ref}
//       type="text"
//       value={digit}
//       onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
//       onKeyDown={(e) => handleVerificationKeyDown(index, e)}
//       className={`w-12 h-12 text-center text-lg font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
//         errors.verificationCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//       }`}
//       maxLength={1}
//     />
//   ))}
// </div>

//                 {errors.verificationCode && (
//                   <p className="mt-2 text-sm text-red-600 text-center">{errors.verificationCode}</p>
//                 )}
//               </div>

//               <div className="text-center">
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                   Resend code after: <span className="font-mono font-bold text-red-600">
//                     {formatTime(verificationTimer)}
//                   </span>
//                 </p>
                
//                 {canResendCode ? (
//                   <button
//                     onClick={() => {
//   setVerificationTimer(RESEND_COOLDOWN_SECONDS);  // Reset to 90 seconds
//   setCanResendCode(false);
//   sendVerificationEmail();
// }}

//                     disabled={loading}
//                     className="text-blue-600 hover:text-blue-500 text-sm font-medium"
//                   >
//                     Resend Code
//                   </button>
//                 ) : (
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Didn't receive the code? Request a new code after cooldown.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="text-center space-y-6">
//             <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//               <CheckCircle className="h-8 w-8 text-green-600" />
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Registration Successful! 🎉
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Your {role.replace('_', ' ')} account has been created successfully.
//               </p>
//             </div>

//             <div className="space-y-3">
//               <button
//                 onClick={() => {
//                   setIsLogin(true);
//                   setCurrentStep(1);
//                   setPassword('');
//                   setConfirmPassword('');
//                   setFormData({
//                     profilePicture: null,
//                     profilePicturePreview: '',
//                     phoneNumber: '',
//                     gender: '',
//                     admissionYear: '',
//                     course: '',
//                     stream: '',
//                     year: '',
//                     rollNo: '',
//                     currentSemester: '',
//                     department: '',
//                     designation: '',
//                     qualification: '',
//                     experience: '',
//                     specialization: '',
//                     employeeId: '',
//                     adminLevel: '',
//                     responsibilities: '',
//                     approvalAuthority: '',
//                     accessLevel: ''
//                   });
//                   setErrors({});
//                 }}
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 Go to Login
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Glass Header */}
//       <GlassHeader className="flex items-center justify-end px-4">
//         <ThemeToggle />
//       </GlassHeader>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
//           isDarkMode 
//             ? 'bg-gray-800/70 border-gray-700/50' 
//             : 'bg-white/70 border-gray-200/50'
//         }`}
//       >
//         <div className="text-center">
//           <button
//             onClick={() => navigate('/college-selection')}
//             className={`mb-4 p-2 rounded-lg transition-colors ${
//               isDarkMode 
//                 ? 'hover:bg-gray-700/70 backdrop-blur-sm' 
//                 : 'hover:bg-gray-200/70 backdrop-blur-sm'
//             }`}
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>

//           {/* College Logo with Fallback */}
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <LogoWithFallback 
//               collegeLogoUrl={selectedCollegeLogo}
//               collegeName={selectedCollege}
//               className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
//               fallbackClassName="w-12 h-12 rounded-full object-cover border-2 border-gray-400"
//             />
//             <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Note Loom
//             </span>
//           </div>

//           <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             {isLogin ? 'Welcome Back' : 'Create Account'}
//           </h2>
//           <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             {selectedCollege}
//           </p>

//           {/* Progress Bar for Signup */}
//           {!isLogin && currentStep < 4 && (
//             <div className="mt-6 mb-6">
//               <div className="flex justify-between items-center mb-2">
//                 {[1, 2, 3].map((step) => (
//                   <div
//                     key={step}
//                     className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
//                       step <= currentStep
//                         ? 'bg-blue-600 text-white'
//                         : `${isDarkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-600'}`
//                     }`}
//                   >
//                     {step}
//                   </div>
//                 ))}
//               </div>
//               <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
//                 <div
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${(currentStep / 3) * 100}%` }}
//                 />
//               </div>
//               <div className={`flex justify-between text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
//                 <span>Basic Info</span>
//                 <span>Details</span>
//                 <span>Verify</span>
//               </div>
//             </div>
//           )}

//           {/* Updated Test Accounts - Added Individual Student */}
//           <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
//             <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
//               Test Accounts:
//             </p>
//             {isIndividualStudent ? (
//               <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
//                 Individual: individual@email.in / password123
//               </p>
//             ) : (
//               <>
//                 <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
//                   Student: student@email.in / password123
//                 </p>
//                 <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
//                   Faculty: faculty@email.in / password123
//                 </p>
//                 <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
//                   Admin: admin@email.in / password123
//                 </p>
//               </>
//             )}
//           </div>
//         </div>

//         <form onSubmit={(e) => {
//   e.preventDefault();
//   if (isLogin) {
//     handleSubmit(e);
//   }
//   // For signup, do nothing - handled by button click
// }} className="space-y-6">

//           {/* Render appropriate form based on login/signup state and current step */}
//           {isLogin ? (
//             <>
//               {/* Role Selection - Hidden for Individual Students */}
//               {!isIndividualStudent && (
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     Role
//                   </label>
//                   <div className="relative">
//                     <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     <select
//                       value={role}
//                       onChange={(e) => setRole(e.target.value)}
//                       className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
//                         isDarkMode 
//                           ? 'bg-gray-700/70 backdrop-blur-sm border-gray-600 text-white' 
//                           : 'bg-white/70 backdrop-blur-sm border-gray-300 text-gray-900'
//                       }`}
//                     >
//                       <option value="student">Student</option>
//                       <option value="faculty">Faculty</option>
//                       <option value="college_admin">College Admin</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

// {/* Email */}
// <div>
//   <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//     Email *
//   </label>
//   <div className="relative">
//     <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//     <input
//       type="email"
//       required
//       value={email}
//       onChange={(e) => {
//         const newEmail = e.target.value;
//         setEmail(newEmail);
        
//         // Clear previous status
//         setEmailCheckStatus('');
//         setExistingUserCollege('');
        
//         // Check email if valid
//         if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
//           // Debounced email check
//           setTimeout(() => {
//             if (newEmail === email) { // Only check if email hasn't changed
//               checkEmailExists(newEmail);
//             }
//           }, 1000);
//         }
//       }}
//       className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:bg-gray-700/70 dark:border-gray-600 dark:text-white bg-white/70 border-gray-300 text-gray-900 ${
//         errors.email || emailCheckStatus === 'same_college' || emailCheckStatus === 'different_college' 
//           ? 'border-red-500' 
//           : emailCheckStatus === 'available' 
//           ? 'border-green-500' 
//           : ''
//       }`}
//       placeholder="Enter your email address"
//     />
//     {/* Loading/Status indicator */}
//     <div className="absolute right-3 top-3">
//       {emailCheckLoading ? (
//         <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
//       ) : emailCheckStatus === 'available' ? (
//         <CheckCircle className="h-5 w-5 text-green-500" />
//       ) : (emailCheckStatus === 'same_college' || emailCheckStatus === 'different_college') ? (
//         <AlertCircle className="h-5 w-5 text-red-500" />
//       ) : null}
//     </div>
//   </div>
//   {errors.email && (
//     <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//   )}
//   {emailCheckStatus === 'same_college' && (
//     <p className="mt-1 text-sm text-red-600">
//       This email is already registered to {existingUserCollege}. Please use a different email or delete your existing account.
//     </p>
//   )}
//   {emailCheckStatus === 'different_college' && (
//     <p className="mt-1 text-sm text-red-600">
//       This email is registered to {existingUserCollege}. You can register here after deleting your existing account.
//     </p>
//   )}
// </div>


//               {/* Password */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                   <input
//                     type="password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
//                       isDarkMode 
//                         ? 'bg-gray-700/70 backdrop-blur-sm border-gray-600 text-white' 
//                         : 'bg-white/70 backdrop-blur-sm border-gray-300 text-gray-900'
//                     }`}
//                     placeholder="Enter your password"
//                     minLength={6}
//                   />
//                 </div>
//               </div>
//             </>
//           ) : (
//             renderSignupStep()
//           )}

//           {/* Submit Button */}
// <button
//   type="button"
//   onClick={() => {
//     if (!isLogin) {
//       // Handle signup steps
//       if (currentStep === 1) {
//         if (validateStep(1)) {
//           nextStep();
//         } else {
//           console.log('Step 1 validation failed');
//         }
//       } else if (currentStep === 2) {
//         if (validateStep(2)) {
//           nextStep();
//         } else {
//           console.log('Step 2 validation failed');  
//         }
//       } else if (currentStep === 3) {
//         verifyAndRegister();
//       }
//     } else {
//       // Handle login
//       handleSubmit({preventDefault: () => {}});
//     }
//   }}
//   disabled={loading}
//   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
// >
//   {loading ? 'Processing...' : 
//    isLogin ? 'Sign In' : 
//    currentStep === 1 ? 'Next' : 
//    currentStep === 2 ? 'Send Verification Code' :
//    currentStep === 3 ? 'Create Account' : 'Complete'
//   }
// </button>

// {/* Registration Guidance */}
// {!isLogin && currentStep === 1 && (
//   <div className={`p-4 rounded-lg border ${
//     isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
//   }`}>
//     <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
//       <strong>Registration Tips:</strong>
//     </p>
//     <ul className={`text-xs mt-1 space-y-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
//       <li>• Use a valid email address you have access to</li>
//       <li>• We'll check if this email is already registered</li>
//       <li>• You'll need to verify your email before completing registration</li>
//       <li>• If email is taken, please use a different one or try logging in</li>
//     </ul>
//   </div>
// )}


//           {/* Navigation Buttons for Signup */}
//           {!isLogin && currentStep > 1 && currentStep < 4 && (
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
//                   isDarkMode 
//                     ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 <span>Back</span>
//               </button>
//             </div>
//           )}

//           {/* Sign Up / Forgot Password */}
//           <div className="text-center space-y-2">
//             <button
//               type="button"
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setCurrentStep(1);
//                 setErrors({});
//                 setPassword('');
//                 setConfirmPassword('');
//               }}
//               className="text-blue-400 hover:text-blue-300 transition-colors"
//             >
//               {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
//             </button>
//             {isLogin && (
//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="block w-full text-center text-blue-400 hover:text-blue-300 transition-colors"
//               >
//                 Forgot password?
//               </button>
//             )}
//           </div>

//           {/* General Error Display */}
//           {errors.general && (
//             <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
//               <div className="flex items-start space-x-2">
//                 <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
//                 <p className={`text-sm ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
//                   {errors.general}
//                 </p>
//               </div>
//             </div>
//           )}
//         </form>
//       </motion.div>
//     </div>
//   );
// };


// IT Login Page Component - FIXED: Removed book icon, shows only "Note Loom"
// const ITLoginPage = () => {
//   const { isDarkMode } = useTheme();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // FIXED: Connect to real MongoDB backend instead of mock
//       const response = await fetch(`${API_BASE}/it-auth/signin`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email.trim(),
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("IT Login successful", data);

//         // Store IT session token and login time
//         localStorage.setItem('itSessionToken', data.sessionToken);
//         localStorage.setItem('itLoginTime', new Date().toISOString());
        
//         navigate("/it-admin");
//       } else {
//         throw new Error(data.error || 'IT Login failed');
//       }
//     } catch (error) {
//       console.error("IT Authentication error:", error);
//       alert(error.message || "An error occurred during IT authentication");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
//     }`}>
//       {/* Glass Header - FIXED: Light mode header = footer color */}
//       <GlassHeader>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => navigate('/')}
//                 className={`p-1 rounded-md transition-colors ${
//                   isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
//                 }`}
//               >
//                 <ArrowLeft className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
//               </button>
//               {/* FIXED: Only "Note Loom" text, no book icon */}
//               <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Note Loom</span>
//               <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-red-400/70 to-red-600/70 text-white border border-red-500/70">
//                 IT Portal
//               </span>
//             </div>
//             <ThemeToggle />
//           </div>
//         </div>
//       </GlassHeader>

//       {/* Login Form */}
//       <div className="flex items-center justify-center min-h-screen pt-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
//             isDarkMode 
//               ? 'bg-gray-800/70 border-gray-700/50' 
//               : 'bg-white/70 border-gray-200/50'
//           }`}
//         >
//           <div className="text-center">
//             <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
//             <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>IT Portal Access</h2>
//             <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Administrative Login</p>
//             <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
//               <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">Test Accounts:</p>
//               <p className="text-xs text-blue-700 dark:text-blue-300">Admin: admin@noteloom.in / admin123</p>
//               <p className="text-xs text-blue-700 dark:text-blue-300">Manager: manager@noteloom.in / admin123</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email */}
//             <div>
//               <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</label>
//               <div className="relative">
//                 <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`} />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
//                     isDarkMode 
//                       ? 'bg-gray-700/70 backdrop-blur-sm border-gray-600 text-white' 
//                       : 'bg-white/70 backdrop-blur-sm border-gray-300 text-gray-900'
//                   }`}
//                   placeholder="Enter your IT email"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Password</label>
//               <div className="relative">
//                 <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`} />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
//                     isDarkMode 
//                       ? 'bg-gray-700/70 backdrop-blur-sm border-gray-600 text-white' 
//                       : 'bg-white/70 backdrop-blur-sm border-gray-300 text-gray-900'
//                   }`}
//                   placeholder="Enter your password"
//                   minLength={6}
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Signing in..." : 'Access IT Portal'}
//             </button>
//           </form>

//           <div className="text-center">
//             <button
//               onClick={() => navigate('/')}
//               className={`transition-colors ${
//                 isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Back to Main Site
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// Continue with remaining components in next part...
// College Dashboard Footer Component
const CollegeDashboardFooter = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`mt-auto py-4 px-4 border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-gray-200/50 border-gray-300/50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Left side - College/Note Loom Logo */}
          <div className="flex items-center space-x-2">
            <CollegeBannerLogo />
            {!COLLEGE_CONFIG.bannerUrl && (
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Powered by Note Loom
              </span>
            )}
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-4 text-xs">
            <button className={`transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
              Tech Support
            </button>
            <span className={`${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              © 2026 Note Loom
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// IT Dashboard Footer Component - separate footer for IT Users
const ITDashboardFooter = () => {
  const { isDarkMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loginTime] = useState(() => {
    // Get login time from localStorage or use current time as fallback
    const storedLoginTime = localStorage.getItem('itLoginTime');
    return storedLoginTime ? new Date(storedLoginTime) : new Date();
  });

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  return (
    <footer className={`mt-auto py-4 px-4 border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-gray-200/50 border-gray-300/50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Left side - Note Loom Beta */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Note Loom Beta
            </span>
            <span className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              V 1.0.0
            </span>
          </div>

          {/* Right side - Date, Time, Login Time */}
          <div className="flex items-center space-x-4 text-xs">
            <div className={`flex items-center space-x-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Calendar className="w-3 h-3" />
              <span>{formatDate(currentTime)}</span>
            </div>
            <div className={`flex items-center space-x-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Clock className="w-3 h-3" />
              <span>{formatTime(currentTime)}</span>
            </div>
            <div className={`text-xs ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Logged in: {formatTime(loginTime)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// NEW: Add/Edit Content Page Component - Separate page instead of modal
// FIXED: Add/Edit Content Page Component - Proper IT session handling to prevent logout
// const AddEditContentPage = () => {
//   const { isDarkMode } = useTheme();
//   const { itUser, isSessionValid, checkITSession } = useITSessionManager();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get editing content from location state
//   const editingContent = location.state?.editingContent || null;
//   const isEditing = !!editingContent;
  
//   const [formData, setFormData] = useState({
//     title: '',
//     type: 'course',
//     content: '',
//     description: '',
//     difficulty: 'beginner',
//     tags: '',
//     isActive: true
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [sessionChecking, setSessionChecking] = useState(true);

//   // FIXED: Check IT session on component mount to prevent logout
//   useEffect(() => {
//     const verifySession = async () => {
//       setSessionChecking(true);
//       const sessionValid = await checkITSession();
      
//       if (!sessionValid) {
//         alert('Your IT session has expired. Please login again.');
//         navigate('/it-login');
//         return;
//       }
      
//       setSessionChecking(false);
//     };

//     verifySession();
//   }, [checkITSession, navigate]);

//   // Initialize form data
//   useEffect(() => {
//     if (editingContent && !sessionChecking) {
//       setFormData({
//         title: editingContent.title || '',
//         type: editingContent.type || 'course',
//         content: editingContent.content || '',
//         description: editingContent.description || '',
//         difficulty: editingContent.difficulty || 'beginner',
//         tags: editingContent.tags ? editingContent.tags.join(', ') : '',
//         isActive: editingContent.isActive !== undefined ? editingContent.isActive : true
//       });
//     }
//   }, [editingContent, sessionChecking]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // FIXED: Double-check session before submitting
//     const sessionValid = await checkITSession();
//     if (!sessionValid) {
//       alert('Your IT session has expired. Please login again.');
//       navigate('/it-login');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const url = editingContent 
//         ? `${API_BASE}/it-admin/individual-content/${editingContent._id}`
//         : `${API_BASE}/it-admin/individual-content`;
      
//       const dataToSave = {
//         ...formData,
//         tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
//       };
      
//       const response = await fetch(url, {
//         method: editingContent ? 'PUT' : 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSave),
//       });
      
//       if (response.ok) {
//         alert(`Content ${editingContent ? 'updated' : 'created'} successfully!`);
//         navigate('/it-admin');
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Error saving content');
//       }
//     } catch (error) {
//       console.error('Error saving content:', error);
//       alert('Error saving content');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
//       navigate('/it-admin');
//     }
//   };

//   // FIXED: Show loading while checking session
//   if (sessionChecking) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
//         isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//       }`}>
//         <div className="text-center">
//           <Shield className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
//           <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Verifying IT session...</p>
//         </div>
//       </div>
//     );
//   }

//   // FIXED: Redirect if session invalid
//   if (!isSessionValid) {
//     navigate('/it-login');
//     return null;
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
//     }`}>
//       {/* Header */}
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate('/it-admin')}
//                 className={`p-2 rounded-lg transition-colors ${
//                   isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
//                 }`}
//               >
//                 <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
//               </button>
              
//               <div>
//                 <div className="flex items-center space-x-2 mb-1">
//                   <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white ${
//                     itUser?.role === 'noteloom_admin' ? 'bg-red-600' : 'bg-orange-600'
//                   }`}>
//                     <Shield className="w-4 h-4 mr-2" />
//                     {itUser?.role === 'noteloom_admin' ? 'Note Loom Admin' : 'Note Loom Manager'}
//                   </span>
//                 </div>
                
//                 <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {isEditing ? 'Edit Content' : 'Add New Content'}
//                   </span>
//                   <span className="mx-2">•</span>
//                   <span>Individual Student Content</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <CollegeBannerLogo className={isDarkMode ? "text-white" : "text-gray-900"} />
//               <ThemeToggle />
//             </div>
//           </div>
//         </div>
//       </GlassHeader>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`rounded-lg shadow-2xl backdrop-blur-md border transition-all duration-300 ${
//             isDarkMode 
//               ? 'bg-gray-800/90 border-gray-700/50' 
//               : 'bg-white/90 border-gray-200/50'
//           }`}
//         >
//           <div className="p-8">
//             {/* Page Title */}
//             <div className="mb-8">
//               <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                 {isEditing ? 'Edit Content' : 'Create New Content'}
//               </h1>
//               <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 {isEditing 
//                   ? 'Update the learning content for individual students'
//                   : 'Create new learning content for individual students'
//                 }
//               </p>
//             </div>
            
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Title */}
//               <div>
//                 <label className={`block text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Title *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
//                     isDarkMode 
//                       ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                   }`}
//                   placeholder="Enter a compelling title for your content"
//                 />
//               </div>

//               {/* Type and Difficulty Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <label className={`block text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     Content Type *
//                   </label>
//                   <select
//                     value={formData.type}
//                     onChange={(e) => setFormData({...formData, type: e.target.value})}
//                     className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
//                       isDarkMode 
//                         ? 'bg-gray-700/50 border-gray-600 text-white' 
//                         : 'bg-white border-gray-300 text-gray-900'
//                     }`}
//                   >
//                     <option value="course">📚 Course</option>
//                     <option value="assignment">📝 Assignment</option>
//                     <option value="announcement">📢 Announcement</option>
//                     <option value="resource">📁 Resource</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className={`block text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     Difficulty Level
//                   </label>
//                   <select
//                     value={formData.difficulty}
//                     onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
//                     className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
//                       isDarkMode 
//                         ? 'bg-gray-700/50 border-gray-600 text-white' 
//                         : 'bg-white border-gray-300 text-gray-900'
//                     }`}
//                   >
//                     <option value="beginner">🟢 Beginner</option>
//                     <option value="intermediate">🟡 Intermediate</option>
//                     <option value="advanced">🔴 Advanced</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className={`block text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Description
//                 </label>
//                 <textarea
//                   rows={4}
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none ${
//                     isDarkMode 
//                       ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                   }`}
//                   placeholder="Provide a brief description of what students will learn"
//                 />
//               </div>

//               {/* Main Content */}
//               <div>
//                 <label className={`block text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Main Content *
//                 </label>
//                 <textarea
//                   rows={12}
//                   required
//                   value={formData.content}
//                   onChange={(e) => setFormData({...formData, content: e.target.value})}
//                   className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none ${
//                     isDarkMode 
//                       ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                   }`}
//                   placeholder="Enter the detailed content that students will see. You can include:

// • Learning objectives
// • Step-by-step instructions
// • Examples and code snippets
// • Resources and links
// • Practice exercises"
//                 />
//                 <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   💡 Tip: Use clear formatting and break content into sections for better readability
//                 </div>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className={`block text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Tags (comma-separated)
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.tags}
//                   onChange={(e) => setFormData({...formData, tags: e.target.value})}
//                   className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
//                     isDarkMode 
//                       ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                   }`}
//                   placeholder="e.g. programming, python, beginner, tutorial, web development"
//                 />
//                 <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   🏷️ Tags help students find relevant content more easily
//                 </div>
//               </div>

//               {/* Active Status */}
//               <div className={`p-6 rounded-xl border-2 border-dashed transition-all ${
//                 formData.isActive 
//                   ? (isDarkMode ? 'border-green-500/50 bg-green-900/10' : 'border-green-400/50 bg-green-50')
//                   : (isDarkMode ? 'border-gray-600/50 bg-gray-800/10' : 'border-gray-300/50 bg-gray-50')
//               }`}>
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="checkbox"
//                     id="isActive"
//                     checked={formData.isActive}
//                     onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
//                     className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
//                   />
//                   <div>
//                     <label htmlFor="isActive" className={`text-lg font-medium cursor-pointer ${
//                       isDarkMode ? 'text-white' : 'text-gray-900'
//                     }`}>
//                       {formData.isActive ? '✅ Active' : '❌ Inactive'} - Visible to Students
//                     </label>
//                     <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {formData.isActive 
//                         ? 'Students can see and interact with this content'
//                         : 'This content is hidden from students and can be activated later'
//                       }
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed shadow-lg"
//                 >
//                   {loading 
//                     ? (
//                       <div className="flex items-center justify-center space-x-2">
//                         <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                         <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
//                       </div>
//                     )
//                     : (
//                       <div className="flex items-center justify-center space-x-2">
//                         <span>{isEditing ? '💾 Update Content' : '✨ Create Content'}</span>
//                       </div>
//                     )
//                   }
//                 </button>
                
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   disabled={loading}
//                   className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed ${
//                     isDarkMode 
//                       ? 'bg-gray-700 hover:bg-gray-600 text-white' 
//                       : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
//                   }`}
//                 >
//                   🚫 Cancel
//                 </button>
//               </div>

//               {/* Help Text */}
//               <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
//                 <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
//                   💡 <strong>Pro Tips:</strong> Use clear headings, bullet points, and examples. 
//                   Content with good structure gets better engagement from students!
//                 </p>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>

//       {/* Footer */}
//       <ITDashboardFooter />
//     </div>
//   );
// };

// NEW: Individual Student Dashboard Component
const IndividualStudentDashboard = () => {
  const { isDarkMode } = useTheme();
  const { user, profile, loading, isSessionValid, clearSession, updateActivity } = useSessionManager();
  const [content, setContent] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  // Fetch individual student content
  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/individual/content`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setContentLoading(false);
    }
  };

  // Update progress for content
  const updateProgress = async (contentId, status, progress = 0) => {
    try {
      const response = await fetch(`${API_BASE}/individual/progress`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId,
          status,
          progress
        }),
      });
      
      if (response.ok) {
        // Refresh content to get updated progress
        fetchContent();
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    if (isSessionValid && user && profile?.isIndividual) {
      fetchContent();
    }
  }, [isSessionValid, user, profile]);

  // Handle mouse/keyboard activity to update session
  useEffect(() => {
    const handleActivity = () => {
      updateActivity();
    };

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [updateActivity]);

  const handleSignOut = async () => {
    try {
      await clearSession();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/');
    }
  };

  const handleUserMenuClick = (optionId) => {
    switch(optionId) {
      case 'modify':
        console.log('Modify details clicked');
        break;
      case 'change-password':
        console.log('Change password clicked');
        break;
      case 'reset-password':
        console.log('Reset password clicked');
        break;
      case 'delete-account':
        setShowDeleteConfirm(true);
        break;
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      alert("Please type DELETE to confirm account deletion.");
      return;
    }
    
    setDeleting(true);
    try {
      await clearSession();
      alert("Account deleted successfully!");
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert("Failed to delete account. Please try again or contact support.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <GraduationCap className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading your learning dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isSessionValid) {
    return <SessionExpiredPage onLoginRedirect={() => navigate('/login')} />;
  }

  if (showDeleteConfirm) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-red-900/20 border-red-500/50' 
              : 'bg-red-100/70 border-red-300/50'
          }`}
        >
          <div className="text-center">
            <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Delete Account</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>This action cannot be undone</p>
          </div>

          <div className={`rounded-lg p-4 backdrop-blur-sm border ${
            isDarkMode 
              ? 'bg-red-900/30 border-red-500/30' 
              : 'bg-red-100/50 border-red-400/30'
          }`}>
            <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>⚠️ WARNING</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Deleting your account will permanently remove all your progress, certificates, and learning data.
            </p>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Type "DELETE" to confirm account deletion
            </label>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Type DELETE here"
            />
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleDeleteAccount}
              disabled={deleting || deleteConfirmText !== "DELETE"}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {deleting ? "Deleting..." : "Permanently Delete Account"}
            </button>
            
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
              }`}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const getProgressIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-5 h-5" />;
      case 'assignment':
        return <ClipboardList className="w-5 h-5" />;
      case 'announcement':
        return <MessageSquare className="w-5 h-5" />;
      case 'resource':
        return <FileText className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredContent = content.filter(item => {
    switch (activeTab) {
      case 'courses':
        return item.type === 'course';
      case 'assignments':
        return item.type === 'assignment';
      case 'announcements':
        return item.type === 'announcement';
      case 'resources':
        return item.type === 'resource';
      default:
        return true;
    }
  });

  const completedCount = content.filter(item => item.userProgress?.status === 'completed').length;
  const inProgressCount = content.filter(item => item.userProgress?.status === 'in_progress').length;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 dashboard-bg">
      {/* Enhanced Glass Header */}
      <GlassHeader isDarker={true}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - User Profile */}
            <div className="flex items-center space-x-4">
              <UserProfileDropdown 
                user={user}
                onOptionClick={handleUserMenuClick}
              />
              
              <div>
                {/* Role Badge */}
                <div className="flex items-center space-x-2 mb-1">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white bg-purple-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Individual Learning
                  </span>
                  <span className="text-xs text-green-400 flex items-center backdrop-blur-sm">
                    <Wifi className="w-3 h-3 mr-1" />
                    Session Active
                  </span>
                </div>
                
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Welcome, {user?.name || 'Learner'}
                  </span>
                  <span className="mx-2">•</span>
                  <span>Personalized Learning Journey</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Logo and Actions */}
            <div className="flex items-center space-x-4">
              <CollegeBannerLogo className={isDarkMode ? "text-white" : "text-gray-900"} />
              
              <ThemeToggle />
              
              <button
                onClick={handleSignOut}
                className={`px-3 py-2 rounded-lg transition-colors text-sm backdrop-blur-md ${
                  isDarkMode 
                    ? 'bg-gray-600/70 hover:bg-gray-700/70 text-white' 
                    : 'bg-white/70 hover:bg-gray-100/70 text-gray-900'
                }`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </GlassHeader>
      
      {/* Main Dashboard Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-lg backdrop-blur-md border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {content.filter(c => c.type === 'course').length}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Courses</p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg backdrop-blur-md border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {inProgressCount}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>In Progress</p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg backdrop-blur-md border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center">
              <Award className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {completedCount}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg backdrop-blur-md border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex items-center">
              <ClipboardList className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {content.filter(c => c.type === 'assignment').length}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Assignments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className={`flex space-x-8 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-300'
          }`}>
            {[
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'assignments', label: 'Assignments', icon: ClipboardList },
              { id: 'announcements', label: 'Announcements', icon: MessageSquare },
              { id: 'resources', label: 'Resources', icon: FileText }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : isDarkMode 
                        ? 'border-transparent text-gray-400 hover:text-gray-300'
                        : 'border-transparent text-gray-600 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {content.filter(c => c.type === tab.id.slice(0, -1) || c.type === tab.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        {contentLoading ? (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading your learning content...</p>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <h3 className="text-xl font-semibold mb-2">No content available</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Content for this section will be added by your Note Loom administrators.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-6 backdrop-blur-md border transition-all duration-300 hover:shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/70' 
                    : 'bg-white/70 border-gray-200/50 hover:bg-gray-100/70'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(item.type)}
                    {getProgressIcon(item.userProgress?.status || 'not_started')}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>

                {/* Content */}
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                
                {item.description && (
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded text-xs ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Progress Bar */}
                {item.userProgress?.progress > 0 && (
                  <div className="mb-4">
                    <div className={`flex justify-between text-xs mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <span>Progress</span>
                      <span>{item.userProgress.progress}%</span>
                    </div>
                    <div className={`w-full bg-gray-200 rounded-full h-2 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.userProgress.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  {item.userProgress?.status === 'completed' ? (
                    <button
                      disabled
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 opacity-75 cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Completed</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => updateProgress(item._id, 'in_progress', 50)}
                        disabled={item.userProgress?.status === 'in_progress'}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                          item.userProgress?.status === 'in_progress'
                            ? 'bg-blue-600 text-white cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {item.userProgress?.status === 'in_progress' ? 'In Progress' : 'Start'}
                      </button>
                      
                      {item.userProgress?.status === 'in_progress' && (
                        <button
                          onClick={() => updateProgress(item._id, 'completed', 100)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          Complete
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Creator info */}
                <div className={`mt-4 pt-4 border-t text-xs ${
                  isDarkMode 
                    ? 'border-gray-700/50 text-gray-500' 
                    : 'border-gray-200/50 text-gray-500'
                }`}>
                  Created by {item.createdBy?.name} ({item.createdBy?.role?.replace('noteloom_', 'Note Loom ')})
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <CollegeDashboardFooter />
    </div>
  );
};


// --- ADD THIS BEFORE CollegeDashboard Component ---
// App.jsx - Add 'Receipt' and 'User' to the map

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

// Regular College Dashboard - Dashboard Component
// const CollegeDashboard = () => {
//   const { isDarkMode } = useTheme();
//   const { user, profile, loading: sessionLoading, isSessionValid, clearSession, updateActivity } = useSessionManager();
//   const [menuItems, setMenuItems] = useState([]);
//   const [menuLoading, setMenuLoading] = useState(true);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteConfirmText, setDeleteConfirmText] = useState("");
//   const [deleting, setDeleting] = useState(false);
//   const navigate = useNavigate();


//   // 1. Fetch Dynamic Menu on Mount
//   useEffect(() => {
//     const fetchMenu = async () => {
//       if (!isSessionValid) return;

//       try {
//         const response = await fetch(`${API_BASE}/dashboard/menu`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setMenuItems(data);
//         } else {
//           console.error("Failed to fetch menu");
//         }
//       } catch (error) {
//         console.error("Error fetching menu:", error);
//       } finally {
//         setMenuLoading(false);
//       }
//     };

//     fetchMenu();
//   }, [isSessionValid]);

//   // Handle mouse/keyboard activity to update session
//   useEffect(() => {
//     const handleActivity = () => updateActivity();
//     const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
//     activityEvents.forEach(event => document.addEventListener(event, handleActivity, { passive: true }));
//     return () => activityEvents.forEach(event => document.removeEventListener(event, handleActivity));
//   }, [updateActivity]);

//   const handleSignOut = async () => {
//     try { await clearSession(); navigate('/'); } catch (error) { navigate('/'); }
//   };

//   const handleUserMenuClick = (optionId) => {
//     switch(optionId) {
//       case 'delete-account': setShowDeleteConfirm(true); break;
//       default: console.log('Menu clicked:', optionId);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteConfirmText !== "DELETE") {
//       alert("Please type DELETE to confirm account deletion.");
//       return;
//     }
//     setDeleting(true);
//     try {
//       const sessionToken = localStorage.getItem('sessionToken');
//       if (sessionToken) {
//         await fetch(`${API_BASE}/auth/delete-account`, {
//           method: 'DELETE',
//           headers: { 'Authorization': `Bearer ${sessionToken}`, 'Content-Type': 'application/json' }
//         });
//       }
//       await clearSession();
//       alert("Account deleted successfully!");
//       navigate('/');
//     } catch (error) {
//       alert("Failed to delete account.");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // Loading State
//   if (sessionLoading || menuLoading) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
//         isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//       }`}>
//         <div className="text-center">
//           <BookOpen className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
//           <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isSessionValid) return <SessionExpiredPage onLoginRedirect={() => navigate('/login')} />;

//   if (showDeleteConfirm) {
//     // ... (Keep your existing delete confirmation UI logic here) ...
//     return (
//       <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//         <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
//            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Account</h2>
//            <p className="mb-4 text-gray-600 dark:text-gray-300">Type "DELETE" to confirm.</p>
//            <input 
//              type="text" 
//              value={deleteConfirmText} 
//              onChange={(e) => setDeleteConfirmText(e.target.value)}
//              className="w-full border p-2 rounded mb-4"
//            />
//            <div className="flex gap-4">
//              <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded flex-1">Delete</button>
//              <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button>
//            </div>
//         </div>
//       </div>
//     );
//   }

// const getRoleBadge = (role) => {
//   const roleMap = {
//     student: {
//       label: 'Student Dashboard',
//       color: 'bg-[var(--primary-600)]',
//       icon: BookOpen
//     },
//     faculty: {
//       label: 'Faculty Dashboard',
//       color: 'bg-[var(--primary-500)]',
//       icon: Users
//     },
//     college_admin: {
//       label: 'Admin Dashboard',
//       color: 'bg-[var(--primary-700)]',
//       icon: Shield
//     }
//   };
//   return roleMap[role] || roleMap.student;
// };


//   const roleInfo = getRoleBadge(profile?.role || 'student');
//   const RoleIcon = roleInfo.icon;

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
//       isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
//     }`}>
//       {/* Header */}
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-4">
//               <UserProfileDropdown user={user} onOptionClick={handleUserMenuClick} />
//               <div>
//                 <div className="flex items-center space-x-2 mb-1">
//                   <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white ${roleInfo.color}`}>
//                     <RoleIcon className="w-4 h-4 mr-2" />
//                     {roleInfo.label}
//                   </span>
//                   <span className="text-xs text-green-400 flex items-center">
//                     <Wifi className="w-3 h-3 mr-1" /> Session Active
//                   </span>
//                 </div>
//                 <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {profile?.isIndividual ? 'Individual Student' : profile?.college}
//                   </span>
//                   <span className="mx-2">•</span>
//                   <span>Welcome, {profile?.full_name || user?.email}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <CollegeBannerLogo className={isDarkMode ? "text-white" : "text-gray-900"} />
//               <ThemeToggle />
//               <button onClick={handleSignOut} className={`px-3 py-2 rounded-lg text-sm backdrop-blur-md ${isDarkMode ? 'bg-gray-600/70 text-white' : 'bg-white/70 text-gray-900'}`}>Sign Out</button>
//             </div>
//           </div>
//         </div>
//       </GlassHeader>
      
//       {/* Main Content */}
//       <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
//         <div className="rounded-2xl p-8 backdrop-blur-md border transition-all duration-300
//   bg-[var(--bg-card)] border-[var(--border)]">
          
//           {menuItems.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// {menuItems.map((item, index) => {
//   const ItemIcon = iconMap[item.icon] || iconMap.Default;

//   const iconColor =
//     index % 4 === 0 ? 'text-blue-500' :
//     index % 4 === 1 ? 'text-green-500' :
//     index % 4 === 2 ? 'text-purple-500' :
//     'text-orange-500';

//   return (
//     <div
//       key={item.key}   // ✅ THIS WAS MISSING
//       className="dashboard-card cursor-pointer"
//       onClick={() => {
//         if (item.key === 'manage_users') {
//           navigate('/dashboard/manage-users');
//         } else if (item.key === 'manage_departments') {
//           navigate('/dashboard/manage-departments');
//         } else if (item.key === 'account_creation') {
//           navigate('/dashboard/account-creation');
//         } else if (item.key === 'staff_notices') {
//           navigate('/dashboard/staff-notices');
//         } else if (item.key === 'dept_notices') {
//           navigate('/dashboard/dept-notices');
//         } else if (item.key === 'my_classes') {
//           navigate('/dashboard/my-classes');
//         } else if (item.key === 'courses') {
//           navigate('/dashboard/courses');
//         } else if (item.key === 'leave_apply') {
//           navigate('/dashboard/leave-apply');
//         } else if (item.key === 'leave_manager') {
//           navigate('/dashboard/leave-manager');
//         } else {
//           console.log(`Navigating to ${item.key}`);
//         }
//       }}
//     >
//       <ItemIcon className={`w-12 h-12 mb-4 mx-auto ${iconColor}`} />
//       <h3 className={`text-xl font-semibold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//         {item.title}
//       </h3>
//       <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//         {item.description}
//       </p>
//     </div>
//   );
// })}

//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
//                 No active features enabled for this dashboard.
//               </p>
//             </div>
//           )}

//         </div>
//       </div>

//       <CollegeDashboardFooter />
//     </div>
//   );
// };

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
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <GraduationCap className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p
            className={`text-lg font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
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





// Updated IT Admin Dashboard - Added Individual Content Management
// Updated IT Admin Dashboard - Navigate to separate page instead of modal
// const ITAdminDashboard = () => {
//   const { isDarkMode } = useTheme();
//   const { itUser, loading, isSessionValid, clearITSession } = useITSessionManager();
//   const [selectedCollege, setSelectedCollege] = useState(null);
//   const navigate = useNavigate();

//   // --- STATE ---
//   const [activeTab, setActiveTab] = useState('overview');
//   const [colleges, setColleges] = useState([]);
//   const [features, setFeatures] = useState({});
//   const [featureRole, setFeatureRole] = useState('student');
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [itUsers, setItUsers] = useState([]);
//   const [individualContent, setIndividualContent] = useState([]);

//   // Form State
//   const [newCollegeData, setNewCollegeData] = useState({
//     name: '', logoUrl: '', adminName: '', adminEmail: '', adminPassword: ''
//   });

//   // Sample Data: College Requests
//   const [collegeRequests, setCollegeRequests] = useState([
//     {
//       _id: '1',
//       collegeName: 'Indian Institute of Technology, Bombay',
//       adminName: 'Dr. Rajesh Kumar',
//       adminEmail: 'admin.rajesh@iitb.ac.in',
//       requestDate: new Date('2025-10-01'),
//       status: 'pending',
//       message: 'We would like to integrate Note Loom for our Computer Science department.'
//     },
//     {
//       _id: '2',
//       collegeName: 'Delhi Technological University',
//       adminName: 'Prof. Priya Sharma',
//       adminEmail: 'priya.admin@dtu.ac.in',
//       requestDate: new Date('2025-10-03'),
//       status: 'pending',
//       message: 'Requesting access for Engineering and Management faculties.'
//     }
//   ]);

//   // Sample Data: Manager Requests
//   const [managerRequests, setManagerRequests] = useState([
//     {
//       _id: '1',
//       name: 'Amit Singh',
//       email: 'amit.singh@noteloom.in',
//       requestDate: new Date('2025-09-28'),
//       status: 'pending',
//       experience: '5 years in EdTech',
//       reason: 'I want to help manage college onboarding.'
//     },
//     {
//       _id: '2',
//       name: 'Kavya Patel',
//       email: 'kavya.patel@noteloom.in',
//       requestDate: new Date('2025-10-02'),
//       status: 'pending',
//       experience: '3 years in Educational Management',
//       reason: 'Looking to contribute to platform development.'
//     }
//   ]);

//   // --- DATA FETCHING ---

// const fetchCollegeFeatures = async (tenantId) => {
//   const res = await fetch(
//     `${API_BASE}/it-admin/menu-config/${tenantId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('itSessionToken')}`
//       }
//     }
//   );
//   const data = await res.json();
//   setFeatures(data); // { student: [], faculty: [], college_admin: [] }
// };

// useEffect(() => {
//   if (selectedCollege) {
//     fetchCollegeFeatures(selectedCollege._id);
//   }
// }, [selectedCollege]);



//   const fetchColleges = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/colleges`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}` }
//       });
//       if (response.ok) {
//         setColleges(await response.json());
//       }
//     } catch (error) { console.error("Error fetching colleges", error); }
//   };

//   const fetchIndividualContent = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/individual-content`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setIndividualContent(data);
//       }
//     } catch (error) { console.error('Error fetching individual content:', error); }
//   };

//   const fetchITUsers = async () => {
//     if (itUser?.role !== 'noteloom_admin') return;
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/users`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setItUsers(data);
//       }
//     } catch (error) { console.error('Error fetching IT users:', error); }
//   };

//   useEffect(() => {
//     if (isSessionValid && itUser) {
//       fetchITUsers();
//       fetchIndividualContent();
//       fetchColleges();
//       // fetchFeatures();
//     }
//   }, [isSessionValid, itUser]);

//   // --- HANDLERS ---

//   const handleSignOut = async () => {
//     try {
//       await clearITSession();
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//       navigate('/');
//     }
//   };

//   const handleUserMenuClick = (optionId) => {
//     console.log('IT User menu clicked:', optionId);
//   };

//   const handleAddContent = () => navigate('/it-admin/content/add');
  
//   const handleEditContent = (content) => navigate('/it-admin/content/edit', { state: { editingContent: content } });

//   const deleteContent = async (contentId) => {
//     if (!confirm('Are you sure you want to delete this content?')) return;
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/individual-content/${contentId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}` },
//       });
//       if (response.ok) {
//         alert('Content deleted successfully!');
//         fetchIndividualContent();
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Error deleting content');
//       }
//     } catch (error) {
//       console.error('Error deleting content:', error);
//       alert('Error deleting content');
//     }
//   };

//   const handleCollegeRequestAction = async (requestId, action) => {
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/college-requests/${requestId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: action }),
//       });
//       if (response.ok) {
//         alert(`Request ${action}ed successfully!`);
//         setCollegeRequests(prev => prev.map(req => req._id === requestId ? { ...req, status: action } : req));
//       } else {
//         alert('Error updating request');
//       }
//     } catch (error) {
//       console.error('Error updating college request:', error);
//       alert('Error updating request');
//     }
//   };

//   const handleManagerRequestAction = async (requestId, action) => {
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/manager-requests/${requestId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: action }),
//       });
//       if (response.ok) {
//         alert(`Manager request ${action}ed successfully!`);
//         setManagerRequests(prev => prev.map(req => req._id === requestId ? { ...req, status: action } : req));
//       } else {
//         alert('Error updating manager request');
//       }
//     } catch (error) {
//       console.error('Error updating manager request:', error);
//       alert('Error updating manager request');
//     }
//   };

//   const handleToggleCollegeStatus = async (id, currentStatus, name) => {
//     if (name === 'Note Loom System') return alert("Cannot disable System Tenant");
//     const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
//     if (!confirm(`Are you sure you want to ${newStatus === 'active' ? 'Enable' : 'Disable'} this college?`)) return;

//     try {
//       const response = await fetch(`${API_BASE}/it-admin/colleges/${id}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ status: newStatus })
//       });
//       if (response.ok) fetchColleges();
//       else alert("Failed to update status");
//     } catch (error) { alert("Error updating status"); }
//   };

//   const handleDeleteCollege = async (id, name) => {
//     if (itUser.role !== 'noteloom_admin') return alert("Only Admin can delete.");
//     if (name === 'Note Loom System') return alert("Cannot delete System Tenant");
//     if (!confirm(`WARNING: This will suspend the college and schedule permanent deletion in 3 MONTHS.\n\nAre you sure?`)) return;

//     try {
//       const response = await fetch(`${API_BASE}/it-admin/colleges/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}` }
//       });
//       if (response.ok) {
//         alert("College suspended and scheduled for deletion.");
//         fetchColleges();
//       } else {
//         alert("Delete failed");
//       }
//     } catch (error) { alert("Error deleting college"); }
//   };

//   const handleFeatureToggle = async (key) => {
//     const currentSettings = features[featureRole] || {};
//     // Logic: If undefined (enabled by default), toggle to false. If false, toggle to true.
//     const newVal = currentSettings[key] === false ? true : false;
    
//     const updatedFeatures = {
//       ...features,
//       [featureRole]: { ...currentSettings, [key]: newVal }
//     };

//     try {
//       // const response = await fetch(`${API_BASE}/api/system/features`, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}`,
//       //     'Content-Type': 'application/json'
//       //   },
//       //   body: JSON.stringify({ dashboardSettings: updatedFeatures })
//       // });
//       if (response.ok) setFeatures(updatedFeatures);
//       else alert("Failed to save setting");
//     } catch (error) { alert("Error saving feature"); }
//   };

//   const handleCreateCollege = async (e) => {
//     if (e) e.preventDefault();
//     try {
//       const response = await fetch(`${API_BASE}/it-admin/colleges`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('itSessionToken')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newCollegeData)
//       });

//       if (response.ok) {
//         alert("College created successfully!");
//         setNewCollegeData({ name: '', logoUrl: '', adminName: '', adminEmail: '', adminPassword: '' });
//         setShowCreateForm(false);
//         fetchColleges();
//       } else {
//         const data = await response.json();
//         alert(data.error || "Failed to create college");
//       }
//     } catch (error) { alert("Error creating college"); }
//   };

//   const getDashboardTitle = () => {
//     if (itUser?.role === 'noteloom_admin') return 'Note Loom Admin';
//     if (itUser?.role === 'noteloom_manager') return 'Note Loom Manager';
//     return 'IT Portal';
//   };

//   // --- RENDERING ---

//   if (loading) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//         <div className="text-center">
//           <Shield className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
//           <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading IT Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isSessionValid) {
//     navigate('/it-login');
//     return null;
//   }

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
//       {/* Header */}
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-4">
//               <UserProfileDropdown user={itUser} onOptionClick={handleUserMenuClick} />
//               <div>
//                 <div className="flex items-center space-x-2 mb-1">
//                   <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white ${itUser?.role === 'noteloom_admin' ? 'bg-red-600' : 'bg-orange-600'}`}>
//                     <Shield className="w-4 h-4 mr-2" />
//                     {getDashboardTitle()}
//                   </span>
//                   <span className="text-xs text-green-400 flex items-center backdrop-blur-sm">
//                     <Wifi className="w-3 h-3 mr-1" />
//                     Session Active
//                   </span>
//                 </div>
//                 <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Welcome, {itUser?.name}</span>
//                   <span className="mx-2">•</span>
//                   <span>Platform Management</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <CollegeBannerLogo className={isDarkMode ? "text-white" : "text-gray-900"} />
//               <ThemeToggle />
//               <button onClick={handleSignOut} className={`px-3 py-2 rounded-lg transition-colors text-sm backdrop-blur-md ${isDarkMode ? 'bg-gray-600/70 hover:bg-gray-700/70 text-white' : 'bg-white/70 hover:bg-gray-100/70 text-gray-900'}`}>
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </GlassHeader>

//       {/* Dashboard Content */}
//       <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
//         {/* Tab Navigation */}
//         <div className="mb-8">
//           <div className={`flex space-x-6 border-b overflow-x-auto ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//             {[
//               { id: 'overview', label: 'Overview' },
//               { id: 'individual-content', label: `Individual Content (${individualContent.length})` },
//               { id: 'college-management', label: 'College Management' },
//               { id: 'college-requests', label: `Requests (${collegeRequests.filter(r => r.status === 'pending').length})` }
//             ].map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'border-red-500 text-red-400'
//                     : isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-600 hover:text-gray-700'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
            
//             {itUser?.role === 'noteloom_admin' && (
//               <>
//                 <button
//                   onClick={() => setActiveTab('manager-requests')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
//                     activeTab === 'manager-requests'
//                       ? 'border-red-500 text-red-400'
//                       : isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-600 hover:text-gray-700'
//                   }`}
//                 >
//                   Manager Requests ({managerRequests.filter(r => r.status === 'pending').length})
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('user-management')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
//                     activeTab === 'user-management'
//                       ? 'border-red-500 text-red-400'
//                       : isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-600 hover:text-gray-700'
//                   }`}
//                 >
//                   User Management
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* --- OVERVIEW TAB --- */}
//         {activeTab === 'overview' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div 
//               onClick={() => setActiveTab('individual-content')}
//               className={`p-6 rounded-lg backdrop-blur-md border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/70' : 'bg-white/70 border-gray-200/50 hover:bg-gray-100/70'}`}
//             >
//               <GraduationCap className="w-12 h-12 text-red-500 mb-4 mx-auto" />
//               <h3 className="text-xl font-semibold mb-2 text-center">Individual Content</h3>
//               <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage learning content</p>
//               <p className={`text-center mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{individualContent.length} Items</p>
//             </div>

//             <div 
//               onClick={() => setActiveTab('college-requests')}
//               className={`p-6 rounded-lg backdrop-blur-md border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/70' : 'bg-white/70 border-gray-200/50 hover:bg-gray-100/70'}`}
//             >
//               <School className="w-12 h-12 text-red-500 mb-4 mx-auto" />
//               <h3 className="text-xl font-semibold mb-2 text-center">College Requests</h3>
//               <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage college onboarding</p>
//               <p className={`text-center mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{collegeRequests.filter(r => r.status === 'pending').length} Pending</p>
//             </div>

//             <div 
//               onClick={() => setActiveTab('user-management')}
//               className={`p-6 rounded-lg backdrop-blur-md border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/70' : 'bg-white/70 border-gray-200/50 hover:bg-gray-100/70'}`}
//             >
//               <Users className="w-12 h-12 text-red-500 mb-4 mx-auto" />
//               <h3 className="text-xl font-semibold mb-2 text-center">User Management</h3>
//               <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage IT users</p>
//               <p className={`text-center mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{itUsers.length} IT Users</p>
//             </div>

// <div 
//   onClick={() => navigate('/it-admin/feature-manager')}
//   className="p-6 rounded-lg backdrop-blur-md border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/70"
// >
//   <Settings className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
//   <h3 className="text-xl font-semibold mb-2 text-center">Feature Manager</h3>
//   <p className="text-center opacity-70">Toggle features ON/OFF</p>
//   <p className="text-center mt-2 font-semibold">Configure Access</p>
// </div>

//           </div>
//         )}

//         {/* --- INDIVIDUAL CONTENT TAB --- */}
//         {activeTab === 'individual-content' && (
//           <div className={`rounded-lg p-6 backdrop-blur-md border transition-all duration-300 ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'}`}>
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//               <div>
//                 <h3 className="text-xl font-semibold">Individual Student Content Management</h3>
//                 <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Create and manage learning content for individual students</p>
//               </div>
//               <button
//                 onClick={handleAddContent}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center space-x-2"
//               >
//                 <Plus className="w-5 h-5" />
//                 <span>Add New Content</span>
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {individualContent.map((content) => (
//                 <div key={content._id} className={`rounded-xl p-6 backdrop-blur-sm border hover:shadow-lg ${isDarkMode ? 'bg-gray-700/70 border-gray-600/50 hover:bg-gray-600/70' : 'bg-gray-50/70 border-gray-200/50 hover:bg-white/70'}`}>
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-3 mb-3">
//                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${content.type === 'course' ? 'bg-blue-600 text-white' : content.type === 'assignment' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-white'}`}>
//                            {content.type.toUpperCase()}
//                          </span>
//                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${content.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                            {content.isActive ? 'Active' : 'Inactive'}
//                          </span>
//                       </div>
//                       <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{content.title}</h4>
//                       <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{content.description}</p>
//                     </div>
//                     <div className="flex space-x-3 ml-4">
//                       <button onClick={() => handleEditContent(content)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1"><Edit className="w-4 h-4"/><span>Edit</span></button>
//                       <button onClick={() => deleteContent(content._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1"><Trash2 className="w-4 h-4"/><span>Delete</span></button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {individualContent.length === 0 && (
//                 <div className="text-center py-16">
//                   <BookOpen className={`w-20 h-20 mx-auto mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                   <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No Content Created Yet</h4>
//                   <button onClick={handleAddContent} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg mt-4">Create First Content</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* --- COLLEGE REQUESTS TAB --- */}
//         {activeTab === 'college-requests' && (
//           <div className={`rounded-lg p-6 backdrop-blur-md border ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'}`}>
//             <h3 className="text-xl font-semibold mb-4">College Admin Requests</h3>
//             <div className="space-y-4">
//               {collegeRequests.map((request) => (
//                 <div key={request._id} className={`rounded-xl p-6 border ${isDarkMode ? 'bg-gray-700/70 border-gray-600/50' : 'bg-gray-50/70 border-gray-200/50'}`}>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <span className={`px-2 py-1 rounded text-xs font-bold ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{request.status.toUpperCase()}</span>
//                       <h4 className="text-lg font-bold mt-2">{request.collegeName}</h4>
//                       <p className="text-sm opacity-80">Admin: {request.adminName} ({request.adminEmail})</p>
//                       <p className="mt-2 text-sm">{request.message}</p>
//                     </div>
//                     {request.status === 'pending' && (
//                       <div className="flex flex-col space-y-2">
//                         <button onClick={() => handleCollegeRequestAction(request._id, 'approved')} className="bg-green-600 text-white px-3 py-1.5 rounded flex items-center space-x-1 text-sm"><CheckCircle className="w-4 h-4"/><span>Approve</span></button>
//                         <button onClick={() => handleCollegeRequestAction(request._id, 'rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded flex items-center space-x-1 text-sm"><AlertCircle className="w-4 h-4"/><span>Reject</span></button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* --- MANAGER REQUESTS TAB --- */}
//         {itUser?.role === 'noteloom_admin' && activeTab === 'manager-requests' && (
//           <div className={`rounded-lg p-6 backdrop-blur-md border ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'}`}>
//             <h3 className="text-xl font-semibold mb-4">Manager Requests</h3>
//             <div className="space-y-4">
//               {managerRequests.map((request) => (
//                 <div key={request._id} className={`rounded-xl p-6 border ${isDarkMode ? 'bg-gray-700/70 border-gray-600/50' : 'bg-gray-50/70 border-gray-200/50'}`}>
//                    <div className="flex justify-between items-start">
//                     <div>
//                       <span className={`px-2 py-1 rounded text-xs font-bold ${request.status === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{request.status.toUpperCase()}</span>
//                       <h4 className="text-lg font-bold mt-2">{request.name}</h4>
//                       <p className="text-sm opacity-80">{request.email} • {request.experience}</p>
//                       <p className="mt-2 text-sm">{request.reason}</p>
//                     </div>
//                     {request.status === 'pending' && (
//                       <div className="flex flex-col space-y-2">
//                         <button onClick={() => handleManagerRequestAction(request._id, 'approved')} className="bg-green-600 text-white px-3 py-1.5 rounded flex items-center space-x-1 text-sm"><CheckCircle className="w-4 h-4"/><span>Approve</span></button>
//                         <button onClick={() => handleManagerRequestAction(request._id, 'rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded flex items-center space-x-1 text-sm"><AlertCircle className="w-4 h-4"/><span>Reject</span></button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* --- COLLEGE MANAGEMENT TAB --- */}
//         {activeTab === 'college-management' && (
//           <div className={`rounded-lg p-6 backdrop-blur-md border transition-all duration-300 ${isDarkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-gray-200/50'}`}>
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h3 className="text-xl font-semibold">Registered Colleges</h3>
//                 <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage access and add new institutions</p>
//               </div>
//               {itUser.role === 'noteloom_admin' && (
//                 <button 
//                   onClick={() => setShowCreateForm(!showCreateForm)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
//                 >
//                   <Plus className="w-4 h-4 mr-2" /> {showCreateForm ? 'Cancel' : 'Add College'}
//                 </button>
//               )}
//             </div>

//             {/* CREATE COLLEGE FORM */}
//             {showCreateForm && (
//               <div className={`mb-8 p-6 rounded-lg border ${isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
//                 <form onSubmit={handleCreateCollege}>
//                   <h3 className="text-lg font-bold mb-4">New College Details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <input placeholder="College Name" required className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} value={newCollegeData.name} onChange={e => setNewCollegeData({...newCollegeData, name: e.target.value})} />
//                     <input placeholder="Logo URL" className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} value={newCollegeData.logoUrl} onChange={e => setNewCollegeData({...newCollegeData, logoUrl: e.target.value})} />
//                   </div>
//                   <div className="border-t border-gray-700 my-4 pt-4"><p className="text-sm font-semibold mb-2">Initial Administrator</p></div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <input placeholder="Admin Name" required className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} value={newCollegeData.adminName} onChange={e => setNewCollegeData({...newCollegeData, adminName: e.target.value})} />
//                     <input placeholder="Admin Email" type="email" required className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} value={newCollegeData.adminEmail} onChange={e => setNewCollegeData({...newCollegeData, adminEmail: e.target.value})} />
//                     <input placeholder="Password" type="password" required className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} value={newCollegeData.adminPassword} onChange={e => setNewCollegeData({...newCollegeData, adminPassword: e.target.value})} />
//                   </div>
//                   <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded font-bold">Create College & Admin</button>
//                 </form>
//               </div>
//             )}

//             <div className="space-y-4">
//               {colleges.map(college => (
//                 <div key={college._id} className={`p-4 rounded-lg border flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-200'}`}>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                       {college.logoUrl ? <img src={college.logoUrl} alt="logo" className="w-full h-full object-cover" /> : <School className="w-6 h-6 text-gray-500" />}
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <h4 className="font-bold text-lg">{college.name}</h4>
//                         {college.name === 'Note Loom System' && <span className="text-xs bg-blue-900 text-blue-200 px-2 rounded">SYSTEM HQ</span>}
//                       </div>
//                       <div className="text-sm opacity-70">
//                         Code: <span className="font-mono">{college.collegeCode}</span> • Status: <span className={college.status === 'active' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>{college.status.toUpperCase()}</span>
//                       </div>
//                       {college.deletionScheduledAt && <div className="text-xs text-red-500 font-bold mt-1">⚠️ Deletion Scheduled: {new Date(college.deletionScheduledAt).toLocaleDateString()}</div>}
//                     </div>
//                   </div>

//                   {college.name !== 'Note Loom System' && (
//                     <div className="flex items-center space-x-3">
//                       <button 
//                         onClick={() => handleToggleCollegeStatus(college._id, college.status, college.name)}
//                         className={`px-4 py-2 rounded-lg text-sm font-medium ${college.status === 'active' ? 'bg-yellow-600/20 text-yellow-500' : 'bg-green-600/20 text-green-500'}`}
//                       >
//                         {college.status === 'active' ? 'Suspend' : 'Activate'}
//                       </button>
                      
//                       {itUser.role === 'noteloom_admin' && (
//                         <button 
//                           onClick={() => handleDeleteCollege(college._id, college.name)}
//                           className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600/20 text-red-500"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>

//       {/* Footer */}
//       <ITDashboardFooter />
//     </div>
//   );
// };

// Content Modal Component for Individual Content Management
const ContentModal = ({ isOpen, onClose, onSave, editingContent, isDarkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'course',
    content: '',
    description: '',
    difficulty: 'beginner',
    tags: '',
    isActive: true
  });

  useEffect(() => {
    if (editingContent) {
      setFormData({
        title: editingContent.title || '',
        type: editingContent.type || 'course',
        content: editingContent.content || '',
        description: editingContent.description || '',
        difficulty: editingContent.difficulty || 'beginner',
        tags: editingContent.tags ? editingContent.tags.join(', ') : '',
        isActive: editingContent.isActive !== undefined ? editingContent.isActive : true
      });
    } else {
      setFormData({
        title: '',
        type: 'course',
        content: '',
        description: '',
        difficulty: 'beginner',
        tags: '',
        isActive: true
      });
    }
  }, [editingContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSave = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };
    
    onSave(dataToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-2xl w-full mx-4 rounded-lg shadow-2xl backdrop-blur-md border ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-700/50' 
            : 'bg-white/90 border-gray-200/50'
        }`}
      >
        <div className="p-6">
          <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {editingContent ? 'Edit Content' : 'Create New Content'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter content title"
              />
            </div>

            {/* Type and Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="course">Course</option>
                  <option value="assignment">Assignment</option>
                  <option value="announcement">Announcement</option>
                  <option value="resource">Resource</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter content description"
              />
            </div>

            {/* Content */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Content *
              </label>
              <textarea
                rows={6}
                required
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter the main content"
              />
            </div>

            {/* Tags */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="e.g. programming, python, beginner"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isActive" className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Active (visible to students)
              </label>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                {editingContent ? 'Update Content' : 'Create Content'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Main App Component - Updated with all routes
// Updated App Component - Added separate content management routes

// Manage Departments Component
// const ManageDepartments = () => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
  
//   // Data States
//   const [departments, setDepartments] = useState([]);
//   const [selectedDept, setSelectedDept] = useState(null);
//   const [subjects, setSubjects] = useState([]);
  
//   // UI States
//   const [activeTab, setActiveTab] = useState('streams');
  
//   // Form States
//   const [newDeptName, setNewDeptName] = useState('');
//   const [newStreamName, setNewStreamName] = useState('');
//   const [newStreamCode, setNewStreamCode] = useState('');

//   // Subject Form State
//   const [newSubName, setNewSubName] = useState('');
//   const [newSubCode, setNewSubCode] = useState('');
//   const [newSubType, setNewSubType] = useState('Theory');
//   const [newSubCredits, setNewSubCredits] = useState(3);
//   const [newSubSemester, setNewSubSemester] = useState(1);
//   // NOTE: Year is handled automatically by backend

//   // --- FETCHERS ---
//   const fetchDepartments = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/api/departments`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setDepartments(data);
//         if (selectedDept) {
//           const updated = data.find(d => d._id === selectedDept._id);
//           if (updated) setSelectedDept(updated);
//         }
//       }
//     } catch (error) { console.error("Error fetching departments", error); }
//   };

//   const fetchSubjects = async () => {
//     if (!selectedDept) return;
//     try {
//       const response = await fetch(`${API_BASE}/api/departments/${selectedDept._id}/subjects`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//       });
//       if (response.ok) setSubjects(await response.json());
//     } catch (error) { console.error("Error fetching subjects", error); }
//   };

//   useEffect(() => { fetchDepartments(); }, []);
//   useEffect(() => { if (selectedDept && activeTab === 'subjects') fetchSubjects(); }, [selectedDept, activeTab]);

//   // --- HANDLERS ---
//   const handleCreateDept = async (e) => {
//     e.preventDefault();
//     if (!newDeptName) return;
//     await fetch(`${API_BASE}/api/departments`, {
//       method: 'POST',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newDeptName })
//     });
//     setNewDeptName('');
//     fetchDepartments();
//   };

//   const handleAddStream = async (e) => {
//     e.preventDefault();
//     if (!newStreamName || !newStreamCode) return alert("Enter stream name and code");
//     const res = await fetch(`${API_BASE}/api/departments/${selectedDept._id}/streams`, {
//       method: 'POST',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newStreamName, code: newStreamCode })
//     });
//     if (res.ok) { setNewStreamName(''); setNewStreamCode(''); fetchDepartments(); }
//     else { const data = await res.json(); alert(data.error || "Failed"); }
//   };

//   const handleDeleteStream = async (streamId) => {
//     if(!confirm("Remove stream?")) return;
//     await fetch(`${API_BASE}/api/departments/${selectedDept._id}/streams/${streamId}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//     });
//     fetchDepartments();
//   };

//   // --- SUBJECT HANDLERS ---
//   const handleAddSubject = async (e) => {
//     e.preventDefault();
//     if (!newSubName || !newSubCode) return alert("All fields are required");

//     const res = await fetch(`${API_BASE}/api/departments/${selectedDept._id}/subjects`, {
//       method: 'POST',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify({ 
//         name: newSubName, 
//         code: newSubCode, 
//         type: newSubType, 
//         credits: newSubCredits,
//         semester: newSubSemester
//         // Year is auto-added by backend
//       })
//     });
    
//     const data = await res.json();
//     if (res.ok) {
//       setNewSubName(''); setNewSubCode(''); setNewSubCredits(3); setNewSubSemester(1);
//       fetchSubjects();
//     } else {
//       alert(data.error || "Failed to create subject");
//     }
//   };

//   const toggleSubjectStatus = async (subject) => {
//     const updatedSubjects = subjects.map(s => s._id === subject._id ? { ...s, isActive: !s.isActive } : s);
//     setSubjects(updatedSubjects);
//     await fetch(`${API_BASE}/api/subjects/${subject._id}`, {
//       method: 'PUT',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify({ isActive: !subject.isActive })
//     });
//     fetchSubjects();
//   };

//   const handleDeleteSubject = async (id) => {
//     if(!confirm("Delete subject?")) return;
//     await fetch(`${API_BASE}/api/subjects/${id}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//     });
//     fetchSubjects();
//   };

//   const handleDeleteDept = async () => {
//     if(!confirm("Delete department?")) return;
//     await fetch(`${API_BASE}/api/departments/${selectedDept._id}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//     });
//     setSelectedDept(null);
//     fetchDepartments();
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-4">
//           <button onClick={() => selectedDept ? setSelectedDept(null) : navigate('/dashboard')} className="p-2 rounded-lg hover:bg-gray-700/50">
//             <ArrowLeft className="w-5 h-5"/>
//           </button>
//           <h1 className="text-xl font-bold">{selectedDept ? selectedDept.name : 'Manage Departments'}</h1>
//         </div>
//       </GlassHeader>

//       <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
//         {!selectedDept ? (
//           <div>
//             <div className={`p-6 rounded-xl border mb-8 ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
//               <h3 className="font-semibold mb-4 flex items-center"><Building className="w-5 h-5 mr-2 text-blue-500"/> Create Department</h3>
//               <form onSubmit={handleCreateDept} className="flex gap-4">
//                 <input type="text" placeholder="Department Name" value={newDeptName} onChange={e => setNewDeptName(e.target.value)} className={`flex-1 p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
//                 <button type="submit" className="bg-blue-600 text-white px-6 rounded-lg font-medium">Add</button>
//               </form>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {departments.map(dept => (
//                 <div key={dept._id} onClick={() => { setSelectedDept(dept); setActiveTab('streams'); }} className={`p-6 rounded-xl border cursor-pointer hover:shadow-lg ${isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white border-gray-200'}`}>
//                   <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
//                   <p className="text-sm opacity-60">{dept.streams.length} Streams</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className={`lg:w-64 flex-shrink-0 p-4 rounded-xl border h-fit ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
//               <button onClick={() => setActiveTab('streams')} className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeTab === 'streams' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700/50'}`}>Streams</button>
//               <button onClick={() => setActiveTab('subjects')} className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeTab === 'subjects' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700/50'}`}>Subjects</button>
//               <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700/50'}`}>Settings</button>
//             </div>

//             <div className="flex-1">
              
//               {/* STREAMS TAB */}
//               {activeTab === 'streams' && (
//                 <div className={`p-8 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
//                   <h2 className="text-2xl font-bold mb-6">Allocate Streams</h2>
//                   <form onSubmit={handleAddStream} className="flex flex-col sm:flex-row gap-4 mb-8">
//                     <input type="text" placeholder="Stream Name (e.g. CSE AI)" value={newStreamName} onChange={e => setNewStreamName(e.target.value)} className={`flex-1 p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
//                     <input type="text" placeholder="Code (001)" value={newStreamCode} onChange={e => setNewStreamCode(e.target.value.slice(0,3))} className={`w-32 p-3 rounded-lg border text-center ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
//                     <button type="submit" className="bg-green-600 text-white px-6 rounded-lg">Add</button>
//                   </form>
//                   <div className="space-y-3">
//                     {selectedDept.streams.map(stream => (
//                       <div key={stream._id} className={`flex justify-between items-center p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
//                         <div><span className="font-mono bg-gray-500/20 px-2 py-1 rounded mr-3 text-xs">{stream.code}</span>{stream.name}</div>
//                         <button onClick={() => handleDeleteStream(stream._id)} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* SUBJECTS TAB */}
//               {activeTab === 'subjects' && (
//                 <div className={`p-8 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
//                   <h2 className="text-2xl font-bold mb-6">Manage Subjects</h2>
                  
//                   {/* Create Subject Form */}
//                   <form onSubmit={handleAddSubject} className={`mb-8 p-6 rounded-xl border border-dashed ${isDarkMode ? 'border-gray-600 bg-gray-800/30' : 'border-gray-300 bg-gray-50'}`}>
//                     <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Add New Subject</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//                       {/* Name */}
//                       <div className="md:col-span-4">
//                         <label className="text-xs opacity-60 mb-1 block">Subject Name</label>
//                         <input type="text" placeholder="e.g. Data Structures" value={newSubName} onChange={e => setNewSubName(e.target.value)} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
//                       </div>
//                       {/* Code */}
//                       <div className="md:col-span-3">
//                         <label className="text-xs opacity-60 mb-1 block">Code</label>
//                         <input type="text" placeholder="CS301" value={newSubCode} onChange={e => setNewSubCode(e.target.value)} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
//                       </div>
//                       {/* Semester */}
//                       <div className="md:col-span-3">
//                         <label className="text-xs opacity-60 mb-1 block">Semester</label>
//                         <select value={newSubSemester} onChange={e => setNewSubSemester(Number(e.target.value))} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
//                           {[1,2,3,4,5,6,7,8].map(sem => <option key={sem} value={sem}>{sem}</option>)}
//                         </select>
//                       </div>
//                       {/* Type */}
//                       <div className="md:col-span-2">
//                         <label className="text-xs opacity-60 mb-1 block">Type</label>
//                         <select value={newSubType} onChange={e => setNewSubType(e.target.value)} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
//                           <option>Theory</option><option>Practical</option><option>Sessional</option>
//                         </select>
//                       </div>
//                       {/* Credits */}
//                       <div className="md:col-span-12">
//                         <label className="text-xs opacity-60 mb-1 block">Credits</label>
//                         <input type="number" min="0" value={newSubCredits} onChange={e => setNewSubCredits(e.target.value)} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}/>
//                       </div>
                      
//                       <div className="md:col-span-12">
//                         <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium flex items-center justify-center gap-2"><Plus className="w-4 h-4"/> Create Subject</button>
//                       </div>
//                     </div>
//                   </form>

//                   {/* Subjects List */}
//                   <div className="space-y-4">
//                     {subjects.map(sub => (
//                       <div key={sub._id} className={`p-4 rounded-lg border transition-all ${!sub.isActive ? 'opacity-60 grayscale' : ''} ${isDarkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <div className="flex flex-wrap items-center gap-2 mb-1">
//                               {/* Type Badge */}
//                               <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
//                                 sub.type === 'Theory' ? 'bg-blue-100 text-blue-800' : 
//                                 sub.type === 'Practical' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
//                               }`}>{sub.type}</span>
                              
//                               {/* Display Created Year (e.g. 2025) */}
//                               <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
//                                 {sub.year}
//                               </span>
                              
//                               {/* Display Semester (e.g. Semester 2) */}
//                               <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
//                                 Semester {sub.semester}
//                               </span>
                              
//                               <span className="font-mono text-xs opacity-70 ml-1 font-bold">{sub.code}</span>
//                             </div>
//                             <h4 className="font-bold text-lg">{sub.name}</h4>
//                             <p className="text-xs opacity-60">{sub.credits} Credits</p>
//                           </div>
                          
//                           <div className="flex items-center space-x-3">
//                             <button onClick={() => toggleSubjectStatus(sub)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${sub.isActive ? 'bg-green-500' : 'bg-gray-400'}`}>
//                               <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sub.isActive ? 'translate-x-6' : 'translate-x-1'}`}/>
//                             </button>
//                             <button onClick={() => handleDeleteSubject(sub._id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded"><Trash2 className="w-4 h-4"/></button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     {subjects.length === 0 && <p className="text-center opacity-50 py-8">No subjects created yet.</p>}
//                   </div>
//                 </div>
//               )}

//               {/* SETTINGS TAB */}
//               {activeTab === 'settings' && (
//                 <div className={`p-8 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
//                   <h2 className="text-2xl font-bold mb-6">Global Settings</h2>
//                   <button onClick={handleDeleteDept} className="bg-red-600/10 text-red-500 border border-red-500/50 px-6 py-3 rounded-lg font-medium">Delete Department</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ManageUsers = () => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('college_admin'); // college_admin, faculty, student
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("All");

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/api/college-admin/users/${activeTab}`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//       });
//       if (res.ok) setUsers(await res.json());
//     } catch (err) { console.error(err); }
//     setLoading(false);
//   };

//   useEffect(() => { fetchUsers(); }, [activeTab]);

//   const handleStatusToggle = async (userId, currentStatus) => {
//     const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
//     const res = await fetch(`${API_BASE}/api/college-admin/users/${userId}/status`, {
//       method: 'PATCH',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus })
//     });
//     if (res.ok) fetchUsers();
//     else alert((await res.json()).error);
//   };

//   const handleDelete = async (userId) => {
//     if (!confirm("Schedule for deletion in 30 days? Log in within this period cancels the request.")) return;
//     const res = await fetch(`${API_BASE}/api/college-admin/users/${userId}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//     });
//     if (res.ok) fetchUsers();
//     else alert((await res.json()).error);
//   };

//   // Filter logic: Search + Batch (for students)
//   const filteredUsers = users.filter(u => {
//     const searchStr = searchQuery.toLowerCase();
//     const matchesSearch = u.name.toLowerCase().includes(searchStr) || 
//                          (u.uid && u.uid.toLowerCase().includes(searchStr));
    
//     if (activeTab === 'student' && selectedBatch !== "All") {
//       const batchYear = new Date(u.createdAt).getFullYear().toString();
//       return matchesSearch && batchYear === selectedBatch;
//     }
//     return matchesSearch;
//   });

//   // Grouping logic for Faculty
//   const facultyGroups = activeTab === 'faculty' ? filteredUsers.reduce((acc, user) => {
//     const dept = user.profile?.department || 'Other Faculties';
//     if (!acc[dept]) acc[dept] = [];
//     acc[dept].push(user);
//     return acc;
//   }, {}) : {};

//   // Extract unique batches (years) for student pills
//   const batches = ["All", ...new Set(users.map(u => new Date(u.createdAt).getFullYear().toString()))].sort();

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-gray-700/50">
//               <ArrowLeft className="w-5 h-5"/>
//             </button>
//             <h1 className="text-xl font-bold">User Management</h1>
//           </div>
//           {/* Role Tabs */}
//           <div className="flex bg-gray-800/50 backdrop-blur-md rounded-xl p-1 border border-gray-700/50">
//             {['college_admin', 'faculty', 'student'].map(tab => (
//               <button
//                 key={tab}
//                 onClick={() => { setActiveTab(tab); setSelectedBatch("All"); }}
//                 className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
//                   activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
//                 }`}
//               >
//                 {tab.replace('_', ' ')}
//               </button>
//             ))}
//           </div>
//         </div>
//       </GlassHeader>

//       <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
//         {/* Search & Student Filter Pills */}
//         <div className="flex flex-col md:flex-row gap-6 mb-8">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//             <input 
//               type="text"
//               placeholder={`Search by name or ${activeTab === 'student' ? 'Enrollment ID' : 'Employee ID'}...`}
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//               className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}
//             />
//           </div>
//           {activeTab === 'student' && (
//             <div className="flex items-center space-x-2 overflow-x-auto pb-2">
//               {batches.map(year => (
//                 <button
//                   key={year}
//                   onClick={() => setSelectedBatch(year)}
//                   className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
//                     selectedBatch === year 
//                       ? 'bg-blue-600 text-white' 
//                       : (isDarkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-600')
//                   }`}
//                 >
//                   {year === "All" ? "All Batches" : `${year} Batch`}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* User List Display */}
//         {loading ? (
//           <div className="text-center py-20 opacity-50">Fetching users...</div>
//         ) : (
//           <div className="space-y-10">
//             {activeTab === 'faculty' ? (
//               // Grouped Faculty Display
//               Object.entries(facultyGroups).map(([dept, deptUsers]) => (
//                 <div key={dept}>
//                   <h2 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center">
//                     <div className="w-1 h-4 bg-blue-500 mr-2 rounded-full"></div> {dept}
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {deptUsers.map(u => <UserManagementCard key={u._id} user={u} onToggle={handleStatusToggle} onDelete={handleDelete} />)}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               // Flat Student/Admin Display
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredUsers.map(u => <UserManagementCard key={u._id} user={u} onToggle={handleStatusToggle} onDelete={handleDelete} />)}
//                 {filteredUsers.length === 0 && <div className="col-span-full text-center py-20 opacity-30">No users found matching your filters.</div>}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Sub-component for individual user cards
const UserManagementCard = ({ user, onToggle, onDelete }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`p-6 rounded-2xl border transition-all hover:shadow-xl ${
      isDarkMode ? 'bg-gray-800/40 border-gray-700 hover:border-blue-500/50' : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg leading-tight">{user.name}</h3>
          <p className="text-xs font-mono text-blue-500 mt-1">{user.uid || 'ID PENDING'}</p>
          <p className="text-xs opacity-60 mt-0.5">{user.email}</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {user.status}
        </span>
      </div>

      {/* Deletion Warning */}
      {user.deletionScheduledAt && (
        <div className="mb-4 p-2 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center">
          <AlertCircle className="w-3 h-3 text-red-500 mr-2" />
          <p className="text-[10px] text-red-400 font-bold">DELETION: {new Date(user.deletionScheduledAt).toLocaleDateString()}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-4 border-t border-gray-500/10">
        <button 
          onClick={() => onToggle(user._id, user.status)}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
            user.status === 'active' 
              ? (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white')
              : 'bg-green-600 text-white'
          }`}
        >
          {user.status === 'active' ? 'Disable Account' : 'Enable Account'}
        </button>
        <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-blue-600' : 'bg-gray-100 hover:bg-blue-600 hover:text-white'}`}>
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(user._id)}
          className="p-2 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// const AccountCreationManager = () => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const [role, setRole] = useState('student'); // student, faculty, college_admin
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
  
//   const [formData, setFormData] = useState({
//     fullName: '', email: '', password: '',
//     // Student fields
//     phoneNumber: '', gender: '', admissionYear: new Date().getFullYear(),
//     course: '', stream: '', year: '1st', rollNo: '', currentSemester: 1,
//     profilePicture: null, profilePicturePreview: '',
//     // Faculty fields
//     department: '', designation: '', qualification: '', experience: '', specialization: '', employeeId: '',
//     // Admin fields
//     adminLevel: 'College Admin', responsibilities: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size <= 51200) {
//       setFormData(prev => ({
//         ...prev,
//         profilePicture: file,
//         profilePicturePreview: URL.createObjectURL(file)
//       }));
//     } else {
//       alert("File too large (Max 50KB)");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     const data = new FormData();
//     // Add common fields
//     data.append('fullName', formData.fullName);
//     data.append('email', formData.email);
//     data.append('password', formData.password);
//     data.append('role', role);
//     data.append('collegeName', localStorage.getItem('selectedCollege'));

//     // Role specific fields
//     if (role === 'student') {
//       ['phoneNumber', 'gender', 'admissionYear', 'course', 'stream', 'year', 'rollNo', 'currentSemester'].forEach(f => data.append(f, formData[f]));
//       if (formData.profilePicture) data.append('profilePicture', formData.profilePicture);
//     } else if (role === 'faculty') {
//       ['department', 'designation', 'qualification', 'experience', 'specialization', 'employeeId'].forEach(f => data.append(f, formData[f]));
//     } else if (role === 'college_admin') {
//       ['adminLevel', 'responsibilities', 'employeeId'].forEach(f => data.append(f, formData[f]));
//     }

//     try {
//       const res = await fetch(`${API_BASE}/api/auth/role-signup`, {
//         method: 'POST',
//         body: data
//       });
//       const result = await res.json();
//       if (res.ok) {
//         setMessage({ type: 'success', text: `Account created! UID: ${result.uid}` });
//         // Reset form
//         setFormData({ ...formData, fullName: '', email: '', password: '', rollNo: '', employeeId: '', profilePicture: null, profilePicturePreview: '' });
//       } else {
//         setMessage({ type: 'error', text: result.error || 'Failed to create account' });
//       }
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Server error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-gray-700/50"><ArrowLeft/></button>
//             <h1 className="text-xl font-bold">Account Creation Management</h1>
//           </div>
//           <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
//             {['student', 'faculty', 'college_admin'].map(t => (
//               <button key={t} onClick={() => setRole(t)} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${role === t ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>
//                 {t.replace('_', ' ')}
//               </button>
//             ))}
//           </div>
//         </div>
//       </GlassHeader>

//       <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-3 mb-6">Step 1: Account Credentials</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//               <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//               <input type="password" name="password" placeholder="Temporary Password" required value={formData.password} onChange={handleInputChange} className={`p-3 rounded-lg border md:col-span-2 ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//             </div>

//             <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-3 pt-4">Step 2: Profile Details ({role})</h2>
            
//             {role === 'student' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <input type="text" name="rollNo" placeholder="Roll Number" required value={formData.rollNo} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <input type="text" name="phoneNumber" placeholder="Phone" required value={formData.phoneNumber} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <select name="gender" required value={formData.gender} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
//                   <option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
//                 </select>
//                 <input type="text" name="course" placeholder="Course (e.g. B.Tech)" required value={formData.course} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <input type="text" name="stream" placeholder="Stream (e.g. CSE)" required value={formData.stream} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <input type="number" name="currentSemester" placeholder="Semester" required value={formData.currentSemester} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//               </div>
//             )}

//             {role === 'faculty' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <input type="text" name="employeeId" placeholder="Employee ID" required value={formData.employeeId} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <input type="text" name="department" placeholder="Department" required value={formData.department} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <input type="text" name="designation" placeholder="Designation" required value={formData.designation} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <input type="text" name="qualification" placeholder="Qualification" required value={formData.qualification} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//               </div>
//             )}

//             {role === 'college_admin' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <input type="text" name="employeeId" placeholder="Employee ID" required value={formData.employeeId} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} />
//                 <select name="adminLevel" value={formData.adminLevel} onChange={handleInputChange} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
//                   <option>Department Admin</option><option>College Admin</option><option>Super Admin</option>
//                 </select>
//                 <textarea name="responsibilities" placeholder="Key Responsibilities" value={formData.responsibilities} onChange={handleInputChange} className={`p-3 rounded-lg border md:col-span-2 ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'}`} rows="3" />
//               </div>
//             )}

//             {message.text && (
//               <div className={`p-4 rounded-lg flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {message.type === 'success' ? <CheckCircle className="w-5 h-5"/> : <AlertCircle className="w-5 h-5"/>}
//                 <span>{message.text}</span>
//               </div>
//             )}

//             <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] disabled:opacity-50">
//               {loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/> : <><UserPlus className="w-5 h-5"/><span>Create {role.replace('_', ' ')} Account</span></>}
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const NoticeBoard = ({ type }) => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreate, setShowCreate] = useState(false);
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({ title: "", content: "", department: "", videoConfig: "mini" });
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const fetchNotices = async () => {
//     setLoading(true);
//     const res = await fetch(`${API_BASE}/api/notices/${type}`, { 
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` } 
//     });
//     if (res.ok) setNotices(await res.json());
//     setLoading(false);
//   };

//   useEffect(() => {
//     const init = async () => {
//       const res = await fetch(`${API_BASE}/session/info`, { 
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` } 
//       });
//       if (res.ok) setUser(await res.json());
//       fetchNotices();
//     };
//     init();
//   }, [type]);

//   const handlePost = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('content', formData.content);
//     data.append('type', type);
//     data.append('videoConfig', formData.videoConfig);
//     selectedFiles.forEach(file => data.append('media', file));

//     const res = await fetch(`${API_BASE}/api/notices`, {
//       method: 'POST',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` },
//       body: data
//     });
//     if (res.ok) { 
//       setShowCreate(false); 
//       setFormData({title:"", content:"", department:"", videoConfig:"mini"}); 
//       setSelectedFiles([]); 
//       fetchNotices(); 
//     }
//   };

//   return (
//     <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-700/50 rounded-lg"><ArrowLeft/></button>
//             <h1 className="text-xl font-bold capitalize">{type.replace('_', ' ')} Newsroom</h1>
//           </div>
//           {((type === 'staff' && user?.role === 'college_admin') || (type === 'departmental' && user?.role === 'faculty')) && (
//             <button onClick={() => setShowCreate(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg flex items-center">
//               <Plus className="w-4 h-4 mr-2"/> Create Post
//             </button>
//           )}
//         </div>
//       </GlassHeader>

//       <div className="max-w-2xl mx-auto px-4 py-8">
//         <AnimatePresence>
//           {showCreate && (
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`mb-8 p-6 rounded-3xl border-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-xl'}`}>
//                <input placeholder="Notice Title" className="w-full mb-4 bg-transparent text-2xl font-bold outline-none border-b border-gray-500/20 pb-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
//                <textarea placeholder="Share an update..." className="w-full mb-4 bg-transparent resize-none outline-none min-h-[120px] text-lg" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
//                <div className="flex justify-between items-center pt-4 border-t border-gray-500/10">
//                  <div className="flex space-x-4">
//                    <label className="cursor-pointer hover:text-blue-500 transition-colors">
//                      <Camera className="w-6 h-6"/><input type="file" multiple className="hidden" onChange={e => setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)])} />
//                    </label>
//                    <select className="text-xs bg-transparent font-bold" value={formData.videoConfig} onChange={e => setFormData({...formData, videoConfig: e.target.value})}>
//                      <option value="mini">Video Player</option>
//                      <option value="still">Video Still</option>
//                    </select>
//                  </div>
//                  <div className="space-x-3">
//                    <button onClick={() => setShowCreate(false)} className="px-4 py-2 font-bold opacity-60">Cancel</button>
//                    <button onClick={handlePost} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold">Post</button>
//                  </div>
//                </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="space-y-8">
//           {loading ? <p className="text-center opacity-50">Loading Feed...</p> : 
//             notices.map(n => <NoticeCard key={n._id} notice={n} currentUser={user?.user} currentRole={user?.role} refresh={fetchNotices} />)
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// const NoticeCard = ({ notice, currentUser, currentRole, refresh }) => {
//   const { isDarkMode } = useTheme();
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");
  
//   // State for PDF Expanded View
//   const [expandedPdf, setExpandedPdf] = useState(null);

//   const isOwner = notice.posterId === currentUser?.id;

//   const handleAction = async (action, data = {}) => {
//     const res = await fetch(`${API_BASE}/api/notices/${notice._id}/${action}`, {
//       method: action === 'comments' ? 'POST' : (action === 'react' ? 'PATCH' : 'DELETE'),
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     if (res.ok) refresh();
//   };

//   return (
//     <>
//       <motion.div layout className={`p-6 rounded-[2.5rem] border ${isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
//         <div className="flex justify-between items-start mb-5">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg transform rotate-3">
//               {notice.posterName?.[0]}
//             </div>
//             <div>
//               <h4 className="font-bold text-lg">{notice.posterName}</h4>
//               <p className="text-[10px] opacity-60 font-black uppercase tracking-widest">{notice.posterRole} • {new Date(notice.createdAt).toLocaleString()}</p>
//             </div>
//           </div>
//           {isOwner && (
//             <div className="flex bg-gray-500/10 rounded-full p-1">
//               <button className="p-2 hover:bg-blue-500/20 rounded-full text-blue-500"><Edit className="w-4 h-4"/></button>
//               <button onClick={() => handleAction('delete')} className="p-2 hover:bg-red-500/20 rounded-full text-red-500"><Trash2 className="w-4 h-4"/></button>
//             </div>
//           )}
//         </div>

//         <h3 className="text-xl font-extrabold mb-3 leading-tight">{notice.title}</h3>
//         <p className="text-sm mb-6 opacity-80 whitespace-pre-wrap leading-relaxed">{notice.content}</p>
        
//         {/* ATTACHMENTS SECTION */}
//         <div className="grid gap-3 mb-6 rounded-3xl overflow-hidden">
//           {notice.attachments?.map((file, i) => (
//             <div key={i}>
//               {/* 1. IMAGES */}
//               {file.fileType === 'image' && (
//                 <img src={`${API_BASE}/${file.fileUrl}`} className="w-full rounded-2xl border border-gray-500/10" alt="attachment" />
//               )}

//               {/* 2. VIDEOS */}
//               {file.fileType === 'video' && (
//                 file.videoConfig?.playerType === 'mini' ? (
//                   <video controls className="w-full rounded-2xl aspect-video bg-black"><source src={`${API_BASE}/${file.fileUrl}`} /></video>
//                 ) : (
//                   <div className="relative group rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
//                     <PlayCircle className="w-16 h-16 text-white/50 transition-all"/>
//                     <span className="absolute bottom-4 right-4 text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full text-white">Still Preview</span>
//                   </div>
//                 )
//               )}

//               {/* 3. PDFS (New Logic) */}
//               {file.fileType === 'pdf' && (
//                 <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-red-50 border-red-100'}`}>
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-red-100 rounded-lg text-red-600"><FileText className="w-6 h-6"/></div>
//                     <div>
//                       <span className="text-sm font-bold block truncate max-w-[200px]">{file.originalName || file.fileName}</span>
//                       <span className="text-[10px] opacity-60">PDF Document • {(file.size / 1024 / 1024).toFixed(2)} MB</span>
//                     </div>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => setExpandedPdf(`${API_BASE}/${file.fileUrl}`)}
//                       className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
//                     >
//                       View
//                     </button>
//                     <a 
//                       href={`${API_BASE}/${file.fileUrl}`} 
//                       download 
//                       className="p-2 hover:bg-gray-500/10 rounded-lg text-blue-500"
//                     >
//                       <Upload className="w-4 h-4 rotate-180"/> 
//                     </a>
//                   </div>
//                 </div>
//               )}

//               {/* 4. OTHER DOCUMENTS (Word, Excel, Zip) */}
//               {(file.fileType === 'document' || file.fileType === 'other') && (
//                 <a href={`${API_BASE}/${file.fileUrl}`} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-4 rounded-2xl border group transition-all ${isDarkMode ? 'bg-gray-900/50 border-gray-700 hover:bg-gray-800' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><FileText className="w-6 h-6"/></div>
//                     <div className="flex flex-col">
//                       <span className="text-sm font-bold truncate max-w-[200px] text-left">{file.originalName || file.fileName}</span>
//                       <span className="text-[10px] opacity-60 text-left">{(file.size / 1024).toFixed(1)} KB</span>
//                     </div>
//                   </div>
//                   <span className="text-[10px] font-black text-blue-500 group-hover:underline">DOWNLOAD</span>
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center space-x-8 pt-4 border-t border-gray-500/10">
//           <button onClick={() => handleAction('react')} className={`flex items-center space-x-2 text-sm font-bold ${notice.reactions?.some(r => r.userId === currentUser?.id) ? 'text-red-500' : 'opacity-60'}`}>
//             <Heart className="w-5 h-5"/> <span>{notice.reactions?.length || 0}</span>
//           </button>
//           <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 text-sm font-bold opacity-60">
//             <MessageSquare className="w-5 h-5"/> <span>{notice.comments?.length || 0}</span>
//           </button>
//         </div>

//         {showComments && (
//           <div className="mt-6 space-y-4">
//             {notice.comments?.map(c => (
//               <div key={c._id} className="text-sm bg-gray-500/5 p-3 rounded-2xl">
//                 <span className="font-black text-blue-500 mr-2">{c.userName}</span>
//                 <span className="opacity-80 leading-relaxed">{c.text}</span>
//               </div>
//             ))}
//             <div className="flex items-center space-x-3 bg-gray-500/10 p-2 rounded-2xl">
//               <input className="flex-1 bg-transparent border-none outline-none px-3 text-xs" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} />
//               <button onClick={() => { handleAction('comments', { text: commentText }); setCommentText(""); }} className="bg-blue-600 text-white p-2 rounded-xl"><Plus className="w-4 h-4"/></button>
//             </div>
//           </div>
//         )}
//       </motion.div>

//       {/* PDF EXPANDED VIEW MODAL */}
//       <AnimatePresence>
//         {expandedPdf && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }} 
//             className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
//           >
//             <div className="bg-white w-full h-[90vh] max-w-5xl rounded-xl overflow-hidden flex flex-col shadow-2xl relative">
              
//               {/* Header */}
//               <div className="flex justify-between items-center p-4 border-b bg-gray-50">
//                 <h3 className="font-bold text-gray-700 flex items-center">
//                   <FileText className="w-5 h-5 mr-2 text-red-500"/> 
//                   Document Viewer
//                 </h3>
//                 <div className="flex space-x-2">
//                   <a href={expandedPdf} download className="p-2 hover:bg-gray-200 rounded-full text-gray-600" title="Download">
//                     <Upload className="w-5 h-5 rotate-180" />
//                   </a>
//                   <button onClick={() => setExpandedPdf(null)} className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors">
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>

//               {/* PDF Content (Iframe) */}
//               <div className="flex-1 bg-gray-100 relative">
//                 <iframe 
//                   src={expandedPdf} 
//                   className="w-full h-full" 
//                   title="PDF Viewer"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

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
          <ArrowLeft className="w-5 h-5 mr-2"/> Back to Classroom
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
              <Play className="w-10 h-10 text-white fill-white ml-1"/>
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
              {isPlaying ? <span className="w-8 h-8 flex items-center justify-center"><div className="w-3 h-8 bg-white rounded-sm mr-1"></div><div className="w-3 h-8 bg-white rounded-sm"></div></span> : <Play className="w-8 h-8 fill-white"/>}
            </button>
            
            <button onClick={() => skip(-10)} className="text-white hover:text-blue-400 flex flex-col items-center group">
              <RotateCcw className="w-6 h-6"/>
              <span className="text-[10px] opacity-0 group-hover:opacity-100 absolute -bottom-4">-10s</span>
            </button>
            
            <button onClick={() => skip(10)} className="text-white hover:text-blue-400 flex flex-col items-center group">
              <div className="transform scale-x-[-1]"><RotateCcw className="w-6 h-6"/></div>
              <span className="text-[10px] opacity-0 group-hover:opacity-100 absolute -bottom-4">+10s</span>
            </button>

            <div className="flex items-center gap-2 group/vol relative">
               <div className="p-2"><Volume2Icon className="w-6 h-6 text-white"/></div>
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
                 <Settings className="w-6 h-6"/>
               </button>
               {showQualityMenu && (
                 <div className="absolute bottom-full right-0 mb-2 bg-black/90 border border-white/10 rounded-lg p-1 min-w-[120px] flex flex-col">
                   <div className="px-4 py-2 text-xs text-white/50 uppercase tracking-widest font-bold">Quality</div>
                   <button className="px-4 py-2 text-sm text-left hover:bg-white/20 rounded text-blue-400 font-bold flex justify-between">
                     Original <CheckCircle className="w-4 h-4"/>
                   </button>
                   <button disabled className="px-4 py-2 text-sm text-left rounded text-white/30 cursor-not-allowed">1080p (HD)</button>
                   <button disabled className="px-4 py-2 text-sm text-left rounded text-white/30 cursor-not-allowed">720p</button>
                 </div>
               )}
             </div>

             <button onClick={toggleFullscreen} className="text-white hover:text-blue-400">
               {isFullscreen ? <MinimizeIcon className="w-6 h-6"/> : <MaximizeIcon className="w-6 h-6"/>}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons specific to Video Player
const Volume2Icon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>;
const MaximizeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>;
const MinimizeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>;


// Helper: Calculate Year from Semester (e.g., Sem 3 = 2nd Year)
const getYearFromSemester = (sem) => {
  if (!sem) return '';
  const year = Math.ceil(sem / 2);
  const suffix = year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th';
  return `${year}${suffix} Year`;
};

// --- My Classes Component ---
// const MyClasses = () => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   // Invite Modal State
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [inviteClassId, setInviteClassId] = useState(null);
//   const [inviteUid, setInviteUid] = useState('');
  
//   const handleInvite = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${API_BASE}/api/classrooms/${inviteClassId}/enroll`, {
//         method: 'POST',
//         headers: { 
//           'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ uid: inviteUid })
//       });
      
//       const data = await res.json();
      
//       if (res.ok) {
//         alert("Student enrolled successfully!");
//         setInviteUid('');
//         setShowInviteModal(false);
//         fetchData(); // Refresh to update student count
//       } else {
//         alert(data.error || "Failed to enroll");
//       }
//     } catch (error) {
//       alert("Error enrolling student");
//     }
//   };
  
//   // Data for Dropdowns
//   const [availableSubjects, setAvailableSubjects] = useState([]);
  
//   const [formData, setFormData] = useState({
//     subjectName: '', subjectCode: '', batchYear: new Date().getFullYear(),
//     stream: '', semester: 1, addMode: 'later', rangeStart: '', rangeEnd: ''
//   });

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem('sessionToken');
//       const [classRes, subRes] = await Promise.all([
//         fetch(`${API_BASE}/api/classrooms`, { headers: { 'Authorization': `Bearer ${token}` } }),
//         fetch(`${API_BASE}/api/all-subjects`, { headers: { 'Authorization': `Bearer ${token}` } })
//       ]);

//       if (classRes.ok) setClasses(await classRes.json());
//       if (subRes.ok) setAvailableSubjects(await subRes.json());
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${API_BASE}/api/classrooms`, {
//         method: 'POST',
//         headers: { 
//           'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       if (res.ok) {
//         setShowModal(false);
//         fetchData();
//         setFormData({
//           subjectName: '', subjectCode: '', batchYear: new Date().getFullYear(),
//           stream: '', semester: 1, addMode: 'later', rangeStart: '', rangeEnd: ''
//         });
//       }
//     } catch (error) { alert("Failed to create class"); }
//   };

//   const handleDelete = async (id) => {
//     if(!confirm("Delete this classroom?")) return;
//     await fetch(`${API_BASE}/api/classrooms/${id}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//     });
//     fetchData();
//   };

// // Helper for 3-dot menu
//   const ClassMenu = ({ classId }) => {
//     const [open, setOpen] = useState(false);
    
//     // Function to handle leaving the class
//     const handleLeaveClass = async () => {
//       if(!confirm("Are you sure you want to leave this class?")) return;
      
//       const res = await fetch(`${API_BASE}/api/classrooms/${classId}/unenroll`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//       });
      
//       if (res.ok) {
//         fetchData(); // Refresh list
//       } else {
//         const data = await res.json();
//         alert(data.error || "Failed to leave class");
//       }
//     };

//     return (
//       <div className="relative">
//         <button onClick={() => setOpen(!open)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
//           <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
//         </button>
//         {open && (
//           <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl py-2 z-10 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
//             {/* Merged Invite Option */}
//             <button onClick={() => { setInviteClassId(classId); setShowInviteModal(true); setOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm hover:bg-blue-500/10 text-blue-500">
//               <UserPlus className="w-4 h-4 mr-2"/> Add Member
//             </button>
            
//             <div className="border-t my-1 border-gray-200 dark:border-gray-700"></div>
            
//             {/* Unenroll Option */}
//             <button onClick={handleLeaveClass} className="flex items-center w-full px-4 py-2 text-sm hover:bg-yellow-500/10 text-yellow-600">
//               <LogOut className="w-4 h-4 mr-2"/> Leave Class
//             </button>

//             {/* Delete Option (Destroys Class) */}
//             <button onClick={() => handleDelete(classId)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-red-500/10 text-red-500">
//               <Trash2 className="w-4 h-4 mr-2"/> Delete Class
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-gray-700/50"><ArrowLeft/></button>
//             <h1 className="text-xl font-bold">My Classes</h1>
//           </div>
//           <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-lg hover:bg-blue-700">
//             <Plus className="w-5 h-5 mr-2"/> Create Class
//           </button>
//         </div>
//       </GlassHeader>

//       <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
//         {loading ? <div className="text-center opacity-50">Loading...</div> : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {classes.map(cls => (
//               <div key={cls._id} className={`rounded-xl border overflow-hidden flex flex-col transition-all hover:shadow-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
//                 {/* Google Classroom Style Banner */}
//                 <div className="h-28 bg-gradient-to-r from-blue-700 to-indigo-600 p-5 relative">
//                   <div className="absolute top-4 right-4"><ClassMenu classId={cls._id} /></div>
//                   {/* Added onClick and cursor-pointer to the name */}
//   <h3 
//     onClick={() => navigate(`/dashboard/classrooms/${cls._id}`)}
//     className="text-white text-xl font-bold truncate pr-8 cursor-pointer hover:underline decoration-white/50"
//   >
//     {cls.name}
//   </h3>
// {/* Updated: Includes Subject Code + Stream + Sem + Year */}
//   <p className="text-blue-100 text-sm">
//     <span className="font-mono font-bold bg-white/20 px-1 rounded mr-1">{cls.subjectCode}</span> 
//     • {cls.stream} • Sem {cls.semester} ({getYearFromSemester(cls.semester)})
//   </p>               </div>
                
//                 <div className="p-5 flex-1 relative">
//                   <div className="absolute -top-8 right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-transparent">
//                      <span className="text-2xl">👨‍🏫</span>
//                   </div>
//                   <div className="mt-2 space-y-2 text-sm opacity-70">
//                     <p className="flex items-center"><Calendar className="w-4 h-4 mr-2"/> Batch: {cls.batchYear}</p>
//                     <p className="flex items-center"><Users className="w-4 h-4 mr-2"/> {cls.students.length} Students Enrolled</p>
//                   </div>
//                 </div>

//                 <div className={`p-3 border-t flex justify-end ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}>
//                   <button 
//                     onClick={() => navigate(`/dashboard/classrooms/${cls._id}`)}
//                     className="p-2 rounded-full hover:bg-blue-500/10 text-blue-600 transition-colors tooltip-trigger"
//                     title="Assignments"
//                   >
//                     <ClipboardList className="w-6 h-6"/>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Create Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <motion.div initial={{scale:0.95}} animate={{scale:1}} className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="p-6 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold">Create Classroom</h2>
//               <button onClick={() => setShowModal(false)}><X/></button>
//             </div>
            
//             <form onSubmit={handleCreate} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
//               <div>
//                 <label className="text-xs font-bold uppercase opacity-60 mb-1 block">Subject Name</label>
//                 <input required className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
//                   value={formData.subjectName} onChange={e => setFormData({...formData, subjectName: e.target.value})} />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs font-bold uppercase opacity-60 mb-1 block">Subject Code</label>
//                   <select required className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     value={formData.subjectCode} onChange={e => setFormData({...formData, subjectCode: e.target.value})}>
//                     <option value="">Select Code</option>
//                     {availableSubjects.map(s => <option key={s._id} value={s.code}>{s.code} - {s.name}</option>)}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-xs font-bold uppercase opacity-60 mb-1 block">Batch Year</label>
//                   <select className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     value={formData.batchYear} onChange={e => setFormData({...formData, batchYear: e.target.value})}>
//                     {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs font-bold uppercase opacity-60 mb-1 block">Stream</label>
//                   <select required className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     value={formData.stream} onChange={e => setFormData({...formData, stream: e.target.value})}>
//                     <option value="">Select Stream</option>
//                     <option value="CSE">Computer Science</option>
//                     <option value="ECE">Electronics</option>
//                     <option value="ME">Mechanical</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-xs font-bold uppercase opacity-60 mb-1 block">Semester</label>
//                   <select className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})}>
//                     {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </div>
//               </div>

//               {/* Student Adding Logic */}
//               {formData.stream && (
//                 <div className={`p-4 rounded-xl border border-dashed ${isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
//                   <h3 className="text-sm font-bold text-blue-500 mb-3">Add Students</h3>
//                   <div className="space-y-3">
//                     <label className="flex items-center space-x-2"><input type="radio" name="addMode" value="all_stream" checked={formData.addMode === 'all_stream'} onChange={e => setFormData({...formData, addMode: e.target.value})} /> <span className="text-sm">Add ALL {formData.stream} (Sem {formData.semester})</span></label>
//                     <label className="flex items-center space-x-2"><input type="radio" name="addMode" value="roll_range" checked={formData.addMode === 'roll_range'} onChange={e => setFormData({...formData, addMode: e.target.value})} /> <span className="text-sm">Add by Roll Range</span></label>
//                     {formData.addMode === 'roll_range' && (
//                       <div className="flex gap-2 pl-6"><input placeholder="Start" className="w-1/2 p-1 text-sm rounded text-black" onChange={e => setFormData({...formData, rangeStart: e.target.value})}/><input placeholder="End" className="w-1/2 p-1 text-sm rounded text-black" onChange={e => setFormData({...formData, rangeEnd: e.target.value})}/></div>
//                     )}
//                     <label className="flex items-center space-x-2"><input type="radio" name="addMode" value="later" checked={formData.addMode === 'later'} onChange={e => setFormData({...formData, addMode: e.target.value})} /> <span className="text-sm">Invite Later</span></label>
//                   </div>
//                 </div>
//               )}

//               <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Create Class</button>
//             </form>
//           </motion.div>
//         </div>
//       )}
//       {/* INVITE BY ID MODAL */}
//       {showInviteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <motion.div initial={{scale:0.95}} animate={{scale:1}} className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="p-6 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold">Enroll Student</h2>
//               <button onClick={() => setShowInviteModal(false)}><X/></button>
//             </div>
            
//             <form onSubmit={handleInvite} className="p-6 space-y-4">
//               <div className={`p-4 rounded-xl flex items-start space-x-3 transition-colors ${
//                 isDarkMode ? 'bg-blue-900/20 border border-blue-500/20' : 'bg-blue-50'
//               }`}>
//                 <div className={`p-2 rounded-lg ${
//                   isDarkMode ? 'bg-blue-800/50 text-blue-200' : 'bg-blue-100 text-blue-600'
//                 }`}>
//                   <UserPlus className="w-6 h-6"/>
//                 </div>
//                 <div>
//                   <h3 className={`font-bold text-sm ${isDarkMode ? 'text-blue-100' : 'text-gray-900'}`}>
//                     Instant Enrollment
//                   </h3>
//                   <p className={`text-xs mt-1 ${isDarkMode ? 'text-blue-200/70' : 'text-gray-600'}`}>
//   Enter the <strong>Student or Faculty ID</strong> (e.g., 100120250001 for student, 100120100001 for faculty) to add them to this class immediately.
// </p>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs font-bold uppercase opacity-60 mb-1 block">Note Loom User ID</label>
//                 <input 
//                   required 
//                   placeholder="Enter User ID"
//                   className={`w-full p-3 rounded-lg border font-mono ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
//                   value={inviteUid} 
//                   onChange={e => setInviteUid(e.target.value)} 
//                 />
//               </div>

//               <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
//                 Enroll Student
//               </button>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// --- My Courses Component (For Students) ---
// const MyCourses = () => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/classrooms`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//       });
//       if (res.ok) {
//         setCourses(await res.json());
//       }
//     } catch (error) {
//       console.error("Failed to load courses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchCourses(); }, []);

//   const handleUnenroll = async (classId) => {
//     if(!confirm("Are you sure you want to unenroll from this course?")) return;
    
//     const res = await fetch(`${API_BASE}/api/classrooms/${classId}/unenroll`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` }
//     });

//     if (res.ok) {
//       fetchCourses(); // Refresh list
//     } else {
//       alert("Failed to unenroll");
//     }
//   };

//   // Student Menu Component
//   const CourseMenu = ({ classId }) => {
//     const [open, setOpen] = useState(false);
//     return (
//       <div className="relative">
//         <button onClick={() => setOpen(!open)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
//           <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
//         </button>
//         {open && (
//           <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl py-2 z-10 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
//             <button onClick={() => handleUnenroll(classId)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-red-500/10 text-red-500">
//               <LogOut className="w-4 h-4 mr-2"/> Unenroll
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <GlassHeader isDarker={true}>
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-4">
//           <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-gray-700/50">
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-xl font-bold">My Courses</h1>
//         </div>
//       </GlassHeader>

//       <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
//         {loading ? (
//           <div className="text-center opacity-50 py-20">Loading your courses...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <div key={course._id} className={`rounded-xl border overflow-hidden flex flex-col transition-all hover:shadow-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
//                 {/* Banner with Menu */}
//                 <div className="h-28 bg-gradient-to-r from-emerald-600 to-teal-600 p-5 relative">
//                   <div className="absolute top-4 right-4">
//                     <CourseMenu classId={course._id} />
//                   </div>
//                   {/* Added onClick and cursor-pointer to the name */}
//   <h3 
//   onClick={() => navigate(`/dashboard/classrooms/${course._id}`, { state: { className: course.name } })}
//   className="text-white text-2xl font-bold truncate underline decoration-white/30 pr-8 cursor-pointer hover:text-emerald-100 transition-colors"
// >
//   {course.name}
// </h3>
//                   <p className="text-emerald-100 text-sm mt-1 font-mono">{course.subjectCode}</p>
//                 </div>

//                 <div className="p-5 flex-1 relative">
//                   <div className="absolute -top-8 right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-transparent text-2xl">
//                     📚
//                   </div>
                  
//                   <div className="mt-2 space-y-3">
//                     <div className="flex items-center text-sm">
//                       <User className="w-4 h-4 mr-2 text-emerald-500"/>
//                       <span className="opacity-80">Faculty: <span className="font-bold">{course.creatorId?.name || 'Unknown'}</span></span>
//                     </div>
//                     <div className="flex items-center text-sm opacity-60">
//                       <Calendar className="w-4 h-4 mr-2"/>
//                       <span>
//     Sem {course.semester} ({getYearFromSemester(course.semester)}) • Batch {course.batchYear}
//   </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={`p-3 border-t flex justify-end ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}>
//                    <button 
//                     onClick={() => navigate(`/dashboard/classrooms/${course._id}`)}
//                     className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors"
//                   >
//                     <ClipboardList className="w-4 h-4 mr-2"/> Assignments
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {courses.length === 0 && (
//               <div className="col-span-full text-center py-20">
//                 <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30"/>
//                 <h3 className="text-xl font-bold opacity-70">No Courses Yet</h3>
//                 <p className="opacity-50 mt-2">You haven't been added to any classrooms yet.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

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