"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";
import { Command, FileText, Headphones, Code2, Sparkles } from "lucide-react";

interface AppleHelloHeroProps {
  onOpenIDE: () => void;
  onOpenSearch?: () => void;
  onOpenResumePreview?: () => void;
}

export function AppleHelloHero({ 
  onOpenIDE,
  onOpenSearch,
  onOpenResumePreview,
}: AppleHelloHeroProps) {
  const [index, setIndex] = useState(0);

  const items = [
    {
      id: "hello",
      // Elegant, unbolded flowing cursive script typography
      content: (
        <span
          className="text-6xl sm:text-8xl md:text-9xl text-white select-none font-normal tracking-wide"
          style={{
            fontFamily:
              'var(--font-cursive), "Great Vibes", "Parisienne", "Alex Brush", cursive',
            filter: "drop-shadow(0 2px 20px rgba(255,255,255,0.4))",
          }}
        >
          hello
        </span>
      ),
      hint: "Click anywhere to enter the developer environment",
    },
    {
      id: "namaste",
      // Apple iPhone Hindi 'नमस्ते' Typography (same optical size)
      content: (
        <span
          className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-wide select-none"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Kohinoor Devanagari", "SF Pro Display", "Tiro Devanagari Hindi", "Mukta", sans-serif',
            filter: "drop-shadow(0 2px 20px rgba(255,255,255,0.35))",
          }}
        >
          नमस्ते
        </span>
      ),
      hint: "डेवलपर स्टूडियो खोलने के लिए कहीं भी क्लिक करें",
    },
  ];

  useEffect(() => {
    // 4.8s duration for relaxed, comfortable reading
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4800);

    return () => clearInterval(interval);
  }, [items.length]);

  const current = items[index];

  const handleLoFiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    const state = soundManager.getSoundscapeState();
    if (state.isPlaying) {
      soundManager.stopSoundscape();
      showToast("Lo-Fi Ambience", "Soundscape paused", "audio");
    } else {
      soundManager.startSoundscape("lofi");
      showToast("Lo-Fi Ambience", "Playing Lo-Fi Coding Waves", "audio");
    }
  };

  return (
    <div
      onClick={() => {
        soundManager.playChime();
        onOpenIDE();
      }}
      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none z-10 p-4"
    >
      {/* Centered Luminous Greeting Stack */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-3 text-center"
          >
            {/* Word */}
            <div className="min-h-[90px] sm:min-h-[120px] flex items-center justify-center">
              {current.content}
            </div>

            {/* Direct Sub-Hint right below the greeting */}
            <p className="text-xs sm:text-sm font-sans font-medium text-white/80 tracking-wide">
              {current.hint}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Feature Discovery Quick-Pills (How visitors know what is available) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-lg"
        >
          {/* ⌘K Spotlight Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              if (onOpenSearch) onOpenSearch();
            }}
            className="px-3 py-1.5 rounded-full apple-glass-card border border-white/15 hover:border-[#d4a574]/60 bg-black/40 hover:bg-black/60 text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-xl group active:scale-95"
          >
            <Command size={12} className="text-[#d4a574]" />
            <span>Type <strong className="text-[#d4a574]">⌘K</strong> for Actions</span>
          </button>

          {/* Resume PDF Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              if (onOpenResumePreview) onOpenResumePreview();
            }}
            className="px-3 py-1.5 rounded-full apple-glass-card border border-white/15 hover:border-sky-400/60 bg-black/40 hover:bg-black/60 text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-xl active:scale-95"
          >
            <FileText size={12} className="text-sky-400" />
            <span>Resume PDF</span>
          </button>

          {/* Lo-Fi Audio Pill */}
          <button
            type="button"
            onClick={handleLoFiClick}
            className="px-3 py-1.5 rounded-full apple-glass-card border border-white/15 hover:border-emerald-400/60 bg-black/40 hover:bg-black/60 text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-xl active:scale-95"
          >
            <Headphones size={12} className="text-emerald-400" />
            <span>Lo-Fi Ambience</span>
          </button>

          {/* Enter IDE Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playChime();
              onOpenIDE();
            }}
            className="px-3 py-1.5 rounded-full apple-glass-card border border-white/15 hover:border-[#d4a574]/60 bg-[#d4a574]/15 hover:bg-[#d4a574]/25 text-[#d4a574] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-xl active:scale-95"
          >
            <Code2 size={12} />
            <span>Launch Studio</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Subtle pulsing home indicator bar */}
      <div className="pb-16 flex flex-col items-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-24 sm:w-32 h-1 rounded-full bg-white/40"
        />
      </div>
    </div>
  );
}
