"use client";

import React from "react";

interface PaginationProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export function Pagination({ total, current, onChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            onClick={() => onChange(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              isActive ? "w-8 bg-accent-gold" : "w-2 bg-border-custom hover:bg-text-secondary"
            }`}
          />
        );
      })}
    </div>
  );
}
export default Pagination;
