"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed left-6 top-[20%] bottom-[20%] w-8 z-40 select-none pointer-events-none hidden lg:block">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 600"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* Background Subtle Curved Track */}
        <path
          d="M12,0 C24,100 0,200 12,300 C24,400 0,500 12,600"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.06"
        />

        {/* Scrolling Active Progress Indicator */}
        <motion.path
          d="M12,0 C24,100 0,200 12,300 C24,400 0,500 12,600"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </div>
  );
}
