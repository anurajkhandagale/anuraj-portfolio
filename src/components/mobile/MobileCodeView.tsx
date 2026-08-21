"use client";

import React, { useState } from "react";
import { 
  FileCode, 
  ChevronDown, 
  Play, 
  Share2, 
  Sparkles,
  FileText,
  Copy,
  Check
} from "lucide-react";
import { CodeEditor } from "@/components/ide/CodeEditor";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

interface MobileCodeViewProps {
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onOpenFilesDrawer: () => void;
  onRunBuild: () => void;
  onOpenContact: () => void;
  onOpenQR: () => void;
}

export function MobileCodeView({
  activeFileId,
  onSelectFile,
  onOpenFilesDrawer,
  onRunBuild,
  onOpenContact,
  onOpenQR,
}: MobileCodeViewProps) {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const quickFiles = [
    { id: "readme", name: "README.md", ext: "md" },
    { id: "pit-stop-live", name: "PitStopLive.java", ext: "java" },
    { id: "ai-email-generator", name: "AiEmailGenerator.java", ext: "java" },
    { id: "student-management", name: "StudentManagementSystem.java", ext: "java" },
    { id: "java-core", name: "Java.java", ext: "java" },
    { id: "spring-boot", name: "SpringBoot.java", ext: "java" },
    { id: "databases", name: "Databases.java", ext: "java" },
    { id: "dsa-core", name: "ComputerScienceCore.java", ext: "java" },
    { id: "pom", name: "pom.xml", ext: "xml" },
    { id: "application-yml", name: "application.yml", ext: "yml" },
  ];

  const currentFile = quickFiles.find((f) => f.id === activeFileId) || {
    id: activeFileId,
    name: `${activeFileId}.java`,
    ext: "java",
  };

  return (
    <div className="h-full flex flex-col overflow-hidden w-full select-text">
      
      {/* Compact Mobile File Tab Bar */}
      <div className="px-3 py-2 bg-white/[0.04] border-b border-white/10 flex items-center justify-between gap-2 shrink-0 backdrop-blur-md">
        
        {/* Active File Switcher Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsSwitcherOpen((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] active:scale-95 border border-white/15 text-white font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <FileCode size={13} className="text-[#d4a574]" />
            <span>{currentFile.name}</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          {/* Dropdown File Switcher Menu */}
          <AnimatePresence>
            {isSwitcherOpen && (
              <>
                <div
                  onClick={() => setIsSwitcherOpen(false)}
                  className="fixed inset-0 z-40 bg-black/40"
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute top-full left-0 mt-1.5 w-64 max-h-72 overflow-y-auto rounded-2xl bg-[#0e121d] border border-white/20 shadow-2xl p-1.5 z-50 backdrop-blur-3xl space-y-0.5"
                >
                  <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Switch File
                  </div>
                  {quickFiles.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        onSelectFile(f.id);
                        setIsSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left font-mono text-xs transition-colors cursor-pointer ${
                        activeFileId === f.id
                          ? "bg-[#d4a574]/20 text-white font-bold"
                          : "hover:bg-white/[0.08] text-slate-300"
                      }`}
                    >
                      <FileCode size={13} className="text-amber-400 shrink-0" />
                      <span className="truncate">{f.name}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSwitcherOpen(false);
                      onOpenFilesDrawer();
                    }}
                    className="w-full text-center py-2 text-[11px] font-mono text-[#d4a574] hover:underline cursor-pointer border-t border-white/10 mt-1"
                  >
                    Open Project Explorer Tree →
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Compile / Run Action */}
        <button
          type="button"
          onClick={() => {
            soundManager.playChime();
            onRunBuild();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold cursor-pointer"
        >
          <Play size={11} className="fill-emerald-400" />
          <span>Run</span>
        </button>

      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 w-full">
        <CodeEditor
          activeFileId={activeFileId}
          onOpenFile={onSelectFile}
          onRunBuild={onRunBuild}
          onOpenContact={onOpenContact}
          onOpenQR={onOpenQR}
        />
      </div>

    </div>
  );
}
