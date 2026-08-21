"use client";

import React from "react";
import { 
  Settings, 
  X, 
  Volume2, 
  VolumeX, 
  Palette, 
  Sparkles, 
  Check, 
  Music,
  Sliders
} from "lucide-react";
import { soundManager } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

export type ThemePreset = "theme-obsidian" | "theme-emerald" | "theme-darcula";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemePreset;
  onSelectTheme: (theme: ThemePreset) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  isSoundEnabled,
  onToggleSound,
}: SettingsModalProps) {
  const themes: { id: ThemePreset; name: string; desc: string; colors: string[] }[] = [
    {
      id: "theme-obsidian",
      name: "Obsidian Crimson & Cyan",
      desc: "Vibrant 3D crimson spheres with purple & cyan atmospheric glow (Default)",
      colors: ["#eb234b", "#8c3cff", "#0ea5e9"],
    },
    {
      id: "theme-emerald",
      name: "Apple Emerald & Sapphire",
      desc: "Luminous emerald green spheres with deep sapphire blue nebula",
      colors: ["#10b981", "#0284c7", "#2563eb"],
    },
    {
      id: "theme-darcula",
      name: "Darcula Champagne Gold",
      desc: "Warm luxury champagne gold & amber spheres with bronze nebula",
      colors: ["#f59e0b", "#d97706", "#ea580c"],
    },
  ];

  const handleTestAudio = () => {
    soundManager.playClick();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-3xl apple-modal-glass overflow-hidden shadow-2xl z-10 select-none p-6 sm:p-7 space-y-6 border border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-white/10 text-white">
                  <Settings size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">IDE Settings & Aesthetics</h3>
                  <p className="text-xs text-slate-400 font-mono">Ambient Lighting & Micro-Audio</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Section 1: Ambient Lighting Presets */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#d4a574] uppercase tracking-wider">
                <Palette size={13} />
                <span>Ambient Lighting Presets</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {themes.map((t) => {
                  const isSelected = currentTheme === t.id;

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onSelectTheme(t.id);
                        if (isSoundEnabled) soundManager.playClick();
                      }}
                      className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between border ${
                        isSelected
                          ? "bg-white/15 border-white/30 text-white shadow-lg"
                          : "bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-300"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-bold text-xs font-sans">
                          <span>{t.name}</span>
                          {isSelected && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans">{t.desc}</p>
                      </div>

                      {/* Color Preview Orbs */}
                      <div className="flex items-center gap-1.5 shrink-0 ml-3">
                        {t.colors.map((c, i) => (
                          <span
                            key={i}
                            style={{ backgroundColor: c }}
                            className="w-3.5 h-3.5 rounded-full shadow-sm"
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Mechanical Keystroke Audio */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200">
                    {isSoundEnabled ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} className="text-slate-400" />}
                    <span>Mechanical Keystroke Audio</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Soft mechanical clicks when typing in Terminal and switching tabs
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onToggleSound();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                    isSoundEnabled
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : "bg-white/10 border-white/15 text-slate-400"
                  }`}
                >
                  {isSoundEnabled ? "Enabled (ON)" : "Muted (OFF)"}
                </button>
              </div>

              {isSoundEnabled && (
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span>Synthesized Web Audio API</span>
                  <button
                    type="button"
                    onClick={handleTestAudio}
                    className="text-[#d4a574] hover:underline cursor-pointer"
                  >
                    Test Click ♪
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-2 text-center text-[11px] font-mono text-slate-500">
              ANURAJ.DEV • Java 21 LTS IDE Architecture
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
