"use client";

import React from "react";
import { 
  Play, 
  Download, 
  Mail, 
  QrCode,
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Code2, 
  Database, 
  Server, 
  Cpu, 
  ArrowUpRight, 
  Layers,
  Terminal,
  FileCode2,
  FolderOpen
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface ReadmeViewProps {
  onOpenFile: (fileId: string) => void;
  onRunBuild: () => void;
  onOpenContact: () => void;
  onOpenQR?: () => void;
}

export function ReadmeView({ onOpenFile, onRunBuild, onOpenContact, onOpenQR }: ReadmeViewProps) {
  const { profile, projects } = PORTFOLIO_DATA;

  return (
    <div className="w-full flex font-mono text-xs sm:text-sm select-text py-4 overflow-y-auto">
      {/* Line Numbers Column */}
      <div className="w-10 sm:w-12 shrink-0 select-none text-right pr-3 sm:pr-4 text-slate-600 font-mono space-y-1 text-xs">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i + 1} className="h-5 leading-5">{i + 1}</div>
        ))}
      </div>

      {/* Code / Markdown Content Column */}
      <div className="flex-1 pr-4 sm:pr-8 space-y-1 font-mono text-slate-200">
        
        {/* Line 1: empty */}
        <div className="h-5 leading-5" />

        {/* Line 2: Header */}
        <div className="h-5 leading-5 font-bold text-white text-base sm:text-lg flex items-center gap-1.5">
          <span className="text-amber-400">#</span>
          <span>Hi, I&apos;m Anuraj 👋</span>
        </div>

        {/* Line 3: empty */}
        <div className="h-5 leading-5" />

        {/* Line 4: Subtitle */}
        <div className="h-5 leading-5 font-semibold text-sky-400 text-xs sm:text-sm">
          ### Java Developer • Software Engineer • Computer Engineering Graduate
        </div>

        {/* Line 5: empty */}
        <div className="h-5 leading-5" />

        {/* Line 6-8: Description */}
        <div className="h-5 leading-5 text-slate-300 font-sans text-xs sm:text-sm">
          Passionate about building scalable, efficient and impactful software products.
        </div>
        <div className="h-5 leading-5 text-slate-300 font-sans text-xs sm:text-sm">
          Specializing in <span className="text-white font-semibold">**Java**</span>, <span className="text-white font-semibold">**Spring Boot**</span>, <span className="text-white font-semibold">**REST APIs**</span>, <span className="text-white font-semibold">**Databases**</span> and <span className="text-white font-semibold">**Backend Systems**</span>.
        </div>

        {/* Line 9: empty */}
        <div className="h-5 leading-5" />

        {/* Line 10: Code block start */}
        <div className="h-5 leading-5 text-slate-500 font-mono">
          ```java
        </div>

        {/* Line 11: Class declaration */}
        <div className="h-5 leading-5 font-mono">
          <span className="text-orange-400 font-bold">public class</span> <span className="text-amber-200 font-bold">Anuraj</span> &#123;
        </div>

        {/* Line 12: Role */}
        <div className="h-5 leading-5 font-mono pl-4">
          <span className="text-teal-400">String</span> role = <span className="text-emerald-400">&quot;Java Developer&quot;</span>;
        </div>

        {/* Line 13: Education */}
        <div className="h-5 leading-5 font-mono pl-4">
          <span className="text-teal-400">String</span> education = <span className="text-emerald-400">&quot;B.E. Computer Engineering (SPPU, 8.12 CGPA)&quot;</span>;
        </div>

        {/* Line 14: Mission */}
        <div className="h-5 leading-5 font-mono pl-4">
          <span className="text-teal-400">String</span> mission = <span className="text-emerald-400">&quot;Build software that makes a difference.&quot;</span>;
        </div>

        {/* Line 15: Current Active Endeavor */}
        <div className="h-5 leading-5 font-mono pl-4">
          <span className="text-teal-400">String</span> currentBuild = <span className="text-amber-300">&quot;SayIt – Speech & Reading Fluency Assistant (Web Speech AI for All Ages)&quot;</span>;
        </div>

        {/* Line 15: empty in class */}
        <div className="h-5 leading-5" />

        {/* Line 16: sayHello method */}
        <div className="h-5 leading-5 font-mono pl-4">
          <span className="text-orange-400 font-bold">void</span> <span className="text-yellow-300">sayHello</span>() &#123;
        </div>

        {/* Line 17: print */}
        <div className="h-5 leading-5 font-mono pl-8">
          <span className="text-purple-300">System</span>.<span className="text-purple-300">out</span>.<span className="text-yellow-300">println</span>(<span className="text-emerald-400">&quot;Thanks for visiting my portfolio!&quot;</span>);
        </div>

        {/* Line 18: close method */}
        <div className="h-5 leading-5 font-mono pl-4">
          &#125;
        </div>

        {/* Line 19: close class */}
        <div className="h-5 leading-5 font-mono">
          &#125;
        </div>

        {/* Line 20: Code block end */}
        <div className="h-5 leading-5 text-slate-500 font-mono">
          ```
        </div>

        {/* Line 21: Action pills */}
        <div className="pt-6 pb-2 flex flex-wrap items-center gap-2 font-sans select-none">
          <button
            type="button"
            onClick={onRunBuild}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Play size={12} className="fill-current" />
            ▶ Run AnurajApplication
          </button>

          {onOpenQR && (
            <button
              type="button"
              onClick={onOpenQR}
              className="px-3 py-1.5 rounded-lg bg-[#d4a574]/20 hover:bg-[#d4a574]/30 border border-[#d4a574]/40 text-[#d4a574] font-mono font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <QrCode size={13} />
              Scan QR
            </button>
          )}

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download size={12} />
            Download Resume
          </a>

          <button
            type="button"
            onClick={onOpenContact}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Mail size={12} />
            Contact
          </button>
        </div>

      </div>
    </div>
  );
}
