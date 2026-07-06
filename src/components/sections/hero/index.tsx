"use client";

import React from "react";
import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroButtons } from "./hero-buttons";
import { heroCarouselConfig } from "./hero-config";

export function HeroSection() {
  const c = heroCarouselConfig;

  return (
    <section className="relative h-[85vh] w-full flex flex-col items-center justify-center py-16 overflow-hidden border-b border-border-custom select-none">
      {/* Background auto-transitioning cross-fade image slider */}
      <HeroBackground slides={c.slides} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-12 z-10">
        {/* Centered Editorial Content */}
        <HeroContent
          tagline={c.tagline}
          headline={c.headline}
          description={c.description}
        />

        {/* Action CTA Button */}
        <HeroButtons primaryButton={c.primaryButton} />
      </div>
    </section>
  );
}
export default HeroSection;
