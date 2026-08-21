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
  X,
  Zap,
  Activity,
  MessageSquareShare,
  Headphones,
  StickyNote,
  Palette,
  Terminal,
  Layers,
  Sparkles,
  Command,
  Smile
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

export type CommandCategory = "All" | "Actions" | "Files" | "Projects" | "Skills";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Actions" | "Files" | "Projects" | "Skills";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  action: () => void;
  shortcut?: string;
  badge?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (fileId: string) => void;
  onRunBuild: () => void;
  onOpenContact: () => void;
  onOpenQR?: () => void;
  onOpenResumePreview?: () => void;
  onCycleTheme?: () => void;
  onOpenIDE?: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenFile,
  onRunBuild,
  onOpenContact,
  onOpenQR,
  onOpenResumePreview,
  onCycleTheme,
  onOpenIDE,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CommandCategory>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { profile } = PORTFOLIO_DATA;

  // Handler for Actuator Health Check
  const handleJVMHealthCheck = () => {
    soundManager.playChime();
    showToast(
      "JVM Actuator Health: UP (99.99%)",
      "Java 21 LTS • Heap: 384MB / 2048MB • HikariCP: ACTIVE • Spring Context: OK",
      "success"
    );
    onClose();
  };

  // Handler for WhatsApp Handoff
  const handleWhatsAppHandoff = () => {
    soundManager.playClick();
    const text = encodeURIComponent(
      "Hi Anuraj! I checked out your portfolio and would like to discuss an engineering opportunity."
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    showToast("WhatsApp Handoff", "Opening direct recruiter chat...", "info");
    onClose();
  };

  // Handler for Lo-Fi Soundscape Toggle
  const handleToggleLoFi = () => {
    soundManager.playClick();
    const state = soundManager.getSoundscapeState();
    if (state.isPlaying) {
      soundManager.stopSoundscape();
      showToast("Lo-Fi Soundscape", "Ambience paused", "audio");
    } else {
      soundManager.startSoundscape("lofi");
      showToast("Lo-Fi Soundscape", "Playing Lo-Fi Coding Waves", "audio");
    }
    onClose();
  };

  // Handler for Sticky Note creation
  const handleCreateStickyNote = () => {
    soundManager.playChime();
    try {
      const saved = localStorage.getItem("anuraj_desktop_sticky_notes");
      const existing = saved ? JSON.parse(saved) : [];
      const newNote = {
        id: `custom-${Date.now()}`,
        category: "Quick Memo",
        pinColor: "bg-amber-400 border-amber-500 text-amber-950",
        tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
        quote: "Write recruiter notes, interview feedback, or quick ideas here...",
        author: "— Visitor Note",
        defaultPosition: { x: 0, y: existing.length * 15 },
        defaultRotation: (Math.random() - 0.5) * 4,
      };
      localStorage.setItem("anuraj_desktop_sticky_notes", JSON.stringify([newNote, ...existing]));
      window.dispatchEvent(new Event("storage"));
    } catch {}
    showToast("Sticky Note Created", "A new note was pinned to your desktop", "success");
    onClose();
  };

  const allItems: CommandItem[] = [
    // --- 1. SUPERCHARGED INSTANT ACTIONS ---
    {
      id: "resume-pdf-download",
      title: "Download Verified Resume PDF (Google Drive)",
      subtitle: "ATS-optimized Computer Engineering Resume",
      category: "Actions",
      icon: Download,
      iconColor: "text-amber-400",
      action: () => {
        soundManager.playClick();
        window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
        showToast("Resume Download", "Opening verified Google Drive PDF resume...", "success");
        onClose();
      },
      shortcut: "⌘D",
      badge: "Verified PDF",
    },
    {
      id: "jvm-actuator-check",
      title: "Run JVM Actuator Health Check",
      subtitle: "Query live Spring Boot actuator telemetry & memory metrics",
      category: "Actions",
      icon: Activity,
      iconColor: "text-emerald-400",
      action: handleJVMHealthCheck,
      shortcut: "⌘H",
      badge: "Actuator UP",
    },
    {
      id: "whatsapp-direct",
      title: "Open WhatsApp Direct Recruiter Handoff",
      subtitle: "Instant pre-filled message dispatch for job opportunities",
      category: "Actions",
      icon: MessageSquareShare,
      iconColor: "text-emerald-400",
      action: handleWhatsAppHandoff,
      shortcut: "⌘W",
      badge: "Fastest",
    },
    {
      id: "toggle-lofi-soundscape",
      title: "Toggle Lo-Fi Ambient Soundscape",
      subtitle: "Real-time synthesized calming coding audio chords",
      category: "Actions",
      icon: Headphones,
      iconColor: "text-[#d4a574]",
      action: handleToggleLoFi,
      shortcut: "⌘L",
      badge: "Web Audio",
    },
    {
      id: "new-sticky-note",
      title: "Create New Desktop Sticky Note",
      subtitle: "Pin a writable frosted glass note on your desktop",
      category: "Actions",
      icon: StickyNote,
      iconColor: "text-yellow-400",
      action: handleCreateStickyNote,
      shortcut: "⌘N",
      badge: "Writable",
    },
    {
      id: "run-app-build",
      title: "Run AnurajApplication.java (▶ Spring Boot Run)",
      subtitle: "Execute build & test suites in simulated console",
      category: "Actions",
      icon: Play,
      iconColor: "text-emerald-400",
      action: () => {
        soundManager.playChime();
        onRunBuild();
        onClose();
      },
      shortcut: "Shift+F10",
      badge: "Maven Build",
    },
    {
      id: "cycle-theme",
      title: "Cycle Ambient Color Theme",
      subtitle: "Switch between Obsidian Crimson, Emerald Green & Darcula Gold",
      category: "Actions",
      icon: Palette,
      iconColor: "text-purple-400",
      action: () => {
        if (onCycleTheme) onCycleTheme();
        onClose();
      },
      shortcut: "⌘T",
      badge: "Theme",
    },
    {
      id: "qr-action",
      title: "Scan Resume QR Code & Mobile Handoff",
      subtitle: "AirDrop & camera scanner for phone document access",
      category: "Actions",
      icon: QrCode,
      iconColor: "text-[#d4a574]",
      action: () => {
        if (onOpenQR) onOpenQR();
        onClose();
      },
      shortcut: "⌘Q",
      badge: "Mobile Sync",
    },
    {
      id: "contact-action",
      title: "Get in Touch / Contact Anuraj",
      subtitle: "Direct message terminal with response guarantees",
      category: "Actions",
      icon: Mail,
      iconColor: "text-rose-400",
      action: () => {
        onOpenContact();
        onClose();
      },
      shortcut: "⌘M",
      badge: "Online",
    },
    {
      id: "summon-bill-easter-egg",
      title: "Secret result discovered 👀 (Summon Bill Assistant)",
      subtitle: "bill clippy - Classic Microsoft Office Assistant 97 Nostalgic Easter Egg",
      category: "Actions",
      icon: Smile,
      iconColor: "text-amber-400",
      action: () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("summon-bill"));
        }
        onClose();
      },
      shortcut: "Ctrl+Shift+B",
      badge: "Easter Egg 🐣",
    },

    // --- 2. PROJECTS ---
    {
      id: "pit-stop-live",
      title: "PitStopLive.java (Real-time Spatial Fleet Telemetry)",
      subtitle: "Java 21 • Spring Boot • PostGIS • WebSockets",
      category: "Projects",
      icon: Coffee,
      iconColor: "text-[#d4a574]",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("pit-stop-live");
        onClose();
      },
      badge: "Featured",
    },
    {
      id: "ai-email-generator",
      title: "AiEmailGenerator.java (Spring WebClient & LLM APIs)",
      subtitle: "Asynchronous REST service • Non-blocking WebClient",
      category: "Projects",
      icon: Coffee,
      iconColor: "text-[#d4a574]",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("ai-email-generator");
        onClose();
      },
      badge: "Spring Boot",
    },
    {
      id: "student-management-system",
      title: "StudentManagementSystem.java (MVC + ACID JDBC Pool)",
      subtitle: "HikariCP • MySQL • Transactional Integrity",
      category: "Projects",
      icon: Coffee,
      iconColor: "text-[#d4a574]",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("student-management-system");
        onClose();
      },
      badge: "Core Architecture",
    },

    // --- 3. SKILLS & ARCHITECTURES ---
    {
      id: "java-core",
      title: "Java.java (Core Java 21, Concurrency & Streams)",
      subtitle: "Virtual Threads, Pattern Matching, Generics, Memory",
      category: "Skills",
      icon: Cpu,
      iconColor: "text-sky-400",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("java-core");
        onClose();
      },
      badge: "Java 21",
    },
    {
      id: "spring-boot",
      title: "SpringBoot.java (Spring Boot 3.3, REST, JPA, Security)",
      subtitle: "Microservices architecture, Bean lifecycles, JWT",
      category: "Skills",
      icon: Cpu,
      iconColor: "text-emerald-400",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("spring-boot");
        onClose();
      },
      badge: "Spring 3.3",
    },
    {
      id: "databases",
      title: "DatabaseEngineering.java (PostgreSQL, MySQL, Indexing)",
      subtitle: "B-Tree indexing, EXPLAIN ANALYZE, Connection pooling",
      category: "Skills",
      icon: Cpu,
      iconColor: "text-amber-400",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("databases");
        onClose();
      },
      badge: "SQL & DB",
    },
    {
      id: "cs-core",
      title: "ComputerScienceCore.java (200+ DSA, System Design)",
      subtitle: "Data structures, algorithms, concurrency, OS primitives",
      category: "Skills",
      icon: Cpu,
      iconColor: "text-purple-400",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("cs-core");
        onClose();
      },
      badge: "200+ Solved",
    },

    // --- 4. FILES & CREDENTIALS ---
    {
      id: "readme",
      title: "README.md (Developer Profile & Engineering Philosophy)",
      subtitle: "Savitribai Phule Pune University (SPPU) Computer Engineering",
      category: "Files",
      icon: FileText,
      iconColor: "text-slate-300",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("readme");
        onClose();
      },
      badge: "Profile",
    },
    {
      id: "education-file",
      title: "SavitribaiPhulePuneUniv.java (SPPU B.E. CGPA 8.12)",
      subtitle: "Bachelor of Engineering in Computer Engineering",
      category: "Files",
      icon: GraduationCap,
      iconColor: "text-yellow-400",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("education-file");
        onClose();
      },
      badge: "CGPA 8.12",
    },
    {
      id: "achievements-file",
      title: "Achievements.java (Competitions & Milestones)",
      subtitle: "Smart India Hackathon, Algorithm rankings & builds",
      category: "Files",
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("achievements-file");
        onClose();
      },
      badge: "Honors",
    },
    {
      id: "pom",
      title: "pom.xml (Maven Dependency Build Descriptor)",
      subtitle: "Spring Boot Starter, WebClient, PostGIS & Lombok",
      category: "Files",
      icon: FileCode2,
      iconColor: "text-rose-400",
      action: () => {
        if (onOpenIDE) onOpenIDE();
        onOpenFile("pom");
        onClose();
      },
      badge: "Maven",
    },
  ];

  // Filtering
  const filteredItems = allItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      query.trim() === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery("");
      setSelectedCategory("All");
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const categories: CommandCategory[] = ["All", "Actions", "Projects", "Skills", "Files"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Supercharged Spotlight Palette Box (Apple 520px Sleek Size) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -15 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="relative w-full max-w-[520px] rounded-3xl apple-modal-glass overflow-hidden shadow-2xl z-10 select-none border border-white/20"
          >
            {/* Input Search Header */}
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#d4a574]/20 text-[#d4a574] shrink-0">
                <Search size={18} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, file, or action (e.g. 'resume', 'health', 'whatsapp', 'lofi')..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm sm:text-base font-sans placeholder:text-slate-500 focus:ring-0 p-0"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/15 text-[10px] font-mono text-slate-300">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="px-4 py-2 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#d4a574] text-slate-950 shadow-md shadow-[#d4a574]/20"
                        : "bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 font-mono custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="p-10 text-center space-y-2">
                  <p className="text-sm font-sans text-slate-300 font-bold">No results found for &quot;{query}&quot;</p>
                  <p className="text-xs text-slate-500 font-mono">Try searching for &apos;resume&apos;, &apos;health&apos;, &apos;java&apos;, or &apos;lofi&apos;</p>
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
                      className={`px-3.5 py-2.5 rounded-2xl flex items-center justify-between text-xs cursor-pointer transition-all ${
                        isSelected
                          ? "bg-white/15 border border-white/25 text-white shadow-lg backdrop-blur-md"
                          : "text-slate-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`p-2 rounded-xl bg-white/10 shrink-0 ${item.iconColor}`}>
                          <IconComp size={16} />
                        </div>
                        <div className="space-y-0.5 truncate">
                          <div className="font-sans font-bold text-white text-xs sm:text-sm flex items-center gap-2 truncate">
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-white/10 border border-white/10 text-[9px] font-mono text-slate-300 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-slate-400 font-sans truncate">{item.subtitle}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 shrink-0 pl-2">
                        {item.shortcut && (
                          <kbd className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-slate-300 font-mono">
                            {item.shortcut}
                          </kbd>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-black/40 text-slate-400 border border-white/5">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation & Search Telemetry */}
            <div className="px-5 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">↵</kbd>
                  <span>Execute</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">ESC</kbd>
                  <span>Close</span>
                </span>
              </div>
              <span className="text-[#d4a574] font-bold flex items-center gap-1">
                <Command size={12} />
                <span>Spotlight ⌘K</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
