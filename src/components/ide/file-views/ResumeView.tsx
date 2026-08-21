"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Download, ExternalLink, FileText, CheckCircle2, GraduationCap, Code2, Server, QrCode } from "lucide-react";

interface ResumeViewProps {
  onOpenQR?: () => void;
}

export function ResumeView({ onOpenQR }: ResumeViewProps) {
  const { profile, education } = PORTFOLIO_DATA;

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-xs font-bold">
            PDF
          </span>
          <h2 className="text-sm font-bold text-white font-mono">
            resume.pdf
            <span className="text-xs text-slate-400 font-sans font-normal ml-2 hidden sm:inline">
              (Anuraj Laxman Khandagale - Resume)
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onOpenQR && (
            <button
              type="button"
              onClick={onOpenQR}
              className="px-3 py-1.5 rounded-lg bg-[#d4a574]/15 hover:bg-[#d4a574]/25 border border-[#d4a574]/30 text-[#d4a574] font-mono font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <QrCode size={13} />
              <span>Scan QR</span>
            </button>
          )}

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Download size={13} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto space-y-6 select-text">
        {/* Header Preview Card */}
        <div className="p-6 rounded-2xl apple-glass-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white">{profile.name}</h1>
              <p className="text-sm text-[#d4a574] font-mono mt-0.5">{profile.tagline}</p>
            </div>
            <div className="text-xs text-slate-300 font-mono space-y-1 text-right">
              <div>{profile.email}</div>
              <div>Pune, Maharashtra, India</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase text-[#d4a574] tracking-wider">
              Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Education & Core Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl apple-glass-card space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
              <GraduationCap size={16} className="text-[#d4a574]" />
              <span>Education</span>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <div className="font-bold text-white">B.E. in Computer Engineering</div>
                <div className="text-slate-400">Savitribai Phule Pune University (SPPU)</div>
                <div className="text-emerald-400 font-mono font-bold mt-0.5">CGPA: 8.12 / 10.00 • Graduated</div>
              </div>
              <div>
                <div className="font-bold text-white">12th Grade (HSC) - Science & CS</div>
                <div className="text-slate-400">MSBSHSC Board • Score: 88.67%</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl apple-glass-card space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
              <Server size={16} className="text-emerald-400" />
              <span>Technical Skills</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div><span className="text-white font-bold">Languages:</span> Java 17/21, C, SQL, JavaScript, HTML5/CSS3</div>
              <div><span className="text-white font-bold">Backend:</span> Spring Boot, Servlets, JSP, JDBC, REST APIs, WebClient</div>
              <div><span className="text-white font-bold">Databases:</span> PostgreSQL, MySQL, Oracle SQL</div>
              <div><span className="text-white font-bold">Tools & Concepts:</span> Git, IntelliJ IDEA, Maven, DSA (200+ solved), OOP, DBMS, OS</div>
            </div>
          </div>
        </div>

        {/* Direct Link & QR Action Box */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white text-sm">Need the official ATS-friendly PDF document?</div>
            <div className="text-xs text-slate-400">Open directly on Google Drive or scan the mobile QR code.</div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {onOpenQR && (
              <button
                type="button"
                onClick={onOpenQR}
                className="px-4 py-2.5 rounded-xl bg-[#d4a574]/15 hover:bg-[#d4a574]/25 border border-[#d4a574]/30 text-[#d4a574] font-bold text-xs sm:text-sm font-mono flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <QrCode size={15} />
                Scan QR
              </button>
            )}

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm font-mono flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ExternalLink size={14} />
              Open Drive PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
