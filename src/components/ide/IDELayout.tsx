"use client";

import React, { useState, useEffect } from "react";
import { TopBar } from "./TopBar";
import { ActivityBar } from "./ActivityBar";
import { ProjectExplorer } from "./ProjectExplorer";
import { EditorTabs, TabItem } from "./EditorTabs";
import { CodeEditor } from "./CodeEditor";
import { RightSidebar } from "./RightSidebar";
import { BottomDock, BottomPanelType } from "./BottomDock";
import { StatusBar } from "./StatusBar";
import { CommandPalette } from "./CommandPalette";
import { ContactModal } from "./ContactModal";
import { ResumeQRModal } from "./ResumeQRModal";
import { ResumePreviewModal } from "./ResumePreviewModal";
import { SettingsModal, ThemePreset } from "./SettingsModal";
import { FloatingSideControls } from "./FloatingSideControls";
import { MinimizedTaskbar } from "./MinimizedTaskbar";
import { MacOSMenuBar } from "@/components/desktop/MacOSMenuBar";
import { DesktopIcons } from "@/components/desktop/DesktopIcons";
import { AppleHelloHero } from "@/components/desktop/AppleHelloHero";
import { NotificationCenter } from "@/components/ui/NotificationCenter";
import { MobileIDELayout } from "@/components/mobile/MobileIDELayout";
import { PORTFOLIO_DATA, FILE_TREE, FileItem } from "@/data/portfolioData";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export function IDELayout() {
  // Tabs state
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: "readme", name: "README.md", extension: "md" },
    { id: "pit-stop-live", name: "PitStopLive.java", extension: "java" },
    { id: "java-core", name: "Java.java", extension: "java" },
    { id: "spring-boot", name: "SpringBoot.java", extension: "java" },
    { id: "pom", name: "pom.xml", extension: "xml" },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>("readme");
  const [activeView, setActiveView] = useState<string>("explorer");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isBottomDockOpen, setIsBottomDockOpen] = useState<boolean>(true);
  const [bottomPanel, setBottomPanel] = useState<BottomPanelType>("terminal");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isQROpen, setIsQROpen] = useState<boolean>(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Starts in macOS desktop screen as requested on desktop
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>("theme-obsidian");
  
  // Audio enabled by default
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  // 3D Ambient Mouse Parallax Physics
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Multi-layered depth transforms
  const sphereLargeX = useTransform(smoothMouseX, [-0.5, 0.5], [28, -28]);
  const sphereLargeY = useTransform(smoothMouseY, [-0.5, 0.5], [24, -24]);
  const sphereSmallX = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const sphereSmallY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);
  const ringX = useTransform(smoothMouseX, [-0.5, 0.5], [16, -16]);
  const ringY = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const nebulaX = useTransform(smoothMouseX, [-0.5, 0.5], [-38, 38]);
  const nebulaY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  // Subtle 3D IDE perspective tilt
  const ideTiltX = useTransform(smoothMouseY, [-0.5, 0.5], [1.8, -1.8]);
  const ideTiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-1.8, 1.8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    rawMouseX.set(clientX / innerWidth - 0.5);
    rawMouseY.set(clientY / innerHeight - 0.5);
  };

  // Responsive default sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K, Escape, F10, Cmd+M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSoundEnabled) soundManager.playClick();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsMinimized((prev) => !prev);
      }
      if (e.key === "F10" && (e.metaKey || e.ctrlKey || e.shiftKey)) {
        e.preventDefault();
        handleRunBuild();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSoundEnabled]);

  // Find file name by ID
  const getFileInfo = (fileId: string): { name: string; extension?: string } => {
    if (fileId === "readme") return { name: "README.md", extension: "md" };
    if (fileId === "resume") return { name: "resume.pdf", extension: "pdf" };
    if (fileId === "pom") return { name: "pom.xml", extension: "xml" };
    if (fileId === "application-yml") return { name: "application.yml", extension: "yml" };

    const proj = PORTFOLIO_DATA.projects.find((p) => p.id === fileId);
    if (proj) return { name: proj.fileName, extension: "java" };

    const skill = PORTFOLIO_DATA.skills.find((s) => s.id === fileId);
    if (skill) return { name: skill.fileName, extension: "java" };

    if (fileId === "achievements-file") return { name: "Achievements.java", extension: "java" };
    if (fileId === "roadmap-file") return { name: "ActiveRoadmap.java", extension: "java" };
    if (fileId === "education-file") return { name: "ComputerEngineering.java", extension: "java" };
    if (fileId === "contact-file") return { name: "ContactAnuraj.java", extension: "java" };

    return { name: "README.md", extension: "md" };
  };

  const handleOpenFile = (fileId: string) => {
    if (isSoundEnabled) soundManager.playClick();
    if (fileId === "resume") {
      setIsResumePreviewOpen(true);
      return;
    }
    const exists = tabs.some((t) => t.id === fileId);
    if (!exists) {
      const fileInfo = getFileInfo(fileId);
      setTabs((prev) => [...prev, { id: fileId, name: fileInfo.name, extension: fileInfo.extension }]);
    }
    setActiveTabId(fileId);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoundEnabled) soundManager.playClick();
    const newTabs = tabs.filter((t) => t.id !== tabId);
    if (newTabs.length === 0) {
      setTabs([{ id: "readme", name: "README.md", extension: "md" }]);
      setActiveTabId("readme");
      return;
    }
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleRunBuild = () => {
    soundManager.playChime();
    setIsBottomDockOpen(true);
    setBottomPanel("run");
    showToast("Spring Boot Compiler", "Starting Spring Boot 3.3 runtime context...", "success");
  };

  const handleToggleSound = () => {
    const next = soundManager.toggleSound();
    setIsSoundEnabled(next);
    showToast("Keystroke Audio", next ? "Mechanical keystroke sound enabled" : "Audio muted", "audio");
  };

  const handleCycleTheme = () => {
    let next: ThemePreset = "theme-obsidian";
    let name = "Obsidian Crimson & Cyan";
    if (currentTheme === "theme-obsidian") {
      next = "theme-emerald";
      name = "Apple Emerald & Sapphire";
    } else if (currentTheme === "theme-emerald") {
      next = "theme-darcula";
      name = "Darcula Champagne Gold";
    }
    setCurrentTheme(next);
    showToast("Ambient Lighting", `${name} activated`, "theme");
  };

  const handleOpenIDE = () => {
    soundManager.playChime();
    setIsMinimized(false);
  };

  const activeFileInfo = getFileInfo(activeTabId);

  return (
    <>
      {/* =========================================================
          1. DEDICATED MOBILE DEVELOPER APP (SCREEN < 768px)
          ========================================================= */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileIDELayout
          currentTheme={currentTheme}
          onCycleTheme={handleCycleTheme}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
        />
      </div>

      {/* =========================================================
          2. COMPLETE DESKTOP MACOS FLOATING IDE (SCREEN >= 768px)
          ========================================================= */}
      <div 
        onMouseMove={handleMouseMove}
        className={`hidden md:flex relative min-h-screen w-full items-center justify-center p-2 sm:p-5 md:p-8 select-none overflow-hidden bg-[#030306] ${currentTheme}`}
      >
        
        {/* Top-Center Dynamic Island Notification Toasts */}
        <NotificationCenter />

        {/* Top macOS Menu Bar */}
        <MacOSMenuBar
          onOpenIDE={handleOpenIDE}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenQR={() => setIsQROpen(true)}
          onOpenResumePreview={() => setIsResumePreviewOpen(true)}
          onCycleTheme={handleCycleTheme}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
        />

        {/* Ambient Artwork with Mouse Parallax */}
        <div className="ambient-scene-container">
          <motion.div
            style={{ x: nebulaX, y: nebulaY }}
            className="nebula-purple-left"
          />

          <div className="ambient-red-glow" />

          <motion.div
            style={{ x: ringX, y: ringY }}
            animate={{ rotate: [-15, -10, -18, -15] }}
            transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
            className="orbital-ring-red"
          />

          <motion.div
            style={{ x: sphereLargeX, y: sphereLargeY }}
            animate={{
              scale: [1, 1.04, 0.97, 1],
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
            className="glass-sphere-red-large"
          />

          <motion.div
            style={{ x: sphereSmallX, y: sphereSmallY }}
            animate={{
              scale: [1, 1.08, 0.92, 1],
            }}
            transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
            className="glass-sphere-red-small"
          />
        </div>

        {/* Desktop Application Icons */}
        <DesktopIcons
          onOpenIDE={handleOpenIDE}
          onOpenResumePreview={() => setIsResumePreviewOpen(true)}
          onOpenQR={() => setIsQROpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Classic Apple Hello / Namaste Hero */}
        <AnimatePresence>
          {isMinimized && (
            <AppleHelloHero onOpenIDE={handleOpenIDE} />
          )}
        </AnimatePresence>

        {/* Main Floating Glass IDE Window */}
        <AnimatePresence mode="wait">
          {!isMinimized && (
            <motion.div
              key="ide-window"
              style={{ rotateX: ideTiltX, rotateY: ideTiltY }}
              initial={{ opacity: 0, scale: 0.85, y: 120 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.15, y: 280, transition: { duration: 0.32, ease: [0.32, 0, 0.67, 0] } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full flex flex-col floating-glass-ide transition-all duration-300 relative z-30 overflow-hidden ${
                isFullscreen
                  ? "fixed inset-0 h-screen rounded-none z-50"
                  : "h-[94vh] sm:h-[88vh] md:h-[82vh] max-h-[820px] min-h-[580px] w-[98vw] sm:w-[94vw] md:w-[90vw] lg:w-[86vw] xl:w-[82vw] max-w-[1300px] rounded-[22px] sm:rounded-[26px]"
              }`}
            >
              <TopBar
                activeFileName={activeFileInfo.name}
                onOpenSearch={() => setIsSearchOpen(true)}
                onRunBuild={handleRunBuild}
                onOpenContact={() => setIsContactOpen(true)}
                onOpenQR={() => setIsQROpen(true)}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                isSidebarOpen={isSidebarOpen}
                onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
                isFullscreen={isFullscreen}
                onMinimize={() => setIsMinimized(true)}
                onClose={() => setIsMinimized(true)}
              />

              <div className="flex-1 flex overflow-hidden relative min-h-0">
                <ActivityBar
                  activeView={activeView}
                  onSelectView={(v) => {
                    if (isSoundEnabled) soundManager.playClick();
                    setActiveView(v);
                    if (v === "explorer") setIsSidebarOpen(true);
                    if (v === "run") handleRunBuild();
                  }}
                  onOpenSearch={() => setIsSearchOpen(true)}
                  onOpenGit={() => {
                    setIsBottomDockOpen(true);
                    setBottomPanel("git");
                  }}
                  onOpenContact={() => setIsContactOpen(true)}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                />

                <ProjectExplorer
                  activeFileId={activeTabId}
                  onSelectFile={handleOpenFile}
                  isOpen={isSidebarOpen}
                  onCloseMobile={() => {
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                />

                <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
                  <EditorTabs
                    tabs={tabs}
                    activeTabId={activeTabId}
                    onSelectTab={(id) => {
                      if (isSoundEnabled) soundManager.playClick();
                      setActiveTabId(id);
                    }}
                    onCloseTab={handleCloseTab}
                    onNewTabSearch={() => setIsSearchOpen(true)}
                  />

                  <div className="flex-1 flex flex-col overflow-hidden min-h-0 apple-glass-editor">
                    <CodeEditor
                      activeFileId={activeTabId}
                      onOpenFile={handleOpenFile}
                      onRunBuild={handleRunBuild}
                      onOpenContact={() => setIsContactOpen(true)}
                      onOpenQR={() => setIsQROpen(true)}
                    />
                  </div>

                  <BottomDock
                    isOpen={isBottomDockOpen}
                    activePanel={bottomPanel}
                    onSelectPanel={(panel) => {
                      if (isSoundEnabled) soundManager.playClick();
                      setBottomPanel(panel);
                    }}
                    onToggleOpen={() => setIsBottomDockOpen((prev) => !prev)}
                    onOpenFile={handleOpenFile}
                    onRunBuild={handleRunBuild}
                    onOpenContact={() => setIsContactOpen(true)}
                    onOpenQR={() => setIsQROpen(true)}
                  />
                </main>

                <RightSidebar 
                  onOpenQR={() => setIsQROpen(true)} 
                  onOpenContact={() => setIsContactOpen(true)}
                  onOpenResumePreview={() => setIsResumePreviewOpen(true)}
                />
              </div>

              <StatusBar
                onOpenGit={() => {
                  setIsBottomDockOpen(true);
                  setBottomPanel("git");
                }}
                onOpenTerminal={() => {
                  setIsBottomDockOpen(true);
                  setBottomPanel("terminal");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized Dock */}
        <AnimatePresence>
          {isMinimized && (
            <MinimizedTaskbar
              onRestore={handleOpenIDE}
              onOpenQR={() => setIsQROpen(true)}
              onOpenResumePreview={() => setIsResumePreviewOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              onCycleTheme={handleCycleTheme}
              isSoundEnabled={isSoundEnabled}
              onToggleSound={handleToggleSound}
            />
          )}
        </AnimatePresence>

        {/* Floating Side Controls */}
        {!isMinimized && (
          <FloatingSideControls
            currentTheme={currentTheme}
            onCycleTheme={handleCycleTheme}
            isSoundEnabled={isSoundEnabled}
            onToggleSound={handleToggleSound}
            onOpenSettingsModal={() => setIsSettingsOpen(true)}
          />
        )}

        {/* Modals */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onOpenFile={handleOpenFile}
          onRunBuild={handleRunBuild}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenQR={() => setIsQROpen(true)}
        />

        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        <ResumeQRModal
          isOpen={isQROpen}
          onClose={() => setIsQROpen(false)}
        />

        <ResumePreviewModal
          isOpen={isResumePreviewOpen}
          onClose={() => setIsResumePreviewOpen(false)}
          onOpenQR={() => setIsQROpen(true)}
        />

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          currentTheme={currentTheme}
          onSelectTheme={(t) => setCurrentTheme(t)}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
        />

      </div>
    </>
  );
}
