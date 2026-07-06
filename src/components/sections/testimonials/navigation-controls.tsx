"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export function NavigationControls({ onPrev, onNext }: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8 sm:mt-0 sm:absolute sm:inset-y-1/2 sm:-translate-y-1/2 sm:w-full sm:justify-between sm:px-4 pointer-events-none">
      <button
        onClick={onPrev}
        aria-label="Previous testimonial"
        className="p-3 rounded-full border border-border-custom bg-white text-primary-navy hover:bg-accent-gold hover:text-primary-navy transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 pointer-events-auto cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        aria-label="Next testimonial"
        className="p-3 rounded-full border border-border-custom bg-white text-primary-navy hover:bg-accent-gold hover:text-primary-navy transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 pointer-events-auto cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
export default NavigationControls;
