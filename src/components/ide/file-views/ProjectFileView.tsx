"use client";

import React, { useState } from "react";
import { ProjectData } from "@/data/portfolioData";
import { 
  Code2, 
  BookOpen, 
  Activity, 
  ExternalLink, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Zap,
  Sparkles
} from "lucide-react";
import { Github } from "@/components/ui/icons";
import { motion } from "framer-motion";

interface ProjectFileViewProps {
  project: ProjectData;
}

export function ProjectFileView({ project }: ProjectFileViewProps) {
  const [activeTab, setActiveTab] = useState<"code" | "casestudy" | "mockup">("code");

  // Format Java code with line numbers and syntax highlighting
  const codeLines = project.code.split("\n");

  const renderHighlightedLine = (line: string) => {
    // Simple robust syntax token highlighting
    if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
      return <span className="hl-comment">{line}</span>;
    }
    
    // Replace annotations
    let formatted = line;
    
    return (
      <span className="font-mono text-slate-200">
        {line.split(/(\b(?:public|private|protected|class|interface|record|extends|implements|package|import|return|new|if|else|try|catch|finally|throw|throws|static|final|void|boolean|int|double|String|List|Map)\b|@\w+|"[^"]*"|\/\/.*)/g).map((token, i) => {
          if (["public", "private", "protected", "class", "interface", "record", "extends", "implements", "package", "import", "return", "new", "if", "else", "try", "catch", "finally", "throw", "throws", "static", "final"].includes(token)) {
            return <span key={i} className="hl-keyword">{token}</span>;
          }
          if (["void", "boolean", "int", "double", "String", "List", "Map", "WebClient", "Mono", "Duration", "Connection", "PreparedStatement", "DataSource", "SQLException"].includes(token)) {
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
      
      {/* File Header Bar & Sub-Navigation */}
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Project Identity */}
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-[#cc7832]/20 text-[#cc7832] font-mono text-xs font-bold">
            JAVA
          </span>
          <div>
            <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              {project.fileName}
              <span className="text-xs text-slate-400 font-sans font-normal hidden sm:inline">
                ({project.name})
              </span>
            </h2>
          </div>
        </div>

        {/* Center: View Mode Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "code"
                ? "bg-white/15 text-white font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Code2 size={13} />
            <span>Source Code</span>
          </button>

          <button
            onClick={() => setActiveTab("casestudy")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "casestudy"
                ? "bg-white/15 text-white font-bold shadow-sm text-[#d4a574]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} />
            <span>Case Study</span>
          </button>

          <button
            onClick={() => setActiveTab("mockup")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "mockup"
                ? "bg-white/15 text-white font-bold shadow-sm text-emerald-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity size={13} />
            <span>Telemetry & Mockup</span>
          </button>
        </div>

        {/* Right: GitHub / External links */}
        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 p-4 sm:p-6">
        
        {/* 1. CODE VIEW */}
        {activeTab === "code" && (
          <div className="rounded-xl apple-glass-editor border border-white/10 overflow-hidden shadow-2xl">
            <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{project.packageName}.{project.fileName}</span>
              <span>Java 21 LTS • UTF-8</span>
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
        )}

        {/* 2. CASE STUDY VIEW */}
        {activeTab === "casestudy" && (
          <div className="max-w-4xl mx-auto space-y-8 select-text">
            
            {/* Header & Subtitle */}
            <div className="p-6 rounded-2xl apple-glass-card space-y-3">
              <span className="text-xs font-mono font-bold text-[#d4a574] uppercase tracking-wider">
                // {project.subtitle}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.name}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl apple-glass-card text-center">
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono text-slate-400 block mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Core Features & Architectural Decisions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl apple-glass-card space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                  <Cpu size={16} className="text-[#d4a574]" />
                  <span>Core Engineering Features</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {project.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl apple-glass-card space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <span>Technical Bottleneck & Solution</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {project.challenges}
                </p>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                  <span className="font-bold">Engineered Outcome:</span> High concurrency resilience with zero memory leakage and sub-second execution thresholds.
                </div>
              </div>

            </div>

            {/* Results Grid */}
            <div className="p-6 rounded-2xl apple-glass-card space-y-3">
              <span className="text-xs font-mono font-bold text-[#d4a574] uppercase tracking-wider">
                // Impact & Verification Benchmarks
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {project.results.map((res, ridx) => (
                  <div key={ridx} className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                    ✓ {res}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 3. INTERACTIVE MOCKUP & TELEMETRY */}
        {activeTab === "mockup" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-4 rounded-xl apple-glass-card text-xs font-mono text-slate-300 flex items-center justify-between">
              <span className="text-[#d4a574] font-bold">System Runtime Telemetry</span>
              <span className="text-emerald-400 font-bold">LIVE METRICS SIMULATOR</span>
            </div>

            {project.id === "ai-email-generator" && (
              <div className="rounded-2xl border border-white/15 bg-[#050811] p-6 font-mono text-xs leading-relaxed space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[#d4a574] font-bold">POST /api/v1/generate-reply</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">200 OK • 142ms</span>
                </div>

                <div className="space-y-1 text-slate-400">
                  <div>// Request Payload:</div>
                  <div className="bg-[#0b101d] p-3 rounded-lg border border-white/10 text-slate-200">
                    <span className="text-[#cc7832]">&quot;sender&quot;</span>: <span className="text-emerald-400">&quot;engineering-lead@tech.corp&quot;</span>,<br />
                    <span className="text-[#cc7832]">&quot;subject&quot;</span>: <span className="text-emerald-400">&quot;Interview Discussion - Java Backend SDE&quot;</span>,<br />
                    <span className="text-[#cc7832]">&quot;tone&quot;</span>: <span className="text-emerald-400">&quot;Professional / Enthusiastic&quot;</span>
                  </div>
                </div>

                <div className="text-sky-400 animate-pulse">// Spring WebClient async dispatching non-blocking reactive thread...</div>

                <div className="space-y-1 text-slate-400 pt-2 border-t border-white/10">
                  <div>// Generated Response Stream:</div>
                  <div className="bg-[#0b101d] p-3 rounded-lg border border-white/10 text-slate-300">
                    &quot;Dear Engineering Lead, thank you for reaching out regarding the Java Backend SDE role. I am excited to connect and discuss how my expertise in Spring Boot, REST APIs, and database engineering can contribute to your engineering goals...&quot;
                  </div>
                </div>
              </div>
            )}

            {project.id === "pit-stop-live" && (
              <div className="rounded-2xl border border-white/15 bg-[#050811] p-6 font-mono text-xs leading-relaxed space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sky-400 font-bold">PostgreSQL PostGIS Spatial Engine</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">Query Execution: 1.45ms</span>
                </div>

                <div className="bg-[#0b101d] p-4 rounded-lg border border-white/10 text-slate-200 text-xs">
                  <span className="text-[#cc7832]">SELECT</span> id, name, location_name, ST_Distance(coord, user_loc) <span className="text-[#cc7832]">AS</span> distance<br />
                  <span className="text-[#cc7832]">FROM</span> emergency_workshops<br />
                  <span className="text-[#cc7832]">WHERE</span> ST_DWithin(coord, ST_MakePoint(18.5204, 73.8567), 5000)<br />
                  <span className="text-[#cc7832]">ORDER BY</span> distance <span className="text-[#cc7832]">ASC</span><br />
                  <span className="text-[#cc7832]">LIMIT</span> 5;
                </div>

                <div className="p-3 rounded-lg bg-[#0b101d] border border-emerald-500/20 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Index Scan: emergency_spatial_btree_idx</span>
                    <span className="text-emerald-400 font-bold">Status: Resolved under 2.0s</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#d4a574] h-full w-[90%]" />
                  </div>
                </div>
              </div>
            )}

            {project.id === "student-management-system" && (
              <div className="rounded-2xl border border-white/15 bg-[#050811] p-6 font-mono text-xs leading-relaxed space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-emerald-400 font-bold">JVM HikariCP Connection Pool</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">ACID Guard: ACTIVE</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#0b101d] border border-white/10">
                    <div className="text-slate-400 text-[11px]">Active JDBC Connections</div>
                    <div className="text-xl font-bold text-white font-mono mt-1">4 / 20</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b101d] border border-white/10">
                    <div className="text-slate-400 text-[11px]">Idle Pre-warmed Pool</div>
                    <div className="text-xl font-bold text-[#d4a574] font-mono mt-1">16</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0b101d] border border-white/10 text-[11px] text-slate-300">
                  <span className="text-[#cc7832] font-bold">Transaction Isolation:</span> READ_COMMITTED • 500+ records audited with 0 connection leaks.
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
