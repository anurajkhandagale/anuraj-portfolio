"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, FileCode, Layers, Award, GraduationCap, Send, QrCode, FileText, ChevronRight } from "lucide-react";
import { soundManager } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

interface SearchItem {
  id: string;
  title: string;
  category: "project" | "skill" | "file" | "action";
  subtitle: string;
  icon: React.ElementType;
}

interface MobileSearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (fileId: string) => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
  onOpenQR: () => void;
  onOpenResume: () => void;
}

export function MobileSearchSheet({
  isOpen,
  onClose,
  onSelectFile,
  onOpenProjects,
  onOpenContact,
  onOpenQR,
  onOpenResume,
}: MobileSearchSheetProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const searchItems: SearchItem[] = [
    { id: "pit-stop-live", title: "PitStopLive.java", category: "project", subtitle: "Garage Finder & Real-Time SOS Booking", icon: Layers },
    { id: "ai-email-generator", title: "AiEmailGenerator.java", category: "project", subtitle: "Spring Boot + LLM Microservice", icon: Layers },
    { id: "student-management", title: "StudentManagementSystem.java", category: "project", subtitle: "Servlets, JSP, JDBC, MySQL", icon: Layers },
    { id: "java-core", title: "Java.java", category: "skill", subtitle: "Core Java 21, Concurrency & Streams", icon: FileCode },
    { id: "spring-boot", title: "SpringBoot.java", category: "skill", subtitle: "Spring Boot 3, REST APIs & Actuator", icon: FileCode },
    { id: "databases", title: "Databases.java", category: "skill", subtitle: "PostgreSQL, MySQL & Connection Pools", icon: FileCode },
    { id: "dsa-core", title: "ComputerScienceCore.java", category: "skill", subtitle: "200+ LeetCode DSA Solutions", icon: FileCode },
    { id: "education-file", title: "Education (SPPU)", category: "file", subtitle: "B.E. Computer Engineering 8.12 CGPA", icon: GraduationCap },
    { id: "resume-pdf", title: "Resume.pdf", category: "action", subtitle: "Preview Google Drive PDF Resume", icon: FileText },
    { id: "contact-action", title: "Contact Anuraj", category: "action", subtitle: "Email, LinkedIn, Instagram", icon: Send },
    { id: "qr-action", title: "Mobile QR Scanner", category: "action", subtitle: "Scan Resume on Phone", icon: QrCode },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  const handleSelect = (item: SearchItem) => {
    soundManager.playClick();
    onClose();

    if (item.id === "resume-pdf") {
      onOpenResume();
    } else if (item.id === "contact-action") {
      onOpenContact();
    } else if (item.id === "qr-action") {
      onOpenQR();
    } else {
      onSelectFile(item.id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Spotlight Sheet */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="relative w-full max-h-[85vh] bg-[#0c101d]/95 border-b border-white/20 p-4 flex flex-col backdrop-blur-3xl shadow-2xl overflow-hidden z-10 space-y-3"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/[0.08] border border-white/20">
              <Search size={16} className="text-[#d4a574] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, resume..."
                className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono focus:ring-0 p-0"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1 rounded-lg bg-white/10 text-[11px] font-mono text-slate-300"
              >
                Cancel
              </button>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto space-y-1 pb-4">
              <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {query ? `Matching Results (${filtered.length})` : "Suggested Destinations"}
              </div>

              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full p-2.5 rounded-xl hover:bg-white/[0.08] active:bg-white/[0.14] flex items-center justify-between text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 shrink-0">
                        <Icon size={15} className="text-[#d4a574]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-xs font-bold text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
