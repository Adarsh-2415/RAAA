"use client";

import React from "react";
import { TestimonialsHeader } from "./testimonials-header";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { testimonialsConfig } from "./testimonial-config";

export function TestimonialsSection() {
  const c = testimonialsConfig;

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-bg-warm border-t border-border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered test header title details */}
        <TestimonialsHeader
          tagline={c.tagline}
          headline={c.headline}
          description={c.description}
        />

        {/* Dynamic single-card auto transition carousel container */}
        <TestimonialsCarousel items={c.items} />

      </div>
    </section>
  );
}
export default TestimonialsSection;
