"use client";

import React from "react";
import { 
  Play, 
  Search, 
  Download, 
  Mail, 
  QrCode, 
  Settings 
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";

interface TopBarProps {
  activeFileName: string;
  onOpenSearch: () => void;
  onRunBuild: () => void;
  onOpenContact: () => void;
  onOpenQR: () => void;
  onOpenSettings?: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
  onMinimize?: () => void;
  onClose?: () => void;
}

export function TopBar({
  activeFileName,
  onOpenSearch,
  onRunBuild,
  onOpenContact,
  onOpenQR,
  onOpenSettings,
  onToggleSidebar,
  isSidebarOpen,
  onToggleFullscreen,
  isFullscreen,
  onMinimize,
  onClose,
}: TopBarProps) {
  const { profile } = PORTFOLIO_DATA;

  const handleMinimize = () => {
    soundManager.playClick();
    if (onMinimize) onMinimize();
  };

  const handleClose = () => {
    soundManager.playClick();
    if (onClose) onClose();
    else if (onMinimize) onMinimize();
  };

  return (
    <header className="h-11 apple-glass-topbar px-4 flex items-center justify-between select-none z-30 shrink-0">
      
      {/* Left: macOS Traffic lights & Project Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 group/lights">
          {/* Red: Close / Minimize */}
          <button 
            type="button"
            onClick={handleClose}
            title="Close / Minimize Window" 
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[8px] text-black/70 font-bold opacity-85 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="hidden group-hover/lights:inline">×</span>
          </button>

          {/* Yellow: Minimize to Dock */}
          <button 
            type="button"
            onClick={handleMinimize}
            title="Minimize to Dock" 
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-[8px] text-black/70 font-bold opacity-85 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="hidden group-hover/lights:inline">-</span>
          </button>

          {/* Green: Fullscreen Toggle */}
          <button 
            type="button"
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} 
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[8px] text-black/70 font-bold opacity-85 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="hidden group-hover/lights:inline">+</span>
          </button>
        </div>

        {/* Project Name & Badge */}
        <div className="flex items-center gap-2 ml-1">
          <span className="font-mono text-xs font-bold text-white tracking-tight">
            ANURAJ.DEV
          </span>
          <span className="hidden sm:inline-flex text-[11px] font-mono text-slate-400">
            Java 21 • Spring Boot 3.3
          </span>
        </div>
      </div>

      {/* Center: Search Everywhere pill input */}
      <div className="flex-1 max-w-sm mx-4">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full h-7 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs text-slate-400 flex items-center justify-between transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 truncate">
            <Search size={12} className="text-slate-400 group-hover:text-white transition-colors" />
            <span className="font-mono text-[11px] truncate">Search Everywhere...</span>
          </div>
          <kbd className="px-1.5 py-0.2 rounded bg-white/10 text-[9px] font-mono font-bold text-slate-300">⌘K</kbd>
        </button>
      </div>

      {/* Right: Actions with clean logo icons */}
      <div className="flex items-center gap-1.5">
        
        {/* Run ▶ */}
        <button
          type="button"
          onClick={onRunBuild}
          className="h-7 px-2.5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm mr-1"
          title="Run Application"
        >
          <Play size={11} className="fill-current" />
          <span>Run</span>
        </button>

        {/* Resume QR Logo Button */}
        <button
          type="button"
          onClick={onOpenQR}
          className="h-7 px-2 rounded-lg bg-[#d4a574]/20 hover:bg-[#d4a574]/30 border border-[#d4a574]/40 text-[#d4a574] transition-all cursor-pointer flex items-center gap-1"
          title="Scan Resume QR Code (Drive)"
        >
          <QrCode size={14} />
          <span className="text-[10px] font-mono font-bold hidden md:inline">QR</span>
        </button>

        {/* GitHub Logo */}
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
          title="GitHub Profile"
        >
          <Github size={14} />
        </a>

        {/* LinkedIn Logo */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-sky-400 hover:text-sky-300 transition-colors"
          title="LinkedIn Profile"
        >
          <Linkedin size={14} />
        </a>

        {/* Instagram Logo */}
        <a
          href={profile.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-pink-400 hover:text-pink-300 transition-colors"
          title="Instagram (@foxy52a)"
        >
          <Instagram size={14} />
        </a>

        {/* Contact Logo */}
        <button
          type="button"
          onClick={onOpenContact}
          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Send Direct Message"
        >
          <Mail size={14} />
        </button>

        {/* Settings gear */}
        <button
          type="button"
          onClick={onOpenSettings || onOpenSearch}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Ambient Lighting & Settings"
        >
          <Settings size={14} />
        </button>

      </div>

    </header>
  );
}
