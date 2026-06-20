import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import backendApi from '../utils/backend-api';

export const useSessionManager = () => {
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

  // Fetch session info
  const checkSession = async () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      setIsSessionValid(false);
      setLoading(false);
      return false;
    }

    try {
      // ✅ Now using your backendApi (headers are attached automatically!)
      const response = await backendApi.get('/session/info');
      const data = response.data;
        
      // ✅ FIXED DATA MAPPING: Capturing the correct fields from your database
      setUser({
        id: data.user?._id || data.user?.id,
        email: data.user?.email,
        name: data.user?.fullName || data.user?.name || 'Student',
        uid: data.user?.uid || data.user?.rollNo || data.user?.employeeId || data.user?._id || 'N/A'
      });

      setProfile({
        id: data.user?._id || data.user?.id,
        role: data.role || data.user?.role,
        college: data.user?.collegeName || data.collegeName || 'Unknown Institution',
        full_name: data.user?.fullName || data.user?.name,
      });

      setIsSessionValid(true);
      setLoading(false);
      return true;

    } catch (error) {
      console.error('Session check failed:', error);
      // ❌ Do NOT auto-clear session here (prevents race-condition logout)
      setIsSessionValid(false);
      setLoading(false); 
      return false;
    }
  };

  const clearSession = async () => {
    try {
      // ✅ Now using your backendApi
      await backendApi.post('/api/auth/signout');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    
    // Clear Session Data ONLY (Keep College Code)
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('lastActivity');
    localStorage.removeItem('sessionStart');
    
    // Reset state
    setUser(null);
    setProfile(null);
    setIsSessionValid(false);
    
    // ✅ SMART REDIRECT: Go to specific college login if code exists
    const savedCode = localStorage.getItem('selectedCollegeCode');
    if (savedCode) {
        navigate(`/login?code=${savedCode}`);
    } else {
        navigate('/college-selection'); 
    }
  };

  useEffect(() => {
    let mounted = true;
    const sessionToken = localStorage.getItem('sessionToken');

    if (!sessionToken) {
      setLoading(false);
      setIsSessionValid(false);
      return;
    }

    const initializeAuth = async () => {
      if (mounted) await checkSession();
    };

    initializeAuth();

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    sessionCheckRef.current = setInterval(async () => {
      if (mounted) await checkSession();
    }, 60000);

    return () => {
      mounted = false;
      if (sessionCheckRef.current) clearInterval(sessionCheckRef.current);
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
    checkSession
  };
};