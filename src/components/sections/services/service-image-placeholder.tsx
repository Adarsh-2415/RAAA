"use client";

import React from "react";
import { Image as ImageIcon } from "lucide-react";

export function ServiceImagePlaceholder() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl border border-border-custom bg-bg-warm flex flex-col items-center justify-center text-text-secondary/40 shadow-xs overflow-hidden group">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      <ImageIcon size={36} className="text-text-secondary/30 transition-transform duration-300 group-hover:scale-110" />
      <span className="mt-3 text-xs font-semibold tracking-wider uppercase font-sans">
        Service Image Placeholder
      </span>
    </div>
  );
}
export default ServiceImagePlaceholder;
