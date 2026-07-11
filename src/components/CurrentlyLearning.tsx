"use client";

import React, { useState } from "react";
import { BookOpen, HelpCircle, HardDrive, Cpu, Radio, Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TechDetails {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  orbitRadius: number;
  speed: number;
  color: string;
  glowColor: string;
}

export function CurrentlyLearning() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const items = [
    { name: "Advanced Spring Boot", status: "Active Study" },
    { name: "Microservices Architecture", status: "Active Study" },
    { name: "Docker Containerization", status: "Active Study" },
    { name: "System Design Patterns", status: "Active Study" },
    { name: "Redis Caching", status: "Planned Focus" },
    { name: "Apache Kafka", status: "Planned Focus" },
    { name: "AWS Cloud Deployment", status: "Planned Focus" },
    { name: "Clean Architecture", status: "Planned Focus" },
  ];

  const satellites: TechDetails[] = [
    {
      id: "docker",
      label: "Docker",
      desc: "Containerizing services for runtime consistency, fast spin-ups, and portable devops environments.",
      icon: HardDrive,
      orbitRadius: 46,
      speed: 12,
      color: "text-[#2496ed] bg-[#2496ed]/10 border-[#2496ed]/25 hover:border-[#2496ed]/50",
      glowColor: "shadow-[0_0_10px_rgba(36,150,237,0.3)]",
    },
    {
      id: "redis",
      label: "Redis",
      desc: "Implementing distributed in-memory cache clustering, session stores, and rate-limiting structures.",
      icon: Cpu,
      orbitRadius: 76,
      speed: 18,
      color: "text-[#d82c20] bg-[#d82c20]/10 border-[#d82c20]/25 hover:border-[#d82c20]/50",
      glowColor: "shadow-[0_0_10px_rgba(216,44,32,0.3)]",
    },
    {
      id: "kafka",
      label: "Kafka",
      desc: "Designing event streams and decoupled log brokers for async publish/subscribe message channels.",
      icon: Radio,
      orbitRadius: 106,
      speed: 24,
      color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/25 hover:border-[#ff9900]/50",
      glowColor: "shadow-[0_0_10px_rgba(255,153,0,0.3)]",
    },
    {
      id: "kubernetes",
      label: "K8s",
      desc: "Studying pod configuration topologies, cluster orchestrations, and dynamic service networks.",
      icon: Network,
      orbitRadius: 136,
      speed: 30,
      color: "text-[#326ce5] bg-[#326ce5]/10 border-[#326ce5]/25 hover:border-[#326ce5]/50",
      glowColor: "shadow-[0_0_10px_rgba(50,108,229,0.3)]",
    },
  ];

  const activeHoverInfo = satellites.find((s) => s.id === hoveredTech);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Centered scroll-revealed viewport */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6"
      >
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#d4a574] font-mono font-bold">
            // 07. ACTIVE ROADMAP & GROWTH
          </span>
          <div className="h-[1px] w-full bg-white/5 mt-4" />
        </div>

        {/* Outer Split Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Learning Roadmap & Progress Cards */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6 p-6 rounded-xl glass-card text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#d4a574]">
                <BookOpen size={16} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                  Learning Path
                </span>
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                Expanding Into Distributed Systems
              </h4>
              <p className="text-xs text-[#a0a0a0] leading-relaxed">
                Actively expanding skill sets in containerization, messaging layers, caching strategies, and robust cloud configurations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {items.map((item, idx) => {
                const isActive = item.status === "Active Study";
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex flex-col justify-between gap-2.5 transition-colors ${
                      isActive
                        ? "border-[#d4a574]/20 bg-[#d4a574]/5"
                        : "border-white/5 bg-white/5"
                    }`}
                  >
                    <span className="text-xs font-bold text-white leading-tight">
                      {item.name}
                    </span>
                    <span
                      className={`text-[8.5px] px-1.5 py-0.5 rounded-full font-mono font-bold w-fit uppercase ${
                        isActive
                          ? "bg-[#d4a574]/10 text-[#d4a574]"
                          : "bg-white/5 text-[#a0a0a0]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tech Stack Solar System Orbits Canvas */}
          <div className="md:col-span-5 flex flex-col justify-between p-6 rounded-xl glass-card items-center relative overflow-hidden min-h-[360px]">
            
            {/* Title / Header */}
            <div className="text-center w-full z-10">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#a0a0a0] uppercase">
                Tech Orbit Map
              </span>
            </div>

            {/* Orbit System canvas */}
            <div 
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full aspect-square max-w-[240px] flex items-center justify-center overflow-visible my-auto"
            >
              {/* Center System Design Sun Core */}
              <div className="w-16 h-16 rounded-full bg-[#0a0d17] border border-[#d4a574]/30 flex flex-col items-center justify-center relative z-20 shadow-[0_0_15px_rgba(212,165,116,0.12)] select-none pointer-events-none">
                <span className="text-[8.5px] font-mono font-extrabold text-[#d4a574] tracking-tighter uppercase text-center leading-tight">
                  SYSTEM<br/>DESIGN
                </span>
                <span className="absolute inset-0 rounded-full border border-[#d4a574]/10 animate-ping opacity-35" />
              </div>

              {/* Concentric Elliptical Orbit tracks and dynamic billboards */}
              {satellites.map((sat) => {
                const IconComponent = sat.icon;
                const isHovered = hoveredTech === sat.id;

                return (
                  <div
                    key={sat.id}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Ring track */}
                    <div
                      className={`absolute rounded-full border transition-colors ${
                        isHovered ? "border-[#d4a574]/20" : "border-white/5"
                      }`}
                      style={{
                        width: sat.orbitRadius * 2,
                        height: sat.orbitRadius * 2,
                      }}
                    />

                    {/* Orbit Rotating Container */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: sat.speed,
                        ease: "linear",
                      }}
                      style={{
                        width: sat.orbitRadius * 2,
                        height: sat.orbitRadius * 2,
                        transformStyle: "preserve-3d",
                      }}
                      className="absolute flex items-center justify-start overflow-visible"
                    >
                      {/* Counter-rotating satellite badge to remain billboarded/upright */}
                      <motion.div
                        onMouseEnter={() => setHoveredTech(sat.id)}
                        onMouseLeave={() => setHoveredTech(null)}
                        style={{ x: -14 }} // center point offset offset
                        animate={{ rotate: -360 }}
                        transition={{
                          repeat: Infinity,
                          duration: sat.speed,
                          ease: "linear",
                        }}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer pointer-events-auto transition-all duration-300 shadow-lg relative ${
                          isHovered 
                            ? `${sat.glowColor} scale-110 bg-[#101010]` 
                            : "bg-[#0c1224]"
                        } ${sat.color}`}
                        aria-label={sat.label}
                      >
                        <IconComponent size={13} className="stroke-[2.2]" />

                        {/* Text Label on hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.span
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute -top-6 px-1.5 py-0.5 rounded bg-[#101010] border border-white/10 text-[7.5px] font-mono font-bold tracking-wider text-white uppercase whitespace-nowrap shadow-md pointer-events-none"
                            >
                              {sat.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Bottom reactive detail logs preview */}
            <div className="w-full h-12 flex items-center justify-center border-t border-white/5 pt-3 mt-4 text-center z-10">
              <AnimatePresence mode="wait">
                {activeHoverInfo ? (
                  <motion.div
                    key={activeHoverInfo.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="flex items-start gap-2 max-w-xs text-left"
                  >
                    <BookOpen size={10} className="text-[#d4a574] shrink-0 mt-0.5" />
                    <p className="text-[9px] text-[#a0a0a0] leading-relaxed line-clamp-2">
                      {activeHoverInfo.desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-learning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-[#555]"
                  >
                    <HelpCircle size={10} />
                    <span className="text-[9.5px] font-mono uppercase tracking-wider">
                      Hover orbit satellites to inspect topics
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}
