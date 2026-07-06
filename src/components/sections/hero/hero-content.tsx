"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface HeroContentProps {
  tagline: string;
  headline: string;
  description: string;
}

export function HeroContent({
  tagline,
  description,
}: HeroContentProps) {
  const phrases = useMemo(
    () => [
      "Chartered Accountancy",
      "Tax Consultancy",
      "Legal Advisory",
      "Business Advisory",
      "Corporate Consultancy",
    ],
    []
  );

  const [mounted, setMounted] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check client-side configuration & reduced motion flags
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Main typewriter state machine loop
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    let timer: NodeJS.Timeout;
    const currentWord = phrases[currentPhraseIndex];

    // Initial page load delay to wait for Hero entrance animations
    const initialDelay = 800;

    const tick = () => {
      if (!isDeleting) {
        // Typing text
        const nextText = currentWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);

        if (nextText === currentWord) {
          // Pause at completed word
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        // Backspacing text
        const nextText = currentWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          // Update the phrase index immediately in the tick function context
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else {
          timer = setTimeout(tick, 50);
        }
      }
    };

    // Trigger typing cycle with mount delay checks
    if (currentText === "" && !isDeleting) {
      timer = setTimeout(tick, initialDelay);
    } else {
      // Add a small 200ms delay block right before typing begins on the new index
      if (currentText === "" && isDeleting === false) {
        timer = setTimeout(tick, 200);
      } else {
        tick();
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, mounted, prefersReducedMotion]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto text-white">
      {/* Centered Gold Tagline Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center justify-center px-4 py-1.5 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full"
      >
        <span className="font-heading text-[10px] sm:text-[11px] font-bold tracking-widest text-[#E5C158] uppercase">
          {tagline}
        </span>
      </motion.div>

      {/* Typewriter Dynamic Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] max-w-3xl flex flex-col items-center"
        style={{
          filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.95)) drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.65))"
        }}
      >
        <span>Your Trusted Partner for</span>
        
        {/* Suffix Container holding layout bounds */}
        <span className="block mt-1 relative w-full text-center min-h-[1.2em]">
          {/* Invisible placeholder of the longest phrase to lock line heights and widths */}
          <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
            Corporate Consultancy
          </span>

          {/* Absolute overlay displaying typewriter progress */}
          <span className="absolute inset-x-0 top-0 text-[#C9A227] flex items-center justify-center">
            {!mounted || prefersReducedMotion ? (
              <span>Chartered Accountancy</span>
            ) : (
              <>
                <span>{currentText}</span>
                <span className="animate-[blink_800ms_infinite] font-light ml-0.5 text-[#C9A227]">|</span>
              </>
            )}
          </span>
        </span>
      </motion.h1>

      {/* Supporting Subtext Description with Text Shadow */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans text-sm sm:text-base text-white/95 leading-relaxed max-w-2xl"
        style={{
          filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.9))"
        }}
      >
        {description}
      </motion.p>

      {/* Blinking Cursor Styling Hooks */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
export default HeroContent;
