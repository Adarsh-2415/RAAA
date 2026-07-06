"use client";

import React from "react";
import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none">
      <div className="w-[1px] h-12 bg-border-custom relative overflow-hidden">
        <motion.div
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 right-0 h-4 bg-accent-gold"
        />
      </div>
      <span className="font-heading text-[9px] font-bold tracking-widest text-text-secondary uppercase mt-2">
        Scroll
      </span>
    </div>
  );
}
