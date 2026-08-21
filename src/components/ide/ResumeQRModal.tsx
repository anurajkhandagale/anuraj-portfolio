"use client";

import React, { useState } from "react";
import { QrCode, Download, ExternalLink, Copy, Check, X, Smartphone, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeQRModal({ isOpen, onClose }: ResumeQRModalProps) {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  // High-contrast, clean QR code pointing to Google Drive resume
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    profile.resumeUrl
  )}&color=05070d&bgcolor=ffffff&qzone=2&margin=0`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.resumeUrl);
    setCopied(true);
    showToast("Resume Link Copied", "Google Drive PDF URL copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Ambient Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-md"
          />

          {/* Floating Smoked Glass Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-md rounded-3xl apple-modal-glass overflow-hidden shadow-2xl z-10 select-none p-6 sm:p-7 space-y-5 border border-white/20"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#d4a574]/20 border border-[#d4a574]/40 text-[#d4a574]">
                  <QrCode size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                    Resume QR Code
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                      Google Drive
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Scan with any mobile camera to view resume
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* QR Code Glass Container */}
            <div className="relative p-6 rounded-2xl bg-white/[0.05] border border-white/15 backdrop-blur-xl flex flex-col items-center justify-center space-y-4 shadow-inner overflow-hidden">
              
              {/* QR Image Box */}
              <div className="relative p-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center group overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrImageUrl}
                  alt="Anuraj Khandagale Google Drive Resume QR Code"
                  width={220}
                  height={220}
                  className="rounded-lg object-contain select-none"
                  loading="eager"
                />

                {/* Subtle laser scanline effect */}
                <motion.div
                  animate={{ y: [0, 210, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#d4a574] to-transparent shadow-[0_0_8px_#d4a574] pointer-events-none opacity-80"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-200 text-center">
                <Smartphone size={15} className="text-[#d4a574] shrink-0 animate-pulse" />
                <span className="font-semibold">Scan with Camera or Google Lens</span>
              </div>
            </div>

            {/* Destination URL glass box */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 size={12} />
                  Target URL Verified
                </span>
                <span>Google Drive PDF</span>
              </div>
              <p className="text-[11px] font-mono text-slate-300 truncate">
                {profile.resumeUrl}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Drive Link</span>
                  </>
                )}
              </button>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#d4a574] hover:bg-[#c39360] text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-lg shadow-[#d4a574]/20 cursor-pointer text-center"
              >
                <ExternalLink size={13} />
                <span>Open Drive Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
