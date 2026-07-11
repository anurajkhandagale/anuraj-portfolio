"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], offset = 150) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Find current scroll position
      const scrollPosition = window.scrollY + offset;

      // Special case: if we are at the very bottom, highlight the last section (contact)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20
      ) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Check which section is currently in viewport
      for (let i = 0; i < sectionIds.length; i++) {
        const currentId = sectionIds[i];
        const element = document.getElementById(currentId);
        
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          const nextElement = i < sectionIds.length - 1 ? document.getElementById(sectionIds[i + 1]) : null;
          const bottom = nextElement ? nextElement.offsetTop : top + height;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(currentId);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
