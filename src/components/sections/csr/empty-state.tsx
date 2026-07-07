"use client";

import React from "react";
import { Award } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function CSREmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="w-full max-w-lg mx-auto py-16 px-6 text-center bg-white border border-border-custom/80 rounded-3xl shadow-xs space-y-5">
      {/* Premium Branded Placeholder Icon */}
      <div className="w-16 h-16 bg-[#FAFAF8] text-accent-gold rounded-full flex items-center justify-center mx-auto border border-border-custom/50 shadow-xs">
        <Award size={28} />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-primary-navy font-heading">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
export default CSREmptyState;
