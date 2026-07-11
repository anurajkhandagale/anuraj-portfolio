"use client";

import React, { useRef } from "react";
import { Calendar, MapPin, Award } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  const educationList = [
    {
      institution: "Savitribai Phule Pune University (SPPU)",
      location: "Pune, India",
      degree: "Bachelor of Engineering (B.E.)",
      field: "Computer Engineering",
      duration: "2022 – Present",
      grade: "CGPA: 8.05 / 10.00",
      details: "Rigorous study in core computer science disciplines including Data Structures & Algorithms, Object-Oriented Design, DBMS, Operating Systems, and System Design foundations.",
    },
    {
      institution: "MSBSHSC Board",
      location: "Maharashtra, India",
      degree: "Higher Secondary Certificate (12th Grade)",
      field: "Science & CS Stream",
      duration: "Completed",
      grade: "Score: 88.67%",
      details: "Focused on Mathematics, Physics, Chemistry, and Computer Science studies.",
    },
    {
      institution: "CBSE Board",
      location: "Maharashtra, India",
      degree: "Secondary School Certificate (10th Grade)",
      field: "General Education",
      duration: "Completed",
      grade: "Score: 72.60%",
      details: "Broad academic curriculum with emphasis on science and logical reasoning mathematics.",
    },
  ];

  // Map scroll progress to individual milestone reveal thresholds
  const totalItems = educationList.length;

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-transparent">
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
            // 05. EDUCATION
          </span>
          <div className="h-[1px] w-full bg-white/5 mt-4" />
        </div>

        {/* Scroll-Linked Timeline */}
        <div ref={timelineRef} className="relative pl-6 ml-3 space-y-12">
          
          {/* Background Track Line (static, low opacity) */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5" />
          
          {/* Growing Progress Line (scroll-linked) */}
          <motion.div
            className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-[#d4a574] to-[#555555] origin-top"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />

          {educationList.map((edu, idx) => {
            // Each milestone lights up as scroll reaches its threshold
            const threshold = (idx + 0.5) / totalItems;

            return (
              <TimelineCard
                key={idx}
                edu={edu}
                scrollYProgress={scrollYProgress}
                threshold={threshold}
              />
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}

interface TimelineCardProps {
  edu: {
    institution: string;
    location: string;
    degree: string;
    field: string;
    duration: string;
    grade: string;
    details: string;
  };
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  threshold: number;
}

function TimelineCard({ edu, scrollYProgress, threshold }: TimelineCardProps) {
  // Animate opacity: fade in as we scroll past the threshold
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, threshold - 0.15), threshold],
    [0.4, 1]
  );

  // Animate dot scale
  const dotScale = useTransform(
    scrollYProgress,
    [Math.max(0, threshold - 0.15), threshold],
    [0.6, 1]
  );

  // Animate dot border color from dim to bright
  const dotBorder = useTransform(
    scrollYProgress,
    [Math.max(0, threshold - 0.15), threshold],
    ["rgba(212,165,116,0.2)", "rgba(212,165,116,1)"]
  );

  return (
    <motion.div className="relative group" style={{ opacity }}>
      {/* Circle dot on track */}
      <motion.div
        className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black group-hover:scale-110 transition-transform"
        style={{
          scale: dotScale,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: dotBorder,
        }}
      />

      <div className="p-8 rounded-xl glass-card glass-card-hover transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-[#d4a574] transition-colors">
            {edu.degree}
            {edu.field && (
              <span className="text-sm font-semibold text-[#a0a0a0] block sm:inline sm:before:content-['•_'] sm:before:mx-1">
                {edu.field}
              </span>
            )}
          </h3>
          <span className="text-xs font-mono font-bold text-[#d4a574] flex items-center gap-1">
            <Calendar size={12} />
            {edu.duration}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-[#a0a0a0] mb-4">
          <span className="font-semibold text-white/95">
            {edu.institution}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {edu.location}
          </span>
        </div>

        {/* Grade display */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#d4a574]/10 text-xs font-mono font-bold text-[#d4a574] mb-4">
          <Award size={13} />
          {edu.grade}
        </div>

        <p className="text-sm text-[#a0a0a0] leading-relaxed">
          {edu.details}
        </p>
      </div>
    </motion.div>
  );
}
