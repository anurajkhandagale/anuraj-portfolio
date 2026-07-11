"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
          {/* Centered Brand Group */}
          <div className="relative select-none">
            
            {/* Background Colorful Glow Circles (matching mockup) */}
            {/* Mint circle (top left) */}
            <div className="absolute w-[80px] h-[80px] rounded-full bg-[#3ddc97] opacity-60 blur-md -top-6 -left-8 z-0" />
            {/* Purple circle (top right) */}
            <div className="absolute w-[70px] h-[70px] rounded-full bg-[#c084fc] opacity-60 blur-md -top-4 -right-6 z-0" />
            {/* Cyan/Blue circle (bottom center) */}
            <div className="absolute w-[75px] h-[75px] rounded-full bg-[#38bdf8] opacity-60 blur-md -bottom-8 left-[60%] -translate-x-1/2 z-0" />

            {/* Frosted Glass Progress Card */}
            <div className="relative w-[340px] px-7 py-6 rounded-[28px] loader-glass-card shadow-2xl z-10 overflow-hidden flex flex-col gap-5">
              
              {/* Progress Text & Close Icon */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-extrabold tracking-wide text-white">
                  Progress {progress}%
                </span>
                
                {/* Visual mock close button */}
                <div className="w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50">
                  <X size={12} strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Progress track */}
              <div className="w-full h-2.5 bg-black/45 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3ddc97] to-[#10b981] rounded-full"
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
