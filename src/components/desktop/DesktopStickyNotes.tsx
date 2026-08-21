"use client";

import React, { useState, useEffect } from "react";
import { 
  Pin, 
  X, 
  Plus, 
  RotateCcw, 
  Edit3, 
  Check, 
  Minimize2, 
  Maximize2,
  StickyNote
} from "lucide-react";
import { soundManager } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

export interface StickyNoteItem {
  id: string;
  category: string;
  pinColor: string;
  tagColor: string;
  quote: string;
  author: string;
  defaultPosition: { x: number; y: number };
  defaultRotation: number;
}

const PIN_COLORS = [
  { pin: "bg-amber-400 border-amber-500 text-amber-950", tag: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
  { pin: "bg-emerald-400 border-emerald-500 text-emerald-950", tag: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
  { pin: "bg-sky-400 border-sky-500 text-sky-950", tag: "text-sky-400 bg-sky-400/10 border-sky-400/30" },
  { pin: "bg-rose-400 border-rose-500 text-rose-950", tag: "text-rose-400 bg-rose-400/10 border-rose-400/30" },
  { pin: "bg-purple-400 border-purple-500 text-purple-950", tag: "text-purple-400 bg-purple-400/10 border-purple-400/30" },
];

export function DesktopStickyNotes() {
  const [notes, setNotes] = useState<StickyNoteItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [minimizedNotes, setMinimizedNotes] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted notes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("anuraj_desktop_sticky_notes");
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  // Save notes to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("anuraj_desktop_sticky_notes", JSON.stringify(notes));
    } catch {}
  }, [notes, isLoaded]);

  const handleUpdateText = (id: string, newText: string) => {
    soundManager.playClick();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, quote: newText } : n))
    );
  };

  const handleUpdateAuthor = (id: string, newAuthor: string) => {
    soundManager.playClick();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, author: newAuthor } : n))
    );
  };

  const handleAddNewNote = () => {
    soundManager.playClick();
    const randomColor = PIN_COLORS[Math.floor(Math.random() * PIN_COLORS.length)];
    const newNote: StickyNoteItem = {
      id: `custom-${Date.now()}`,
      category: "Quick Memo",
      pinColor: randomColor.pin,
      tagColor: randomColor.tag,
      quote: "Write recruiter notes, interview feedback, or quick ideas here...",
      author: "— Visitor Note",
      defaultPosition: { x: 0, y: notes.length * 15 },
      defaultRotation: (Math.random() - 0.5) * 4,
    };
    setNotes((prev) => [newNote, ...prev]);
    setEditingId(newNote.id);
    showToast("Sticky Note Created", "Click note to edit text anytime", "success");
    soundManager.playChime();
  };

  const handleDelete = (id: string) => {
    soundManager.playClick();
    setNotes((prev) => prev.filter((n) => n.id !== id));
    showToast("Sticky Note Removed", "Note deleted", "info");
  };

  const handleClearAll = () => {
    soundManager.playClick();
    setNotes([]);
    setMinimizedNotes([]);
    setEditingId(null);
    try {
      localStorage.removeItem("anuraj_desktop_sticky_notes");
    } catch {}
    showToast("Notes Cleared", "Desktop notes cleared", "info");
  };

  const handleToggleMinimize = (id: string) => {
    soundManager.playClick();
    setMinimizedNotes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed top-12 sm:top-14 right-4 sm:right-6 md:right-8 z-30 pointer-events-none select-none flex flex-col items-end gap-3">
      
      {/* Top Action Bar (Safely anchored inside the right viewport edge) */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={handleAddNewNote}
          className="h-7 px-3 rounded-full apple-glass-card border border-white/20 hover:border-[#d4a574]/60 bg-black/50 hover:bg-black/70 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xl hover:shadow-2xl backdrop-blur-2xl active:scale-95"
        >
          <StickyNote size={12} className="text-[#d4a574]" />
          <span>+ Sticky Note</span>
        </button>

        {notes.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            title="Clear All Notes"
            className="w-7 h-7 rounded-full apple-glass-card border border-white/15 hover:border-rose-500/40 bg-black/40 hover:bg-black/60 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-2xl active:scale-95"
          >
            <RotateCcw size={11} />
          </button>
        )}
      </div>

      {/* Render Active Notes inside safe boundaries */}
      <div className="relative w-[230px] sm:w-[260px] flex flex-col gap-3">
        <AnimatePresence>
          {notes.map((note) => {
            const isMinimized = minimizedNotes.includes(note.id);
            const isEditing = editingId === note.id;

            return (
              <motion.div
                key={note.id}
                drag={!isEditing}
                dragMomentum={false}
                dragElastic={0.1}
                initial={{ opacity: 0, scale: 0.85, y: -10, rotate: note.defaultRotation }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: note.defaultRotation }}
                exit={{ opacity: 0, scale: 0.7, y: 15 }}
                whileDrag={{
                  scale: 1.04,
                  rotate: 0,
                  zIndex: 50,
                  cursor: "grabbing",
                }}
                className="pointer-events-auto cursor-grab active:cursor-grabbing w-full"
              >
                {/* Frosted Glass Sticky Card */}
                <div className="w-full rounded-3xl apple-modal-glass border border-white/25 hover:border-white/40 shadow-2xl backdrop-blur-2xl p-4 space-y-2.5 relative group transition-colors overflow-hidden">
                  
                  {/* Physical Glass Push Pin */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border shadow-md flex items-center justify-center ${note.pinColor}`}
                    >
                      <Pin size={8} className="rotate-45" />
                    </div>
                  </div>

                  {/* Card Controls Header */}
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${note.tagColor}`}
                    >
                      {note.category}
                    </span>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* Toggle Edit / Save */}
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setEditingId(isEditing ? null : note.id);
                        }}
                        title={isEditing ? "Save note" : "Edit note"}
                        className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {isEditing ? <Check size={11} className="text-emerald-400" /> : <Edit3 size={11} />}
                      </button>

                      {/* Minimize */}
                      <button
                        type="button"
                        onClick={() => handleToggleMinimize(note.id)}
                        title={isMinimized ? "Expand note" : "Minimize note"}
                        className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {isMinimized ? <Maximize2 size={10} /> : <Minimize2 size={10} />}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        title="Delete note"
                        className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Note Content */}
                  {!isMinimized && (
                    <>
                      {isEditing ? (
                        <div className="space-y-1.5 pt-0.5">
                          <textarea
                            rows={3}
                            value={note.quote}
                            onChange={(e) => handleUpdateText(note.id, e.target.value)}
                            placeholder="Write your note here..."
                            className="w-full p-2 text-xs font-sans text-white bg-black/50 border border-white/30 rounded-xl resize-none focus:outline-none focus:border-[#d4a574] leading-snug backdrop-blur-md"
                            autoFocus
                          />
                          <input
                            type="text"
                            value={note.author}
                            onChange={(e) => handleUpdateAuthor(note.id, e.target.value)}
                            placeholder="Author / Tag"
                            className="w-full px-2 py-1 text-[10px] font-mono text-[#d4a574] bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-[#d4a574]"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            soundManager.playClick();
                            setEditingId(note.id);
                          }}
                          className="cursor-text"
                          title="Click to edit and write"
                        >
                          <p className="text-xs font-serif text-slate-100 leading-snug italic font-normal hover:text-white transition-colors">
                            “{note.quote}”
                          </p>

                          <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#d4a574]">
                            <span className="truncate max-w-[130px]">{note.author}</span>
                            <span className="text-[9px] text-slate-400 group-hover:text-[#d4a574] transition-colors flex items-center gap-0.5">
                              <Edit3 size={8} /> edit
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
