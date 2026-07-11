"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Globe, Moon, Sun, ArrowUp, ArrowDown, CornerDownLeft, Eye, Download, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  category: string;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, setTheme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to scroll to sections
  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const commands: CommandItem[] = [
    {
      icon: Eye,
      label: "Jump to Home",
      category: "Navigation",
      action: () => scrollToSection("home"),
    },
    {
      icon: Eye,
      label: "Jump to About",
      category: "Navigation",
      action: () => scrollToSection("about"),
    },
    {
      icon: Eye,
      label: "Jump to Skills",
      category: "Navigation",
      action: () => scrollToSection("skills"),
    },
    {
      icon: Eye,
      label: "Jump to Projects",
      category: "Navigation",
      action: () => scrollToSection("projects"),
    },
    {
      icon: Eye,
      label: "Jump to Education",
      category: "Navigation",
      action: () => scrollToSection("education"),
    },
    {
      icon: Eye,
      label: "Jump to Contact",
      category: "Navigation",
      action: () => scrollToSection("contact"),
    },
    {
      icon: Download,
      label: "Download Resume",
      category: "Actions",
      action: () => {
        setIsOpen(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("recruiter-action", { detail: "resume" }));
        }
        window.open("https://drive.google.com/file/d/1bP35kJgJ5DAh4lbd8rfJPuJYUyc_gFS3/view?usp=drive_link", "_blank");
      },
    },
    {
      icon: theme === "dark" ? Sun : Moon,
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      category: "Actions",
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setIsOpen(false);
      },
    },
    {
      icon: Globe,
      label: "Open LinkedIn Profile",
      category: "External Links",
      action: () => {
        setIsOpen(false);
        window.open("https://linkedin.com/in/anuraj-khandagale-10020732b", "_blank");
      },
    },
    {
      icon: Globe,
      label: "Open GitHub Profile",
      category: "External Links",
      action: () => {
        setIsOpen(false);
        window.open("https://github.com/anurajkhandagale", "_blank");
      },
    },
  ];

  // Listen for keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050505]/75 backdrop-blur-sm z-0"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#101010]/80 shadow-2xl backdrop-blur-md overflow-hidden z-10 flex flex-col focus:outline-none"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={18} className="text-[#a0a0a0]" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-white placeholder-[#555] outline-none border-none font-sans"
              />
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] font-mono text-[#a0a0a0] uppercase select-none">
                  esc
                </kbd>
              </div>
            </div>

            {/* Suggestions list */}
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length > 0 ? (
                // Group by category
                (() => {
                  let currentCategory = "";
                  return filteredCommands.map((cmd, idx) => {
                    const showCategory = cmd.category !== currentCategory;
                    currentCategory = cmd.category;
                    const IconComp = cmd.icon;
                    const isSelected = idx === selectedIndex;

                    return (
                      <React.Fragment key={idx}>
                        {showCategory && (
                          <div className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest text-[#555] uppercase select-none">
                            {cmd.category}
                          </div>
                        )}
                        <button
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between text-xs transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white/10 text-white border border-white/10"
                              : "text-[#a0a0a0] hover:text-white border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComp size={14} className={isSelected ? "text-[#d4a574]" : "text-[#a0a0a0]"} />
                            <span className="font-semibold">{cmd.label}</span>
                          </div>
                          
                          {isSelected && (
                            <div className="flex items-center gap-0.5 text-[9px] text-[#555]">
                              <CornerDownLeft size={10} />
                              <span className="font-mono">enter</span>
                            </div>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  });
                })()
              ) : (
                <div className="text-center py-8 text-[#555] text-xs font-mono select-none flex flex-col items-center gap-1.5">
                  <Sparkles size={20} className="text-[#555]" />
                  No commands match your query.
                </div>
              )}
            </div>

            {/* Dock Shortcuts Footnote */}
            <div className="px-4 py-3 border-t border-white/10 bg-[#050505]/40 flex items-center justify-between text-[9px] font-mono text-[#555] select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ArrowUp size={10} />
                  <ArrowDown size={10} /> navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={10} /> select
                </span>
              </div>
              <span>Shortcut: Ctrl + K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
