"use client";

import React from "react";
import { motion } from "framer-motion";

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryFilters({ categories, selectedCategory, onSelect }: FiltersProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-5 py-2 rounded-full text-xs font-bold font-sans tracking-wide transition-all duration-200 border cursor-pointer ${
              isSelected
                ? "bg-primary-navy border-primary-navy text-white shadow-sm"
                : "bg-white border-border-custom text-text-secondary hover:border-accent-gold hover:text-accent-gold"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
export default CategoryFilters;
