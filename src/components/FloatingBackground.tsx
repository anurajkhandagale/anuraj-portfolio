"use client";

import React from "react";
import { motion } from "framer-motion";

export function FloatingBackground() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#050505] overflow-hidden select-none pointer-events-none">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Mouse-following Grid Ripple Glow */}
      <div className="grid-ripple-glow" />
      
      {/* Background Noise Texture */}
      <div className="bg-noise" />

      {/* Floating abstract gradient blobs (Gold -> Bronze -> Amber) */}
      
      {/* Orb 1: Deep Bronze / Warm Brown (Top Left) */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#8a7355]/18 to-[#5c3d2e]/10 glow-orb"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2: Warm Gold / Champagne (Bottom Right) */}
      <motion.div
        className="absolute -bottom-[10%] -right-[5%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-[#d4a574]/15 to-[#e8c49a]/8 glow-orb"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Orb 3: Amber / Light Gold Leak (Center Left) */}
      <motion.div
        className="absolute top-[20%] -left-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-r from-[#b8860b]/12 to-[#d4a574]/6 glow-orb"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Orb 4: Dark Bronze Subtle Pulse (Middle Right) */}
      <motion.div
        className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-[#6b4f3a]/10 to-[#3a2a1a]/5 glow-orb animate-pulse"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
