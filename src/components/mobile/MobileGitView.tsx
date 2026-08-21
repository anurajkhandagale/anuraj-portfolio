"use client";

import React from "react";
import { GitBranch, GitCommit, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";

export function MobileGitView() {
  const commits = [
    {
      hash: "0e6efbd",
      message: "feat: Apple-style floating glassmorphism IntelliJ portfolio",
      time: "2 hours ago",
      branch: "main",
    },
    {
      hash: "7fa669b",
      message: "feat(backend): Spring Boot 3.3 REST API with HikariCP & JWT",
      time: "yesterday",
      branch: "main",
    },
    {
      hash: "4a8c12e",
      message: "feat(spatial): Pit Stop Live emergency garage SOS engine",
      time: "3 days ago",
      branch: "main",
    },
    {
      hash: "2b919dc",
      message: "perf(dsa): optimize binary tree and sliding window algorithms",
      time: "5 days ago",
      branch: "main",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-3.5 space-y-4 select-text pb-10">
      
      {/* Git Repo Header */}
      <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <GitBranch size={16} />
          </div>
          <div>
            <h2 className="font-mono text-xs font-bold text-white">anuraj-portfolio</h2>
            <p className="font-mono text-[10px] text-emerald-400">branch: main (clean)</p>
          </div>
        </div>

        <a
          href={PORTFOLIO_DATA.profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono text-xs font-bold flex items-center gap-1.5 border border-white/10"
        >
          <Github size={13} />
          <span>GitHub</span>
        </a>
      </div>

      {/* Commit History */}
      <div className="space-y-2.5">
        <span className="font-mono text-[11px] font-bold text-slate-400 block px-1">
          Recent Git Activity
        </span>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 divide-y divide-white/10 overflow-hidden">
          {commits.map((c) => (
            <div key={c.hash} className="p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#d4a574] flex items-center gap-1">
                  <GitCommit size={13} className="text-purple-400" />
                  <span>{c.hash}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">{c.time}</span>
              </div>
              <p className="text-xs font-sans text-slate-200 leading-snug">
                {c.message}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
