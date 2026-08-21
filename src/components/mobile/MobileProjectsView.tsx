"use client";

import React, { useState } from "react";
import { 
  Layers, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Cpu
} from "lucide-react";
import { PORTFOLIO_DATA, ProjectData } from "@/data/portfolioData";
import { Github } from "@/components/ui/icons";
import { soundManager } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

interface MobileProjectsViewProps {
  onOpenFileCode: (fileId: string) => void;
}

export function MobileProjectsView({ onOpenFileCode }: MobileProjectsViewProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleSelect = (project: ProjectData) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  const handleBack = () => {
    soundManager.playClick();
    setSelectedProject(null);
  };

  return (
    <div className="h-full overflow-y-auto p-3.5 space-y-4 select-text">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          // ==========================================
          // PROJECTS LIST OVERVIEW
          // ==========================================
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Layers size={18} className="text-[#d4a574]" />
                  <span>Featured Projects</span>
                </h2>
                <p className="text-xs text-slate-400 font-sans">
                  Production-grade Java & Distributed Architectures
                </p>
              </div>
            </div>

            {/* Project Cards */}
            <div className="space-y-3">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleSelect(proj)}
                  className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] border border-white/10 transition-all cursor-pointer space-y-2.5 backdrop-blur-xl shadow-lg relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">
                          {proj.name}
                        </span>
                        {proj.metrics[0] && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold">
                            {proj.metrics[0].value}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#d4a574] font-mono mt-0.5">
                        {proj.subtitle}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-lg bg-white/[0.06] text-slate-300 font-mono text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          // ==========================================
          // SINGLE PROJECT DETAIL VIEW
          // ==========================================
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 pb-8"
          >
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/10 text-slate-200 font-mono text-xs cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>← All Projects</span>
            </button>

            {/* Project Title Header */}
            <div className="space-y-1.5">
              <h1 className="text-xl font-bold text-white font-mono">
                {selectedProject.name}
              </h1>
              <p className="text-xs text-[#d4a574] font-mono font-medium">
                {selectedProject.subtitle}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-lg bg-white/[0.08] border border-white/15 text-slate-200 font-mono text-[10px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <ExternalLink size={13} />
                  <span>Live Demo</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 border border-white/15"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {/* Metrics Highlight Card */}
            {selectedProject.metrics.length > 0 && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold">
                  <TrendingUp size={14} />
                  <span>Production Performance Metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-black/30 border border-emerald-500/20">
                      <span className="text-slate-400 block text-[10px] truncate">{m.label}</span>
                      <span className="text-emerald-300 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem & Solution Breakdown */}
            <div className="space-y-3 font-sans text-xs">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <h3 className="font-mono text-xs font-bold text-amber-400">Overview</h3>
                <p className="text-slate-300 leading-relaxed">{selectedProject.description}</p>
              </div>

              {selectedProject.challenges && (
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <h3 className="font-mono text-xs font-bold text-emerald-400">Engineering Challenges & Solutions</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.challenges}</p>
                </div>
              )}

              {/* Key Features */}
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <h3 className="font-mono text-xs font-bold text-[#d4a574]">Architectural Highlights</h3>
                <ul className="space-y-1.5">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* View Source Code in IDE button */}
            <button
              type="button"
              onClick={() => onOpenFileCode(selectedProject.id)}
              className="w-full py-2.5 rounded-xl bg-[#d4a574]/15 hover:bg-[#d4a574]/25 active:scale-95 text-[#d4a574] border border-[#d4a574]/30 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Cpu size={14} />
              <span>Inspect {selectedProject.fileName} Source Code</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
