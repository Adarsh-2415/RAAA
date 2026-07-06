"use client";

import React from "react";
import { motion } from "framer-motion";

interface TestimonialsHeaderProps {
  tagline: string;
  headline: string;
  description: string;
}

export function TestimonialsHeader({
  tagline,
  headline,
  description,
}: TestimonialsHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-bold tracking-widest text-accent-gold uppercase"
      >
        {tagline}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-3 text-3xl sm:text-4xl font-extrabold text-primary-navy tracking-tight"
      >
        {headline}
      </motion.h2>
      <div className="mt-4 h-1 w-12 bg-accent-gold mx-auto rounded-full" />
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-sm sm:text-base text-text-secondary leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
}
export default TestimonialsHeader;
