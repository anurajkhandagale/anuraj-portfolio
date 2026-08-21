"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

interface AppleHelloHeroProps {
  onOpenIDE: () => void;
}

export function AppleHelloHero({ onOpenIDE }: AppleHelloHeroProps) {
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
      hint: "Click on any app or dock to interact",
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
      hint: "खोलने के लिए किसी भी ऐप पर क्लिक करें",
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
