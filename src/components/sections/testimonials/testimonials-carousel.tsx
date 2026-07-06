"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TestimonialItem } from "./testimonial-types";
import { TestimonialCard } from "./testimonial-card";
import { NavigationControls } from "./navigation-controls";
import { Pagination } from "./pagination";

interface TestimonialsCarouselProps {
  items: TestimonialItem[];
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left exit, 1 for right exit
  const isHovered = useRef(false);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handlePageChange = (target: number) => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  };

  // Auto-play sliding interval loop
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered.current) {
        handleNext();
      }
    }, 6000); // 6 seconds slide change duration

    return () => clearInterval(timer);
  }, [items.length, index]);

  // Animation variants mapping slide cross-fade offsets
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 180, damping: 22 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 180, damping: 22 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto overflow-visible px-4 py-8 flex flex-col justify-center"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      <div className="relative w-full overflow-hidden min-h-[360px] sm:min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex justify-center"
          >
            <TestimonialCard item={items[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Arrow Controls */}
      <NavigationControls onPrev={handlePrev} onNext={handleNext} />

      {/* Pagination progress line tracking indicators */}
      <Pagination total={items.length} current={index} onChange={handlePageChange} />
    </div>
  );
}
export default TestimonialsCarousel;
