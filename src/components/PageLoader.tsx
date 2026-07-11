"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if loader already played in this browser session
    const hasLoaded = sessionStorage.getItem("portfolio-loaded");
    if (hasLoaded === "true") {
      setProgress(100);
      setShouldRender(false);
      onComplete();
      return;
    }

    // Set count-up timer with varying speed increments for organic progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShouldRender(false);
            sessionStorage.setItem("portfolio-loaded", "true");
            onComplete();
          }, 300);
          return 100;
        }
        
        // Random speed intervals
        const increment = Math.floor(Math.random() * 8) + 2; 
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Glowing particle fields behind the logo */}
          <div className="absolute w-[250px] h-[250px] rounded-full bg-[#d4a574]/10 blur-3xl animate-pulse pointer-events-none" />

          {/* Center Brand Group */}
          <div className="relative flex flex-col items-center gap-6 z-10">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center relative bg-[#101010]/80 shadow-2xl backdrop-blur-md"
            >
              {/* Outer rotating accent segments */}
              <div className="absolute inset-0 rounded-full border border-[#d4a574]/30 border-dashed animate-spin-slow" />
              
              {/* Initials Text */}
              <span className="font-mono text-3xl font-extrabold tracking-widest text-white pl-1 select-none">
                AK
              </span>
            </motion.div>

            {/* Percentage & Loading Bar */}
            <div className="flex flex-col items-center gap-2 w-[160px]">
              <span className="font-mono text-xs font-bold tracking-widest text-[#a0a0a0]">
                {progress}%
              </span>
              
              {/* Progress track */}
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#d4a574]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#555] font-bold">
              System Boot // v1.2.0
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
