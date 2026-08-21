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

  useEffect(() => {
    // Smooth ~2.2s progression so visitors can enjoy the splash animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Smooth progression
        const increment = prev < 80 ? (Math.random() > 0.4 ? 2 : 1) : 3;
        const next = Math.min(prev + increment, 100);

        if (next < 28) {
          setStepText("Loading OpenJDK 21 LTS Runtime & Classpath...");
        } else if (next < 60) {
          setStepText("Indexing symbols: Projects, Skills, SPPU 8.12 CGPA...");
        } else if (next < 88) {
          setStepText("Starting Spring Boot 3.3 Context & HikariCP Pool...");
        } else {
          setStepText("Workspace ready. Launching Glass IDE...");
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundManager.playChime();
            setShouldRender(false);
            onComplete();
          }, 400);
          return 100;
        }

        return next;
      });
    }, 28);

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
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030306] select-none"
        >
          {/* Subtle Ambient Background Nebula behind splash card */}
          <div className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-rose-600/30 via-purple-600/20 to-sky-500/20 blur-[110px] pointer-events-none" />

          {/* Centered IntelliJ Smoked Glass Splash Panel */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[90vw] max-w-[420px] p-7 rounded-[26px] apple-modal-glass border border-white/20 shadow-2xl space-y-6 overflow-hidden"
          >
            {/* Header: Project Brand & Icon */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#d4a574]/30 via-white/10 to-[#d4a574]/10 border border-[#d4a574]/40 flex items-center justify-center text-[#d4a574] shadow-lg">
                <Code2 size={22} />
              </div>
              
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="font-mono text-base font-extrabold text-white tracking-tight">
                    ANURAJ.DEV
                  </h2>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    2026.1
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Java 21 LTS • Spring Boot • SPPU 8.12
                </p>
              </div>
            </div>

            {/* Progress & Step Info */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 truncate max-w-[280px]">
                  {stepText}
                </span>
                <span className="text-[#d4a574] font-bold shrink-0 ml-2">
                  {progress}%
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden relative shadow-inner">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4a574] via-emerald-400 to-sky-400 rounded-full shadow-[0_0_12px_#34d399]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Footer Status */}
            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] font-mono text-slate-500">
              <span>Anuraj Laxman Khandagale</span>
              <span>IntelliJ Glass Engine</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
