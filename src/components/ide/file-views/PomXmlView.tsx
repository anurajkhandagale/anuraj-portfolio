"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { FileCode, Layers, CheckCircle2 } from "lucide-react";

export function PomXmlView() {
  const { pomXml } = PORTFOLIO_DATA;
  const lines = pomXml.split("\n");

  const renderXmlLine = (line: string) => {
    if (line.trim().startsWith("<!--")) {
      return <span className="hl-comment">{line}</span>;
    }
    return (
      <span className="font-mono text-slate-200">
        {line.split(/(<[^>]+>)/g).map((part, i) => {
          if (part.startsWith("<") && part.endsWith(">")) {
            return <span key={i} className="hl-tag">{part}</span>;
          }
          return <span key={i} className="text-slate-100">{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-xs font-bold">
            XML
          </span>
          <h2 className="text-sm font-bold text-white font-mono">
            pom.xml
            <span className="text-xs text-slate-400 font-sans font-normal ml-2 hidden sm:inline">
              (Maven Build Descriptor)
            </span>
          </h2>
        </div>
        <span className="text-xs font-mono text-emerald-400">BUILD SUCCESS</span>
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <div className="rounded-xl apple-glass-editor border border-white/10 overflow-hidden shadow-2xl">
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>anuraj-developer-portfolio / pom.xml</span>
            <span>Apache Maven 3.9 • UTF-8</span>
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
                      {renderXmlLine(line)}
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
