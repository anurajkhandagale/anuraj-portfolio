"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  FileCode2, 
  FileText, 
  Coffee, 
  Play, 
  Download, 
  Mail, 
  QrCode,
  ExternalLink, 
  GraduationCap, 
  Cpu, 
  CheckCircle2,
  X
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  title: string;
  category: "Files" | "Actions" | "Skills" | "Projects";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (fileId: string) => void;
  onRunBuild: () => void;
  onOpenContact: () => void;
  onOpenQR?: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenFile,
  onRunBuild,
  onOpenContact,
  onOpenQR,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { profile, projects, skills } = PORTFOLIO_DATA;

  const items: CommandItem[] = [
    {
      id: "readme",
      title: "README.md - Developer Profile Summary",
      category: "Files",
      icon: FileText,
      action: () => { onOpenFile("readme"); onClose(); }
    },
    {
      id: "run-app",
      title: "Run AnurajApplication.java (▶ Run Build)",
      category: "Actions",
      icon: Play,
      action: () => { onRunBuild(); onClose(); },
      shortcut: "Shift+F10"
    },
    {
      id: "qr-action",
      title: "Scan Resume QR Code (Mobile Document Access)",
      category: "Actions",
      icon: QrCode,
      action: () => { if (onOpenQR) onOpenQR(); onClose(); }
    },
    {
      id: "ai-email-generator",
      title: "AiEmailGenerator.java (Spring WebClient + LLM API)",
      category: "Projects",
      icon: Coffee,
      action: () => { onOpenFile("ai-email-generator"); onClose(); }
    },
    {
      id: "pit-stop-live",
      title: "PitStopLive.java (PostGIS Spatial Queries)",
      category: "Projects",
      icon: Coffee,
      action: () => { onOpenFile("pit-stop-live"); onClose(); }
    },
    {
      id: "student-management-system",
      title: "StudentManagementSystem.java (MVC + JDBC ACID Pool)",
      category: "Projects",
      icon: Coffee,
      action: () => { onOpenFile("student-management-system"); onClose(); }
    },
    {
      id: "java-core",
      title: "Java.java (Core Java, OOP, Collections, Concurrency)",
      category: "Skills",
      icon: Cpu,
      action: () => { onOpenFile("java-core"); onClose(); }
    },
    {
      id: "spring-boot",
      title: "SpringBoot.java (Spring Boot 3.3, REST APIs, JPA)",
      category: "Skills",
      icon: Cpu,
      action: () => { onOpenFile("spring-boot"); onClose(); }
    },
    {
      id: "databases",
      title: "DatabaseEngineering.java (PostgreSQL, MySQL, Indexing)",
      category: "Skills",
      icon: Cpu,
      action: () => { onOpenFile("databases"); onClose(); }
    },
    {
      id: "cs-core",
      title: "ComputerScienceCore.java (200+ DSA, System Design)",
      category: "Skills",
      icon: Cpu,
      action: () => { onOpenFile("cs-core"); onClose(); }
    },
    {
      id: "education-file",
      title: "SavitribaiPhulePuneUniv.java (SPPU B.E. CGPA 8.12)",
      category: "Files",
      icon: GraduationCap,
      action: () => { onOpenFile("education-file"); onClose(); }
    },
    {
      id: "achievements-file",
      title: "Achievements.java (DSA & Engineering Impact)",
      category: "Files",
      icon: CheckCircle2,
      action: () => { onOpenFile("achievements-file"); onClose(); }
    },
    {
      id: "roadmap-file",
      title: "ActiveRoadmap.java (Distributed Systems & Orbits)",
      category: "Files",
      icon: Cpu,
      action: () => { onOpenFile("roadmap-file"); onClose(); }
    },
    {
      id: "pom",
      title: "pom.xml (Maven Dependency Descriptor)",
      category: "Files",
      icon: FileCode2,
      action: () => { onOpenFile("pom"); onClose(); }
    },
    {
      id: "resume-action",
      title: "Download Resume (PDF ATS Document)",
      category: "Actions",
      icon: Download,
      action: () => { window.open(profile.resumeUrl, "_blank"); onClose(); }
    },
    {
      id: "contact-action",
      title: "Contact Anuraj (Dispatch Direct Message)",
      category: "Actions",
      icon: Mail,
      action: () => { onOpenContact(); onClose(); }
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-2xl apple-modal-glass overflow-hidden shadow-2xl z-10 select-none"
          >
            {/* Input Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
              <Search size={16} className="text-[#d4a574]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search files, actions, skills, projects (Type 'run', 'qr', 'java')..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-sans placeholder:text-slate-500 focus:ring-0 p-0"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No matching files or actions found for &quot;{query}&quot;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const IconComp = item.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`px-3 py-2 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#d4a574]/20 border border-[#d4a574]/30 text-white"
                          : "text-slate-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <IconComp size={14} className={isSelected ? "text-[#d4a574]" : "text-slate-400"} />
                        <span className="truncate">{item.title}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 shrink-0">
                        {item.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                            {item.shortcut}
                          </kbd>
                        )}
                        <span className="px-1.5 py-0.5 rounded bg-black/40 text-slate-400">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
              </div>
              <span className="text-[#d4a574] font-bold">ANURAJ.DEV Search Everywhere</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
