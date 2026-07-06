"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterNumberProps {
  value: number;
  suffix?: string;
}

export function CounterNumber({ value, suffix = "" }: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  
  // Smooth spring easing curve
  const springValue = useSpring(motionValue, {
    stiffness: 30,
    damping: 15,
  });

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.onChange((latest) => {
      setCurrentValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="font-heading text-4xl sm:text-5xl font-extrabold text-primary-navy tracking-tight">
      {currentValue}
      {suffix}
    </span>
  );
}
