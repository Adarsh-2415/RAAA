"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

export function DashboardError({ message, onRetry }: ErrorProps) {
  return (
    <div className="w-full max-w-lg mx-auto py-16 px-6 text-center bg-white border border-border-custom/80 rounded-3xl shadow-xs space-y-5">
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-100 shadow-xs">
        <AlertCircle size={28} />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-primary-navy font-heading">
          {message}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm mx-auto">
          Unable to load dashboard data. Please try again.
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200 cursor-pointer"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
export default DashboardError;
