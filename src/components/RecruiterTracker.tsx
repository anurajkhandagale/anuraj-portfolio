"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Target, X, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Goal {
  id: string;
  label: string;
  targetId: string;
  description: string;
  completed: boolean;
}

export function RecruiterTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "skills",
      label: "Review Tech Stack Skills",
      targetId: "skills",
      description: "Scroll to or click to view Anuraj's technical inventory",
      completed: false,
    },
    {
      id: "projects",
      label: "View Featured Projects",
      targetId: "projects",
      description: "Scroll to or click to review engineering case studies",
      completed: false,
    },
    {
      id: "resume",
      label: "Download Resume Profile",
      targetId: "home",
      description: "Click the resume download link in the Hero or Menu",
      completed: false,
    },
    {
      id: "terminal",
      label: "Test Recruiting CLI Terminal",
      targetId: "contact", // terminal is inside contact section area
      description: "Focus or execute a command inside the console sandbox",
      completed: false,
    },
    {
      id: "contact",
      label: "Request Contact Number",
      targetId: "contact",
      description: "Submit the contact form or request details via phone card",
      completed: false,
    },
  ]);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Sync state from sessionStorage to persist across hot reloads
  useEffect(() => {
    const saved = sessionStorage.getItem("recruiter-goals");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, boolean>;
        setGoals((prev) =>
          prev.map((g) => ({
            ...g,
            completed: parsed[g.id] ?? false,
          }))
        );
      } catch (e) {
        console.error("Failed to parse goals", e);
      }
    }

    const celebrated = sessionStorage.getItem("recruiter-celebrated");
    if (celebrated === "true") {
      setHasCelebrated(true);
    }
  }, []);

  // Set up event listeners for recruiter actions
  useEffect(() => {
    const handleRecruiterAction = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const actionId = customEvent.detail;
      
      setGoals((prev) => {
        const updated = prev.map((g) =>
          g.id === actionId ? { ...g, completed: true } : g
        );

        // Save progress to session storage
        const progressMap = updated.reduce((acc, curr) => {
          acc[curr.id] = curr.completed;
          return acc;
        }, {} as Record<string, boolean>);
        sessionStorage.setItem("recruiter-goals", JSON.stringify(progressMap));

        return updated;
      });
    };

    window.addEventListener("recruiter-action", handleRecruiterAction);
    return () => window.removeEventListener("recruiter-action", handleRecruiterAction);
  }, []);

  // Compute metrics
  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const isAllCompleted = completedCount === totalCount;

  // Record celebration completion silently
  useEffect(() => {
    if (isAllCompleted && !hasCelebrated) {
      setHasCelebrated(true);
      sessionStorage.setItem("recruiter-celebrated", "true");
    }
  }, [isAllCompleted, hasCelebrated]);

  // Jump to corresponding target sections on click
  const handleItemClick = (targetId: string, id: string) => {
    // Check item off locally since they clicked it inside the checklist
    window.dispatchEvent(new CustomEvent("recruiter-action", { detail: id }));

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Circular Progress calculations (Radius: 18, Circumference: 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = (completedCount / totalCount) * 100;
  const strokeOffset = circumference - (progressPercent / 100) * circumference;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-40 pointer-events-auto select-none hidden md:block">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full glass-card hover:border-[#d4a574]/30 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none bg-[#101010]/80 group"
          aria-label="Recruiter Mode Dashboard"
        >
          {/* Circular SVG Progress Track */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 select-none pointer-events-none">
            <circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-white/5 fill-transparent"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-[#d4a574] fill-transparent"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: strokeOffset }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </svg>

          {/* Central Target Icon */}
          <Target
            size={18}
            className={`transition-colors duration-300 ${
              isAllCompleted ? "text-[#10b981]" : "text-[#a0a0a0] group-hover:text-white"
            }`}
          />

          {/* Hover Action Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#101010] border border-white/10 text-[9px] font-mono font-bold tracking-widest text-[#a0a0a0] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
            Recruiter Mode ({completedCount}/{totalCount})
          </span>
        </motion.button>
      </div>

      {/* Slide-out Sidebar Checklist Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm pointer-events-auto select-none h-screen flex">
            {/* Backdrop transparent cover */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />

            {/* Sidebar Capsule Sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full h-full glass-card border-y-0 border-r-0 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl bg-[#0a0d17]/95 backdrop-blur-lg overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Target size={18} className="text-[#d4a574]" />
                    <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                      Recruiter Panel
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full text-[#a0a0a0] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Info Text */}
                <p className="text-[11px] text-[#a0a0a0] leading-relaxed mt-4 mb-6">
                  Verify Anuraj&apos;s credentials and profile sections. Complete the checklist goals to unlock priority recruiter priority access.
                </p>

                {/* Progress Metric Bar */}
                <div className="space-y-1.5 mb-8">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#a0a0a0]">
                    <span>GOALS COMPLETED</span>
                    <span className="font-bold text-white">
                      {completedCount} / {totalCount} ({Math.round(progressPercent)}%)
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4a574] to-[#8a7355]"
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                {/* Goals Checklist Stack */}
                <ul className="space-y-3">
                  {goals.map((goal) => (
                    <li key={goal.id}>
                      <button
                        onClick={() => handleItemClick(goal.targetId, goal.id)}
                        className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3.5 transition-all group cursor-pointer ${
                          goal.completed
                            ? "bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/20 text-[#a0a0a0]"
                            : "bg-white/5 border-white/5 hover:border-white/10 text-white"
                        }`}
                      >
                        {/* Check Indicator */}
                        <div className="shrink-0 mt-0.5">
                          {goal.completed ? (
                            <CheckCircle2 size={16} className="text-[#10b981]" />
                          ) : (
                            <Circle size={16} className="text-[#555] group-hover:text-[#a0a0a0] transition-colors" />
                          )}
                        </div>
                        
                        {/* Labels */}
                        <div className="space-y-0.5">
                          <span className={`text-xs font-bold leading-none block transition-colors ${
                            goal.completed ? "text-[#a0a0a0]" : "text-white"
                          }`}>
                            {goal.label}
                          </span>
                          <span className="text-[10px] text-[#555] group-hover:text-[#a0a0a0] transition-colors leading-relaxed block">
                            {goal.description}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievement Box / Footer */}
              <div className="pt-6 border-t border-white/5 mt-8">
                {isAllCompleted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl border border-[#10b981]/20 bg-emerald-500/5 text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <Trophy size={28} className="text-[#10b981] mx-auto mb-2 animate-bounce" />
                    <h4 className="text-xs font-bold font-mono tracking-widest text-[#10b981] uppercase mb-1 flex items-center justify-center gap-1.5">
                      <Sparkles size={12} className="animate-spin-slow" />
                      Priority Access Unlocked
                      <Sparkles size={12} className="animate-spin-slow" />
                    </h4>
                    <p className="text-[10px] text-[#a0a0a0] leading-relaxed">
                      Thank you for reviewing! Anuraj has been alert-notified. You can expect priority response coordination shortly.
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-center text-[10px] font-mono text-[#555] leading-relaxed">
                    Locked // complete all actions to unlock priority coordination
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
