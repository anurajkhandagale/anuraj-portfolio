"use client";

import React, { useState } from "react";
import { SkillCategoryData } from "@/data/portfolioData";
import { Code2, CheckCircle2, Cpu, BookOpen, Layers, Sparkles } from "lucide-react";

interface SkillFileViewProps {
  skill: SkillCategoryData;
}

export function SkillFileView({ skill }: SkillFileViewProps) {
  const [viewMode, setViewMode] = useState<"code" | "visual">("code");
  const codeLines = skill.code.split("\n");

  const renderHighlightedLine = (line: string) => {
    if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
      return <span className="hl-comment">{line}</span>;
    }
    return (
      <span className="font-mono text-slate-200">
        {line.split(/(\b(?:public|private|protected|class|interface|record|extends|implements|package|import|return|new|if|else|try|catch|finally|throw|throws|static|final|void|boolean|int|double|String|List|Map)\b|@\w+|"[^"]*"|\/\/.*)/g).map((token, i) => {
          if (["public", "private", "protected", "class", "interface", "record", "extends", "implements", "package", "import", "return", "new", "if", "else", "try", "catch", "finally", "throw", "throws", "static", "final"].includes(token)) {
            return <span key={i} className="hl-keyword">{token}</span>;
          }
          if (["void", "boolean", "int", "double", "String", "List", "Map", "TechnicalCompetency"].includes(token)) {
            return <span key={i} className="hl-type">{token}</span>;
          }
          if (token.startsWith("@")) {
            return <span key={i} className="hl-annotation">{token}</span>;
          }
          if (token.startsWith("\"") && token.endsWith("\"")) {
            return <span key={i} className="hl-string">{token}</span>;
          }
          if (token.startsWith("//")) {
            return <span key={i} className="hl-comment">{token}</span>;
          }
          return token;
        })}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      
      {/* Top Header */}
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
            SKILL
          </span>
          <h2 className="text-sm font-bold text-white font-mono">
            {skill.fileName}
            <span className="text-xs text-slate-400 font-sans font-normal ml-2 hidden sm:inline">
              ({skill.title})
            </span>
          </h2>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setViewMode("code")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "code" ? "bg-white/15 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Code2 size={13} />
            <span>Java Interface</span>
          </button>
          <button
            onClick={() => setViewMode("visual")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "visual" ? "bg-white/15 text-white font-bold text-[#d4a574]" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} />
            <span>Competency Card</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6">
        {viewMode === "code" ? (
          <div className="rounded-xl apple-glass-editor border border-white/10 overflow-hidden shadow-2xl">
            <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>com.anuraj.portfolio.skills.{skill.fileName}</span>
              <span className="text-emerald-400 font-bold">Compiled • Level: {skill.level}</span>
            </div>
            
            <div className="p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed">
              <table className="w-full border-collapse">
                <tbody>
                  {codeLines.map((line, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="w-10 pr-4 text-right select-none text-slate-600 group-hover:text-slate-400 font-mono text-xs">
                        {idx + 1}
                      </td>
                      <td className="pl-2 whitespace-pre text-slate-200">
                        {renderHighlightedLine(line)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 select-text">
            <div className="p-6 rounded-2xl apple-glass-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#d4a574] uppercase tracking-wider">
                  // Technical Core Competency
                </span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  {skill.level}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-white font-sans">
                {skill.title}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                {skill.description}
              </p>
            </div>

            <div className="p-6 rounded-2xl apple-glass-card space-y-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu size={16} className="text-[#d4a574]" />
                Skill Modules & Concepts
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {skill.skills.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-mono text-slate-200">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
