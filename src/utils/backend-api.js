import axios from 'axios';

// ==========================================
// 1. AUTOMATED ENVIRONMENT CONFIGURATION
// ==========================================
// Vercel injects VITE_API_URL during the automated build pipeline.
const PREVIEW_API = import.meta.env.VITE_API_URL;
const PROD_API = 'https://noteloom-api.vercel.app'; 
const STARTING_URL = PREVIEW_API || PROD_API;

// ==========================================
// 2. INITIALIZE THE MASTER CLIENT
// ==========================================
const backendApi = axios.create({
    baseURL: STARTING_URL,
    withCredentials: true, // Mandatory for cross-origin cookies/sessions
    timeout: 25000,        // Industry standard: prevent infinite hanging (10 seconds)
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// ==========================================
// 3. REQUEST INTERCEPTOR (Outbound Traffic)
// ==========================================
backendApi.interceptors.request.use(
    (config) => {
        // AUTOMATION: Automatically attach the session token to every single request.
        // You no longer have to manually pass headers in your components!
        const token = localStorage.getItem('sessionToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Optional Debugging Logging for Preview/Dev environments
        if (PREVIEW_API || import.meta.env.MODE === 'development') {
            console.log(`🚀 [API Request]: ${config.method.toUpperCase()} ${config.url}`);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ==========================================
// 4. RESPONSE INTERCEPTOR (Inbound Traffic)
// ==========================================
backendApi.interceptors.response.use(
    (response) => response, // Pass through successful responses immediately
    async (error) => {
        const originalRequest = error.config;

        // --- AUTOMATED FALLBACK ROUTING ---
        // If the Preview backend fails, reroute traffic to the Production backend instantly.
        if (PREVIEW_API && originalRequest.baseURL === PREVIEW_API && !originalRequest._isFallbackRetry) {
            originalRequest._isFallbackRetry = true;
            console.warn(`⚠️ [Network] Preview API failed. Rerouting to PROD: ${originalRequest.url}`);
            
            originalRequest.baseURL = PROD_API;
            return backendApi(originalRequest); // Retry the exact same request on Prod
        }

        // --- GLOBAL ERROR AUTOMATION ---
        if (error.response) {
            // The server responded with an error code (4xx, 5xx)
            if (error.response.status === 401) {
                console.error('🔒 Unauthorized! Token expired or invalid.');
                // In an enterprise app, you would auto-trigger a token refresh here, 
                // or force the user back to the login page:
                // window.location.href = '/login'; 
            } else if (error.response.status === 403) {
                console.error('🛑 Forbidden! User lacks permissions for this action.');
            } else if (error.response.status >= 500) {
                console.error('🔥 Backend Server Crash!');
            }
        } else if (error.request) {
            // The request was made but no response was received (Network down)
            console.error('📡 Network Error! The backend is unreachable.');
        }

        // Reject the promise so individual components can still show specific error UI
        return Promise.reject(error);
    }
);

export default backendApi;