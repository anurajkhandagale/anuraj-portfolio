"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2, X, Sparkles } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { profile } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const WEB3FORMS_KEY = "ae90d24e-5ee6-4662-a5b2-693715bf0c5e";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Message from ${formData.name} via Portfolio IDE`,
          message: formData.message,
          from_name: "Portfolio IDE Contact Form",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.message || "Unable to deliver message right now. Please email directly.");
      }
    } catch {
      setError("Network dispatch error. Please email directly to anurajkhandagale52a@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-3xl apple-modal-glass overflow-hidden shadow-2xl z-10 select-none border border-white/20"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#d4a574]/20 border border-[#d4a574]/40 text-[#d4a574]">
                  <Mail size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Contact Anuraj Khandagale</h3>
                  <p className="text-xs text-slate-400 font-mono">Java Backend Developer • SPPU Graduate (8.12 CGPA)</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-lg">Message Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans">
                    Thank you for reaching out. I will respond to your email at the earliest convenience.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setIsSuccess(false); onClose(); }}
                    className="mt-4 px-5 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs font-mono cursor-pointer shadow-lg"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  {error && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-300">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name / Recruiter"
                        className="w-full h-9 px-3 rounded-xl bg-white/[0.05] border border-white/15 text-white font-sans text-xs placeholder:text-slate-500 focus:border-[#d4a574] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="recruiter@company.com"
                        className="w-full h-9 px-3 rounded-xl bg-white/[0.05] border border-white/15 text-white font-sans text-xs placeholder:text-slate-500 focus:border-[#d4a574] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Role Opportunity / Collaboration"
                      className="w-full h-9 px-3 rounded-xl bg-white/[0.05] border border-white/15 text-white font-sans text-xs placeholder:text-slate-500 focus:border-[#d4a574] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Anuraj, I came across your Java IDE portfolio..."
                      className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white font-sans text-xs placeholder:text-slate-500 focus:border-[#d4a574] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github size={14} />
                      </a>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={14} />
                      </a>
                      <a
                        href={profile.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-pink-400 hover:text-pink-300 transition-colors"
                        title="Instagram (@foxy52a)"
                      >
                        <Instagram size={14} />
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-[#d4a574] hover:bg-[#c39360] text-slate-950 font-bold text-xs flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#d4a574]/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
