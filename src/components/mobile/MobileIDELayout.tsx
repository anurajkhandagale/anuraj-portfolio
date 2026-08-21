"use client";

import React, { useState } from "react";
import { MobileTopBar } from "./MobileTopBar";
import { MobileBottomNav, MobileTab } from "./MobileBottomNav";
import { MobileHomeView } from "./MobileHomeView";
import { MobileProjectsView } from "./MobileProjectsView";
import { MobileSkillsView } from "./MobileSkillsView";
import { MobileCodeView } from "./MobileCodeView";
import { MobileGitView } from "./MobileGitView";
import { MobileFileDrawer } from "./MobileFileDrawer";
import { MobileTerminalDrawer } from "./MobileTerminalDrawer";
import { MobileSearchSheet } from "./MobileSearchSheet";
import { MobileMoreDrawer } from "./MobileMoreDrawer";
import { ResumePreviewModal } from "@/components/ide/ResumePreviewModal";
import { ResumeQRModal } from "@/components/ide/ResumeQRModal";
import { ContactModal } from "@/components/ide/ContactModal";
import { NotificationCenter } from "@/components/ui/NotificationCenter";
import { ThemePreset } from "@/components/ide/SettingsModal";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

interface MobileIDELayoutProps {
  currentTheme: ThemePreset;
  onCycleTheme: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export function MobileIDELayout({
  currentTheme,
  onCycleTheme,
  isSoundEnabled,
  onToggleSound,
}: MobileIDELayoutProps) {
  const [activeTab, setActiveTab] = useState<MobileTab>("home");
  const [activeFileId, setActiveFileId] = useState<string>("readme");

  // Drawer states
  const [isFilesDrawerOpen, setIsFilesDrawerOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const getFileName = (fileId: string) => {
    switch (fileId) {
      case "readme":
        return "README.md";
      case "say-it-speech":
        return "SayItSpeechEngine.java";
      case "pit-stop-live":
        return "PitStopLive.java";
      case "ai-email-generator":
        return "AiEmailGenerator.java";
      case "student-management-system":
        return "StudentManagementSystem.java";
      case "java-core":
        return "Java.java";
      case "spring-boot":
        return "SpringBoot.java";
      case "databases":
        return "Databases.java";
      case "cs-core":
        return "ComputerScienceCore.java";
      case "pom":
        return "pom.xml";
      case "application-yml":
        return "application.yml";
      default:
        return `${fileId}.java`;
    }
  };

  const handleSelectFile = (fileId: string) => {
    if (fileId === "resume") {
      setIsResumePreviewOpen(true);
      return;
    }
    setActiveFileId(fileId);
    setActiveTab("code");
  };

  const handleRunBuild = () => {
    soundManager.playChime();
    showToast("Spring Boot Compiler", "Compiling & executing Java 21 runtime...", "success");
    setIsTerminalOpen(true);
  };

  return (
    <div className={`relative min-h-[100dvh] w-full flex items-center justify-center p-2 sm:p-3 overflow-x-hidden bg-[#030306] ${currentTheme} select-none`}>
      
      {/* Top-Center Dynamic Island Glass Notifications */}
      <NotificationCenter />

      {/* Ambient Mobile Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-15%] w-72 h-72 rounded-full bg-amber-500/20 blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[-15%] w-80 h-80 rounded-full bg-orange-600/15 blur-[100px]" />
        <div className="absolute top-[40%] left-[10%] w-48 h-48 rounded-full bg-sky-500/10 blur-[80px]" />
      </div>

      {/* Main Glass Mobile Developer App Container (Floating Margin) */}
      <div className="relative w-full h-[96dvh] max-h-[860px] rounded-[20px] apple-modal-glass border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden z-10">
        
        {/* Top Header Bar: ANURAJ.DEV + ☰ */}
        <MobileTopBar
          activeFileName={getFileName(activeFileId)}
          onOpenFiles={() => setIsFilesDrawerOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenResume={() => setIsResumePreviewOpen(true)}
          isSoundEnabled={isSoundEnabled}
        />

        {/* Center Dynamic Content Area */}
        <main className="flex-1 overflow-hidden min-h-0 relative w-full">
          {activeTab === "home" && (
            <MobileHomeView
              onOpenProjects={() => setActiveTab("projects")}
              onOpenResume={() => setIsResumePreviewOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              onOpenQR={() => setIsQROpen(true)}
              onOpenFile={handleSelectFile}
              onOpenTerminal={() => setIsTerminalOpen(true)}
            />
          )}

          {activeTab === "projects" && (
            <MobileProjectsView
              onOpenFileCode={handleSelectFile}
            />
          )}

          {activeTab === "skills" && (
            <MobileSkillsView
              onOpenFileCode={handleSelectFile}
            />
          )}

          {activeTab === "code" && (
            <MobileCodeView
              activeFileId={activeFileId}
              onSelectFile={handleSelectFile}
              onOpenFilesDrawer={() => setIsFilesDrawerOpen(true)}
              onRunBuild={handleRunBuild}
              onOpenContact={() => setIsContactOpen(true)}
              onOpenQR={() => setIsQROpen(true)}
            />
          )}

          {activeTab === "git" && (
            <MobileGitView />
          )}

          {activeTab === "more" && (
            <MobileHomeView
              onOpenProjects={() => setActiveTab("projects")}
              onOpenResume={() => setIsResumePreviewOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              onOpenQR={() => setIsQROpen(true)}
              onOpenFile={handleSelectFile}
              onOpenTerminal={() => setIsTerminalOpen(true)}
            />
          )}
        </main>

        {/* Native-App Glass Bottom Navigation: Home, Projects, Skills, Git, More */}
        <MobileBottomNav
          activeTab={activeTab}
          onSelectTab={(t) => setActiveTab(t)}
          onOpenMore={() => setIsMoreOpen(true)}
        />

      </div>

      {/* =========================================================
          SLIDE-UP GLASS DRAWERS & MODALS
          ========================================================= */}
      
      {/* Project Explorer Drawer */}
      <MobileFileDrawer
        isOpen={isFilesDrawerOpen}
        onClose={() => setIsFilesDrawerOpen(false)}
        activeFileId={activeFileId}
        onSelectFile={handleSelectFile}
      />

      {/* Full-Screen Glass Terminal */}
      <MobileTerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onRunBuild={handleRunBuild}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
      />

      {/* Spotlight Search Sheet */}
      <MobileSearchSheet
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectFile={handleSelectFile}
        onOpenProjects={() => {
          setActiveTab("projects");
          setIsSearchOpen(false);
        }}
        onOpenContact={() => {
          setIsContactOpen(true);
          setIsSearchOpen(false);
        }}
        onOpenQR={() => {
          setIsQROpen(true);
          setIsSearchOpen(false);
        }}
        onOpenResume={() => {
          setIsResumePreviewOpen(true);
          setIsSearchOpen(false);
        }}
      />

      {/* More Navigation Menu Drawer */}
      <MobileMoreDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenResume={() => setIsResumePreviewOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenSkills={() => {
          setActiveTab("skills");
        }}
        onOpenEducation={() => handleSelectFile("education-file")}
        currentTheme={currentTheme}
        onCycleTheme={onCycleTheme}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={onToggleSound}
      />

      {/* Modals */}
      <ResumePreviewModal
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        onOpenQR={() => setIsQROpen(true)}
      />

      <ResumeQRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
