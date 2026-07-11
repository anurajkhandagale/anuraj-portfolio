"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { Magnetic } from "@/components/Magnetic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Hero() {
  const roles = [
    "Java Backend Developer",
    "Spring Boot Developer",
    "Backend Engineer",
    "Software Developer",
  ];

  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseDuration = 1800;

  // Typing effect hook
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIdx]);

  // Mouse Parallax Coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Easing springs for the right-side abstract art elements
  const springX = useSpring(mouseX, { damping: 45, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 180 });

  // Generate transformed spring offsets for multi-layer 3D depth parallax
  const orbX = useTransform(springX, (x) => x * 15);
  const orbY = useTransform(springY, (y) => y * 15);

  const cardX = useTransform(springX, (x) => x * 30);
  const cardY = useTransform(springY, (y) => y * 30);

  const photoX = useTransform(springX, (x) => x * 50);
  const photoY = useTransform(springY, (y) => y * 50);

  const codeLayerX = useTransform(springX, (x) => x * 75);
  const codeLayerY = useTransform(springY, (y) => y * 75);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    // Calculate offset from center (-1 to 1 range)
    mouseX.set((clientX - centerX) / centerX);
    mouseY.set((clientY - centerY) / centerY);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Copy and Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4a574]/20 bg-[#d4a574]/5 text-xs font-semibold text-[#d4a574] font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574] animate-pulse" />
            Active SDE Candidate
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              ANURAJ <br />
              KHANDAGALE
            </motion.h1>

            {/* Subheading Typing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-8 flex items-center"
            >
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-[#d4a574] font-mono uppercase">
                {currentText}
                <span className="w-1.5 h-6 bg-[#d4a574] ml-1.5 inline-block animate-pulse" />
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-base sm:text-lg text-[#a0a0a0] leading-relaxed"
          >
            Building scalable backend applications with Java, Spring Boot, REST APIs, and modern software architecture. Focused on high-performance database schema designs and service isolation layers.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-[190px] px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer group"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://drive.google.com/file/d/1bP35kJgJ5DAh4lbd8rfJPuJYUyc_gFS3/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("recruiter-action", { detail: "resume" }));
                }
              }}
              className="w-full sm:w-[190px] px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-[#101010]/85 hover:bg-[#101010] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-center"
            >
              <Download size={16} />
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-[190px] px-6 py-3 rounded-xl border border-[#d4a574]/20 hover:border-[#d4a574]/30 bg-[#d4a574]/10 text-[#d4a574] font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Mail size={16} />
              Contact Me
            </button>
          </motion.div>

          {/* Social connections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 pt-6"
          >
            <a
              href="https://github.com/anurajkhandagale"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/5 hover:border-white/10 bg-[#101010]/50 hover:bg-[#101010] text-[#a0a0a0] hover:text-white transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/anuraj-khandagale-10020732b"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/5 hover:border-white/10 bg-[#101010]/50 hover:bg-[#101010] text-[#a0a0a0] hover:text-white transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Abstract Illustration & Profile Image with Mouse Parallax */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[400px] sm:h-[500px] mt-8 lg:mt-0 max-[400px]:scale-[0.85] max-[360px]:scale-[0.75] transition-transform duration-300">
          {/* Static Parallax Container frame */}
          <div className="relative w-[500px] h-[400px] flex items-center justify-center">
            
            {/* Background Orb */}
            <motion.div
              style={{ x: orbX, y: orbY }}
              animate={{
                scale: [1, 1.05, 0.95, 1],
                rotate: [0, 45, -45, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#d4a574] to-[#8a7355] opacity-15 blur-2xl z-0"
            />
            
            {/* Outer Secondary Orbiting Blobs */}
            <motion.div
              style={{ x: orbX, y: orbY }}
              animate={{
                x: [0, -35, 25, 0],
                y: [0, 30, -25, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-bl from-[#8a7355] to-[#d4a574] opacity-12 blur-xl -top-12 -left-8 z-0"
            />

            <motion.div
              style={{ x: orbX, y: orbY }}
              animate={{
                x: [0, 30, -35, 0],
                y: [0, -25, 30, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-[#a0a0a0] to-[#6a6a6a] opacity-10 blur-xl -bottom-10 -right-10 z-0"
            />

            {/* Squircle Card Pop-out Portrait Container (Reference matching out-of-bounds layout) */}
            <div className="relative w-[440px] h-[380px] flex items-end justify-center z-10 overflow-visible">
              
              {/* Back Card Shape with Blue-to-Dark Gradient (top shifted down to top-[145px] to start at the neck) */}
              <motion.div
                style={{ x: cardX, y: cardY }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute inset-x-0 bottom-0 top-[145px] rounded-[38px] bg-gradient-to-b from-[#3a3535]/30 via-[#2a2525]/20 to-[#030712]/90 border border-white/20 shadow-2xl backdrop-blur-md z-10 overflow-hidden"
              />

              {/* Profile Image (Out-of-Bounds Pop-out with smooth bottom fade mask) */}
              <motion.div
                style={{
                  x: photoX,
                  y: photoY,
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-[280px] h-[380px] z-20 overflow-visible pointer-events-none select-none flex items-end justify-center"
              >
                <Image
                  src="/profile.webp"
                  alt="Anuraj Laxman Khandagale"
                  width={280}
                  height={380}
                  className="object-cover object-top scale-[1.12]"
                  priority
                />
              </motion.div>

              {/* Foreground Floating Glassmorphic Badges */}
              <motion.div
                style={{ x: codeLayerX, y: codeLayerY }}
                className="absolute left-[-24px] bottom-[80px] z-30 px-3 py-1.5 rounded-full border border-white/10 bg-[#101010]/80 shadow-lg backdrop-blur-md flex items-center gap-1.5 pointer-events-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-mono font-bold text-white tracking-widest uppercase">
                  &lt;JVM/&gt;
                </span>
              </motion.div>

              <motion.div
                style={{ x: codeLayerX, y: codeLayerY }}
                className="absolute right-[-16px] top-[140px] z-30 px-3 py-1.5 rounded-full border border-white/10 bg-[#101010]/80 shadow-lg backdrop-blur-md flex items-center gap-1.5 pointer-events-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574]" />
                <span className="text-[9px] font-mono font-bold text-white tracking-widest uppercase">
                  &#123; REST API &#125;
                </span>
              </motion.div>
            </div>
            
          </div>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => scrollToSection("about")}>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#a0a0a0]">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-[#d4a574]" />
        </motion.div>
      </div>

    </section>
  );
}
