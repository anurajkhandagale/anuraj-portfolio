"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  X, 
  QrCode, 
  CreditCard, 
  Sparkles, 
  Loader2, 
  CheckCircle2 
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { generateAndDownloadBusinessCard } from "@/utils/cardGenerator";
import { soundManager } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQR: () => void;
}

export function ResumePreviewModal({ isOpen, onClose, onOpenQR }: ResumePreviewModalProps) {
  const { profile } = PORTFOLIO_DATA;
  const [isExportingCard, setIsExportingCard] = useState(false);

  // Embedded Google Drive preview URL
  const driveEmbedUrl = "https://drive.google.com/file/d/1bP35kJgJ5DAh4lbd8rfJPuJYUyc_gFS3/preview";

  const handleExportCard = async () => {
    try {
      setIsExportingCard(true);
      soundManager.playClick();
      await generateAndDownloadBusinessCard();
      soundManager.playChime();
    } catch {
      // Fallback
    } finally {
      setIsExportingCard(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* 50% Translucent Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 backdrop-blur-md"
          />

          {/* Floating Glass Resume Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl h-[90vh] max-h-[860px] rounded-3xl apple-modal-glass overflow-hidden shadow-2xl z-10 select-none flex flex-col border border-white/20"
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-[#d4a574]/20 border border-[#d4a574]/40 text-[#d4a574]">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm sm:text-base font-sans">
                      Anuraj_Khandagale_Resume.pdf
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Java Backend Developer • SPPU Graduate (8.12 CGPA)
                  </p>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-2">
                {/* 1-Click Export Glass Business Card */}
                <button
                  type="button"
                  onClick={handleExportCard}
                  disabled={isExportingCard}
                  className="px-3 py-1.5 rounded-xl bg-[#d4a574]/20 hover:bg-[#d4a574]/30 border border-[#d4a574]/40 text-[#d4a574] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
                  title="Download Glassmorphism Developer Business Card (PNG)"
                >
                  {isExportingCard ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <CreditCard size={13} />
                  )}
                  <span className="hidden sm:inline">Export Dev Card</span>
                </button>

                {/* QR Modal Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenQR();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  title="Scan on Mobile"
                >
                  <QrCode size={13} />
                  <span className="hidden md:inline">Mobile QR</span>
                </button>

                {/* Direct Drive Link */}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#d4a574] hover:bg-[#c39360] text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shadow-[#d4a574]/20"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open Drive</span>
                </a>

                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded Live PDF Document Canvas */}
            <div className="flex-1 w-full bg-black/40 relative overflow-hidden">
              <iframe
                src={driveEmbedUrl}
                title="Anuraj Khandagale Resume Preview"
                className="w-full h-full border-none"
                loading="eager"
                allow="autoplay"
              />
            </div>

            {/* Modal Footer Banner */}
            <div className="px-5 py-2.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={12} />
                B.E. Computer Engineering Graduate (SPPU)
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportCard}
                  className="text-[#d4a574] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles size={11} />
                  <span>Download Glass Dev Card (PNG)</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
