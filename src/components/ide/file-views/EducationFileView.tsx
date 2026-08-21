"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GraduationCap, Award, MapPin, Calendar, Code2, BookOpen, CheckCircle2 } from "lucide-react";

export function EducationFileView() {
  const [viewMode, setViewMode] = useState<"code" | "visual">("code");
  const { education } = PORTFOLIO_DATA;

  const educationJavaCode = `package com.anuraj.portfolio.education;

import java.util.List;

/**
 * Savitribai Phule Pune University (SPPU) Academic Record
 * 
 * @author Anuraj Laxman Khandagale
 */
public class SavitribaiPhulePuneUniv implements AcademicCredential {

    private final String university = "Savitribai Phule Pune University (SPPU)";
    private final String degree = "Bachelor of Engineering (B.E.)";
    private final String department = "Computer Engineering";
    private final double cumulativeGpa = 8.12; // 8.12 / 10.00
    private final String status = "Graduated";

    public List<String> getCoreDisciplines() {
        return List.of(
            "Data Structures & Algorithms (Arrays, Linked Lists, Trees, Graphs, DP)",
            "Object-Oriented Programming & Software Design (SOLID, Design Patterns)",
            "Database Management Systems (Relational Algebra, SQL, Normalization)",
            "Operating Systems (Process Management, Synchronization, Virtual Memory)",
            "Computer Networks (OSI Model, TCP/IP, Protocols, Socket Programming)",
            "System Programming & Operating System Internals"
        );
    }

    public SecondaryEducation[] getPriorEducation() {
        return new SecondaryEducation[] {
            new SecondaryEducation("MSBSHSC 12th Grade", "Science & CS Stream", "88.67%"),
            new SecondaryEducation("CBSE 10th Grade", "General Curriculum", "72.60%")
        };
    }
}`;

  const codeLines = educationJavaCode.split("\n");

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 apple-glass-topbar px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono text-xs font-bold">
            ACADEMIC
          </span>
          <h2 className="text-sm font-bold text-white font-mono">
            SavitribaiPhulePuneUniv.java
            <span className="text-xs text-slate-400 font-sans font-normal ml-2 hidden sm:inline">
              (SPPU B.E. Computer Engineering)
            </span>
          </h2>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setViewMode("code")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "code" ? "bg-white/15 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Code2 size={13} />
            <span>Java Source</span>
          </button>
          <button
            onClick={() => setViewMode("visual")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "visual" ? "bg-white/15 text-white font-bold text-[#d4a574]" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} />
            <span>Timeline Card</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6">
        {viewMode === "code" ? (
          <div className="rounded-xl apple-glass-editor border border-white/10 overflow-hidden shadow-2xl">
            <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>com.anuraj.portfolio.education.SavitribaiPhulePuneUniv</span>
              <span className="text-emerald-400 font-bold">Graduated • CGPA: 8.12</span>
            </div>
            
            <div className="p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed">
              <table className="w-full border-collapse">
                <tbody>
                  {codeLines.map((line, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="w-10 pr-4 text-right select-none text-slate-600 group-hover:text-slate-400 font-mono text-xs">
                        {idx + 1}
                      </td>
                      <td className="pl-2 whitespace-pre text-slate-200">
                        {line}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 select-text">
            {education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-2xl apple-glass-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#d4a574]/15 text-[#d4a574]">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {edu.degree}
                        {edu.field && (
                          <span className="text-sm font-normal text-slate-400 block sm:inline sm:before:content-['•_'] sm:before:mx-1">
                            {edu.field}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} />
                        {edu.institution}, {edu.location}
                      </p>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs">
                    {edu.grade}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5 pt-3">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
