"use client";

import React from "react";
import { 
  Code2, 
  FileText, 
  QrCode, 
  Mail, 
  CreditCard 
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { generateAndDownloadBusinessCard } from "@/utils/cardGenerator";
import { soundManager } from "@/utils/audio";
import { motion } from "framer-motion";

interface DesktopIconsProps {
  onOpenIDE: () => void;
  onOpenResumePreview: () => void;
  onOpenQR: () => void;
  onOpenContact: () => void;
}

export function DesktopIcons({
  onOpenIDE,
  onOpenResumePreview,
  onOpenQR,
  onOpenContact,
}: DesktopIconsProps) {
  const { profile } = PORTFOLIO_DATA;

  const handleAction = (cb: () => void) => {
    soundManager.playClick();
    cb();
  };

  const handleDownloadCard = async () => {
    soundManager.playClick();
    await generateAndDownloadBusinessCard();
    soundManager.playChime();
  };

  const desktopApps = [
    {
      id: "ide",
      name: "ANURAJ.DEV IDE",
      icon: <Code2 size={20} className="text-[#d4a574]" />,
      action: () => {
        soundManager.playChime();
        onOpenIDE();
      },
      badgeColor: "bg-emerald-400",
    },
    {
      id: "resume-pdf",
      name: "Resume PDF",
      icon: <FileText size={20} className="text-sky-400" />,
      action: () => handleAction(onOpenResumePreview),
      badgeColor: "bg-sky-400",
    },
    {
      id: "qr",
      name: "Resume QR Code",
      icon: <QrCode size={20} className="text-[#d4a574]" />,
      action: () => handleAction(onOpenQR),
      badgeColor: "bg-[#d4a574]",
    },
    {
      id: "contact",
      name: "Contact Anuraj",
      icon: <Mail size={20} className="text-rose-400" />,
      action: () => handleAction(onOpenContact),
      badgeColor: "bg-rose-400",
    },
    {
      id: "dev-card",
      name: "Export Dev Card (PNG)",
      icon: <CreditCard size={20} className="text-amber-400" />,
      action: handleDownloadCard,
      badgeColor: "bg-amber-400",
    },
  ];

  const socialLinks = [
    {
      id: "github",
      name: "GitHub Profile",
      icon: <Github size={18} className="text-slate-200" />,
      href: profile.github,
    },
    {
      id: "linkedin",
      name: "LinkedIn Profile",
      icon: <Linkedin size={18} className="text-sky-400" />,
      href: profile.linkedin,
    },
    {
      id: "instagram",
      name: "Instagram (@foxy52a)",
      icon: <Instagram size={18} className="text-pink-400" />,
      href: profile.instagram,
    },
  ];

  return (
    <div className="absolute top-11 left-3 sm:left-5 flex flex-col gap-2.5 z-20 select-none">
      {/* Desktop App Shortcuts (Icon-only with hover tooltip) */}
      <div className="flex flex-col gap-2.5">
        {desktopApps.map((app) => (
          <div key={app.id} className="relative group flex items-center">
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={app.action}
              className="w-11 h-11 rounded-2xl apple-glass-card border border-white/15 hover:border-white/35 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:shadow-2xl relative"
            >
              {app.icon}

              {/* Status dot */}
              <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${app.badgeColor} border border-black/40 shadow-sm`} />
            </motion.button>

            {/* Hover Tooltip (appears on right on hover) */}
            <div className="absolute left-14 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 text-xs font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-30 translate-x-1 group-hover:translate-x-0">
              {app.name}
            </div>
          </div>
        ))}
      </div>

      {/* Social & Web Shortcuts */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-white/10">
        {socialLinks.map((social) => (
          <div key={social.id} className="relative group flex items-center">
            <motion.a
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.92 }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="w-11 h-11 rounded-2xl apple-glass-card border border-white/10 hover:border-white/30 flex items-center justify-center transition-all shadow-md"
            >
              {social.icon}
            </motion.a>

            {/* Hover Tooltip */}
            <div className="absolute left-14 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 text-xs font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-30 translate-x-1 group-hover:translate-x-0">
              {social.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
