"use client";

import React, { useState } from "react";
import { 
  Code2, 
  Cpu, 
  Database, 
  Layers, 
  Terminal, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { PORTFOLIO_DATA, SkillCategoryData } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

interface MobileSkillsViewProps {
  onOpenFileCode: (fileId: string) => void;
}

export function MobileSkillsView({ onOpenFileCode }: MobileSkillsViewProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillCategoryData | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case "java-core":
        return <Code2 size={18} className="text-amber-400" />;
      case "spring-boot":
        return <Cpu size={18} className="text-emerald-400" />;
      case "databases":
        return <Database size={18} className="text-sky-400" />;
      case "cs-core":
        return <BookOpen size={18} className="text-purple-400" />;
      default:
        return <Terminal size={18} className="text-rose-400" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-3.5 space-y-4 select-text pb-10">
      <div className="pb-1">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
          <Sparkles size={18} className="text-[#d4a574]" />
          <span>Technical Skills</span>
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Java 21 LTS, Spring Boot & Distributed Engineering
        </p>
      </div>

      <div className="space-y-3">
        {PORTFOLIO_DATA.skills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => {
              soundManager.playClick();
              onOpenFileCode(skill.id);
            }}
            className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] border border-white/10 transition-all cursor-pointer space-y-2.5 backdrop-blur-xl shadow-lg relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 shrink-0">
                  {getIcon(skill.id)}
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white">
                    {skill.title}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                    {skill.level} Proficiency
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 shrink-0 mt-1" />
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {skill.description}
            </p>

            <div className="flex flex-wrap gap-1 pt-1">
              {skill.skills.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-lg bg-white/[0.06] text-slate-200 font-mono text-[10px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
