"use client";

import React from "react";
import { 
  Home, 
  Layers, 
  Sparkles, 
  GitBranch, 
  MoreHorizontal
} from "lucide-react";
import { soundManager } from "@/utils/audio";

export type MobileTab = "home" | "projects" | "skills" | "code" | "git" | "more";

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  onOpenMore: () => void;
}

export function MobileBottomNav({
  activeTab,
  onSelectTab,
  onOpenMore,
}: MobileBottomNavProps) {
  const items = [
    { id: "home" as MobileTab, label: "Home", icon: Home },
    { id: "projects" as MobileTab, label: "Projects", icon: Layers },
    { id: "skills" as MobileTab, label: "Skills", icon: Sparkles },
    { id: "git" as MobileTab, label: "Git", icon: GitBranch },
    { id: "more" as MobileTab, label: "More", icon: MoreHorizontal },
  ];

  return (
    <nav className="w-full px-2 py-2 bg-black/45 border-t border-white/10 backdrop-blur-2xl flex items-center justify-around select-none z-30 shrink-0">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id || (item.id === "home" && activeTab === "code");

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (item.id === "more") {
                onOpenMore();
              } else {
                onSelectTab(item.id);
              }
            }}
            className={`flex flex-col items-center justify-center min-w-[52px] min-h-[44px] py-1 px-2 rounded-xl transition-all cursor-pointer active:scale-90 ${
              isActive
                ? "text-[#d4a574] bg-white/[0.08]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon size={19} className={isActive ? "text-[#d4a574]" : ""} />
            <span className="text-[10px] font-mono tracking-tight mt-0.5 font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
