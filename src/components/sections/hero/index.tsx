"use client";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroButtons } from "./hero-buttons";
import { heroCarouselConfig } from "./hero-config";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

interface SlideData {
  src: string;
  alt: string;
}

export function HeroSection() {
  const supabase = createClient();
  const c = heroCarouselConfig;
  const [slides, setSlides] = useState<SlideData[]>([]);

  useEffect(() => {
    async function loadPublishedSlides() {
      try {
        const { data, error } = await supabase
          .from("home_slider")
          .select("image_url")
          .eq("status", "published")
          .order("display_order", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((item: any) => ({
            src: item.image_url,
            alt: "R.A. Aggarwal & Associates Hero Slide",
          }));
          setSlides(formatted);
        } else {
          // Fallback to static slides if database is empty
          setSlides(c.slides);
        }
      } catch (err) {
        console.error("Failed to load published slides:", err);
        setSlides(c.slides);
      }
    }
    loadPublishedSlides();
  }, [supabase, c.slides]);

  return (
    <section className="relative h-[85vh] w-full flex flex-col items-center justify-center py-16 overflow-hidden border-b border-border-custom select-none">
      {/* Background auto-transitioning cross-fade image slider */}
      <HeroBackground slides={slides} />

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
