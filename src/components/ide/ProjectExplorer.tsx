"use client";

import React, { useState } from "react";
import { 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown, 
  FileCode2, 
  FileText, 
  File, 
  Settings, 
  Coffee, 
  Layers,
  GraduationCap,
  Sparkles,
  Mail,
  Award
} from "lucide-react";
import { FILE_TREE, FileItem } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectExplorerProps {
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export function ProjectExplorer({
  activeFileId,
  onSelectFile,
  isOpen,
  onCloseMobile
}: ProjectExplorerProps) {
  // Folder expanded state
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "src": true,
    "projects-folder": true,
    "skills-folder": true,
    "experience-folder": false,
    "education-folder": true,
    "contact-folder": false,
  });

  const toggleFolder = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const getFileIcon = (extension?: string, name?: string) => {
    if (name === "README.md") {
      return <FileText size={14} className="text-[#d4a574]" />;
    }
    if (extension === "java") {
      return <Coffee size={14} className="text-[#cc7832]" />;
    }
    if (extension === "pdf") {
      return <FileText size={14} className="text-red-400" />;
    }
    if (extension === "xml") {
      return <FileCode2 size={14} className="text-sky-400" />;
    }
    if (extension === "yml") {
      return <Settings size={14} className="text-rose-400" />;
    }
    return <File size={14} className="text-slate-400" />;
  };

  const renderTreeItem = (item: FileItem, level: number = 0) => {
    const isFolder = item.type === "folder";
    const isExpanded = expandedFolders[item.id];
    const isActive = activeFileId === item.id;

    const paddingLeft = `${level * 14 + 10}px`;

    if (isFolder) {
      return (
        <div key={item.id} className="select-none">
          <div
            onClick={(e) => toggleFolder(item.id, e)}
            style={{ paddingLeft }}
            className="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-white/5 text-xs text-slate-300 hover:text-white cursor-pointer group transition-colors"
          >
            <span className="text-slate-500 group-hover:text-slate-300 transition-transform">
              {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </span>
            <span className="text-[#d4a574]">
              {isExpanded ? <FolderOpen size={14} /> : <Folder size={14} />}
            </span>
            <span className="font-mono text-[12px] font-medium group-hover:text-white">
              {item.name}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {isExpanded && item.children && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="overflow-hidden"
              >
                {item.children.map((child) => renderTreeItem(child, level + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div
        key={item.id}
        onClick={() => {
          onSelectFile(item.id);
          if (onCloseMobile) onCloseMobile();
        }}
        style={{ paddingLeft }}
        className={`flex items-center gap-2 py-1 px-2 my-0.5 rounded-md text-xs cursor-pointer select-none transition-all group ${
          isActive
            ? "bg-[#d4a574]/15 border border-[#d4a574]/30 text-white font-semibold"
            : "hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent"
        }`}
      >
        <span className="shrink-0">{getFileIcon(item.extension, item.name)}</span>
        <span className="font-mono text-[12px] truncate">{item.name}</span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <aside className="w-64 sm:w-60 md:w-64 apple-glass-sidebar flex flex-col h-full shrink-0 select-none overflow-hidden z-20">
      {/* Sidebar Header */}
      <div className="h-9 px-3 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="font-bold tracking-wider uppercase text-[10px] text-slate-400">
          Project Explorer
        </span>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-slate-400 font-mono">
          maven
        </span>
      </div>

      {/* Project Root Badge */}
      <div className="p-2 border-b border-white/5">
        <div className="px-2 py-1.5 rounded-lg bg-black/30 border border-white/5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#d4a574]" />
          <div className="overflow-hidden">
            <span className="text-xs font-mono font-bold text-white block truncate">
              anuraj-developer-portfolio
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">
              ~/anuraj.dev (git:main)
            </span>
          </div>
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 p-2 overflow-y-auto space-y-0.5 font-mono">
        {FILE_TREE.map((item) => renderTreeItem(item, 0))}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 border-t border-white/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
        <span>Java 21 LTS</span>
        <span className="text-emerald-400 font-bold">● Ready</span>
      </div>
    </aside>
  );
}
