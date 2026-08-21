"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Folder, FileText, CheckCircle2, Terminal, Sparkles, Check } from "lucide-react";

interface PageLoaderProps {
  onComplete: () => void;
}

type CinematicPhase = 
  | "wakeup"        // 0.0 - 0.7s: Blinking cursor
  | "command"       // 0.7 - 1.5s: Typing > anuraj.dev + Launching workspace...
  | "init"          // 1.5 - 2.5s: Sequential checkmarks
  | "code"          // 2.0 - 2.8s: Tiny Java editor appears
  | "assembling"    // 2.8 - 4.0s: Glass IDE expands in 3D
  | "sweep"         // 3.4 - 4.2s: Subtle ambient light sweep
  | "materialize"   // 4.0 - 4.4s: IDE layers appear
  | "ready";        // 4.4 - 4.8s: Workspace ready ✓

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState<CinematicPhase>("wakeup");
  const [typedText, setTypedText] = useState("");
  const [initChecks, setInitChecks] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check Accessibility
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      setIsFinished(true);
      return;
    }

    const isReturning = sessionStorage.getItem("anuraj_cinematic_boot") === "true";
    const isSmall = window.innerWidth < 768;
    setIsMobile(isSmall);

    // Duration Multiplier: First visit = 1.0 (~4.6s), Mobile = 0.75 (~3.4s), Returning = 0.5 (~2.3s)
    const factor = isReturning ? 0.5 : isSmall ? 0.75 : 1.0;

    // Timeline Timers
    // Phase 2: Command typing (0.7s)
    const tCmd = setTimeout(() => {
      setPhase("command");
      const fullText = "> anuraj.dev";
      let idx = 0;
      const typeInt = setInterval(() => {
        idx++;
        setTypedText(fullText.substring(0, idx));
        if (idx >= fullText.length) {
          clearInterval(typeInt);
        }
      }, 55 * factor);
    }, 700 * factor);

    // Phase 3: Java Initialization (1.5s)
    const tInit = setTimeout(() => {
      setPhase("init");
    }, 1500 * factor);

    // Sequential Checkmarks in Phase 3
    const tCheck1 = setTimeout(() => setInitChecks(1), 1750 * factor);
    const tCheck2 = setTimeout(() => setInitChecks(2), 2050 * factor);
    const tCheck3 = setTimeout(() => setInitChecks(3), 2350 * factor);

    // Phase 4: Code Preview (2.2s)
    const tCode = setTimeout(() => {
      setPhase("code");
    }, 2400 * factor);

    // Phase 5: Hero Glass IDE Assembly Expansion (2.8s)
    const tAssemble = setTimeout(() => {
      setPhase("assembling");
    }, 2850 * factor);

    // Phase 6: Ambient Light Sweep (3.5s)
    const tSweep = setTimeout(() => {
      setPhase("sweep");
    }, 3500 * factor);

    // Phase 7: Layer Materialization (4.0s)
    const tMaterialize = setTimeout(() => {
      setPhase("materialize");
    }, 4000 * factor);

    // Phase 8: Ready State (4.4s - 4.7s)
    const tReady = setTimeout(() => {
      setPhase("ready");
      sessionStorage.setItem("anuraj_cinematic_boot", "true");

      setTimeout(() => {
        setIsFinished(true);
        onComplete();
      }, 350 * factor);
    }, 4450 * factor);

    return () => {
      clearTimeout(tCmd);
      clearTimeout(tInit);
      clearTimeout(tCheck1);
      clearTimeout(tCheck2);
      clearTimeout(tCheck3);
      clearTimeout(tCode);
      clearTimeout(tAssemble);
      clearTimeout(tSweep);
      clearTimeout(tMaterialize);
      clearTimeout(tReady);
    };
  }, [onComplete]);

  if (isFinished) return null;

  const isExpandedPhase = 
    phase === "assembling" || 
    phase === "sweep" || 
    phase === "materialize" || 
    phase === "ready";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.35 } }}
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#030306] select-none p-3 sm:p-6 md:p-8 overflow-hidden"
      >
        {/* =========================================================
            PHASE 1: AMBIENT GRADIENT SHAPES GLOWING TO LIFE
            ========================================================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-purple-600/20 blur-[130px]"
          />
          <motion.div
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] rounded-full bg-rose-600/25 blur-[140px]"
          />
          <div className="absolute top-1/2 right-1/3 w-[360px] h-[360px] rounded-full bg-sky-500/15 blur-[110px]" />
        </div>

        {/* =========================================================
            CINEMATIC EXPANDING GLASS APPLICATION CONTAINER
            ========================================================= */}
        <motion.div
          layout
          transition={{ 
            type: "spring", 
            stiffness: 180, 
            damping: 22,
            mass: 0.8
          }}
          className={`relative apple-modal-glass border border-white/20 shadow-2xl backdrop-blur-3xl overflow-hidden flex flex-col transition-all ${
            phase === "wakeup" || phase === "command"
              ? "w-[260px] sm:w-[320px] h-[100px] rounded-[20px] items-center justify-center p-4"
              : phase === "init"
              ? "w-[300px] sm:w-[360px] h-[175px] rounded-[22px] p-4 justify-between"
              : phase === "code"
              ? "w-[320px] sm:w-[420px] h-[210px] rounded-[22px] p-4 justify-between"
              : "w-full max-w-[1240px] h-[84vh] max-h-[800px] rounded-[24px]"
          }`}
        >
          {/* =======================================================
              PHASE 1 & 2: MONOSPACE CURSOR & TYPING COMMAND
              ======================================================= */}
          {(phase === "wakeup" || phase === "command") && (
            <div className="flex flex-col items-center justify-center gap-1.5 font-mono text-center">
              <div className="flex items-center gap-2 text-sm sm:text-base text-white">
                <span className="text-[#d4a574] font-bold">
                  {typedText || ">"}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-2 h-4 bg-[#d4a574] inline-block shadow-[0_0_8px_rgba(212,165,116,0.8)]"
                />
              </div>

              {typedText.length >= 10 && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.75, y: 0 }}
                  className="text-[11px] text-slate-400 font-sans"
                >
                  Launching developer workspace...
                </motion.p>
              )}
            </div>
          )}

          {/* =======================================================
              PHASE 3: JAVA ENVIRONMENT INITIALIZATION
              ======================================================= */}
          {phase === "init" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs text-slate-300 space-y-2 w-full"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Terminal size={12} />
                  <span>JVM BOOT</span>
                </span>
                <span>Java 21 LTS</span>
              </div>

              <div className="space-y-1.5 text-[11px] pt-1">
                <p className="text-slate-400 font-medium">Initializing Java environment...</p>
                
                {initChecks >= 1 && (
                  <motion.p 
                    initial={{ opacity: 0, x: -6 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-emerald-400"
                  >
                    <Check size={12} className="text-emerald-400" />
                    <span>OpenJDK 21 LTS Runtime</span>
                  </motion.p>
                )}

                {initChecks >= 2 && (
                  <motion.p 
                    initial={{ opacity: 0, x: -6 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-emerald-400"
                  >
                    <Check size={12} className="text-emerald-400" />
                    <span>Loading workspace &amp; classpath</span>
                  </motion.p>
                )}

                {initChecks >= 3 && (
                  <motion.p 
                    initial={{ opacity: 0, x: -6 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-emerald-400"
                  >
                    <Check size={12} className="text-emerald-400" />
                    <span>Indexing source files &amp; symbols</span>
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* =======================================================
              PHASE 4: CODE EDITOR FORMING
              ======================================================= */}
          {phase === "code" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs text-slate-300 space-y-1.5 w-full"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Code2 size={13} />
                  <span>Anuraj.java</span>
                </span>
                <span className="text-emerald-400 font-semibold">Active Class</span>
              </div>

              <div className="space-y-1 pt-1 text-xs">
                <p>
                  <span className="text-orange-400 font-bold">public class</span>{" "}
                  <span className="text-amber-200 font-bold">Anuraj</span> &#123;
                </p>
                <p className="pl-4 text-emerald-400">
                  <span className="text-teal-400">String</span> role ={" "}
                  <span className="text-slate-100">&quot;Java Backend Engineer&quot;</span>;
                </p>
                <p className="pl-4 text-slate-500">// Assembling IntelliJ Glass IDE...</p>
                <p>&#125;</p>
              </div>
            </motion.div>
          )}

          {/* =======================================================
              PHASE 5, 6, 7, 8: HERO GLASS IDE ASSEMBLY
              ======================================================= */}
          {isExpandedPhase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col h-full overflow-hidden relative"
            >
              {/* Top Glass Navigation Bar */}
              <div className="px-4 py-2.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {/* macOS Traffic Lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
                  </div>
                  <span className="font-mono text-xs font-bold text-white tracking-tight">
                    ANURAJ<span className="text-[#d4a574]">.DEV</span> IDE
                  </span>
                </div>

                {/* Materializing Tabs */}
                <div className="flex items-center gap-1">
                  <span className="px-3 py-1 rounded-xl bg-white/[0.08] text-slate-200 font-mono text-xs font-semibold flex items-center gap-1.5 border border-white/15">
                    <FileText size={12} className="text-[#d4a574]" />
                    <span>README.md</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/[0.03] text-slate-400 font-mono text-xs hidden sm:inline">
                    PitStopLive.java
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/[0.03] text-slate-400 font-mono text-xs hidden md:inline">
                    SayItSpeechEngine.java
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold hidden sm:inline">
                    OpenJDK 21
                  </span>
                </div>
              </div>

              {/* Center IDE Body Assembly */}
              <div className="flex-1 flex overflow-hidden min-h-0">
                {/* Left Project Explorer (Materializing) */}
                <motion.div
                  initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="w-52 bg-black/20 border-r border-white/10 p-3.5 hidden sm:flex flex-col space-y-2 font-mono text-xs text-slate-300 shrink-0"
                >
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Project Explorer
                  </span>
                  <div className="space-y-1.5 pl-1 pt-1">
                    <p className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <Folder size={14} className="text-[#d4a574]" />
                      <span>src/projects</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400 pl-4 text-[11px]">
                      <span>AiEmailGenerator.java</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400 pl-4 text-[11px]">
                      <span>PitStopLive.java</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400 pl-4 text-[11px]">
                      <span>SayItSpeechEngine.java</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-300 pt-2 font-semibold">
                      <FileText size={14} className="text-slate-400" />
                      <span>README.md</span>
                    </p>
                  </div>
                </motion.div>

                {/* Main Code Editor View */}
                <motion.div
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="flex-1 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 space-y-2.5 overflow-hidden"
                >
                  <p className="text-slate-400">
                    <span className="text-amber-400 font-bold">#</span> Anuraj Laxman Khandagale
                  </p>
                  <p className="text-sky-400 text-xs">
                    ### Java Backend Software Engineer • SPPU 8.12 CGPA
                  </p>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 my-2">
                    <p className="text-orange-400 font-bold">public class Developer &#123;</p>
                    <p className="pl-4 text-emerald-400">
                      String[] core = &#123; &quot;Java 21&quot;, &quot;Spring Boot&quot;, &quot;PostgreSQL&quot;, &quot;DSA&quot; &#125;;
                    </p>
                    <p className="pl-4 text-amber-300">
                      String activeSprint = &quot;SayIt – Speech &amp; Reading Assistant (AI)&quot;;
                    </p>
                    <p>&#125;</p>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Status Bar */}
              <div className="px-4 py-2 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={13} />
                  <span>Workspace ready ✓</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>UTF-8</span>
                  <span className="text-white font-semibold">Java 21 LTS</span>
                </div>
              </div>

              {/* =======================================================
                  PHASE 6: SUBTLE SPECULAR AMBIENT LIGHT SWEEP
                  ======================================================= */}
              {(phase === "sweep" || phase === "materialize" || phase === "ready") && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 0.4, 0] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 z-50"
                />
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
