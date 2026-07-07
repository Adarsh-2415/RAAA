"use client";

import React from "react";
import { Newspaper } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function EmptyState({ title, description, actionLabel, onActionClick }: EmptyStateProps) {
  return (
    <div className="w-full max-w-lg mx-auto py-16 px-6 text-center bg-white border border-border-custom/80 rounded-3xl shadow-xs space-y-5">
      {/* Premium Corporate Icon Container */}
      <div className="w-16 h-16 bg-[#FAFAF8] text-accent-gold rounded-full flex items-center justify-center mx-auto border border-border-custom/50 shadow-xs">
        <Newspaper size={28} />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-primary-navy font-heading">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {actionLabel && onActionClick && (
        <div className="pt-2">
          <button
            onClick={onActionClick}
            className="px-6 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200 cursor-pointer"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}
export default EmptyState;
