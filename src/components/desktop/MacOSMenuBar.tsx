"use client";

import React, { useState, useEffect } from "react";
import { 
  Wifi, 
  Battery, 
  Volume2, 
  VolumeX, 
  Palette, 
  Search, 
  Sparkles,
  HardDrive
} from "lucide-react";
import { soundManager } from "@/utils/audio";

interface MacOSMenuBarProps {
  onOpenIDE: () => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onOpenQR: () => void;
  onOpenResumePreview: () => void;
  onCycleTheme: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export function MacOSMenuBar({
  onOpenIDE,
  onOpenSearch,
  onOpenContact,
  onOpenQR,
  onOpenResumePreview,
  onCycleTheme,
  isSoundEnabled,
  onToggleSound,
}: MacOSMenuBarProps) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
        "  " +
        now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-7 w-full apple-glass-topbar px-3 sm:px-4 flex items-center justify-between text-[11px] font-sans text-slate-300 select-none z-40 fixed top-0 left-0 border-b border-white/10 backdrop-blur-xl">
      
      {/* Left Apple Menu & Actions */}
      <div className="flex items-center gap-4">
        {/* Apple Logo / Developer Brand */}
        <button
          type="button"
          onClick={onOpenIDE}
          className="font-bold text-white flex items-center gap-1.5 hover:text-[#d4a574] transition-colors cursor-pointer"
        >
          <span className="text-sm"></span>
          <span className="font-mono font-bold tracking-tight">ANURAJ.DEV</span>
        </button>

        {/* Menu Items */}
        <div className="hidden sm:flex items-center gap-3 text-slate-300 text-xs">
          <button
            type="button"
            onClick={onOpenIDE}
            className="hover:text-white transition-colors cursor-pointer"
          >
            IntelliJ IDE
          </button>
          <button
            type="button"
            onClick={onOpenResumePreview}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Resume
          </button>
          <button
            type="button"
            onClick={onOpenQR}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Drive QR
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Right Control Center Telemetry & Clock */}
      <div className="flex items-center gap-3">
        {/* Theme button */}
        <button
          type="button"
          onClick={onCycleTheme}
          title="Cycle Ambient Theme"
          className="hover:text-white transition-colors cursor-pointer"
        >
          <Palette size={12} />
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={isSoundEnabled ? "Audio ON" : "Audio Muted"}
          className={`hover:text-white transition-colors cursor-pointer ${
            isSoundEnabled ? "text-emerald-400" : "text-slate-400"
          }`}
        >
          {isSoundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
        </button>

        {/* Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          title="Search Everywhere (⌘K)"
          className="hover:text-white transition-colors cursor-pointer"
        >
          <Search size={12} />
        </button>

        {/* Memory telemetry */}
        <div className="hidden md:flex items-center gap-1 text-slate-400 font-mono text-[10px]">
          <HardDrive size={10} className="text-[#d4a574]" />
          <span>312M</span>
        </div>

        {/* WiFi & Battery */}
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <Wifi size={12} />
          <Battery size={13} />
        </div>

        {/* Date & Time */}
        <span className="font-mono text-xs text-white font-medium pl-1">
          {timeStr || "Fri Aug 21 6:45 PM"}
        </span>
      </div>

    </header>
  );
}
