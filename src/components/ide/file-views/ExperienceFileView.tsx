"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Award, Terminal, Workflow, CheckCircle2, HardDrive, Cpu, Radio, Network, BookOpen, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceFileViewProps {
  type: "achievements" | "roadmap";
}

export function ExperienceFileView({ type }: ExperienceFileViewProps) {
  const { achievements, roadmap, satellites } = PORTFOLIO_DATA;
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const activeHoverInfo = satellites.find((s) => s.id === hoveredTech);

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
            EXPERIENCE
          </span>
          <h2 className="text-sm font-bold text-white font-mono">
            {type === "achievements" ? "Achievements.java" : "ActiveRoadmap.java"}
          </h2>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto space-y-8 select-text">
        {type === "achievements" ? (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl apple-glass-card space-y-2">
              <span className="text-xs font-mono font-bold text-[#d4a574] uppercase tracking-wider">
                // Professional Milestones & Engineering Impact
              </span>
              <h1 className="text-2xl font-bold text-white">
                Technical Highlights & Achievements
              </h1>
              <p className="text-sm text-slate-300">
                Core competencies validated through active problem solving and production-grade architectures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl apple-glass-card space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#d4a574]">
                      [{item.tag}]
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Verified
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl apple-glass-card space-y-2">
              <span className="text-xs font-mono font-bold text-[#d4a574] uppercase tracking-wider">
                // Engineering Roadmap & Architecture Studies
              </span>
              <h1 className="text-2xl font-bold text-white">
                Expanding Into Distributed Systems
              </h1>
              <p className="text-sm text-slate-300">
                Active study in containerization, messaging brokers, caching tiers, and cloud topology.
              </p>

              {/* Active Sprint Project Highlight */}
              <div className="pt-2">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold uppercase">
                        Current Build 2026
                      </span>
                      <span className="font-mono text-xs font-bold text-white truncate">
                        SayIt – Speech & Reading Fluency Assistant
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Web Speech API (STT & TTS), phonics scoring, and interactive reading tracks for children & adults.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbit Map + Roadmap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Roadmap list */}
              <div className="md:col-span-7 p-6 rounded-2xl apple-glass-card space-y-4">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Technology Roadmap
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {roadmap.map((item, idx) => {
                    const isActive = item.status === "Active Focus";
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border flex flex-col justify-between gap-2 ${
                          isActive 
                            ? "border-[#d4a574]/30 bg-[#d4a574]/5" 
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                            isActive ? "bg-[#d4a574]/15 text-[#d4a574]" : "bg-white/5 text-slate-400"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Interactive Orbit System */}
              <div className="md:col-span-5 p-6 rounded-2xl apple-glass-card flex flex-col justify-between items-center relative overflow-hidden min-h-[340px]">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  Tech Orbit Visualizer
                </span>

                <div className="relative w-full aspect-square max-w-[220px] flex items-center justify-center my-auto">
                  {/* Sun core */}
                  <div className="w-14 h-14 rounded-full bg-[#0d1322] border border-[#d4a574]/40 flex flex-col items-center justify-center z-10 shadow-[0_0_20px_rgba(212,165,116,0.15)]">
                    <span className="text-[8px] font-mono font-extrabold text-[#d4a574] text-center leading-tight">
                      SYSTEM<br/>DESIGN
                    </span>
                  </div>

                  {/* Concentric Orbits */}
                  {satellites.map((sat) => {
                    const isHovered = hoveredTech === sat.id;
                    return (
                      <div
                        key={sat.id}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <div
                          className={`absolute rounded-full border transition-colors ${
                            isHovered ? "border-[#d4a574]/30" : "border-white/10"
                          }`}
                          style={{
                            width: sat.orbitRadius * 2,
                            height: sat.orbitRadius * 2,
                          }}
                        />

                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: sat.speed,
                            ease: "linear",
                          }}
                          style={{
                            width: sat.orbitRadius * 2,
                            height: sat.orbitRadius * 2,
                          }}
                          className="absolute flex items-center justify-start"
                        >
                          <motion.div
                            onMouseEnter={() => setHoveredTech(sat.id)}
                            onMouseLeave={() => setHoveredTech(null)}
                            style={{ x: -14 }}
                            animate={{ rotate: -360 }}
                            transition={{
                              repeat: Infinity,
                              duration: sat.speed,
                              ease: "linear",
                            }}
                            className={`w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer pointer-events-auto transition-all shadow-lg ${sat.color}`}
                          >
                            <span className="text-[9px] font-mono font-bold">{sat.label.slice(0, 3)}</span>
                          </motion.div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom preview info */}
                <div className="w-full h-10 flex items-center justify-center border-t border-white/10 pt-2 text-center">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {activeHoverInfo ? activeHoverInfo.desc : "Hover satellites to inspect topics"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}
