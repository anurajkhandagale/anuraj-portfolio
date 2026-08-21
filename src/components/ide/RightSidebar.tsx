"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { 
  FileText, 
  Code2, 
  Briefcase, 
  Infinity as InfinityIcon, 
  MapPin, 
  GraduationCap, 
  Mail, 
  QrCode,
  CreditCard,
  Loader2,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/icons";
import { generateAndDownloadBusinessCard } from "@/utils/cardGenerator";
import { soundManager } from "@/utils/audio";

interface RightSidebarProps {
  onOpenQR?: () => void;
  onOpenContact?: () => void;
  onOpenResumePreview?: () => void;
}

export function RightSidebar({ onOpenQR, onOpenContact, onOpenResumePreview }: RightSidebarProps) {
  const { profile, projects, skills } = PORTFOLIO_DATA;
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCard = async () => {
    try {
      setIsExporting(true);
      soundManager.playClick();
      await generateAndDownloadBusinessCard();
      soundManager.playChime();
    } catch {
      // Fallback
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <aside className="w-[280px] apple-glass-rightpanel flex flex-col p-4 space-y-4 select-none shrink-0 border-l border-white/10 hidden xl:flex overflow-y-auto">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="font-bold tracking-wider text-slate-200">ABOUT.ME</span>
        <span className="text-[10px] text-slate-500 font-mono">v2026.1</span>
      </div>

      {/* User Profile Card */}
      <div className="flex flex-col items-center text-center space-y-2.5">
        
        {/* Real Profile Image with Glowing Ring */}
        <div className="relative group">
          <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#d4a574] via-rose-500 to-purple-500 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
              <Image
                src={profile.avatar}
                alt="Anuraj Laxman Khandagale"
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
          </div>
          {/* Active green status dot */}
          <span className="absolute bottom-0.5 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-[0_0_8px_#34d399]" />
        </div>

        {/* Name & Bio */}
        <div>
          <h3 className="font-bold text-white text-sm tracking-tight font-sans">
            {profile.name}
          </h3>
          
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-mono mt-0.5">
            <MapPin size={11} className="text-[#d4a574]" />
            <span>Pune, Maharashtra, India</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-mono mt-0.5">
            <GraduationCap size={11} className="text-sky-400" />
            <span>Computer Engineering (SPPU)</span>
          </div>
        </div>

        {/* Available Pill */}
        <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for opportunities</span>
        </div>

        {/* Quick Social Logos */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Github size={14} />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Linkedin size={14} />
          </a>

          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram (@foxy52a)"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <Instagram size={14} />
          </a>

          {onOpenContact && (
            <button
              type="button"
              onClick={onOpenContact}
              title="Send Email / Message"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Mail size={14} />
            </button>
          )}

          {onOpenQR && (
            <button
              type="button"
              onClick={onOpenQR}
              title="Scan Resume QR"
              className="p-1.5 rounded-lg bg-[#d4a574]/20 hover:bg-[#d4a574]/30 border border-[#d4a574]/40 text-[#d4a574] transition-colors cursor-pointer"
            >
              <QrCode size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
          QUICK STATS
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl apple-glass-card flex flex-col justify-between">
            <div className="flex items-center gap-1 text-slate-400">
              <FileText size={13} className="text-sky-400" />
              <span className="text-sm font-bold text-white font-mono">08</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans mt-1">Projects</span>
          </div>

          <div className="p-2.5 rounded-xl apple-glass-card flex flex-col justify-between">
            <div className="flex items-center gap-1 text-slate-400">
              <Code2 size={13} className="text-emerald-400" />
              <span className="text-sm font-bold text-white font-mono">5+</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans mt-1">Technologies</span>
          </div>

          <div className="p-2.5 rounded-xl apple-glass-card flex flex-col justify-between">
            <div className="flex items-center gap-1 text-slate-400">
              <Briefcase size={13} className="text-amber-400" />
              <span className="text-sm font-bold text-white font-mono">8.12</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans mt-1">CGPA (SPPU)</span>
          </div>

          <div className="p-2.5 rounded-xl apple-glass-card flex flex-col justify-between">
            <div className="flex items-center gap-1 text-slate-400">
              <InfinityIcon size={13} className="text-purple-400" />
              <span className="text-sm font-bold text-white font-mono">∞</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans mt-1">Learning</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Preview PDF & Download Glass Dev Card */}
      <div className="mt-auto space-y-2 pt-2">
        {/* 1. Download Glass Business Card */}
        <button
          type="button"
          onClick={handleExportCard}
          disabled={isExporting}
          className="w-full py-2 px-3 rounded-xl bg-[#d4a574]/15 hover:bg-[#d4a574]/25 border border-[#d4a574]/35 flex items-center justify-center gap-2 text-xs font-mono text-[#d4a574] font-bold transition-all cursor-pointer shadow-sm active:scale-95"
        >
          {isExporting ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <CreditCard size={13} />
          )}
          <span>{isExporting ? "Exporting..." : "Download Dev Card (PNG)"}</span>
        </button>

        {/* 2. In-App PDF Preview / QR */}
        {onOpenResumePreview && (
          <button
            type="button"
            onClick={onOpenResumePreview}
            className="w-full py-2 px-3 rounded-xl apple-glass-card hover:border-white/30 flex items-center justify-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <FileText size={13} className="text-sky-400" />
            <span>Preview Resume PDF</span>
          </button>
        )}
      </div>

    </aside>
  );
}
