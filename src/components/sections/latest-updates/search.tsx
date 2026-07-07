"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/40 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search Latest Updates..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-border-custom rounded-full text-sm font-sans focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/45 shadow-xs transition-all duration-200"
        />
      </div>
    </div>
  );
}
export default SearchBar;
