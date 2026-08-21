"use client";

import React from "react";
import { 
  Code2, 
  FileText, 
  QrCode, 
  Mail, 
  Palette, 
  Volume2, 
  VolumeX, 
  Maximize2,
  Sparkles
} from "lucide-react";
import { soundManager } from "@/utils/audio";
import { motion } from "framer-motion";

interface MinimizedTaskbarProps {
  onRestore: () => void;
  onOpenQR: () => void;
  onOpenResumePreview: () => void;
  onOpenContact: () => void;
  onCycleTheme: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export function MinimizedTaskbar({
  onRestore,
  onOpenQR,
  onOpenResumePreview,
  onOpenContact,
  onCycleTheme,
  isSoundEnabled,
  onToggleSound,
}: MinimizedTaskbarProps) {
  const handleAction = (cb: () => void) => {
    if (isSoundEnabled) soundManager.playClick();
    cb();
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 80, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none flex flex-col items-center gap-2"
    >
      {/* Floating Glassmorphism macOS / iOS Style Dock */}
      <div className="px-4 py-2.5 rounded-full apple-modal-glass border border-white/25 shadow-2xl backdrop-blur-2xl flex items-center gap-3">
        
        {/* 1. Main ANURAJ.DEV IDE App Icon (Click to Restore) */}
        <motion.button
          whileHover={{ y: -6, scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => handleAction(onRestore)}
          className="relative group p-2.5 rounded-2xl bg-gradient-to-tr from-[#d4a574]/30 via-white/10 to-[#d4a574]/15 border border-[#d4a574]/50 text-[#d4a574] transition-all cursor-pointer shadow-lg"
          title="Restore ANURAJ.DEV IDE"
        >
          <Code2 size={22} />
          {/* Active app dot */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          
          {/* Floating Tooltip */}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Restore IDE ⌘
          </span>
        </motion.button>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-white/15 mx-0.5" />

        {/* 2. Resume PDF Preview */}
        <motion.button
          whileHover={{ y: -6, scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => handleAction(onOpenResumePreview)}
          className="relative group p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-sky-400 transition-all cursor-pointer shadow-md"
          title="Preview Resume PDF"
        >
          <FileText size={20} />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Resume PDF
          </span>
        </motion.button>

        {/* 3. Resume QR Scanner */}
        <motion.button
          whileHover={{ y: -6, scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => handleAction(onOpenQR)}
          className="relative group p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-[#d4a574] transition-all cursor-pointer shadow-md"
          title="Scan Resume QR"
        >
          <QrCode size={20} />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Drive QR
          </span>
        </motion.button>

        {/* 4. Contact Form */}
        <motion.button
          whileHover={{ y: -6, scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => handleAction(onOpenContact)}
          className="relative group p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer shadow-md"
          title="Contact Anuraj"
        >
          <Mail size={20} />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Contact
          </span>
        </motion.button>

        {/* 5. Theme Switcher */}
        <motion.button
          whileHover={{ y: -6, scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => handleAction(onCycleTheme)}
          className="relative group p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-purple-400 transition-all cursor-pointer shadow-md"
          title="Cycle Theme"
        >
          <Palette size={20} />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Theme
          </span>
        </motion.button>

        {/* 6. Audio Toggle */}
        <motion.button
          whileHover={{ y: -6, scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => handleAction(onToggleSound)}
          className={`relative group p-2.5 rounded-2xl border transition-all cursor-pointer shadow-md ${
            isSoundEnabled 
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" 
              : "bg-white/[0.04] border-white/10 text-slate-400"
          }`}
          title="Toggle Audio"
        >
          {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            {isSoundEnabled ? "Audio ON" : "Audio Muted"}
          </span>
        </motion.button>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-white/15 mx-0.5" />

        {/* 7. Quick Maximize Pill */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => handleAction(onRestore)}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
        >
          <Maximize2 size={13} />
          <span>Restore</span>
        </motion.button>

      </div>

      {/* Helper text badge */}
      <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
        ANURAJ.DEV IDE Minimized • Click icon to restore
      </span>
    </motion.div>
  );
}
