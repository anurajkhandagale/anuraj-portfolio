"use client";

import React from "react";
import { Award, Terminal, Workflow, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Achievements() {
  const list = [
    {
      icon: Terminal,
      title: "Daily Data Structures & Algorithms Practice",
      desc: "Committed to refining algorithmic thinking daily. Solved 200+ challenges on binary search, tree traversals, and dynamic programming.",
    },
    {
      icon: Workflow,
      title: "Self-Driven System Design Studies",
      desc: "Actively studying scalability patterns, distributed consensus models, database index strategies, caching tiers, and API performance boundaries.",
    },
    {
      icon: Award,
      title: "High-Performance Project Deployments",
      desc: "Developed backend architectures minimizing response times, reducing manual pipeline tasks by 60%, and keeping service delays under 2s.",
    },
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-transparent">
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
            // 06. ACHIEVEMENTS
          </span>
          <div className="h-[1px] w-full bg-white/5 mt-4" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl glass-subcard flex items-start gap-4 transition-all duration-300 hover:border-[#d4a574]/20 group"
              >
                <div className="p-2.5 rounded-lg bg-[#d4a574]/10 text-[#d4a574] shrink-0 group-hover:scale-105 transition-transform">
                  <IconComp size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm leading-snug mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#a0a0a0] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
