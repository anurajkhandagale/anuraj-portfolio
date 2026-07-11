"use client";

import React, { useState } from "react";
import { FloatingBackground } from "@/components/FloatingBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { Achievements } from "@/components/Achievements";
import { CurrentlyLearning } from "@/components/CurrentlyLearning";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { CommandPalette } from "@/components/CommandPalette";
import { RecruiterTracker } from "@/components/RecruiterTracker";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <PageLoader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col min-h-screen"
        >
          {/* Background & UX Overlays */}
          <FloatingBackground />
          <CursorGlow />
          <ScrollProgress />
          <CommandPalette />
          <RecruiterTracker />
          
          {/* Sticky Header */}
          <Navbar />

          <main className="flex flex-col flex-1">
            {/* Full viewport landing */}
            <Hero />

            {/* Narrative bio and high-level stats */}
            <About />

            {/* Technical stack categorized cards */}
            <Skills />

            {/* Alternating case studies */}
            <Projects />

            {/* Minimal academic timeline */}
            <Education />

            {/* Small premium achievements grid */}
            <Achievements />

            {/* Active technology roadmap grid */}
            <CurrentlyLearning />

            {/* Recruiter CLI Playground sandbox */}
            <section className="py-16 relative overflow-hidden bg-transparent">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h3 className="text-xs uppercase tracking-widest text-[#d4a574] font-mono font-bold mb-2">
                    // CLI Playroom Sandbox
                  </h3>
                  <p className="text-2xl font-bold tracking-tight text-white">
                    Interact with Anuraj&apos;s API Console
                  </p>
                  <div className="h-[1px] w-12 bg-[#d4a574]/40 mx-auto mt-3" />
                </div>
                
                <InteractiveTerminal />
              </div>
            </section>

            {/* Contact credentials form */}
            <Contact />
          </main>

          {/* Footer copyright and actions */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
