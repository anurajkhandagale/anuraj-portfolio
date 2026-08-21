"use client";

import React from "react";
import { GitBranch, XCircle, AlertTriangle, HardDrive } from "lucide-react";

interface StatusBarProps {
  onOpenGit?: () => void;
  onOpenTerminal?: () => void;
}

export function StatusBar({ 
  onOpenGit, 
  onOpenTerminal, 
}: StatusBarProps) {
  return (
    <footer className="h-6 apple-glass-statusbar px-3 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none shrink-0 z-20">
      
      {/* Left indicators */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenGit}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <GitBranch size={11} className="text-[#d4a574]" />
          <span>main</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 hover:text-white cursor-pointer">
            <XCircle size={10} className="text-slate-500" />
            <span>0</span>
          </span>
          <span className="flex items-center gap-1 hover:text-white cursor-pointer">
            <AlertTriangle size={10} className="text-slate-500" />
            <span>0</span>
          </span>
        </div>

        <span className="text-slate-600">|</span>

        <span className="text-slate-400 hidden sm:inline">
          Java 21 LTS
        </span>
      </div>

      {/* Right telemetry */}
      <div className="flex items-center gap-2.5">
        <span className="hidden sm:inline">UTF-8</span>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <span className="hidden md:inline">4 Spaces</span>
        <span className="text-slate-600 hidden md:inline">|</span>
        <span className="hidden md:inline">LF</span>
        <span className="text-slate-600 hidden md:inline">|</span>
        <span className="text-emerald-400 font-semibold">Markdown</span>
        <span className="text-slate-600">|</span>
        
        <div className="flex items-center gap-1 text-slate-300">
          <HardDrive size={10} className="text-[#d4a574]" />
          <span>312M / 512M</span>
        </div>
      </div>

    </footer>
  );
}
