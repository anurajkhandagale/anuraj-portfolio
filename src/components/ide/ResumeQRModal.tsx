"use client";

import React, { useState } from "react";
import { 
  QrCode, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  Radio, 
  Send, 
  Share2, 
  MessageSquareShare,
  Mail,
  Zap,
  Globe
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeQRModal({ isOpen, onClose }: ResumeQRModalProps) {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<"qr" | "handoff">("qr");

  // High-contrast clean QR code pointing to Google Drive resume
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    profile.resumeUrl
  )}&color=05070d&bgcolor=ffffff&qzone=2&margin=0`;

  const handleCopyLink = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profile.resumeUrl);
    setCopied(true);
    showToast("Resume Link Copied", "Google Drive PDF URL copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    showToast("Email Copied", profile.email, "success");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleWhatsApp = () => {
    soundManager.playClick();
    const text = encodeURIComponent(
      "Hi Anuraj! I checked out your portfolio and would like to discuss a Java Software Engineer opportunity."
    );
    // WhatsApp direct link
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    showToast("WhatsApp Handoff", "Opening WhatsApp message dispatch...", "info");
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
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Floating Apple Handoff & QR Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-lg rounded-3xl apple-modal-glass overflow-hidden shadow-2xl z-10 select-none p-6 sm:p-7 space-y-5 border border-white/20"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-2.5 rounded-2xl bg-[#d4a574]/20 border border-[#d4a574]/40 text-[#d4a574] overflow-hidden">
                  <QrCode size={22} />
                  {/* Subtle pulsing beacon */}
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                    Mobile Handoff & QR
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                      <Zap size={10} className="animate-pulse" />
                      Live Sync
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Instant cross-device transfer to iPhone & Android
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

            {/* Apple Segmented Control: QR Camera Scan vs Fast Handoff Channels */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-white/[0.05] border border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("qr");
                }}
                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "qr"
                    ? "bg-white/15 text-white shadow-md border border-white/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <QrCode size={13} />
                <span>Camera QR Scan</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab("handoff");
                }}
                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "handoff"
                    ? "bg-white/15 text-white shadow-md border border-white/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Share2 size={13} />
                <span>Instant Channels</span>
              </button>
            </div>

            {/* TAB 1: Camera QR Code with Apple AirDrop Radar Waves */}
            {activeTab === "qr" && (
              <div className="relative p-6 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl flex flex-col items-center justify-center space-y-4 shadow-inner overflow-hidden">
                
                {/* AirDrop Radar Pulsing Wave Effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 1.6, 2.1], opacity: [0.35, 0.15, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                    className="w-48 h-48 rounded-full border border-[#d4a574]/40"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.8, 2.4], opacity: [0.3, 0.1, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 0.8, ease: "easeOut" }}
                    className="w-48 h-48 rounded-full border border-sky-400/30"
                  />
                </div>

                {/* QR Image Frame */}
                <div className="relative p-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center group overflow-hidden z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrImageUrl}
                    alt="Anuraj Khandagale Google Drive Resume QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg object-contain select-none"
                    loading="eager"
                  />

                  {/* Luminous laser scanline sweep */}
                  <motion.div
                    animate={{ y: [0, 190, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                    className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#d4a574] to-transparent shadow-[0_0_10px_#d4a574] pointer-events-none opacity-90"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-200 text-center z-10">
                  <Smartphone size={15} className="text-[#d4a574] shrink-0 animate-pulse" />
                  <span className="font-semibold">Scan with iOS Camera, Android or Google Lens</span>
                </div>
              </div>
            )}

            {/* TAB 2: Direct Handoff Channels */}
            {activeTab === "handoff" && (
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl space-y-2.5">
                <div className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5 pb-1">
                  <Radio size={14} className="text-emerald-400 animate-pulse" />
                  <span>One-Touch Direct Handoff</span>
                </div>

                {/* WhatsApp Handoff */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-white flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <MessageSquareShare size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-sans flex items-center gap-1.5">
                        WhatsApp Recruiter Direct
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 text-[9px] font-mono">Fastest</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">Pre-filled recruiter inquiry message</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </button>

                {/* LinkedIn Handoff */}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="w-full p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-white flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                      <Globe size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-sans">LinkedIn Profile Network</div>
                      <p className="text-[11px] text-slate-400 font-sans">Connect & message on LinkedIn</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
                </a>

                {/* Copy Direct Email */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white flex items-center justify-between transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-sans">
                        {copiedEmail ? "Copied to Clipboard!" : profile.email}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">Primary engineering inbox</p>
                    </div>
                  </div>
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-400" />}
                </button>
              </div>
            )}

            {/* Target Destination Verification Box */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 size={12} />
                  Google Drive PDF Verified
                </span>
                <span>v2026 LTS</span>
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
                onClick={() => soundManager.playChime()}
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
