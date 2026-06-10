import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const EnvironmentBadge = () => {
    // 1. SILENT IN PRODUCTION
    // Ensure this badge NEVER shows up for real users on your main domain.
    // Replace 'noteloomtest.vercel.app' with your actual production domain!
    const isRealProduction = window.location.hostname === 'noteloomtest.vercel.app';
    
    const [isVisible, setIsVisible] = useState(!isRealProduction);

    if (!isVisible) return null;

    // 2. READ THE MODULAR PIPELINE VARIABLES
    const previewApiUrl = import.meta.env.VITE_API_URL;
    const isUsingFallback = !previewApiUrl;

    // Extract just the domain name to keep the badge small and clean
    const displayHost = previewApiUrl 
        ? new URL(previewApiUrl).hostname.replace('.vercel.app', '') 
        : 'PRODUCTION DATABASE';

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
            <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700 shadow-2xl rounded-xl p-3 pointer-events-auto transition-all hover:scale-105">
                
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b border-gray-700 pb-2 mb-2">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Diagnostic Panel
                    </span>
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Routing Status */}
                <div className="flex items-center gap-2">
                    {isUsingFallback ? (
                        <AlertTriangle size={16} className="text-red-500 animate-pulse" />
                    ) : (
                        <CheckCircle size={16} className="text-green-400" />
                    )}
                    
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-semibold uppercase leading-none">
                            Routing Traffic To
                        </span>
                        <span className={`text-xs font-mono font-bold mt-1 ${isUsingFallback ? 'text-red-400' : 'text-green-300'}`}>
                            {displayHost}
                        </span>
                    </div>
                </div>

                {/* Warning Tooltip if routing to Prod */}
                {isUsingFallback && (
                    <div className="mt-2 text-[10px] text-red-300/80 max-w-[150px] leading-tight">
                        Warning: VITE_API_URL is missing. Global interceptor is defaulting to live production data.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnvironmentBadge;