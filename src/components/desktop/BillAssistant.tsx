"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FileText, 
  Mail, 
  Play, 
  Sparkles, 
  X, 
  Smile, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  Coffee,
  Hand
} from "lucide-react";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

interface BillAssistantProps {
  onOpenResumePreview?: () => void;
  onOpenContact?: () => void;
  onRunBuild?: () => void;
  onOpenIDE?: () => void;
}

type BillState = "greeting" | "help" | "joke" | "knocking" | "coffee";

export function BillAssistant({
  onOpenResumePreview,
  onOpenContact,
  onRunBuild,
  onOpenIDE,
}: BillAssistantProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<BillState>("greeting");
  const [isWaving, setIsWaving] = useState(true);
  const [isKnocking, setIsKnocking] = useState(false);
  const [isHoldingCoffee, setIsHoldingCoffee] = useState(false);
  const [eyeDirection, setEyeDirection] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + B or Cmd + Shift + B
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        summonBill();
      }
    };

    const handleCustomSummon = () => {
      summonBill();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("summon-bill", handleCustomSummon);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("summon-bill", handleCustomSummon);
    };
  }, []);

  const summonBill = () => {
    soundManager.playChime();
    setIsVisible(true);
    setStep("greeting");
    setIsWaving(true);
    setIsKnocking(false);
    setIsHoldingCoffee(false);
    showToast("Easter Egg Unlocked! 👀", "Classic Assistant Bill has entered the room!", "success");
    resetIdleTimer();
  };

  // Idle Timer for Glass Tap (6 seconds of no interaction)
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      triggerGlassKnock();
    }, 6500);
  };

  const triggerGlassKnock = () => {
    setIsKnocking(true);
    setIsWaving(false);
    setStep("knocking");
    soundManager.playGlassKnock();
  };

  // Blinking loop
  useEffect(() => {
    if (!isVisible) return;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, [isVisible]);

  // Eye movement loop
  useEffect(() => {
    if (!isVisible) return;
    const lookInterval = setInterval(() => {
      const angles = [
        { x: -3, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: -2 },
        { x: 0, y: 2 },
        { x: 0, y: 0 },
      ];
      setEyeDirection(angles[Math.floor(Math.random() * angles.length)]);
    }, 2200);
    return () => clearInterval(lookInterval);
  }, [isVisible]);

  // Speaking mouth animation
  useEffect(() => {
    if (!isVisible) return;
    let count = 0;
    const speakInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
      count++;
      if (count > 6) {
        clearInterval(speakInterval);
        setMouthOpen(false);
      }
    }, 150);
    return () => clearInterval(speakInterval);
  }, [step, isVisible]);

  const handleDismiss = () => {
    soundManager.playClick();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setIsVisible(false);
  };

  const handleTellJoke = () => {
    soundManager.playClick();
    resetIdleTimer();
    setIsKnocking(false);
    setStep("joke");
  };

  const handleDeliverCoffee = () => {
    soundManager.playChime();
    resetIdleTimer();
    setIsKnocking(false);
    setIsWaving(false);
    setIsHoldingCoffee(true);
    setStep("coffee");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-14 sm:bottom-16 right-4 sm:right-8 z-50 select-none pointer-events-auto flex flex-col items-end">
          
          {/* =========================================================
              CLASSIC RETRO SPEECH BUBBLE (Office Assistant Parchment)
              ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.2 }}
            className="relative mb-3 w-[280px] sm:w-[320px] p-4 rounded-2xl bg-[#fffae0] text-slate-900 border-2 border-[#d4a574] shadow-[0_12px_36px_rgba(0,0,0,0.55)] font-sans space-y-2.5 z-20"
          >
            {/* Bubble Header */}
            <div className="flex items-center justify-between border-b border-[#e6d5a7] pb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 font-mono">
                <Smile size={14} className="text-[#b45309]" />
                <span>Bill — Assistant 97</span>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1 rounded-lg hover:bg-black/10 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                title="Dismiss Bill"
              >
                <X size={13} />
              </button>
            </div>

            {/* Bubble Content: Greeting */}
            {step === "greeting" && (
              <div className="space-y-2 text-xs leading-relaxed text-slate-800">
                <p className="font-medium">
                  It looks like you&apos;re browsing <strong className="text-amber-900">Anuraj&apos;s portfolio</strong>! 👋
                </p>
                <p className="text-[11px] text-slate-700">
                  Would you like some assistance reviewing his Java 21, Spring Boot, or SPPU credentials?
                </p>

                {/* Action Choices */}
                <div className="pt-1.5 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      resetIdleTimer();
                      if (onOpenResumePreview) onOpenResumePreview();
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-100/60 border border-[#d4a574]/60 text-left text-xs font-semibold text-slate-900 flex items-center justify-between transition-all cursor-pointer shadow-sm group"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={13} className="text-sky-600" />
                      <span>Review ATS Resume PDF</span>
                    </span>
                    <ChevronRight size={12} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDeliverCoffee}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-100/60 border border-[#d4a574]/60 text-left text-xs font-semibold text-slate-900 flex items-center justify-between transition-all cursor-pointer shadow-sm group"
                  >
                    <span className="flex items-center gap-2">
                      <Coffee size={13} className="text-amber-700" />
                      <span>Deliver fresh Java 21 Espresso!</span>
                    </span>
                    <ChevronRight size={12} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                  </button>

                  <button
                    type="button"
                    onClick={handleTellJoke}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-100/60 border border-[#d4a574]/60 text-left text-xs font-semibold text-slate-900 flex items-center justify-between transition-all cursor-pointer shadow-sm group"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={13} className="text-amber-600" />
                      <span>Tell me a developer joke!</span>
                    </span>
                    <ChevronRight size={12} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                  </button>
                </div>
              </div>
            )}

            {/* Bubble Content: Knocking */}
            {step === "knocking" && (
              <div className="space-y-2 text-xs leading-relaxed text-slate-800">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <Hand size={14} className="animate-bounce text-amber-700" />
                  <span>*tap tap tap*</span>
                </div>
                <p className="font-serif italic font-bold text-sm text-slate-900">
                  &quot;Hello? Is this monitor on? 🤓&quot;
                </p>
                <p className="text-[11px] text-slate-700 font-medium">
                  &quot;Are you ready to hire Anuraj for your Java Backend engineering team yet?&quot;
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#e6d5a7]">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      resetIdleTimer();
                      setIsKnocking(false);
                      setIsWaving(true);
                      setStep("greeting");
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer"
                  >
                    ← View Options
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      if (onOpenContact) onOpenContact();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-800 text-emerald-50 text-[11px] font-bold cursor-pointer hover:bg-emerald-900 flex items-center gap-1"
                  >
                    <Mail size={11} />
                    <span>Hire Anuraj!</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bubble Content: Fresh Java 21 Coffee */}
            {step === "coffee" && (
              <div className="space-y-2 text-xs leading-relaxed text-slate-800">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                  <Coffee size={14} className="text-amber-700" />
                  <span>Fresh Java 21 LTS Espresso ☕</span>
                </div>
                <p className="font-medium text-slate-900">
                  &quot;Here&apos;s a steaming hot cup of Java 21! Packed with Virtual Threads, zero GC latency, and maximum Spring Boot throughput.&quot;
                </p>
                <p className="text-[11px] text-emerald-800 font-bold">
                  ✓ HotSpot 64-bit Server VM Ready!
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#e6d5a7]">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      resetIdleTimer();
                      setIsHoldingCoffee(false);
                      setIsWaving(true);
                      setStep("greeting");
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      if (onRunBuild) onRunBuild();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-900 text-amber-100 text-[11px] font-bold cursor-pointer hover:bg-amber-950 flex items-center gap-1"
                  >
                    <Play size={10} />
                    <span>Run Build</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bubble Content: Joke */}
            {step === "joke" && (
              <div className="space-y-2 text-xs leading-relaxed text-slate-800">
                <p className="font-serif italic text-amber-950 font-semibold">
                  &quot;Why do Java developers wear glasses? 🤓&quot;
                </p>
                <p className="font-bold text-emerald-800 text-xs">
                  &quot;Because they don&apos;t C#! 😂&quot;
                </p>
                <p className="text-[11px] text-slate-600">
                  (Anuraj compiles with pure Java 21 LTS & Virtual Threads, no compromises!)
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#e6d5a7]">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      resetIdleTimer();
                      setStep("greeting");
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="px-2.5 py-1 rounded-lg bg-amber-900 text-amber-100 text-[11px] font-bold cursor-pointer hover:bg-amber-950"
                  >
                    Thanks Bill!
                  </button>
                </div>
              </div>
            )}

            {/* Bubble Tail Pointer */}
            <div className="absolute -bottom-2.5 right-12 w-5 h-5 bg-[#fffae0] border-r-2 border-b-2 border-[#d4a574] rotate-45 pointer-events-none" />
          </motion.div>

          {/* =========================================================
              ORIGINAL NOSTALGIC ASSISTANT CHARACTER (Bill Animated SVG)
              ========================================================= */}
          <motion.div
            initial={{ y: 120, scale: 0.8, opacity: 0 }}
            animate={{ 
              y: isKnocking ? -10 : 0, 
              scale: isKnocking ? 1.15 : 1, 
              opacity: 1 
            }}
            exit={{ y: 120, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            whileHover={{ scale: 1.06 }}
            onClick={() => {
              soundManager.playClick();
              resetIdleTimer();
              setIsKnocking(false);
              setIsWaving(true);
              setStep("greeting");
            }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 cursor-pointer drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
          >
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Retro Drop Shadow */}
              <ellipse cx="80" cy="148" rx="45" ry="8" fill="rgba(0,0,0,0.35)" />

              {/* Body / Sweater Vest (Classic 90s Brown/Teal Vest) */}
              <path
                d="M48 100 C48 85, 112 85, 112 100 L118 145 C118 148, 42 148, 42 145 Z"
                fill="#2b5358"
                stroke="#173437"
                strokeWidth="3"
              />
              {/* Shirt Collar */}
              <polygon points="68,90 80,104 92,90 80,94" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              <polygon points="76,94 80,118 84,94" fill="#b91c1c" />

              {/* Head / Face */}
              <circle
                cx="80"
                cy="64"
                r="36"
                fill="#ffe0bd"
                stroke="#d49b6a"
                strokeWidth="3"
              />

              {/* Ears */}
              <circle cx="44" cy="66" r="8" fill="#ffe0bd" stroke="#d49b6a" strokeWidth="2" />
              <circle cx="116" cy="66" r="8" fill="#ffe0bd" stroke="#d49b6a" strokeWidth="2" />

              {/* Classic Neat 90s Haircut */}
              <path
                d="M44 60 C44 32, 116 32, 116 60 C116 42, 98 34, 80 34 C60 34, 44 42, 44 60 Z"
                fill="#63432b"
                stroke="#3d2617"
                strokeWidth="2"
              />
              {/* Parted hair details */}
              <path d="M60 40 Q80 48 105 40" stroke="#3d2617" strokeWidth="2" fill="none" />

              {/* Eyebrows (Dynamic Animated) */}
              <motion.path
                animate={{ y: isWaving || isKnocking ? -3 : 0 }}
                d="M56 52 Q66 48 74 52"
                stroke="#3d2617"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <motion.path
                animate={{ y: isWaving || isKnocking ? -3 : 0 }}
                d="M86 52 Q94 48 104 52"
                stroke="#3d2617"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Big Retro Round Glasses */}
              {/* Left Lens */}
              <circle
                cx="66"
                cy="64"
                r="13"
                fill="rgba(255,255,255,0.7)"
                stroke="#222222"
                strokeWidth="3"
              />
              {/* Right Lens */}
              <circle
                cx="94"
                cy="64"
                r="13"
                fill="rgba(255,255,255,0.7)"
                stroke="#222222"
                strokeWidth="3"
              />
              {/* Glasses Bridge */}
              <line x1="79" y1="64" x2="81" y2="64" stroke="#222222" strokeWidth="3" />

              {/* Eyes & Pupils (Blinking & Tracking) */}
              {!isBlinking ? (
                <>
                  {/* Left Pupil */}
                  <motion.circle
                    animate={{ cx: 66 + eyeDirection.x, cy: 64 + eyeDirection.y }}
                    r="4.5"
                    fill="#1e293b"
                  />
                  <circle cx="64" cy="62" r="1.5" fill="#ffffff" />

                  {/* Right Pupil */}
                  <motion.circle
                    animate={{ cx: 94 + eyeDirection.x, cy: 64 + eyeDirection.y }}
                    r="4.5"
                    fill="#1e293b"
                  />
                  <circle cx="92" cy="62" r="1.5" fill="#ffffff" />
                </>
              ) : (
                <>
                  {/* Blink lines */}
                  <line x1="58" y1="64" x2="74" y2="64" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="86" y1="64" x2="102" y2="64" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}

              {/* Nose */}
              <path d="M80 66 Q83 72 78 74" stroke="#c4834e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Animated Smiling / Talking Mouth */}
              {mouthOpen ? (
                <ellipse cx="80" cy="82" rx="7" ry="5" fill="#881337" stroke="#3d2617" strokeWidth="1.5" />
              ) : (
                <path
                  d="M71 80 Q80 88 89 80"
                  stroke="#3d2617"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              )}

              {/* Left Arm holding clipboard (or mug if holding coffee) */}
              <path
                d="M48 108 L34 126 C32 130, 40 134, 44 130 L54 118"
                fill="#2b5358"
                stroke="#173437"
                strokeWidth="2"
              />

              {/* Clipboard (Normal mode) */}
              {!isHoldingCoffee && (
                <>
                  <rect x="24" y="112" width="22" height="28" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
                  <rect x="29" y="110" width="12" height="4" rx="1" fill="#94a3b8" />
                  <line x1="28" y1="120" x2="40" y2="120" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="28" y1="125" x2="38" y2="125" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="28" y1="130" x2="36" y2="130" stroke="#64748b" strokeWidth="1.5" />
                </>
              )}

              {/* Fresh Java 21 Steaming Mug (Coffee mode) */}
              {isHoldingCoffee && (
                <g>
                  {/* Mug Body */}
                  <rect x="20" y="114" width="24" height="26" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                  {/* Mug Handle */}
                  <path d="M20 120 C14 120, 14 132, 20 132" fill="none" stroke="#78350f" strokeWidth="2.5" />
                  {/* Java 21 Logo on Mug */}
                  <text x="24" y="130" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">J21</text>
                  
                  {/* Animated Steam Swirls */}
                  <motion.path
                    animate={{ y: [-2, -10, -2], opacity: [0.2, 0.9, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    d="M26 112 Q28 104 26 98"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <motion.path
                    animate={{ y: [-3, -12, -3], opacity: [0.3, 0.95, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: 0.3, ease: "easeInOut" }}
                    d="M36 112 Q38 102 34 94"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Right Arm: Tapping Glass or Waving Hand */}
              {isKnocking ? (
                /* Tapping on glass animation */
                <motion.g
                  animate={{
                    x: [0, 8, -4, 8, -4, 8, 0],
                    y: [0, -10, 0, -10, 0, -10, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  style={{ originX: "110px", originY: "105px" }}
                >
                  <path
                    d="M112 108 L136 78 C138 74, 144 78, 142 84 L118 116"
                    fill="#2b5358"
                    stroke="#173437"
                    strokeWidth="2"
                  />
                  {/* Knocker Hand Fist */}
                  <circle cx="140" cy="76" r="8" fill="#ffe0bd" stroke="#d49b6a" strokeWidth="2" />
                  {/* Knuckles */}
                  <circle cx="143" cy="73" r="2.5" fill="#d49b6a" />
                  {/* Ripple tap waves on screen */}
                  <circle cx="145" cy="73" r="6" stroke="#d4a574" strokeWidth="1.5" opacity="0.8" fill="none" />
                </motion.g>
              ) : (
                /* Waving hand */
                <motion.g
                  animate={
                    isWaving
                      ? { rotate: [0, -18, 14, -14, 0] }
                      : { rotate: 0 }
                  }
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  style={{ originX: "110px", originY: "105px" }}
                >
                  <path
                    d="M112 108 L128 90 C130 86, 136 90, 134 96 L118 116"
                    fill="#2b5358"
                    stroke="#173437"
                    strokeWidth="2"
                  />
                  {/* Waving Hand */}
                  <circle cx="132" cy="88" r="7" fill="#ffe0bd" stroke="#d49b6a" strokeWidth="2" />
                  {/* Fingers */}
                  <line x1="130" y1="84" x2="130" y2="80" stroke="#d49b6a" strokeWidth="2" strokeLinecap="round" />
                  <line x1="133" y1="84" x2="134" y2="79" stroke="#d49b6a" strokeWidth="2" strokeLinecap="round" />
                  <line x1="136" y1="85" x2="138" y2="81" stroke="#d49b6a" strokeWidth="2" strokeLinecap="round" />
                </motion.g>
              )}
            </svg>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
