"use client";

import React from "react";
import { PORTFOLIO_DATA, FILE_TREE, FileItem } from "@/data/portfolioData";
import { ReadmeView } from "./file-views/ReadmeView";
import { ProjectFileView } from "./file-views/ProjectFileView";
import { SkillFileView } from "./file-views/SkillFileView";
import { EducationFileView } from "./file-views/EducationFileView";
import { ExperienceFileView } from "./file-views/ExperienceFileView";
import { PomXmlView } from "./file-views/PomXmlView";
import { ApplicationYmlView } from "./file-views/ApplicationYmlView";
import { ResumeView } from "./file-views/ResumeView";
import { ContactFileView } from "./file-views/ContactFileView";
import { ChevronRight, Folder, FileText, Coffee, FileCode2, Settings } from "lucide-react";

interface CodeEditorProps {
  activeFileId: string;
  onOpenFile: (fileId: string) => void;
  onRunBuild: () => void;
  onOpenContact: () => void;
  onOpenQR?: () => void;
}

export function CodeEditor({
  activeFileId,
  onOpenFile,
  onRunBuild,
  onOpenContact,
  onOpenQR,
}: CodeEditorProps) {
  const { projects, skills } = PORTFOLIO_DATA;

  // Breadcrumb generator
  const getBreadcrumb = (fileId: string) => {
    if (fileId === "readme") return ["anuraj-developer-portfolio", "README.md"];
    if (fileId === "resume") return ["anuraj-developer-portfolio", "resume.pdf"];
    if (fileId === "pom") return ["anuraj-developer-portfolio", "pom.xml"];
    if (fileId === "application-yml") return ["anuraj-developer-portfolio", "application.yml"];

    // Check project
    const proj = projects.find((p) => p.id === fileId);
    if (proj) return ["anuraj-developer-portfolio", "src", "projects", proj.fileName];

    // Check skills
    const skill = skills.find((s) => s.id === fileId);
    if (skill) return ["anuraj-developer-portfolio", "src", "skills", skill.fileName];

    if (fileId === "achievements-file") return ["anuraj-developer-portfolio", "src", "experience", "Achievements.java"];
    if (fileId === "roadmap-file") return ["anuraj-developer-portfolio", "src", "experience", "ActiveRoadmap.java"];
    if (fileId === "education-file") return ["anuraj-developer-portfolio", "src", "education", "SavitribaiPhulePuneUniv.java"];
    if (fileId === "contact-file") return ["anuraj-developer-portfolio", "src", "contact", "ContactAnuraj.java"];

    return ["anuraj-developer-portfolio", "README.md"];
  };

  const breadcrumbs = getBreadcrumb(activeFileId);

  // Render the appropriate file view
  const renderView = () => {
    if (activeFileId === "readme") {
      return (
        <ReadmeView
          onOpenFile={onOpenFile}
          onRunBuild={onRunBuild}
          onOpenContact={onOpenContact}
          onOpenQR={onOpenQR}
        />
      );
    }

    // Projects
    const matchedProject = projects.find((p) => p.id === activeFileId);
    if (matchedProject) {
      return <ProjectFileView project={matchedProject} />;
    }

    // Skills
    const matchedSkill = skills.find((s) => s.id === activeFileId);
    if (matchedSkill) {
      return <SkillFileView skill={matchedSkill} />;
    }

    // Education
    if (activeFileId === "education-file") {
      return <EducationFileView />;
    }

    // Experience
    if (activeFileId === "achievements-file") {
      return <ExperienceFileView type="achievements" />;
    }
    if (activeFileId === "roadmap-file") {
      return <ExperienceFileView type="roadmap" />;
    }

    // Maven POM
    if (activeFileId === "pom") {
      return <PomXmlView />;
    }

    // Application YAML
    if (activeFileId === "application-yml") {
      return <ApplicationYmlView />;
    }

    // Resume
    if (activeFileId === "resume") {
      return <ResumeView onOpenQR={onOpenQR} />;
    }

    // Contact
    if (activeFileId === "contact-file") {
      return <ContactFileView onTriggerModal={onOpenContact} />;
    }

    // Fallback to Readme
    return (
      <ReadmeView
        onOpenFile={onOpenFile}
        onRunBuild={onRunBuild}
        onOpenContact={onOpenContact}
        onOpenQR={onOpenQR}
      />
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
      {/* Breadcrumbs navigation */}
      <div className="h-7 px-4 bg-black/30 border-b border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400 select-none overflow-x-auto no-scrollbar shrink-0">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight size={10} className="text-slate-600 shrink-0" />}
            <span className={idx === breadcrumbs.length - 1 ? "text-slate-200 font-medium" : "hover:text-slate-300"}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Editor Content Area with subtle ambient glass background */}
      <div className="flex-1 overflow-y-auto apple-glass-editor relative">
        {renderView()}
      </div>
    </div>
  );
}
