"use client";

import React, { useState, useEffect } from "react";
import { 
  ToastNotification, 
  notificationManager 
} from "@/utils/notifications";
import { 
  Code2, 
  CheckCircle2, 
  CreditCard, 
  Volume2, 
  Palette, 
  Info, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((items) => {
      setNotifications(items);
    });
    return unsubscribe;
  }, []);

  const getIcon = (type?: string) => {
    switch (type) {
      case "card":
        return <CreditCard size={15} className="text-amber-400" />;
      case "audio":
        return <Volume2 size={15} className="text-emerald-400" />;
      case "theme":
        return <Palette size={15} className="text-purple-400" />;
      case "success":
        return <CheckCircle2 size={15} className="text-emerald-400" />;
      default:
        return <Code2 size={15} className="text-[#d4a574]" />;
    }
  };

  return (
    <div className="fixed top-9 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none select-none max-w-md w-full px-4">
      <AnimatePresence>
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.92, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="pointer-events-auto p-3 sm:p-3.5 rounded-2xl apple-modal-glass border border-white/20 shadow-2xl backdrop-blur-2xl flex items-center gap-3 relative overflow-hidden group w-full max-w-sm"
          >
            {/* App Icon Container */}
            <div className="p-2 rounded-xl bg-white/[0.06] border border-white/15 shrink-0 shadow-sm">
              {getIcon(item.type)}
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-0.5 min-w-0 pr-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-white tracking-tight truncate">
                  {item.title}
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  {item.timestamp || "now"}
                </span>
              </div>
              <p className="text-xs font-sans text-slate-300 leading-tight truncate">
                {item.message}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => notificationManager.dismiss(item.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shrink-0"
            >
              <X size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
