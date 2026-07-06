"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navigationItems } from "@/data/navigation";
import DropdownMenu from "./DropdownMenu";

export default function DesktopMenu() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="hidden lg:flex items-center gap-6" aria-label="Primary Desktop Navigation">
      {navigationItems.map((item) => {
        const hasChildren = !!item.children;
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href) ||
              (item.children &&
                item.children.some((child) => pathname.startsWith(child.href)));

        return (
          <div
            key={item.label}
            className="relative h-full flex items-center py-5"
            onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            {hasChildren ? (
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 focus:outline-none cursor-pointer ${
                  isActive
                    ? "text-primary-navy font-semibold"
                    : "text-text-primary hover:text-primary-navy"
                }`}
                aria-expanded={activeDropdown === item.label}
                aria-haspopup="true"
              >
                {item.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === item.label ? "rotate-180 text-accent-gold" : "text-text-secondary"
                  }`}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary-navy font-semibold"
                    : "text-text-primary hover:text-primary-navy"
                }`}
              >
                {item.label}
              </Link>
            )}

            {/* Premium Gold Underline Active/Hover Indicator */}
            {isActive && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-accent-gold"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Dropdown Menu */}
            {hasChildren && (
              <AnimatePresence>
                {activeDropdown === item.label && (
                  <DropdownMenu
                    items={item.children!}
                    isOpen={activeDropdown === item.label}
                    onClose={handleMouseLeave}
                  />
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
}
