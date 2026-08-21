"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ApplicationYmlView() {
  const { applicationYml } = PORTFOLIO_DATA;
  const lines = applicationYml.split("\n");

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-xs font-bold">
            YAML
          </span>
          <h2 className="text-sm font-bold text-white font-mono">
            application.yml
          </h2>
        </div>
        <span className="text-xs font-mono text-emerald-400">profile: production</span>
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <div className="rounded-xl apple-glass-editor border border-white/10 overflow-hidden shadow-2xl">
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>src/main/resources/application.yml</span>
            <span>Spring Configuration</span>
          </div>

          <div className="p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed">
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="w-10 pr-4 text-right select-none text-slate-600 group-hover:text-slate-400 font-mono text-xs">
                      {idx + 1}
                    </td>
                    <td className="pl-2 whitespace-pre text-slate-200">
                      {line.trim().startsWith("#") ? (
                        <span className="hl-comment">{line}</span>
                      ) : (
                        line
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
