"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function CSRLightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }: LightboxProps) {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer z-50 p-2"
        >
          <X size={24} />
        </button>

        {/* Previous Button */}
        <button
          onClick={onPrev}
          aria-label="Previous Image"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer z-50 p-2 bg-white/5 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image Container viewport */}
        <div className="relative w-full max-w-4xl aspect-[16/10] overflow-hidden flex items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Gallery detail view ${currentIndex + 1}`}
              fill
              sizes="(max-width: 1200px) 100vw, 80vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          aria-label="Next Image"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer z-50 p-2 bg-white/5 rounded-full"
        >
          <ChevronRight size={24} />
        </button>

        {/* Counter Indicators */}
        <div className="absolute bottom-4 text-xs text-white/60 font-sans tracking-wide">
          <span>{currentIndex + 1}</span>
          <span className="mx-1">/</span>
          <span>{images.length}</span>
        </div>

      </div>
    </AnimatePresence>
  );
}
export default CSRLightbox;
