"use client";

import React from "react";
import { Cpu, Target, Flame } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function About() {
  const stats = [
    { value: "3+", label: "Featured Projects", desc: "Production-ready builds" },
    { value: "15+", label: "Tech Standards", desc: "Across language & backend layers" },
    { value: "8.05", label: "B.E. CGPA", desc: "Computer Engineering SPPU" },
  ];

  const focusPoints = [
    {
      icon: Cpu,
      title: "Backend Architecture",
      desc: "Designing secure REST APIs, clean service boundaries, and robust MVC configurations using Java EE and Spring Boot.",
    },
    {
      icon: Target,
      title: "Database Efficiency",
      desc: "Writing optimized relational queries, mapping complex entities, and implementing transactional integrity via JDBC and Drizzle ORM.",
    },
    {
      icon: Flame,
      title: "Continuous Growth",
      desc: "Actively studying distributed systems, system design, microservices, containerization, and clean architectural patterns.",
    },
  ];

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden bg-transparent"
    >
      {/* Concentrated Centered Container with Scroll Reveal */}
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
            // 01. WHO I AM
          </span>
          <div className="h-[1px] w-full bg-white/5 mt-4" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left Column: Huge Title */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Designing reliable backend pipelines, mapping relational schemas, and ensuring transaction safety.
            </h3>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-6 text-[#a0a0a0] leading-relaxed">
            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg text-white font-medium"
            >
              I am a Computer Engineering graduate from Savitribai Phule Pune University (SPPU) specializing in Java Backend Development. My engineering focus centers around how high-concurrency systems receive, translate, process, and persist data.
            </motion.p>

            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-base"
            >
              Rather than assembling ad-hoc tools, I enjoy partitioning code using strict MVC structures and clean coding principles. My experience ranges from crafting enterprise-level modules with core Java enterprise elements (Servlets, JSP, JDBC, MySQL) to bootstrapping modern full-stack location trackers.
            </motion.p>

            <motion.p
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-base"
            >
              My goal is to join a top-tier product team as a Software Development SDE candidate, contributing to core transaction layers, minimizing response latency bottlenecks, and expanding into distributed services.
            </motion.p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, borderColor: "rgba(212, 165, 116, 0.2)" }}
              className="p-6 rounded-xl glass-card glass-card-hover text-left flex flex-col justify-between transition-all duration-300 group"
            >
              <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
                {stat.value}
              </span>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block">
                  {stat.label}
                </span>
                <span className="text-[11px] text-[#a0a0a0] block mt-0.5 leading-normal">
                  {stat.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core focus areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {focusPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl glass-subcard flex flex-col hover:border-[#d4a574]/20 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-[#d4a574]/10 text-[#d4a574] w-fit mb-4">
                  <IconComponent size={18} />
                </div>
                <h4 className="font-bold text-white text-base mb-2">
                  {point.title}
                </h4>
                <p className="text-sm text-[#a0a0a0] leading-relaxed">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
