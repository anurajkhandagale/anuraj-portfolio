"use client";

import React from "react";
import { X, Coffee, FileText, Settings, FileCode2, Plus } from "lucide-react";

export interface TabItem {
  id: string;
  name: string;
  extension?: string;
  isModified?: boolean;
}

interface EditorTabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string, e: React.MouseEvent) => void;
  onNewTabSearch: () => void;
}

export function EditorTabs({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTabSearch,
}: EditorTabsProps) {
  const getTabIcon = (extension?: string, name?: string) => {
    if (name === "README.md") {
      return <FileText size={12} className="text-[#d4a574]" />;
    }
    if (extension === "java") {
      return <Coffee size={12} className="text-[#cc7832]" />;
    }
    if (extension === "pdf") {
      return <FileText size={12} className="text-red-400" />;
    }
    if (extension === "xml") {
      return <FileCode2 size={12} className="text-sky-400" />;
    }
    if (extension === "yml") {
      return <Settings size={12} className="text-rose-400" />;
    }
    return <FileText size={12} className="text-slate-400" />;
  };

  return (
    <div className="h-8 apple-glass-topbar border-b border-white/10 flex items-center px-2 overflow-x-auto select-none no-scrollbar shrink-0 z-10">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;

          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative h-6 px-2.5 rounded-t-md flex items-center gap-2 text-xs font-mono cursor-pointer transition-all border shrink-0 ${
                isActive
                  ? "bg-white/[0.08] border-white/15 border-b-transparent text-white font-medium shadow-sm"
                  : "bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              }`}
            >
              <span>{getTabIcon(tab.extension, tab.name)}</span>
              <span className="text-[11px] truncate max-w-[140px]">{tab.name}</span>

              <button
                type="button"
                onClick={(e) => onCloseTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          );
        })}

        {/* New Tab (+) Button */}
        <button
          type="button"
          onClick={onNewTabSearch}
          className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
          title="Open File (⌘K)"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}
