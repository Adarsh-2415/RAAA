"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  breadcrumbLabel: string;
}

export function CSRHero({ title, breadcrumbLabel }: HeroProps) {
  return (
    <div className="bg-[#0F172A] text-white py-16 border-b border-white/10 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%) pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/50 space-x-2 font-sans tracking-wide">
          <span>Home</span>
          <span>/</span>
          <span>CSR</span>
          <span>/</span>
          <span className="text-accent-gold">{breadcrumbLabel}</span>
        </nav>
        
        {/* Tagline */}
        <span className="inline-block px-3 py-1 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full text-[10px] font-bold tracking-widest text-[#E5C158] uppercase">
          Corporate Social Responsibility
        </span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight max-w-3xl mx-auto"
        >
          {title}
        </motion.h1>

        {/* Gold Accent Line */}
        <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
      </div>
    </div>
  );
}
export default CSRHero;
