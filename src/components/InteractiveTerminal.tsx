"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft } from "lucide-react";

interface TerminalHistoryItem {
  command: string;
  output: React.ReactNode;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      command: "system-init",
      output: (
        <div className="space-y-1">
          <p className="text-emerald-400 font-semibold">⚡ Anuraj Portfolio OS v1.2.0 loaded successfully.</p>
          <p className="text-slate-400">Type <span className="text-indigo-400 font-medium">help</span> or click one of the quick command pills below to start.</p>
        </div>
      ),
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("recruiter-action", { detail: "terminal" }));
    }
  };

  // Commands mapping
  const runCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let response: React.ReactNode;

    switch (trimmed) {
      case "help":
        response = (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300 max-w-md">
            <div><span className="text-indigo-400 font-bold">skills</span></div>
            <div>List technical core competencies</div>
            <div><span className="text-indigo-400 font-bold">projects</span></div>
            <div>Review featured engineering projects</div>
            <div><span className="text-indigo-400 font-bold">stats</span></div>
            <div>Show key professional metrics</div>
            <div><span className="text-indigo-400 font-bold">education</span></div>
            <div>Display academic history</div>
            <div><span className="text-indigo-400 font-bold">contact</span></div>
            <div>Print contact details</div>
            <div><span className="text-indigo-400 font-bold">clear</span></div>
            <div>Clear console screen buffer</div>
          </div>
        );
        break;
      case "skills":
        response = (
          <div className="space-y-2 text-slate-300">
            <p className="text-emerald-400 font-semibold">--- Core Skill Stack ---</p>
            <div>
              <p><span className="text-indigo-400 font-bold">Languages:</span> Java, C, JavaScript, HTML5, CSS3</p>
              <p><span className="text-indigo-400 font-bold">Backend:</span> Spring Boot, Servlets, JSP, JDBC, RESTful APIs</p>
              <p><span className="text-indigo-400 font-bold">Databases:</span> MySQL, PostgreSQL, Oracle SQL</p>
              <p><span className="text-indigo-400 font-bold">Tools/CS:</span> Git, GitHub, IntelliJ IDEA, DSA, OOP, DBMS, OS, System Design</p>
            </div>
          </div>
        );
        break;
      case "projects":
        response = (
          <div className="space-y-3 text-slate-300">
            <p className="text-emerald-400 font-semibold">--- Featured Projects ---</p>
            <div className="space-y-2">
              <div>
                <p className="text-indigo-400 font-semibold">1. AI Email Response Generator (Java, Spring Boot, LLM APIs)</p>
                <p className="text-slate-400 text-sm">Reduced manual response time by 60%, improved latency by 30%.</p>
              </div>
              <div>
                <p className="text-indigo-400 font-semibold">2. Pit Stop Live (Next.js, TS, PostgreSQL, Drizzle ORM)</p>
                <p className="text-slate-400 text-sm">Location discovery under 2s with SOS tracking and NextAuth security.</p>
              </div>
              <div>
                <p className="text-indigo-400 font-semibold">3. Student Management System (Java, Servlets, JSP, JDBC, MySQL)</p>
                <p className="text-slate-400 text-sm">MVC architecture managing 500+ records, optimized query speeds by 40%.</p>
              </div>
            </div>
          </div>
        );
        break;
      case "stats":
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-semibold">--- Technical Key Metrics ---</p>
            <p><span className="text-indigo-400 font-bold">Academic GPA:</span> 8.05 / 10.00 (Computer Engineering)</p>
            <p><span className="text-indigo-400 font-bold">DSA Problems:</span> 200+ Solved (Daily active coding)</p>
            <p><span className="text-indigo-400 font-bold">API Latency Optimization:</span> -30% achieved in AI response systems</p>
          </div>
        );
        break;
      case "education":
        response = (
          <div className="space-y-2 text-slate-300">
            <p className="text-emerald-400 font-semibold">--- Academic Timeline ---</p>
            <div>
              <p className="font-semibold text-indigo-400">Bachelor of Engineering - Computer Engineering (2022 - Present)</p>
              <p className="text-sm text-slate-400">Savitribai Phule Pune University (SPPU) | CGPA: 8.05</p>
            </div>
            <div>
              <p className="font-semibold text-indigo-400">Higher Secondary - 12th MSBSHSC</p>
              <p className="text-sm text-slate-400">Score: 88.67%</p>
            </div>
            <div>
              <p className="font-semibold text-indigo-400">Secondary - 10th CBSE</p>
              <p className="text-sm text-slate-400">Score: 72.60%</p>
            </div>
          </div>
        );
        break;
      case "contact":
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-semibold">--- Contact Details ---</p>
            <p><span className="text-indigo-400 font-bold">Name:</span> Anuraj Laxman Khandagale</p>
            <p><span className="text-indigo-400 font-bold">Email:</span> anurajkhandagale52a@gmail.com</p>
            <p><span className="text-indigo-400 font-bold">Phone:</span> Request via Email / Contact Form</p>
            <p><span className="text-indigo-400 font-bold">GitHub:</span> github.com/anurajkhandagale</p>
            <p><span className="text-indigo-400 font-bold">LinkedIn:</span> linkedin.com/in/anuraj-khandagale-10020732</p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = (
          <p className="text-rose-400 font-medium">
            Error: command not found: &apos;{trimmed}&apos;. Type &apos;help&apos; for list of commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
    }
  };

  const quickCommands = ["help", "skills", "projects", "stats", "contact"];

  return (
    <div 
      className="w-full max-w-3xl mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1224]/85 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300"
      onClick={focusInput}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
          <Terminal size={12} className="text-slate-400" />
          <span>anuraj@portfolio-os:~</span>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Terminal Output Body */}
      <div 
        ref={containerRef}
        className="p-6 h-80 overflow-y-auto font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300 select-text"
      >
        {history.map((item, idx) => (
          <div key={idx} className="mb-4">
            {item.command !== "system-init" && (
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-emerald-500 font-bold">anuraj@portfolio:~$</span>
                <span className="text-white dark:text-slate-100 font-semibold">{item.command}</span>
              </div>
            )}
            <div className="pl-4 border-l border-slate-200 dark:border-slate-800/80">
              {item.output}
            </div>
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-emerald-500 font-bold">anuraj@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 font-mono focus:ring-0 focus:outline-none p-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="Type a command..."
          />
          <CornerDownLeft size={14} className="text-slate-400 animate-pulse" />
        </div>
      </div>

      {/* Terminal Quick Actions Footer */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-[#070b17]/50 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium mr-1">Quick Command:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={(e) => {
              e.stopPropagation();
              runCommand(cmd);
            }}
            className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 transition-all border border-slate-300/40 dark:border-slate-700/60 active:scale-95 cursor-pointer"
          >
            {cmd}
          </button>
        ))}
        <button
          onClick={(e) => {
            e.stopPropagation();
            runCommand("clear");
          }}
          className="px-2.5 py-1 rounded bg-rose-50/50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 transition-all border border-rose-200/40 dark:border-rose-950/60 ml-auto active:scale-95 cursor-pointer"
        >
          clear
        </button>
      </div>
    </div>
  );
}
