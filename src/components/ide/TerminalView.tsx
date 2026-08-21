"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, QrCode, Coffee, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";

interface TerminalHistoryItem {
  command: string;
  output: React.ReactNode;
}

interface TerminalViewProps {
  onOpenFile?: (fileId: string) => void;
  onRunBuild?: () => void;
  onOpenContact?: () => void;
  onOpenQR?: () => void;
}

export function TerminalView({ onOpenFile, onRunBuild, onOpenContact, onOpenQR }: TerminalViewProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      command: "mvn --version",
      output: (
        <div className="space-y-1">
          <p className="text-emerald-400 font-semibold">Apache Maven 3.9.6 | Java 21 LTS | SPPU B.E. 2024</p>
          <p className="text-slate-400">
            Welcome to <span className="text-[#d4a574] font-bold">ANURAJ.DEV CLI Console</span>. Type <span className="text-sky-400 font-medium">help</span> to view commands, <span className="text-[#d4a574] font-medium">coffee</span> for Java, or <span className="text-emerald-400 font-medium">sudo hire anuraj</span>.
          </p>
        </div>
      ),
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    soundManager.playClick();

    let response: React.ReactNode;

    switch (trimmed) {
      case "help":
        response = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300 text-xs font-mono max-w-xl">
            <div><span className="text-[#d4a574] font-bold">whoami</span></div>
            <div>Print developer profile summary</div>
            <div><span className="text-[#d4a574] font-bold">skills</span></div>
            <div>List technical core competencies</div>
            <div><span className="text-[#d4a574] font-bold">projects</span></div>
            <div>Review featured engineering projects</div>
            <div><span className="text-[#d4a574] font-bold">education</span></div>
            <div>Display SPPU degree & 8.12 CGPA</div>
            <div><span className="text-[#d4a574] font-bold">qr</span></div>
            <div>Open mobile resume QR scanner</div>
            <div><span className="text-[#d4a574] font-bold">run</span></div>
            <div>Execute Spring Boot application</div>
            <div><span className="text-[#d4a574] font-bold">coffee</span></div>
            <div>☕ Brew fresh Java 21 LTS espresso</div>
            <div><span className="text-[#d4a574] font-bold">matrix</span></div>
            <div>Enter digital matrix cyber stream</div>
            <div><span className="text-[#d4a574] font-bold">sudo hire anuraj</span></div>
            <div>Draft engineering offer letter</div>
            <div><span className="text-[#d4a574] font-bold">contact</span></div>
            <div>Show direct contact channels</div>
            <div><span className="text-[#d4a574] font-bold">clear</span></div>
            <div>Clear terminal buffer</div>
          </div>
        );
        break;

      case "coffee":
        soundManager.playChime();
        response = (
          <div className="space-y-2 text-xs font-mono text-[#d4a574] p-2 rounded-xl bg-white/[0.02] border border-[#d4a574]/20 max-w-sm">
            <pre className="text-amber-300 leading-none">
{`   (  )   (   )  )
    ) (   )  (  (
  (____)____)___)
  |  Java 21    |]
  |  LTS Blend  |
  \\_____________/
   \\___________/`}
            </pre>
            <p className="text-emerald-400 font-bold">
              ✓ Fresh cup of Java 21 brewed. High performance & zero GC latency!
            </p>
          </div>
        );
        break;

      case "matrix":
        response = (
          <div className="text-xs font-mono text-emerald-400 space-y-1 p-2 bg-black/40 rounded-xl border border-emerald-500/20 max-w-md">
            <p className="text-white font-bold animate-pulse">&gt; Wake up, Neo... Follow the white rabbit.</p>
            <p className="text-emerald-300 text-[11px] break-all leading-tight">
              01001010 01100001 01110110 01100001 00100000 00110010 00110001 00100000 01010011 01110000 01110010 01101001 01101110 01100111 00100000 01000010 01101111 01101111 01110100
            </p>
            <p className="text-slate-400 text-[10px]">
              Decoded: &quot;Java 21 Spring Boot Backend Architecture&quot;
            </p>
          </div>
        );
        break;

      case "bill":
      case "summon bill":
      case "sudo summon bill":
      case "clippy":
        soundManager.playChime();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("summon-bill"));
        }
        response = (
          <div className="space-y-1.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 max-w-md shadow-lg">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span>👀 [SUMMONING BILL — ASSISTANT 97]</span>
            </div>
            <p className="text-slate-200">
              &quot;It looks like you&apos;re exploring the terminal! Bill has entered the room.&quot;
            </p>
            <p className="text-[10px] text-slate-400">
              Shortcut: <kbd className="px-1.5 py-0.2 rounded bg-white/10 text-white">Ctrl + Shift + B</kbd>
            </p>
          </div>
        );
        break;

      case "sudo hire anuraj":
      case "hire anuraj":
      case "sudo hire":
        soundManager.playChime();
        showToast("Offer Letter Authorized", "Anuraj Khandagale has been approved for SDE / Backend role", "success");
        response = (
          <div className="space-y-1.5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 max-w-md shadow-lg">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>[ROOT AUTHORIZATION GRANTED]</span>
            </div>
            <p className="text-slate-200">
              Candidate: <span className="text-white font-bold">Anuraj Laxman Khandagale</span>
            </p>
            <p className="text-slate-300">
              Status: <span className="text-emerald-400 font-bold">Offer Letter Drafted • Available Immediately</span>
            </p>
            <p className="text-slate-400 text-[11px]">
              Ready to build scalable distributed systems, Spring Boot microservices, and high-throughput APIs.
            </p>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-white font-bold">Anuraj Laxman Khandagale</p>
            <p className="text-[#d4a574]">Java Backend Developer • Software Engineer</p>
            <p className="text-slate-400">Graduate: Savitribai Phule Pune University (SPPU) | CGPA: 8.12 / 10.00</p>
            <p className="text-emerald-400">Status: Available for SDE / Backend Roles</p>
          </div>
        );
        break;

      case "qr":
        if (onOpenQR) onOpenQR();
        response = (
          <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <QrCode size={13} />
            <span>✓ Opened Google Drive Resume QR Code scanner.</span>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-emerald-400 font-bold">--- Technical Stack ---</p>
            <p><span className="text-[#d4a574] font-bold">Languages:</span> Java 17/21, C, JavaScript, SQL, HTML5/CSS3</p>
            <p><span className="text-[#d4a574] font-bold">Backend:</span> Spring Boot, Servlets, JSP, JDBC, RESTful APIs, WebClient</p>
            <p><span className="text-[#d4a574] font-bold">Databases:</span> PostgreSQL, MySQL, Oracle SQL</p>
            <p><span className="text-[#d4a574] font-bold">Tools/CS:</span> Git, GitHub, IntelliJ IDEA, Maven, DSA (200+ solved), OOP, DBMS, OS</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-emerald-400 font-bold">--- Featured Projects ---</p>
            <div>
              <p className="text-amber-300 font-bold">1. SayIt – Speech & Reading Fluency Assistant [🟡 2026 Sprint]</p>
              <p className="text-slate-400">Next.js 16, Web Speech API (STT & TTS), phonics scoring for adults & kids.</p>
            </div>
            <div>
              <p className="text-[#d4a574] font-bold">2. AI Email Response Generator (Java, Spring Boot, LLM APIs)</p>
              <p className="text-slate-400">Reduced manual response time by 60%, improved latency by 30%.</p>
            </div>
            <div>
              <p className="text-[#d4a574] font-bold">3. Pit Stop Live – Garage Finder (Next.js, TS, PostgreSQL, Drizzle)</p>
              <p className="text-slate-400">Spatial emergency discovery under 2s with SOS tracking and 99.9% uptime.</p>
            </div>
            <div>
              <p className="text-[#d4a574] font-bold">4. Student Management System (Java, Servlets, JSP, JDBC, MySQL)</p>
              <p className="text-slate-400">MVC transaction safety managing 500+ records with 0 connection leaks.</p>
            </div>
          </div>
        );
        break;

      case "education":
        response = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-emerald-400 font-bold">--- Academic Credentials ---</p>
            <p className="text-white font-bold">B.E. in Computer Engineering (SPPU)</p>
            <p className="text-[#d4a574]">Graduated • CGPA: 8.12 / 10.00</p>
            <p className="text-slate-400">12th Grade MSBSHSC: 88.67% | 10th Grade CBSE: 72.60%</p>
          </div>
        );
        break;

      case "run":
        if (onRunBuild) onRunBuild();
        soundManager.playChime();
        response = (
          <div className="text-xs text-emerald-400 font-mono">
            ▶ Executing Spring Boot compilation & runtime build...
          </div>
        );
        break;

      case "contact":
        if (onOpenContact) onOpenContact();
        response = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-emerald-400 font-bold">--- Contact Details ---</p>
            <p>Email: <span className="text-white font-bold">anurajkhandagale52a@gmail.com</span></p>
            <p>LinkedIn: <span className="text-sky-400">linkedin.com/in/anuraj-khandagale-10020732b</span></p>
            <p>Instagram: <span className="text-pink-400">instagram.com/foxy52a (@foxy52a)</span></p>
            <p>GitHub: <span className="text-slate-200">github.com/anurajkhandagale</span></p>
          </div>
        );
        break;

      case "resume":
        window.open(PORTFOLIO_DATA.profile.resumeUrl, "_blank");
        response = (
          <div className="text-xs text-emerald-400 font-mono">
            ✓ Opened official PDF resume in browser.
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: &apos;{trimmed}&apos;. Type &apos;help&apos; for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundManager.playClick();
    if (e.key === "Enter") {
      runCommand(input);
    }
  };

  const quickPills = ["help", "whoami", "coffee", "sudo hire anuraj", "matrix", "qr", "projects", "skills", "education", "run", "contact"];

  return (
    <div 
      className="flex flex-col h-full bg-black/15 font-mono select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output log */}
      <div 
        ref={containerRef}
        className="flex-1 p-3 overflow-y-auto space-y-3 text-xs leading-relaxed"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">anuraj@portfolio:~$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-4 border-l border-white/10">{item.output}</div>
          </div>
        ))}

        {/* Live Input */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">anuraj@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono focus:ring-0 p-0"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            placeholder="Type a command (e.g. coffee, sudo hire anuraj, matrix, help)..."
          />
          <CornerDownLeft size={12} className="text-slate-500 animate-pulse" />
        </div>
      </div>

      {/* Quick command buttons toolbar */}
      <div className="px-3 py-1.5 bg-white/[0.03] border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[10px] select-none">
        <span className="text-slate-500 font-mono">Quick:</span>
        {quickPills.map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(pill);
            }}
            className={`px-2 py-0.5 rounded font-mono transition-colors cursor-pointer border ${
              pill.includes("sudo")
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold"
                : pill === "coffee"
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                : pill === "qr" 
                ? "bg-[#d4a574]/20 border-[#d4a574]/40 text-[#d4a574] font-bold" 
                : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/5"
            }`}
          >
            {pill === "coffee" ? "☕ coffee" : pill === "qr" ? "📱 qr" : pill}
          </button>
        ))}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            runCommand("clear");
          }}
          className="px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono transition-colors cursor-pointer ml-auto border border-rose-500/20"
        >
          clear
        </button>
      </div>
    </div>
  );
}
