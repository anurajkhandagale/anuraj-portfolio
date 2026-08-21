"use client";

import React, { useRef, useState } from "react";
import { 
  Code2, 
  FileText, 
  QrCode, 
  Mail, 
  CreditCard,
  Sparkles,
  ArrowUpRight,
  Zap,
  ExternalLink
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { generateAndDownloadBusinessCard } from "@/utils/cardGenerator";
import { soundManager } from "@/utils/audio";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

interface DesktopIconsProps {
  onOpenIDE: () => void;
  onOpenResumePreview: () => void;
  onOpenQR: () => void;
  onOpenContact: () => void;
}

interface MagneticIconProps {
  children: React.ReactNode;
  name: string;
  category: string;
  description: string;
  badgeColor: string;
  badgeText: string;
  onClick: () => void;
  isExternal?: boolean;
}

function MagneticDesktopIcon({
  children,
  name,
  category,
  description,
  badgeColor,
  badgeText,
  onClick,
  isExternal = false,
}: MagneticIconProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 260, mass: 0.4 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  // 3D Specular Tilt
  const tiltX = useTransform(mouseY, [-20, 20], [12, -12]);
  const tiltY = useTransform(mouseX, [-20, 20], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;

    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center"
    >
      <motion.button
        style={{
          x: magneticX,
          y: magneticY,
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 800,
        }}
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={() => {
          soundManager.playClick();
          onClick();
        }}
        className="relative w-12 h-12 rounded-2xl apple-glass-card border border-white/20 hover:border-white/40 flex items-center justify-center transition-shadow cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#d4a574]/20 group backdrop-blur-2xl overflow-hidden"
      >
        {/* Dynamic Specular Glass Glint on Hover */}
        <motion.div
          animate={isHovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none -skew-x-12"
        />

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-200 group-hover:scale-110">
          {children}
        </div>

        {/* Dynamic Status Notification Dot */}
        <span
          className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${badgeColor} border border-black/50 shadow-sm transition-transform duration-200 group-hover:scale-125`}
        />
      </motion.button>

      {/* Apple-Grade Glass Preview Card Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-16 top-1/2 -translate-y-1/2 min-w-[220px] max-w-[270px] p-3.5 rounded-2xl apple-modal-glass border border-white/25 shadow-2xl backdrop-blur-2xl pointer-events-none z-50 flex flex-col gap-1.5"
          >
            {/* Tooltip Header */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d4a574] flex items-center gap-1">
                <Sparkles size={11} />
                {category}
              </span>
              <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-slate-300 text-[9px] font-mono font-bold flex items-center gap-0.5">
                {badgeText}
                {isExternal && <ArrowUpRight size={10} />}
              </span>
            </div>

            {/* Title */}
            <div className="text-xs font-bold text-white font-sans flex items-center justify-between">
              <span>{name}</span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-slate-300 font-sans leading-tight">
              {description}
            </p>

            {/* Action hint pill */}
            <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-[#d4a574]">Click to launch</span>
              <span>⌥ + Click</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DesktopIcons({
  onOpenIDE,
  onOpenResumePreview,
  onOpenQR,
  onOpenContact,
}: DesktopIconsProps) {
  const { profile } = PORTFOLIO_DATA;

  const handleDownloadCard = async () => {
    soundManager.playClick();
    await generateAndDownloadBusinessCard();
    soundManager.playChime();
  };

  const desktopApps = [
    {
      id: "ide",
      name: "ANURAJ.DEV IDE",
      category: "Interactive Studio",
      description: "Full Java 21 LTS IDE with Spring Boot compiler, terminal & code explorer.",
      icon: <Code2 size={22} className="text-[#d4a574]" />,
      action: () => {
        soundManager.playChime();
        onOpenIDE();
      },
      badgeColor: "bg-emerald-400",
      badgeText: "Active",
    },
    {
      id: "resume-pdf",
      name: "Resume Preview",
      category: "PDF Document",
      description: "Live PDF viewer with Google Drive download & verification credentials.",
      icon: <FileText size={22} className="text-sky-400" />,
      action: onOpenResumePreview,
      badgeColor: "bg-sky-400",
      badgeText: "v2026",
    },
    {
      id: "qr",
      name: "Handoff QR Code",
      category: "AirDrop & Mobile",
      description: "Scan with mobile camera to instant-handoff resume, WhatsApp & LinkedIn.",
      icon: <QrCode size={22} className="text-[#d4a574]" />,
      action: onOpenQR,
      badgeColor: "bg-[#d4a574]",
      badgeText: "NFC Ready",
    },
    {
      id: "contact",
      name: "Get in Touch",
      category: "Direct Channel",
      description: "Instant message terminal with direct email dispatch & response guarantees.",
      icon: <Mail size={22} className="text-rose-400" />,
      action: onOpenContact,
      badgeColor: "bg-rose-400",
      badgeText: "Online",
    },
    {
      id: "dev-card",
      name: "Developer ID Card",
      category: "PNG Export",
      description: "Export high-resolution Apple Wallet style developer badge with QR stamp.",
      icon: <CreditCard size={22} className="text-amber-400" />,
      action: handleDownloadCard,
      badgeColor: "bg-amber-400",
      badgeText: "Export PNG",
    },
  ];

  const socialLinks = [
    {
      id: "github",
      name: "GitHub Repositories",
      category: "Code Forge",
      description: "Explore 15+ production repositories, Spring microservices & DSA code.",
      icon: <Github size={20} className="text-slate-200" />,
      action: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
      badgeColor: "bg-purple-400",
      badgeText: "github.com",
    },
    {
      id: "linkedin",
      name: "LinkedIn Network",
      category: "Professional",
      description: "Connect with Anuraj on LinkedIn for software engineering opportunities.",
      icon: <Linkedin size={20} className="text-sky-400" />,
      action: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      badgeColor: "bg-sky-400",
      badgeText: "linkedin.com",
    },
    {
      id: "instagram",
      name: "Instagram",
      category: "Personal Space",
      description: "Engineering life & creative visual posts (@foxy52a).",
      icon: <Instagram size={20} className="text-pink-400" />,
      action: () => window.open(profile.instagram, "_blank", "noopener,noreferrer"),
      badgeColor: "bg-pink-400",
      badgeText: "@foxy52a",
    },
  ];

  return (
    <div className="absolute top-14 sm:top-16 left-3 sm:left-5 flex flex-col gap-3 z-30 select-none">
      {/* Desktop App Shortcuts (Magnetic 3D Glass with Apple Live Cards) */}
      <div className="flex flex-col gap-2.5">
        {desktopApps.map((app) => (
          <MagneticDesktopIcon
            key={app.id}
            name={app.name}
            category={app.category}
            description={app.description}
            badgeColor={app.badgeColor}
            badgeText={app.badgeText}
            onClick={app.action}
          >
            {app.icon}
          </MagneticDesktopIcon>
        ))}
      </div>

      {/* Social & Web Shortcuts */}
      <div className="flex flex-col gap-2.5 pt-2.5 border-t border-white/10">
        {socialLinks.map((social) => (
          <MagneticDesktopIcon
            key={social.id}
            name={social.name}
            category={social.category}
            description={social.description}
            badgeColor={social.badgeColor}
            badgeText={social.badgeText}
            onClick={social.action}
            isExternal
          >
            {social.icon}
          </MagneticDesktopIcon>
        ))}
      </div>
    </div>
  );
}
