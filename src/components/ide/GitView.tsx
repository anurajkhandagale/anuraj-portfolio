"use client";

import React from "react";
import { GitBranch, GitCommit as GitCommitIcon, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function GitView() {
  const { gitCommits, profile } = PORTFOLIO_DATA;

  return (
    <div className="flex flex-col h-full bg-black/60 font-mono text-xs p-3 space-y-3 overflow-y-auto select-text">
      {/* Git status summary */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold">
            <GitBranch size={12} />
            branch: main
          </span>
          <span className="text-slate-400">Everything up to date with origin/main</span>
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#d4a574] hover:underline flex items-center gap-1"
        >
          <span>View github.com/{profile.githubUsername}</span>
          <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Commit history list */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Recent Log Commits
        </span>

        <div className="space-y-1.5">
          {gitCommits.map((commit, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="px-1.5 py-0.5 rounded bg-[#d4a574]/15 text-[#d4a574] text-[10px] font-bold shrink-0">
                  {commit.hash}
                </span>
                <span className="text-white font-medium truncate">{commit.message}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400 text-[11px] shrink-0">
                <span>{commit.author}</span>
                <span className="text-slate-500">•</span>
                <span>{commit.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
