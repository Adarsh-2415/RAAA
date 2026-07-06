"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface HeroBackgroundProps {
  slides: { src: string; alt: string }[];
}

export function HeroBackground({ slides }: HeroBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Shift slides automatically every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides || slides.length === 0) {
    return <div className="absolute inset-0 bg-primary-navy" />;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-primary-navy pointer-events-none select-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Deep dark vignette mask layer to secure readability and text contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.4))"
        }}
      />
    </div>
  );
}
export default HeroBackground;
