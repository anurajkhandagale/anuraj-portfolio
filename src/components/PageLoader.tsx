"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { soundManager } from "@/utils/audio";

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState("Initializing OpenJDK 21 LTS Runtime...");
  const [shouldRender, setShouldRender] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isSmall = window.innerWidth < 768;
    setIsMobile(isSmall);

    // Snappy ~1.3s on mobile, smooth ~2.2s on desktop
    const intervalTime = isSmall ? 16 : 28;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = isSmall ? 3 : prev < 80 ? (Math.random() > 0.4 ? 2 : 1) : 3;
        const next = Math.min(prev + increment, 100);

        if (isSmall) {
          if (next < 35) setStepText("✓ Workspace Initialized");
          else if (next < 70) setStepText("✓ Projects & Java Environment Ready");
          else setStepText("READY • Launching Anuraj.dev");
        } else {
          if (next < 28) {
            setStepText("Loading OpenJDK 21 LTS Runtime & Classpath...");
          } else if (next < 60) {
            setStepText("Indexing symbols: Projects, Skills, SPPU 8.12 CGPA...");
          } else if (next < 88) {
            setStepText("Starting Spring Boot 3.3 Context & HikariCP Pool...");
          } else {
            setStepText("Workspace ready. Launching Glass IDE...");
          }
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundManager.playChime();
            setShouldRender(false);
            onComplete();
          }, isSmall ? 250 : 400);
          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030306] select-none p-4"
        >
          {/* Subtle Ambient Background Nebula behind splash card */}
          <div className="absolute w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-gradient-to-tr from-rose-600/30 via-purple-600/20 to-sky-500/20 blur-[90px] sm:blur-[110px] pointer-events-none" />

          {/* Centered IntelliJ Smoked Glass Splash Panel */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm sm:max-w-md p-6 sm:p-7 rounded-[24px] apple-modal-glass border border-white/20 shadow-2xl backdrop-blur-3xl relative overflow-hidden z-10 space-y-5"
          >
            {/* Top Branding */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4a574] to-[#996515] flex items-center justify-center text-black font-mono font-bold text-lg shadow-lg">
                  <Code2 size={22} className="text-black" />
                </div>
                <div>
                  <h1 className="font-mono text-sm sm:text-base font-bold text-white tracking-tight">
                    ANURAJ.DEV <span className="text-[#d4a574]">IDE</span>
                  </h1>
                  <p className="text-[11px] font-mono text-slate-400">
                    Java Backend Engineer Edition 2026.1
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-[10px] font-mono text-slate-300 font-semibold">
                v21.0-LTS
              </span>
            </div>

            {/* Middle Real-time Telemetry & Percentage */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-medium truncate pr-2">
                  {stepText}
                </span>
                <span className="text-[#d4a574] font-bold shrink-0">
                  {progress}%
                </span>
              </div>

              {/* Glowing Count-Up Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden p-[1px] border border-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 via-[#d4a574] to-emerald-400 shadow-[0_0_12px_rgba(212,165,116,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Bottom Metadata & SPPU Badge */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Anuraj Laxman Khandagale</span>
              <span className="text-emerald-400 font-semibold">SPPU 8.12 CGPA</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
