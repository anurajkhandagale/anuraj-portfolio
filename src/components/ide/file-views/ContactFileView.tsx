"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2, Code2, BookOpen } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

interface ContactFileViewProps {
  onTriggerModal?: () => void;
}

export function ContactFileView({ onTriggerModal }: ContactFileViewProps) {
  const { profile } = PORTFOLIO_DATA;
  const [viewMode, setViewMode] = useState<"visual" | "code">("visual");

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
      setError("Network dispatch error. Please email directly at anurajkhandagale52a@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactJavaCode = `package com.anuraj.portfolio.contact;

/**
 * Direct Recruiter & Engineering Connection Endpoint
 * 
 * @author Anuraj Laxman Khandagale
 */
public class ContactAnuraj {

    public static final String EMAIL = "${profile.email}";
    public static final String LINKEDIN = "${profile.linkedin}";
    public static final String GITHUB = "${profile.github}";
    public static final String LOCATION = "Pune, Maharashtra, India";

    public MessageResponse dispatchDirectMessage(RecruiterMessage message) {
        // Validates payload and dispatches secure Web3Forms transaction
        return Web3FormsDispatcher.send(message);
    }
}`;

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
            JAVA
          </span>
          <h2 className="text-sm font-bold text-white font-mono">
            ContactAnuraj.java
          </h2>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setViewMode("visual")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "visual" ? "bg-white/15 text-white font-bold text-[#d4a574]" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} />
            <span>Interactive Form</span>
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "code" ? "bg-white/15 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Code2 size={13} />
            <span>Java Endpoint</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto space-y-8 select-text">
        {viewMode === "code" ? (
          <div className="rounded-xl apple-glass-editor border border-white/10 overflow-hidden shadow-2xl">
            <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>com.anuraj.portfolio.contact.ContactAnuraj</span>
              <span>Java 21</span>
            </div>
            <pre className="p-4 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
              {contactJavaCode}
            </pre>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl apple-glass-card space-y-3">
                <span className="text-xs font-mono font-bold text-[#d4a574] uppercase tracking-wider">
                  // Get In Touch
                </span>
                <h1 className="text-2xl font-bold text-white">Let&apos;s Connect</h1>
                <p className="text-xs text-slate-300 leading-relaxed">
                  I am actively seeking SDE and Java Backend engineering opportunities. Drop a message or request a discussion.
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="p-4 rounded-xl apple-glass-card flex items-center gap-3 hover:border-[#d4a574]/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-[#d4a574]/15 text-[#d4a574]">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Email</span>
                    <span className="text-xs font-mono font-bold text-white group-hover:text-[#d4a574] transition-colors truncate block">
                      {profile.email}
                    </span>
                  </div>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl apple-glass-card flex items-center gap-3 hover:border-sky-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-sky-500/15 text-sky-400">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">LinkedIn</span>
                    <span className="text-xs font-mono font-bold text-white group-hover:text-sky-400 transition-colors">
                      {profile.linkedinUsername}
                    </span>
                  </div>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl apple-glass-card flex items-center gap-3 hover:border-white/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-white/10 text-white">
                    <Github size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">GitHub</span>
                    <span className="text-xs font-mono font-bold text-white group-hover:text-white transition-colors">
                      {profile.githubUsername}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 p-6 rounded-2xl apple-glass-card space-y-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Send size={14} className="text-[#d4a574]" />
                Direct Message Endpoint
              </span>

              {isSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-base">Message Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out. I will respond to your email as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {error && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d4a574]/60 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d4a574]/60 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">Subject / Discussion Topic</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="SDE Opportunity / Interview"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d4a574]/60 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Anuraj, we would love to connect with you regarding our backend engineering team..."
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d4a574]/60 font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-[#d4a574] hover:bg-[#c39360] text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#d4a574]/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Dispatch Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
