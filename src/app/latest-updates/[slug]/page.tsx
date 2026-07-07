"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function DynamicArticlePage() {
  return (
    <div className="w-full bg-bg-warm min-h-screen font-sans py-20 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center space-y-6">
        
        {/* Error icon */}
        <div className="w-16 h-16 bg-[#FAFAF8] text-accent-gold rounded-full flex items-center justify-center mx-auto border border-border-custom/50 shadow-xs">
          <AlertCircle size={28} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-primary-navy font-heading">
            Update Unavailable
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm mx-auto">
            This update is currently unavailable. It may have been moved, deleted, or is not yet published.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/latest-updates"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200"
          >
            <ArrowLeft size={14} />
            <span>Back to Latest Updates</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
