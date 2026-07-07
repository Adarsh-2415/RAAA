"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="p-6 bg-white border border-border-custom/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between"
    >
      <div className="space-y-1">
        <span className="text-xs font-bold text-text-secondary/70 font-sans uppercase tracking-wider block">
          {label}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
          {value}
        </h3>
      </div>
      <div className="p-3 bg-bg-warm text-accent-gold rounded-xl border border-border-custom/50 shadow-2xs">
        {icon}
      </div>
    </motion.div>
  );
}
export default StatCard;
