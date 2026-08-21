"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

export function ProblemsView() {
  return (
    <div className="flex flex-col h-full bg-black/60 font-mono text-xs p-3 space-y-3 overflow-y-auto select-text">
      <div className="flex items-center gap-4 text-slate-400 border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <CheckCircle2 size={13} />
          0 Errors
        </span>
        <span className="flex items-center gap-1.5 text-amber-400 font-bold">
          <AlertTriangle size={13} />
          1 Warning
        </span>
        <span className="flex items-center gap-1.5 text-sky-400">
          <Info size={13} />
          0 Typo Reports
        </span>
      </div>

      <div className="space-y-2">
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-slate-200 space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <AlertTriangle size={13} />
            <span>ActiveRoadmap.java:24 - Continuous Learning Notice</span>
          </div>
          <p className="text-xs text-slate-300 pl-5">
            Warning: This candidate is actively studying distributed systems, Kafka, and Redis caching topologies.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-slate-200">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 size={13} />
            <span>Codebase Cleanliness Verified</span>
          </div>
          <p className="text-xs text-slate-300 pl-5 mt-1">
            Zero memory leaks in JDBC connection pools • High cohesion and low coupling in all MVC layers.
          </p>
        </div>
      </div>
    </div>
  );
}
