"use client";

import React from "react";
import { Palette, Volume2, VolumeX, Sparkles } from "lucide-react";
import { ThemePreset } from "./SettingsModal";
import { soundManager } from "@/utils/audio";
import { motion } from "framer-motion";

interface FloatingSideControlsProps {
  currentTheme: ThemePreset;
  onCycleTheme: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettingsModal?: () => void;
}

export function FloatingSideControls({
  currentTheme,
  onCycleTheme,
  isSoundEnabled,
  onToggleSound,
  onOpenSettingsModal,
}: FloatingSideControlsProps) {
  const getThemeColor = () => {
    if (currentTheme === "theme-emerald") return "#10b981";
    if (currentTheme === "theme-darcula") return "#f59e0b";
    return "#eb234b"; // theme-obsidian
  };

  const getThemeName = () => {
    if (currentTheme === "theme-emerald") return "Emerald & Sapphire";
    if (currentTheme === "theme-darcula") return "Darcula Gold";
    return "Obsidian Crimson";
  };

  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-40 select-none">
      
      {/* 1. Circular Theme Switcher Glass Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        type="button"
        onClick={() => {
          onCycleTheme();
          if (isSoundEnabled) soundManager.playClick();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          if (onOpenSettingsModal) onOpenSettingsModal();
        }}
        title={`Ambient Lighting Theme: ${getThemeName()} (Click to cycle, right-click for settings)`}
        className="group relative w-11 h-11 rounded-full apple-glass-card flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-2xl border border-white/20 hover:border-white/40"
      >
        <Palette size={18} className="group-hover:rotate-12 transition-transform" />
        
        {/* Dynamic theme indicator dot */}
        <span
          style={{ backgroundColor: getThemeColor() }}
          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border border-black/40 shadow-sm"
        />
      </motion.button>

      {/* 2. Circular Audio Toggle Glass Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        type="button"
        onClick={onToggleSound}
        title={isSoundEnabled ? "Keystroke Micro-Audio: ENABLED (Click to Mute)" : "Keystroke Micro-Audio: MUTED (Click to Enable)"}
        className={`group relative w-11 h-11 rounded-full apple-glass-card flex items-center justify-center transition-all cursor-pointer shadow-2xl border ${
          isSoundEnabled 
            ? "border-emerald-500/40 text-emerald-400 hover:text-emerald-300 bg-emerald-500/10" 
            : "border-white/15 text-slate-400 hover:text-white"
        }`}
      >
        {isSoundEnabled ? (
          <Volume2 size={18} className="animate-pulse" />
        ) : (
          <VolumeX size={18} />
        )}

        {/* Audio status indicator dot */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-black/40 ${
            isSoundEnabled ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-slate-500"
          }`}
        />
      </motion.button>

    </div>
  );
}
