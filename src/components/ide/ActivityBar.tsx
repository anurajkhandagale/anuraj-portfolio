"use client";

import React from "react";
import { 
  Files, 
  Search, 
  GitBranch, 
  PlaySquare, 
  LayoutGrid, 
  User, 
  Settings 
} from "lucide-react";

interface ActivityBarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onOpenSearch: () => void;
  onOpenGit: () => void;
  onOpenContact: () => void;
  onOpenSettings: () => void;
}

export function ActivityBar({
  activeView,
  onSelectView,
  onOpenSearch,
  onOpenGit,
  onOpenContact,
  onOpenSettings
}: ActivityBarProps) {
  return (
    <aside className="w-12 apple-glass-activitybar flex flex-col items-center justify-between py-3 select-none shrink-0 z-20">
      {/* Top action icons */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Explorer icon with active indicator */}
        <button
          type="button"
          onClick={() => onSelectView("explorer")}
          title="Project Explorer"
          className="relative w-full flex items-center justify-center p-2 text-white/90 hover:text-white cursor-pointer group"
        >
          {activeView === "explorer" && (
            <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white rounded-r shadow-[0_0_8px_white]" />
          )}
          <Files size={18} className="opacity-90 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Search icon */}
        <button
          type="button"
          onClick={onOpenSearch}
          title="Search Everywhere (⌘K)"
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <Search size={18} />
        </button>

        {/* Source Control Git */}
        <button
          type="button"
          onClick={onOpenGit}
          title="Source Control / Git"
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <GitBranch size={18} />
        </button>

        {/* Run & Debug */}
        <button
          type="button"
          onClick={() => onSelectView("run")}
          title="Run & Debug"
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <PlaySquare size={18} />
        </button>

        {/* Extensions / Modules */}
        <button
          type="button"
          onClick={() => onSelectView("explorer")}
          title="Skills & Modules"
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <LayoutGrid size={18} />
        </button>
      </div>

      {/* Bottom user / settings icons */}
      <div className="flex flex-col items-center gap-3 w-full">
        <button
          type="button"
          onClick={onOpenContact}
          title="Developer Profile & Contact"
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <User size={18} />
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          title="IDE Settings"
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <Settings size={18} />
        </button>
      </div>
    </aside>
  );
}
