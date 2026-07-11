"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 bg-white dark:bg-[#070b17] border-t border-slate-200/50 dark:border-slate-800/40 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="text-xs text-slate-500 dark:text-slate-450 font-mono text-center md:text-left">
          &copy; {new Date().getFullYear()} Anuraj Laxman Khandagale. All rights reserved.
        </p>

        {/* Social Quicklinks */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/anurajkhandagale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/anuraj-khandagale-10020732"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:anurajkhandagale52a@gmail.com"
            className="text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="Email Contact"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-505 dark:hover:bg-indigo-600 text-white shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer z-40 border border-indigo-500/20"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </footer>
  );
}
