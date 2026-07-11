"use client";

import React, { useState } from "react";
import { ExternalLink, Cpu, BarChart3, AlertTriangle } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  challenges: string;
  results: string[];
  githubUrl: string;
  demoUrl: string;
  visual: React.ReactNode;
  categories: string[];
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { label: "All", id: "All" },
    { label: "Java & Backend", id: "Java" },
    { label: "Web Applications", id: "TypeScript" },
    { label: "Databases & Systems", id: "Database" },
  ];

  const caseStudies: CaseStudy[] = [
    {
      name: "AI Email Response Generator",
      subtitle: "Asynchronous LLM Integration",
      description: "An AI-powered backend service that dynamically generates context-aware email response templates by connecting Spring Boot endpoints with LLM APIs.",
      tech: ["Java", "Spring Boot", "WebClient", "REST APIs", "LLM APIs"],
      features: [
        "Asynchronous non-blocking requests with WebClient",
        "Robust REST service layer structure",
        "Adaptive error fallback routes during endpoint downtime"
      ],
      challenges: "Managing rate-limiting bounds and response latency overheads on remote LLM endpoints under heavy traffic loads.",
      results: [
        "Reduced email reply drafting manual effort by 60%",
        "Improved API latency response times by 30%",
        "Achieved 95%+ response relevance marks"
      ],
      githubUrl: "https://github.com/anurajkhandagale",
      demoUrl: "#",
      categories: ["Java", "AI"],
      visual: (
        <div className="w-full h-full bg-[#050505] p-5 font-mono text-[11px] leading-relaxed overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[#d4a574] font-bold">API POST /v1/generate-reply</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">200 OK</span>
            </div>
            <div className="text-[#a0a0a0]">// Payload request:</div>
            <div className="bg-[#101010] p-2.5 rounded border border-white/5 text-white">
              <span className="text-[#d4a574]">&quot;sender&quot;</span>: <span className="text-emerald-450">&quot;recruiter@google.com&quot;</span>,<br />
              <span className="text-[#d4a574]">&quot;body&quot;</span>: <span className="text-emerald-450">&quot;Looking to set up a chat for SDE roles.&quot;</span>
            </div>
            <div className="text-slate-500 animate-pulse">// Spring WebClient async dispatching...</div>
          </div>
          <div className="space-y-1.5 border-t border-white/5 pt-2">
            <div className="text-[#a0a0a0]">// Generated response:</div>
            <div className="bg-[#101010] p-2.5 rounded border border-white/5 text-[#a0a0a0] truncate">
              &quot;Thank you for reaching out! I am excited about the SDE...&quot;
            </div>
          </div>
        </div>
      )
    },
    {
      name: "Pit Stop Live – Garage Finder",
      subtitle: "Emergency Geolocation Platform",
      description: "A real-time location-aware application mapping motorists with nearby mechanical breakdown help and emergency assistance.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "NextAuth"],
      features: [
        "SOS alert routing matching closest coordinates",
        "Fast relational database index maps",
        "Secure session authentication hashes"
      ],
      challenges: "Writing clean SQL queries to compute distances dynamically across large location datasets under a strict 2-second timeout.",
      results: [
        "Resolved mechanical locations under 2 seconds",
        "99.9% database coordination uptime",
        "Zero leakage location mapping arrays"
      ],
      githubUrl: "https://github.com/anurajkhandagale",
      demoUrl: "#",
      categories: ["TypeScript", "Database"],
      visual: (
        <div className="w-full h-full bg-[#050505] p-5 font-mono text-[11px] leading-relaxed overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-400 font-bold">SQL Query Console</span>
              <span className="text-slate-500">PostgreSQL</span>
            </div>
            <div className="bg-[#101010] p-3 rounded border border-white/5 text-white/95 whitespace-pre overflow-x-auto text-[10px]">
              <span className="text-[#d4a574]">SELECT</span> id, name, location<br />
              <span className="text-[#d4a574]">FROM</span> garages<br />
              <span className="text-[#d4a574]">WHERE</span> <span className="text-stone-400">ST_DWithin</span>(coord, user_loc, 5000)<br />
              <span className="text-[#d4a574]">ORDER BY</span> distance <span className="text-[#d4a574]">ASC</span>;
            </div>
          </div>
          <div className="bg-[#101010]/80 p-2.5 rounded border border-[#d4a574]/10">
            <div className="flex items-center justify-between text-[10px] text-[#a0a0a0]">
              <span>Index Scan: garages_spatial_idx</span>
              <span className="text-emerald-500 font-bold">Execution: 1.45ms</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#d4a574] h-full w-[85%]" />
            </div>
          </div>
        </div>
      )
    },
    {
      name: "Student Management System",
      subtitle: "Transactional MVC Portal",
      description: "A secure, robust administrative portal allowing academic coordinators to safely log, search, and update students records via transactional database queries.",
      tech: ["Java", "Servlets", "JSP", "JDBC", "MySQL"],
      features: [
        "Clean Model-View-Controller isolation logic",
        "Transactional safety rollbacks on database queries",
        "Connection leak detection layers"
      ],
      challenges: "Preventing transaction leaks and keeping data concurrency safe under multiple Servlet requests.",
      results: [
        "Maintained 500+ active student records",
        "Optimized complex SQL query times by 40%",
        "Audited zero database corruption errors"
      ],
      githubUrl: "https://github.com/anurajkhandagale",
      demoUrl: "#",
      categories: ["Java", "Database"],
      visual: (
        <div className="w-full h-full bg-[#050505] p-5 font-mono text-[11px] leading-relaxed overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-emerald-400 font-bold">JVM Database Connection Pool</span>
              <span className="text-slate-500">JDBC</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-[#101010] p-2 rounded border border-white/5">
                <div className="text-slate-500">Active Connections</div>
                <div className="text-lg font-bold text-white font-mono">4 / 20</div>
              </div>
              <div className="bg-[#101010] p-2 rounded border border-white/5">
                <div className="text-slate-500">Idle Connections</div>
                <div className="text-lg font-bold text-[#d4a574] font-mono">16</div>
              </div>
            </div>
          </div>
          <div className="bg-[#101010] p-2 rounded border border-white/5 text-[9px] text-slate-400">
            <div className="text-[#d4a574] font-bold">Transaction block:</div>
            <span className="text-stone-400">conn</span>.setAutoCommit(<span className="text-[#d4a574]">false</span>);<br />
            <span className="text-slate-500">// ... SQL executing ...</span><br />
            <span className="text-stone-400">conn</span>.commit();
          </div>
        </div>
      )
    }
  ];

  // Filter projects dynamically
  const filteredProjects = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter((project) => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("recruiter-action", { detail: "projects" }));
          }
        }}
        className="max-w-4xl mx-auto px-6"
      >
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4a574] font-mono font-bold">
            // 03. FEATURED PROJECTS
          </span>
          <div className="h-[1px] w-full bg-white/5 mt-4" />
        </div>

        {/* Dynamic Category Switcher Menu */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 w-fit mx-auto mb-24 relative">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 focus:outline-none cursor-pointer ${
                activeFilter === filter.id ? "text-[#d4a574]" : "text-[#a0a0a0] hover:text-white"
              }`}
            >
              <span className="relative z-10">{filter.label}</span>
              
              {activeFilter === filter.id && (
                <motion.div
                  layoutId="projectFilterPill"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/15 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Case Studies Layout List with grid exit/layout animations */}
        <div className="space-y-36">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  
                  {/* Visual mockup panel */}
                  <div className={`lg:col-span-5 w-full aspect-video lg:aspect-square max-h-[340px] rounded-xl glass-card overflow-hidden ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}>
                    {project.visual}
                  </div>

                  {/* Case Study Copy */}
                  <div className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#d4a574] uppercase">
                        {project.subtitle}
                      </span>
                      <h3 className="text-2xl font-extrabold tracking-tight text-white mt-1">
                        {project.name}
                      </h3>
                    </div>

                    <p className="text-sm text-[#a0a0a0] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Core Features */}
                    <div className="space-y-2">
                      <span className="text-xs uppercase font-mono font-bold text-white flex items-center gap-1.5">
                        <Cpu size={14} className="text-[#d4a574]" />
                        Core Engineering Components
                      </span>
                      <ul className="text-xs text-[#a0a0a0] space-y-1.5 pl-5 list-disc">
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx}>{feat}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges Section */}
                    <div className="space-y-2">
                      <span className="text-xs uppercase font-mono font-bold text-white flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-[#d4a574]" />
                        Technical Bottleneck
                      </span>
                      <p className="text-xs text-[#a0a0a0] leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>

                    {/* Impact Results */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {project.results.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 text-center flex items-center justify-center"
                        >
                          <span className="text-xs font-mono font-bold text-emerald-500 leading-snug">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-xs font-semibold text-white transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <Github size={14} />
                        Code Repository
                      </a>
                      <a
                        href={project.demoUrl}
                        className="px-4 py-2.5 rounded-lg bg-[#d4a574] hover:bg-[#a0a0a0] text-xs font-semibold text-white transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
}
