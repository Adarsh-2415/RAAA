"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroButtonsProps {
  primaryButton: { label: string; href: string };
}

export function HeroButtons({ primaryButton }: HeroButtonsProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 pt-4">
      {/* Premium Pill-shaped Action Button */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        <Link
          href={primaryButton.href}
          className="flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider text-primary-navy bg-white hover:bg-[#C9A227] hover:text-primary-navy hover:scale-105 transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A227] shadow-lg"
        >
          {primaryButton.label}
        </Link>
      </motion.div>
    </div>
  );
}
