"use client";

import React, { useState, useRef } from "react";
import { Code, Server, Database, Brain, Wrench, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  accentColor: string;
  glowColor: string;
  description: string;
  skills: string[];
  orbitRadius: number;
  speed: number;
}

export function Skills() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax state for the orbit panel
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const categories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: Code,
      accentColor: "text-amber-300/80 border-amber-300/80/20 bg-amber-300/80/10",
      glowColor: "shadow-[0_0_10px_rgba(212,165,116,0.2)]",
      description: "Strong command of object-oriented and structured programming paradigms for modular systems.",
      skills: ["Java (Core & EE)", "C Language", "JavaScript", "HTML5 & CSS3"],
      orbitRadius: 46,
      speed: 25,
    },
    {
      title: "Backend Development",
      icon: Server,
      accentColor: "text-[#d4a574] border-[#d4a574]/20 bg-[#d4a574]/10",
      glowColor: "shadow-[0_0_10px_rgba(212,165,116,0.2)]",
      description: "Engineering secure endpoints, transaction containment, and MVC design structures.",
      skills: ["Spring Boot", "Java Servlets", "JSP / JDBC", "RESTful APIs"],
      orbitRadius: 74,
      speed: 32,
    },
    {
      title: "Databases & Queries",
      icon: Database,
      accentColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
      glowColor: "shadow-[0_0_10px_rgba(52,211,153,0.25)]",
      description: "Structuring transactional data models and optimizing query pathways.",
      skills: ["MySQL", "PostgreSQL", "Oracle SQL", "Query Optimization"],
      orbitRadius: 102,
      speed: 39,
    },
    {
      title: "Core Computer Science",
      icon: Brain,
      accentColor: "text-stone-400 border-stone-400/20 bg-stone-400/10",
      glowColor: "shadow-[0_0_10px_rgba(192,132,252,0.25)]",
      description: "Solid theoretical base enabling optimal problem-solving and clean patterns.",
      skills: ["Data Structures & Algos", "OOP Design", "DBMS Concepts", "Operating Systems"],
      orbitRadius: 130,
      speed: 46,
    },
    {
      title: "Tools & Environments",
      icon: Wrench,
      accentColor: "text-amber-400 border-amber-400/20 bg-amber-400/10",
      glowColor: "shadow-[0_0_10px_rgba(251,191,36,0.25)]",
      description: "Managing code pipelines and structured development setups.",
      skills: ["Git & GitHub", "IntelliJ IDEA", "VS Code", "Maven build pipelines"],
      orbitRadius: 158,
      speed: 53,
    },
  ];

  // Mouse tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Map offsets to tilt coordinates (Max 8 degrees tilt)
    setRotateX(-y / (rect.height / 16));
    setRotateY(x / (rect.width / 16));
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const activeCategory = categories[activeIndex];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      {/* Centered scroll-revealed viewport */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6"
      >
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d4a574] font-mono font-bold">
            // 02. TECHNICAL SKILLS
          </span>
          <div className="h-[1px] w-full bg-white/5 mt-4" />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Skill Category Details Sheet */}
          <div className="md:col-span-7 flex flex-col justify-between p-6 rounded-xl glass-card text-left min-h-[380px] relative overflow-hidden">
            {/* Ambient Background Accent Badge */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              {/* Category Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#d4a574]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d4a574]">
                    Focus Inventory
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {activeCategory.title}
                </h3>
                
                <p className="text-xs text-[#a0a0a0] leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              {/* Skills badges grid */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                  COMPETENCIES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeCategory.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3.5 py-2.5 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-white/10 transition-colors"
                    >
                      <span className="text-xs font-semibold text-white">
                        {skill}
                      </span>
                      <Cpu size={10} className="text-[#555] group-hover:text-[#d4a574] transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hint Footer */}
            <div className="text-[9px] font-mono text-[#555] mt-6 border-t border-white/5 pt-3">
              ACTIVE STATE // HOVER SATELLITES TO EXPLORE STACKS
            </div>
          </div>

          {/* Right Column: 3D Parallax Skill Solar System Orbit Canvas */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="md:col-span-5 flex flex-col justify-center items-center rounded-xl glass-card relative overflow-visible min-h-[380px] p-6 cursor-pointer"
          >
            {/* Visual Header */}
            <div className="absolute top-6 text-center w-full">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#a0a0a0] uppercase">
                Skills Universe
              </span>
            </div>

            {/* Orbit Container with 3D Parallax Perspective */}
            <motion.div
              style={{
                perspective: 1000,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full aspect-square max-w-[250px] flex items-center justify-center overflow-visible transition-all duration-200"
            >
              {/* Center Core Core Node */}
              <div className="w-14 h-14 rounded-full bg-[#0a0d17] border border-white/15 flex flex-col items-center justify-center relative z-20 shadow-[0_0_15px_rgba(255,255,255,0.05)] select-none pointer-events-none">
                <span className="text-[8px] font-mono font-extrabold text-[#a0a0a0] tracking-tighter uppercase text-center leading-tight">
                  SKILLS<br/>UNIVERSE
                </span>
                <span className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-25" />
              </div>

              {/* Concentric slow orbits */}
              {categories.map((sat, idx) => {
                const IconComponent = sat.icon;
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={sat.title}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Ring track */}
                    <div
                      className={`absolute rounded-full border transition-colors ${
                        isActive ? "border-white/15" : "border-white/5"
                      }`}
                      style={{
                        width: sat.orbitRadius * 2,
                        height: sat.orbitRadius * 2,
                      }}
                    />

                    {/* Orbit Rotating Container (Slow Orbit speed) */}
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
                      {/* Satellite Node (counter-rotates to stay upright) */}
                      <motion.div
                        onMouseEnter={() => setActiveIndex(idx)}
                        style={{ x: -14 }}
                        animate={{ rotate: -360 }}
                        transition={{
                          repeat: Infinity,
                          duration: sat.speed,
                          ease: "linear",
                        }}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer pointer-events-auto transition-all duration-300 shadow-lg relative ${
                          isActive 
                            ? `${sat.glowColor} scale-115 text-white bg-[#101010] border-white/30` 
                            : "bg-[#0c1224] text-[#a0a0a0]"
                        } ${sat.accentColor}`}
                        aria-label={sat.title}
                      >
                        <IconComponent size={12} className="stroke-[2]" />
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}
