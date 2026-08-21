"use client";

import React from "react";
import { TerminalView } from "./TerminalView";
import { RunConsoleView } from "./RunConsoleView";
import { ProblemsView } from "./ProblemsView";
import { GitView } from "./GitView";
import { 
  GitBranch, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type BottomPanelType = "terminal" | "problems" | "output" | "debug" | "git" | "run";

interface BottomDockProps {
  isOpen: boolean;
  activePanel: BottomPanelType;
  onSelectPanel: (panel: BottomPanelType) => void;
  onToggleOpen: () => void;
  onOpenFile?: (fileId: string) => void;
  onRunBuild?: () => void;
  onOpenContact?: () => void;
  onOpenQR?: () => void;
}

export function BottomDock({
  isOpen,
  activePanel,
  onSelectPanel,
  onToggleOpen,
  onOpenFile,
  onRunBuild,
  onOpenContact,
  onOpenQR,
}: BottomDockProps) {
  const tabs = [
    { id: "terminal" as BottomPanelType, label: "TERMINAL" },
    { id: "problems" as BottomPanelType, label: "PROBLEMS" },
    { id: "output" as BottomPanelType, label: "OUTPUT" },
    { id: "debug" as BottomPanelType, label: "DEBUG CONSOLE" },
    { id: "git" as BottomPanelType, label: "GIT" },
  ];

  return (
    <div className="apple-glass-dock border-t border-white/10 flex flex-col shrink-0 select-none z-20">
      {/* Dock Bar Tabs */}
      <div className="h-7 px-3 bg-white/[0.02] flex items-center justify-between border-b border-white/5">
        
        {/* Panel Switcher */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = isOpen && (activePanel === tab.id || (activePanel === "run" && tab.id === "output"));

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (!isOpen) onToggleOpen();
                  onSelectPanel(tab.id);
                }}
                className={`h-6 px-1 flex items-center text-[11px] font-mono tracking-wider transition-all cursor-pointer border-b-2 ${
                  isActive
                    ? "border-white text-white font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Toggle Collapse Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleOpen}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isOpen ? "Collapse Bottom Panel" : "Expand Bottom Panel"}
          >
            {isOpen ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>

      </div>

      {/* Dock Content Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 180, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden h-[180px]"
          >
            {/* 1. FULL WIDTH TERMINAL VIEW */}
            {activePanel === "terminal" && (
              <div className="h-full w-full overflow-hidden">
                <TerminalView
                  onOpenFile={onOpenFile}
                  onRunBuild={onRunBuild}
                  onOpenContact={onOpenContact}
                  onOpenQR={onOpenQR}
                />
              </div>
            )}

            {/* 2. PROBLEMS VIEW */}
            {activePanel === "problems" && <ProblemsView />}

            {/* 3. OUTPUT / RUN VIEW */}
            {(activePanel === "output" || activePanel === "run") && (
              <RunConsoleView onRerun={onRunBuild} />
            )}

            {/* 4. DEBUG CONSOLE */}
            {activePanel === "debug" && (
              <div className="p-3 h-full overflow-y-auto space-y-2 font-mono text-xs bg-black/15">
                <div className="text-slate-400">Connected to JVM Debugger on localhost:5005</div>
                <div className="text-emerald-400 font-semibold">&gt; Anuraj.getSkills()</div>
                <div className="text-slate-200 pl-3">[&quot;Java 21&quot;, &quot;Spring Boot&quot;, &quot;PostgreSQL&quot;, &quot;DSA&quot;, &quot;REST APIs&quot;]</div>
                <div className="text-emerald-400 font-semibold">&gt; Anuraj.getAcademicStatus()</div>
                <div className="text-[#d4a574] pl-3">&quot;B.E. Computer Engineering Graduate (SPPU) - CGPA: 8.12&quot;</div>
              </div>
            )}

            {/* 5. GIT VIEW */}
            {activePanel === "git" && <GitView />}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
