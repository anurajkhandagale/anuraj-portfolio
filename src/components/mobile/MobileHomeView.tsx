"use client";

import React from "react";
import Image from "next/image";
import { 
  FileText, 
  Send, 
  ExternalLink, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Terminal, 
  Layers,
  Code2,
  ArrowRight,
  Download,
  QrCode
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { generateAndDownloadBusinessCard } from "@/utils/cardGenerator";

interface MobileHomeViewProps {
  onOpenProjects: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenQR: () => void;
  onOpenFile: (fileId: string) => void;
  onOpenTerminal: () => void;
}

export function MobileHomeView({
  onOpenProjects,
  onOpenResume,
  onOpenContact,
  onOpenQR,
  onOpenFile,
  onOpenTerminal,
}: MobileHomeViewProps) {
  const { profile } = PORTFOLIO_DATA;

  return (
    <div className="h-full overflow-y-auto p-3.5 space-y-4 select-text pb-10">
      
      {/* ==========================================
          MOBILE DEVELOPER PROFILE HERO CARD
          ========================================== */}
      <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-3.5 relative overflow-hidden">
        
        <div className="flex items-center gap-3">
          {/* Real Photo Thumbnail */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#d4a574]/40 shadow-lg shrink-0">
            <Image
              src="/profile.webp"
              alt="Anuraj Laxman Khandagale"
              fill
              className="object-cover object-top"
              sizes="64px"
              priority
            />
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <h1 className="font-mono text-base font-bold text-white truncate">
                {profile.name}
              </h1>
            </div>
            <p className="text-xs text-[#d4a574] font-mono font-medium truncate">
              {profile.roles[0]}
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                SPPU 8.12 CGPA
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Computer Engineering
              </span>
            </div>
          </div>
        </div>

        {/* Core Skill Badges */}
        <div className="flex flex-wrap gap-1 pt-1">
          {["Java 21", "Spring Boot", "REST APIs", "PostgreSQL", "DSA (200+)", "Microservices"].map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-slate-200 font-mono text-[10px] font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Primary Action Buttons Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
            className="py-2.5 rounded-xl bg-[#d4a574] hover:bg-[#c39363] active:scale-95 text-black font-mono text-xs font-bold flex items-center justify-center gap-1 shadow-lg cursor-pointer"
          >
            <FileText size={13} />
            <span>Resume</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenProjects();
            }}
            className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono text-xs font-bold flex items-center justify-center gap-1 border border-white/10 cursor-pointer"
          >
            <Layers size={13} />
            <span>Projects</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenContact();
            }}
            className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono text-xs font-bold flex items-center justify-center gap-1 border border-white/10 cursor-pointer"
          >
            <Send size={13} />
            <span>Contact</span>
          </button>
        </div>

        {/* Social Links Row */}
        <div className="flex items-center justify-around pt-2 border-t border-white/10">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
            title="Instagram"
          >
            <Instagram size={16} />
          </a>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenQR();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            title="Scan QR Code"
          >
            <QrCode size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              soundManager.playChime();
              generateAndDownloadBusinessCard();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-[#d4a574] hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            title="Download Dev Card"
          >
            <Download size={16} />
          </button>
        </div>

      </div>

      {/* ==========================================
          README.md OVERVIEW SUMMARY
          ========================================== */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="font-mono text-xs font-bold text-[#d4a574] flex items-center gap-1.5">
            <FileText size={13} />
            <span>README.md</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400">
            Java 21 LTS
          </span>
        </div>

        <div className="space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
          <p>
            Hello, I&apos;m <span className="text-white font-bold font-mono">Anuraj Laxman Khandagale</span>, a Computer Engineering graduate from Savitribai Phule Pune University (SPPU) specializing in Java Backend Development, Spring Boot, REST APIs, and scalable distributed systems.
          </p>
          <p>
            I architect high-throughput backend services, maintain transaction safety with PostgreSQL/MySQL, and solve complex algorithmic problems with clean data structures.
          </p>
        </div>

        {/* Quick Launch Terminal Banner */}
        <div 
          onClick={onOpenTerminal}
          className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-500/40 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <Terminal size={15} className="text-emerald-400" />
            <span className="font-mono text-xs text-emerald-400 font-semibold">
              $ anuraj-cli --interactive
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            Try &apos;coffee&apos; →
          </span>
        </div>
      </div>

    </div>
  );
}
