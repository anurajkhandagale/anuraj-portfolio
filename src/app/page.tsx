"use client";

import React, { useState } from "react";
import { IDELayout } from "@/components/ide/IDELayout";
import { PageLoader } from "@/components/PageLoader";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <PageLoader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen w-full bg-[#05070d]"
        >
          <IDELayout />
        </motion.div>
      )}
    </>
  );
}
