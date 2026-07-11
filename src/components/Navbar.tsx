"use client";

import React, { useState, useEffect } from "react";
import { Home, User, Code2, Briefcase, GraduationCap, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Magnetic } from "@/components/Magnetic";
import { motion, LayoutGroup } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { label: "Home", id: "home", icon: Home },
    { label: "About", id: "about", icon: User },
    { label: "Skills", id: "skills", icon: Code2 },
    { label: "Projects", id: "projects", icon: Briefcase },
    { label: "Education", id: "education", icon: GraduationCap },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* 1. Desktop: Right-Side Vertical Capsule Dock (md:block) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-auto select-none hidden md:block">
        <LayoutGroup id="desktop-dock">
          <div className="flex flex-col items-center gap-4 py-5 px-2.5 rounded-full glass-card shadow-2xl relative">
            
            {/* Vertical Navigation Pill Icons */}
            <ul className="flex flex-col items-center relative z-10">
              {navItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <React.Fragment key={item.id}>
                    {/* Vertical connecting line segment in the gap (only between icons) */}
                    {idx > 0 && (
                      <div className="w-[1.5px] h-2.5 bg-white/15 my-0.5" />
                    )}

                    <li className="relative flex items-center justify-center w-9 h-9">
                      <Magnetic strength={0.4}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`relative p-2 rounded-full transition-colors duration-355 focus:outline-none flex items-center justify-center cursor-pointer z-10 ${
                            isActive ? "text-white" : "text-[#a0a0a0] hover:text-white"
                          }`}
                          aria-label={item.label}
                        >
                          <IconComponent size={14} className={isActive ? "stroke-[2.2]" : "stroke-[2]"} />
                        </button>
                      </Magnetic>

                      {/* Active Highlight Circle Border (No blue color, outline ring only) */}
                      {isActive && (
                        <motion.div
                          layoutId="activeVerticalHighlight"
                          className="absolute inset-0 rounded-full border border-white/30 bg-white/5 z-0 flex items-center justify-center"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>

            {/* Horizontal Divider */}
            <div className="w-5 h-[1px] bg-white/10" />

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-[#a0a0a0] hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none z-10"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={14} className="stroke-[2]" /> : <Moon size={14} className="stroke-[2]" />}
              </button>
            )}

          </div>
        </LayoutGroup>
      </div>

      {/* 2. Mobile: Bottom Horizontal Capsule Dock (md:hidden) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none md:hidden">
        <LayoutGroup id="mobile-dock">
          <div className="flex items-center gap-3 px-3 py-2 rounded-full glass-card shadow-2xl relative">
            
            {/* Navigation Pill Icons Only */}
            <ul className="flex items-center gap-1 relative">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id} className="relative flex items-center justify-center">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative p-2.5 rounded-full transition-colors duration-300 focus:outline-none flex items-center justify-center cursor-pointer z-10 ${
                        isActive ? "text-white" : "text-[#a0a0a0] hover:text-white"
                      }`}
                      aria-label={item.label}
                    >
                      <IconComponent size={14} className={isActive ? "stroke-[2.2]" : "stroke-[2]"} />
                    </button>

                    {/* Smooth Sliding Backing Glass Capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="activeHorizontalHighlight"
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/15 shadow-sm -z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Vertical Divider */}
            <div className="w-[1px] h-4 bg-white/10" />

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-[#a0a0a0] hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={14} className="stroke-[2]" /> : <Moon size={14} className="stroke-[2]" />}
              </button>
            )}

          </div>
        </LayoutGroup>
      </div>
    </>
  );
}
