"use client";

import React from "react";
import { CheckSquare, Square } from "lucide-react";

export function TodoView() {
  const todos = [
    { text: "Join high-performing product engineering team as SDE / Backend Developer", done: false, priority: "HIGH" },
    { text: "Deploy Spring Boot microservices with Spring Cloud Gateway & Eureka", done: false, priority: "MEDIUM" },
    { text: "Build event-driven telemetry pipeline using Apache Kafka topic partitions", done: false, priority: "MEDIUM" },
    { text: "Graduate B.E. in Computer Engineering from SPPU with 8.12 CGPA", done: true, priority: "HIGH" },
    { text: "Solve 200+ Data Structures & Algorithms challenges", done: true, priority: "HIGH" },
    { text: "Build AI Email Response Generator with non-blocking Spring WebClient", done: true, priority: "HIGH" },
    { text: "Build Pit Stop Live with sub-2s PostgreSQL spatial querying", done: true, priority: "HIGH" },
  ];

  return (
    <div className="flex flex-col h-full bg-black/60 font-mono text-xs p-3 space-y-3 overflow-y-auto select-text">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-slate-400">Workspace Engineering Milestones</span>
        <span className="text-emerald-400 font-bold">4 / 7 Completed</span>
      </div>

      <div className="space-y-1.5">
        {todos.map((todo, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg flex items-center justify-between gap-3 border ${
              todo.done ? "bg-white/[0.02] border-white/5 text-slate-400" : "bg-white/5 border-white/10 text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {todo.done ? (
                <CheckSquare size={14} className="text-emerald-400 shrink-0" />
              ) : (
                <Square size={14} className="text-[#d4a574] shrink-0" />
              )}
              <span className={todo.done ? "line-through text-slate-500" : ""}>{todo.text}</span>
            </div>

            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
              todo.done ? "bg-white/5 text-slate-500" : "bg-[#d4a574]/15 text-[#d4a574]"
            }`}>
              {todo.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
