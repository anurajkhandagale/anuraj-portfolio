"use client";

import React, { useState, useEffect } from "react";
import { 
  Headphones, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  CloudRain, 
  Radio, 
  Keyboard, 
  ChevronDown,
  Sparkles,
  Sliders
} from "lucide-react";
import { soundManager, SoundscapeType } from "@/utils/audio";
import { showToast } from "@/utils/notifications";
import { motion, AnimatePresence } from "framer-motion";

export function AmbientSoundscapePlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundscapeType>("lofi");
  const [volume, setVolume] = useState(0.35);

  const tracks: { id: SoundscapeType; name: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      id: "lofi",
      name: "Lo-Fi Coding Waves",
      desc: "Warm synth chords & mellow sub-bass",
      icon: <Radio size={14} className="text-[#d4a574]" />,
      color: "text-[#d4a574]",
    },
    {
      id: "rain",
      name: "Rainy Cafe Ambience",
      desc: "Gentle pink noise rain & soft droplet taps",
      icon: <CloudRain size={14} className="text-sky-400" />,
      color: "text-sky-400",
    },
    {
      id: "typing",
      name: "Mechanical Typing Flow",
      desc: "Rhythmic mechanical keystroke focus",
      icon: <Keyboard size={14} className="text-emerald-400" />,
      color: "text-emerald-400",
    },
  ];

  const handleTogglePlay = () => {
    soundManager.playClick();
    if (isPlaying) {
      soundManager.stopSoundscape();
      setIsPlaying(false);
      showToast("Ambient Audio", "Soundscape paused", "audio");
    } else {
      soundManager.startSoundscape(currentTrack);
      setIsPlaying(true);
      const active = tracks.find((t) => t.id === currentTrack);
      showToast("Ambient Soundscape", `Playing ${active?.name}`, "audio");
    }
  };

  const handleSelectTrack = (trackId: SoundscapeType) => {
    soundManager.playClick();
    setCurrentTrack(trackId);
    if (isPlaying) {
      soundManager.startSoundscape(trackId);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundManager.setSoundscapeVolume(val);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#ambient-player-container")) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const activeTrackObj = tracks.find((t) => t.id === currentTrack);

  return (
    <div id="ambient-player-container" className="relative flex items-center">
      {/* Menu Bar Island Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`h-5 px-2 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
          isPlaying
            ? "bg-white/15 border-[#d4a574]/40 text-white shadow-sm"
            : "bg-white/[0.04] hover:bg-white/10 border-white/10 text-slate-300"
        }`}
      >
        <Headphones size={11} className={isPlaying ? "text-[#d4a574] animate-pulse" : "text-slate-400"} />
        
        {/* Animated Waveform Bars when playing */}
        {isPlaying ? (
          <div className="flex items-center gap-[2px] h-2.5">
            <motion.span
              animate={{ height: ["3px", "10px", "4px"] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="w-[2px] bg-[#d4a574] rounded-full"
            />
            <motion.span
              animate={{ height: ["8px", "3px", "10px"] }}
              transition={{ repeat: Infinity, duration: 0.7, delay: 0.2, ease: "easeInOut" }}
              className="w-[2px] bg-amber-400 rounded-full"
            />
            <motion.span
              animate={{ height: ["4px", "9px", "2px"] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.4, ease: "easeInOut" }}
              className="w-[2px] bg-yellow-300 rounded-full"
            />
          </div>
        ) : (
          <span className="hidden md:inline font-mono text-[10px] text-slate-400">Lo-Fi</span>
        )}

        <ChevronDown size={10} className="text-slate-400" />
      </button>

      {/* Apple-Style Glass Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-8 right-0 w-72 p-4 rounded-3xl apple-modal-glass border border-white/20 shadow-2xl backdrop-blur-2xl z-50 select-none space-y-3.5"
          >
            {/* Header & Master Play/Pause */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-[#d4a574]/20 text-[#d4a574]">
                  <Headphones size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Synthesized Lo-Fi</h4>
                  <p className="text-[10px] font-mono text-slate-400">Procedural Web Audio</p>
                </div>
              </div>

              {/* Play / Pause Pill Button */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className={`p-2 rounded-2xl transition-all cursor-pointer shadow-lg flex items-center justify-center ${
                  isPlaying
                    ? "bg-[#d4a574] text-slate-950 hover:bg-[#c39360]"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                }`}
              >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
              </button>
            </div>

            {/* Track Selector List */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={10} className="text-[#d4a574]" />
                <span>Ambient Soundscapes</span>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                {tracks.map((t) => {
                  const isSelected = currentTrack === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTrack(t.id)}
                      className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between border ${
                        isSelected
                          ? "bg-white/15 border-white/25 text-white shadow-md"
                          : "bg-white/[0.03] hover:bg-white/[0.07] border-white/5 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-xl bg-white/10 shrink-0">
                          {t.icon}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold font-sans flex items-center gap-1.5">
                            <span>{t.name}</span>
                            {isSelected && isPlaying && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-sans leading-none">{t.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Volume2 size={11} />
                  <span>Ambience Volume</span>
                </span>
                <span>{Math.round(volume * 100)}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4a574]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
