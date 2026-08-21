"use client";

import React from "react";
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  FileText, 
  Settings, 
  X, 
  ChevronRight,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { FILE_TREE, FileItem } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

interface MobileFileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

export function MobileFileDrawer({
  isOpen,
  onClose,
  activeFileId,
  onSelectFile,
}: MobileFileDrawerProps) {
  const [expandedFolders, setExpandedFolders] = React.useState<Record<string, boolean>>({
    root: true,
    src: true,
    main: true,
    java: true,
    projects: true,
    skills: true,
  });

  const toggleFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFileClick = (fileId: string) => {
    soundManager.playClick();
    onSelectFile(fileId);
    onClose();
  };

  const renderTree = (items: FileItem[], depth = 0) => {
    return (
      <div className="space-y-0.5">
        {items.map((item) => {
          if (item.type === "folder") {
            const isExpanded = expandedFolders[item.id] !== false;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={(e) => toggleFolder(item.id, e)}
                  style={{ paddingLeft: `${depth * 14 + 10}px` }}
                  className="w-full flex items-center gap-2 py-2 pr-3 rounded-xl hover:bg-white/[0.06] active:bg-white/[0.12] text-left transition-colors cursor-pointer"
                >
                  {isExpanded ? (
                    <ChevronDown size={14} className="text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight size={14} className="text-slate-400 shrink-0" />
                  )}
                  {isExpanded ? (
                    <FolderOpen size={16} className="text-[#d4a574] shrink-0" />
                  ) : (
                    <Folder size={16} className="text-[#d4a574] shrink-0" />
                  )}
                  <span className="font-mono text-xs font-semibold text-slate-200 truncate">
                    {item.name}
                  </span>
                </button>

                {isExpanded && item.children && (
                  <div>{renderTree(item.children, depth + 1)}</div>
                )}
              </div>
            );
          }

          const isActive = activeFileId === item.id;
          const isPdf = item.extension === "pdf";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleFileClick(item.id)}
              style={{ paddingLeft: `${depth * 14 + 24}px` }}
              className={`w-full flex items-center gap-2 py-2.5 pr-3 rounded-xl text-left transition-all cursor-pointer min-h-[44px] ${
                isActive
                  ? "bg-[#d4a574]/20 text-white font-bold border border-[#d4a574]/40"
                  : isPdf
                  ? "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                  : "hover:bg-white/[0.06] active:bg-white/[0.12] text-slate-300"
              }`}
            >
              {isPdf ? (
                <FileText size={15} className="text-rose-400 shrink-0" />
              ) : item.extension === "java" ? (
                <FileCode size={15} className="text-amber-400 shrink-0" />
              ) : item.extension === "xml" || item.extension === "yml" ? (
                <Settings size={15} className="text-sky-400 shrink-0" />
              ) : (
                <FileText size={15} className="text-slate-400 shrink-0" />
              )}
              <span className="font-mono text-xs truncate flex-1">{item.name}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a574] shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Slide-Up Glass Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-h-[82vh] bg-[#0c101d]/90 border-t border-white/20 rounded-t-[26px] p-4 flex flex-col backdrop-blur-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1 rounded-full bg-white/30 mx-auto mb-3 shrink-0" />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <FolderOpen size={16} className="text-[#d4a574]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Project Explorer
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-slate-300 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Tree Content */}
            <div className="flex-1 overflow-y-auto pt-2 pb-6 space-y-1">
              {renderTree(FILE_TREE)}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
