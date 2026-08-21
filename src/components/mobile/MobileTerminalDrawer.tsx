"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, CornerDownLeft, Trash2, Sparkles, Coffee } from "lucide-react";
import { soundManager } from "@/utils/audio";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

interface MobileTerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRunBuild: () => void;
  onOpenContact: () => void;
  onOpenQR: () => void;
}

interface HistoryItem {
  cmd: string;
  res: React.ReactNode;
}

export function MobileTerminalDrawer({
  isOpen,
  onClose,
  onRunBuild,
  onOpenContact,
  onOpenQR,
}: MobileTerminalDrawerProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      cmd: "mvn --version",
      res: (
        <div className="space-y-1">
          <p className="text-emerald-400 font-semibold">Apache Maven 3.9.6 | Java 21 LTS | SPPU B.E. 2024</p>
          <p className="text-slate-400">
            Welcome to <span className="text-[#d4a574] font-bold">ANURAJ.DEV Mobile Shell</span>. Tap any quick button below or type a command.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (commandText: string) => {
    const trimmed = commandText.trim().toLowerCase();
    if (!trimmed) return;

    soundManager.playClick();

    let output: React.ReactNode;

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p><span className="text-[#d4a574] font-bold">whoami</span> — Profile summary</p>
            <p><span className="text-[#d4a574] font-bold">skills</span> — Technical skills</p>
            <p><span className="text-[#d4a574] font-bold">projects</span> — Featured projects</p>
            <p><span className="text-[#d4a574] font-bold">education</span> — SPPU 8.12 CGPA</p>
            <p><span className="text-[#d4a574] font-bold">coffee</span> — Brew Java 21 LTS</p>
            <p><span className="text-[#d4a574] font-bold">sudo hire anuraj</span> — Authorize offer letter</p>
            <p><span className="text-[#d4a574] font-bold">qr</span> — Open QR scanner</p>
            <p><span className="text-[#d4a574] font-bold">clear</span> — Clear terminal</p>
          </div>
        );
        break;

      case "coffee":
        soundManager.playChime();
        output = (
          <div className="p-2 rounded-xl bg-white/[0.03] border border-[#d4a574]/20 space-y-1 font-mono text-xs text-[#d4a574]">
            <pre className="text-amber-300 text-[10px] leading-none">
{`   (  )   (   )  )
    ) (   )  (  (
  (____)____)___)
  |  Java 21    |]
  |  LTS Blend  |
  \\_____________/`}
            </pre>
            <p className="text-emerald-400 font-bold">
              ✓ Fresh cup of Java 21 brewed. Zero latency!
            </p>
          </div>
        );
        break;

      case "sudo hire anuraj":
      case "hire anuraj":
        soundManager.playChime();
        showToast("Offer Letter Authorized", "Candidate approved for SDE / Backend role", "success");
        output = (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 space-y-1">
            <p className="font-bold text-white">[ROOT AUTHORIZATION GRANTED]</p>
            <p className="text-slate-200">Candidate: Anuraj Laxman Khandagale</p>
            <p className="text-emerald-300 font-bold">Offer Letter Drafted • Available Immediately</p>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-white font-bold">Anuraj Laxman Khandagale</p>
            <p className="text-[#d4a574]">Java Backend Developer • Software Engineer</p>
            <p className="text-slate-400">Graduate: SPPU | CGPA: 8.12 / 10.00</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-emerald-400 font-bold">--- Technical Core ---</p>
            <p><span className="text-[#d4a574]">Languages:</span> Java 17/21, C, JS, SQL</p>
            <p><span className="text-[#d4a574]">Backend:</span> Spring Boot, Servlets, JSP, JDBC, REST APIs</p>
            <p><span className="text-[#d4a574]">Databases:</span> PostgreSQL, MySQL, Oracle SQL</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-[#d4a574] font-bold">1. AI Email Response Generator</p>
            <p className="text-slate-400 text-[11px]">Java, Spring Boot, LLM APIs (60% time saved)</p>
            <p className="text-[#d4a574] font-bold">2. Pit Stop Live – Garage Finder</p>
            <p className="text-slate-400 text-[11px]">Next.js, TS, PostgreSQL, Drizzle (99.9% uptime)</p>
          </div>
        );
        break;

      case "qr":
        onOpenQR();
        output = <p className="text-emerald-400 text-xs font-mono">✓ Opened Resume QR scanner.</p>;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs font-mono">
            command not found: {trimmed}. Type &apos;help&apos;.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd: commandText, res: output }]);
    setInput("");
  };

  const quickPills = ["whoami", "coffee", "sudo hire anuraj", "skills", "projects", "qr", "help"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Full-Height Glass Terminal Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative w-full h-[90vh] bg-[#070a12]/95 border-t border-white/20 rounded-t-[26px] flex flex-col backdrop-blur-3xl shadow-2xl overflow-hidden z-10 font-mono select-text"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-white/[0.04] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <TerminalIcon size={16} className="text-emerald-400" />
                <span className="text-xs font-bold text-white tracking-wider">
                  ANURAJ.DEV SHELL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={12} />
                  <span>Clear</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Output Log */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs leading-relaxed">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-emerald-400 font-bold">anuraj@mobile:~$</span>
                    <span className="text-white font-semibold">{item.cmd}</span>
                  </div>
                  <div className="pl-3 border-l border-white/10">{item.res}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input & Quick Pills Footer */}
            <div className="p-2.5 bg-black/60 border-t border-white/10 space-y-2 shrink-0">
              {/* Quick Pills */}
              <div className="flex flex-wrap items-center gap-1 text-[10px]">
                {quickPills.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => handleCommand(pill)}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer border ${
                      pill.includes("sudo")
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold"
                        : pill === "coffee"
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/5"
                    }`}
                  >
                    {pill === "coffee" ? "☕ coffee" : pill}
                  </button>
                ))}
              </div>

              {/* Command Input */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15">
                <span className="text-emerald-400 font-bold text-xs">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCommand(input);
                  }}
                  placeholder="Type command..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono focus:ring-0 p-0"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <button
                  type="button"
                  onClick={() => handleCommand(input)}
                  className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold"
                >
                  <CornerDownLeft size={13} />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
