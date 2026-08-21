"use client";

import React from "react";
import { 
  Menu, 
  Search, 
  FileText, 
  ChevronDown, 
  FileCode 
} from "lucide-react";
import { soundManager } from "@/utils/audio";

interface MobileTopBarProps {
  activeFileName: string;
  onOpenFiles: () => void;
  onOpenSearch: () => void;
  onOpenResume: () => void;
  isSoundEnabled: boolean;
}

export function MobileTopBar({
  activeFileName,
  onOpenFiles,
  onOpenSearch,
  onOpenResume,
  isSoundEnabled,
}: MobileTopBarProps) {
  return (
    <header className="w-full px-3 py-2.5 bg-white/[0.04] border-b border-white/10 backdrop-blur-xl flex items-center justify-between gap-2 select-none z-30 shrink-0">
      
      {/* Brand & Active File Pill */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="font-mono text-xs font-bold text-white tracking-tight">
            ANURAJ<span className="text-[#d4a574]">.DEV</span>
          </span>
        </div>

        {/* Current Active File Dropdown Pill */}
        <button
          type="button"
          onClick={() => {
            if (isSoundEnabled) soundManager.playClick();
            onOpenFiles();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/10 text-slate-200 font-mono text-[11px] transition-all cursor-pointer truncate max-w-[135px]"
        >
          <FileCode size={12} className="text-[#d4a574] shrink-0" />
          <span className="truncate">{activeFileName}</span>
          <ChevronDown size={11} className="text-slate-400 shrink-0" />
        </button>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        
        {/* Quick Resume Button */}
        <button
          type="button"
          onClick={() => {
            if (isSoundEnabled) soundManager.playClick();
            onOpenResume();
          }}
          className="px-2.5 py-1 rounded-xl bg-[#d4a574]/15 hover:bg-[#d4a574]/25 active:scale-95 border border-[#d4a574]/30 text-[#d4a574] font-mono text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer min-h-[32px]"
        >
          <FileText size={11} />
          <span>Resume</span>
        </button>

        {/* Spotlight Search Button */}
        <button
          type="button"
          onClick={() => {
            if (isSoundEnabled) soundManager.playClick();
            onOpenSearch();
          }}
          className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-90 border border-white/10 flex items-center justify-center text-slate-300 transition-all cursor-pointer"
          title="Search"
        >
          <Search size={15} />
        </button>

        {/* Menu (Hamburger ☰) for Project Explorer Drawer */}
        <button
          type="button"
          onClick={() => {
            if (isSoundEnabled) soundManager.playClick();
            onOpenFiles();
          }}
          className="w-9 h-9 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] active:scale-90 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
          title="Project Explorer"
        >
          <Menu size={16} />
        </button>
      </div>

    </header>
  );
}
