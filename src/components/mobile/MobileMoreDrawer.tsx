"use client";

import React from "react";
import { 
  FileText, 
  CreditCard, 
  QrCode, 
  Terminal, 
  Send, 
  Palette, 
  Volume2, 
  VolumeX, 
  X,
  Sparkles,
  GraduationCap,
  Award,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/icons";
import { soundManager } from "@/utils/audio";
import { generateAndDownloadBusinessCard } from "@/utils/cardGenerator";
import { ThemePreset } from "@/components/ide/SettingsModal";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenQR: () => void;
  onOpenContact: () => void;
  onOpenTerminal: () => void;
  onOpenSkills: () => void;
  onOpenEducation: () => void;
  currentTheme: ThemePreset;
  onCycleTheme: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export function MobileMoreDrawer({
  isOpen,
  onClose,
  onOpenResume,
  onOpenQR,
  onOpenContact,
  onOpenTerminal,
  onOpenSkills,
  onOpenEducation,
  currentTheme,
  onCycleTheme,
  isSoundEnabled,
  onToggleSound,
}: MobileMoreDrawerProps) {
  const getThemeName = () => {
    if (currentTheme === "theme-emerald") return "Apple Emerald & Sapphire";
    if (currentTheme === "theme-darcula") return "Darcula Gold";
    return "Obsidian Crimson & Cyan";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Slide-Up Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-h-[85vh] bg-[#0c101d]/90 border-t border-white/20 rounded-t-[26px] p-4 flex flex-col backdrop-blur-3xl shadow-2xl overflow-hidden z-10 space-y-4"
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1 rounded-full bg-white/30 mx-auto shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                System & Navigation
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-slate-300 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pb-6">
              
              {/* Primary Actions Card */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                    onOpenResume();
                  }}
                  className="p-3 rounded-2xl bg-[#d4a574]/15 hover:bg-[#d4a574]/25 active:scale-95 border border-[#d4a574]/30 text-left space-y-1 transition-all cursor-pointer"
                >
                  <FileText size={18} className="text-[#d4a574]" />
                  <p className="font-mono text-xs font-bold text-white">Resume PDF</p>
                  <p className="text-[10px] text-slate-400">1-Click in-app viewer</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playChime();
                    onClose();
                    generateAndDownloadBusinessCard();
                  }}
                  className="p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/10 text-left space-y-1 transition-all cursor-pointer"
                >
                  <CreditCard size={18} className="text-amber-400" />
                  <p className="font-mono text-xs font-bold text-white">Dev Card (PNG)</p>
                  <p className="text-[10px] text-slate-400">Export 1200x675 card</p>
                </button>
              </div>

              {/* Navigation List */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/10 overflow-hidden">
                
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                    onOpenTerminal();
                  }}
                  className="w-full p-3 flex items-center justify-between hover:bg-white/[0.06] active:bg-white/[0.12] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Terminal size={17} className="text-emerald-400" />
                    <div>
                      <p className="font-mono text-xs font-semibold text-white">Interactive Terminal</p>
                      <p className="text-[10px] text-slate-400">CLI commands, matrix & coffee</p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                    onOpenQR();
                  }}
                  className="w-full p-3 flex items-center justify-between hover:bg-white/[0.06] active:bg-white/[0.12] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <QrCode size={17} className="text-[#d4a574]" />
                    <div>
                      <p className="font-mono text-xs font-semibold text-white">Resume QR Scanner</p>
                      <p className="text-[10px] text-slate-400">Instant phone handoff</p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                    onOpenContact();
                  }}
                  className="w-full p-3 flex items-center justify-between hover:bg-white/[0.06] active:bg-white/[0.12] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Send size={17} className="text-sky-400" />
                    <div>
                      <p className="font-mono text-xs font-semibold text-white">Contact Anuraj</p>
                      <p className="text-[10px] text-slate-400">Send direct message</p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-slate-400" />
                </button>
              </div>

              {/* System Settings (Theme & Audio) */}
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5">
                <span className="font-mono text-[11px] font-bold text-slate-400 block">
                  Environment Preferences
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette size={15} className="text-purple-400" />
                    <span className="font-mono text-xs text-slate-200">Ambient Lighting</span>
                  </div>
                  <button
                    type="button"
                    onClick={onCycleTheme}
                    className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 font-mono text-[10px] text-white border border-white/15 cursor-pointer"
                  >
                    {getThemeName()}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    {isSoundEnabled ? (
                      <Volume2 size={15} className="text-emerald-400" />
                    ) : (
                      <VolumeX size={15} className="text-slate-500" />
                    )}
                    <span className="font-mono text-xs text-slate-200">Keystroke Audio</span>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleSound}
                    className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold border active:scale-95 cursor-pointer ${
                      isSoundEnabled
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {isSoundEnabled ? "ENABLED" : "MUTED"}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
