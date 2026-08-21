"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, CheckCircle2, RotateCw, Terminal, StopCircle } from "lucide-react";

interface RunConsoleViewProps {
  isRunning?: boolean;
  onRerun?: () => void;
}

export function RunConsoleView({ isRunning = false, onRerun }: RunConsoleViewProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const fullLogs: string[] = [
    "/Library/Java/JavaVirtualMachines/openjdk-21.jdk/Contents/Home/bin/java -jar target/anuraj-developer-portfolio-2026.1.0-RELEASE.jar",
    "[INFO] Scanning for projects...",
    "[INFO] ----------------< com.anuraj:anuraj-developer-portfolio >----------------",
    "[INFO] Building ANURAJ.DEV Portfolio 2026.1.0-RELEASE",
    "[INFO] --- maven-compiler-plugin:3.11.0:compile (default-compile) @ anuraj-portfolio ---",
    "[INFO] Compiling 8 source files with javac [Target: Java 21 LTS]",
    "[INFO] Changes detected - recompiling the module!",
    "[INFO] BUILD SUCCESS in 0.984s",
    "",
    "  .   ____          _            __ _ _",
    " /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\",
    "( ( )\\___ | '_ | '_| | '_ \\/ _` | \\ \\ \\ \\",
    " \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )",
    "  '  |____| .__|_| |_|_| |_\\__, | / / / /",
    " =========|_|==============|___/=/_/_/_/",
    " :: Spring Boot ::                (v3.3.2)",
    "",
    "2026-08-21T18:00:01.102Z  INFO --- [anuraj-portfolio] [main] c.a.p.AnurajPortfolioApplication        : Starting AnurajPortfolioApplication using Java 21.0.2 with PID 48201",
    "2026-08-21T18:00:01.105Z  INFO --- [anuraj-portfolio] [main] c.a.p.AnurajPortfolioApplication        : The following 1 profile is active: \"production\"",
    "2026-08-21T18:00:01.650Z  INFO --- [anuraj-portfolio] [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)",
    "2026-08-21T18:00:01.780Z  INFO --- [anuraj-portfolio] [main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting... MaxPoolSize: 20",
    "2026-08-21T18:00:01.890Z  INFO --- [anuraj-portfolio] [main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@7f4b8",
    "2026-08-21T18:00:01.892Z  INFO --- [anuraj-portfolio] [main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.",
    "2026-08-21T18:00:02.110Z  INFO --- [anuraj-portfolio] [main] c.a.p.AnurajPortfolioApplication        : Developer: Anuraj Laxman Khandagale (B.E. SPPU, CGPA 8.12)",
    "2026-08-21T18:00:02.112Z  INFO --- [anuraj-portfolio] [main] c.a.p.AnurajPortfolioApplication        : Ready for SDE / Java Backend Opportunities ⚡",
    "2026-08-21T18:00:02.120Z  INFO --- [anuraj-portfolio] [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path ''",
    "2026-08-21T18:00:02.125Z  INFO --- [anuraj-portfolio] [main] c.a.p.AnurajPortfolioApplication        : Started AnurajPortfolioApplication in 1.023 seconds (process running for 1.45)"
  ];

  useEffect(() => {
    setIsCompiling(true);
    setLogs([]);
    let currentIdx = 0;
    
    const interval = setInterval(() => {
      if (currentIdx < fullLogs.length) {
        const nextLine = fullLogs[currentIdx];
        if (typeof nextLine === "string") {
          setLogs((prev) => [...prev, nextLine]);
        }
        currentIdx++;
      } else {
        setIsCompiling(false);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-black/15 font-mono text-xs select-text">
      {/* Console toolbar */}
      <div className="h-7 px-3 bg-white/[0.03] border-b border-white/5 flex items-center justify-between text-slate-400 select-none">
        <div className="flex items-center gap-2">
          {isCompiling ? (
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <RotateCw size={11} className="animate-spin" />
              Building & Launching JVM...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 size={11} />
              Process finished with exit code 0 (Active on :8080)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRerun}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Rerun AnurajApplication"
          >
            <RotateCw size={12} />
          </button>
        </div>
      </div>

      {/* Log view */}
      <div ref={containerRef} className="flex-1 p-3 overflow-y-auto space-y-0.5 leading-relaxed">
        {logs.map((log, idx) => {
          const lineStr = typeof log === "string" ? log : "";
          if (lineStr.length === 0) {
            return <div key={idx} className="h-3" />;
          }

          return (
            <div key={idx} className="whitespace-pre text-slate-300">
              {lineStr.includes("[INFO]") ? (
                <span>
                  <span className="text-sky-400 font-bold">[INFO]</span> {lineStr.replace("[INFO]", "")}
                </span>
              ) : lineStr.includes("Spring Boot") || lineStr.includes("::") ? (
                <span className="text-[#d4a574] font-bold">{lineStr}</span>
              ) : lineStr.includes("Started AnurajPortfolioApplication") ? (
                <span className="text-emerald-400 font-bold">{lineStr}</span>
              ) : (
                lineStr
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
