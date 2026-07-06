"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { TestimonialItem } from "./testimonial-types";

interface TestimonialCardProps {
  item: TestimonialItem;
}

export function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white border border-border-custom/80 rounded-2xl p-8 sm:p-12 shadow-xs hover:shadow-md transition-all duration-300 group overflow-hidden select-none">
      
      {/* Decorative Gold top line expanding on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

      {/* Decorative Background Quote Icon */}
      <Quote className="absolute right-8 top-8 w-20 h-20 text-accent-gold/5 pointer-events-none" />

      <div className="flex flex-col items-center text-center space-y-6">
        
        {/* Optional Rating Stars */}
        {item.rating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
            ))}
          </div>
        )}

        {/* Testimonial Quote Text */}
        <p className="font-heading italic text-lg sm:text-xl md:text-2xl text-primary-navy/90 leading-relaxed font-medium">
          "{item.testimonial}"
        </p>

        {/* Author Metadata Block */}
        <div className="pt-4 border-t border-border-custom/60 w-1/3 mx-auto" />
        
        <div className="flex flex-col items-center">
          <span className="font-heading font-extrabold text-base text-primary-navy tracking-tight">
            {item.clientName}
          </span>
          {(item.designation || item.company) && (
            <span className="text-xs uppercase font-semibold tracking-wider text-accent-gold mt-1">
              {item.designation} {item.company ? `| ${item.company}` : ""}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
export default TestimonialCard;
