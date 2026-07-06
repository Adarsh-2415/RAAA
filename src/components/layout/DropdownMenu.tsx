"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface DropdownMenuProps {
  items: { label: string; href: string; isExternal?: boolean }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function DropdownMenu({ items, isOpen, onClose }: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 mt-1 w-64 bg-card-white border border-border-custom rounded-md shadow-lg py-2 z-50 focus:outline-none"
      onMouseLeave={onClose}
      role="menu"
    >
      <div className="flex flex-col">
        {items.map((item, idx) => {
          if (item.isExternal) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-text-primary hover:bg-bg-warm hover:text-secondary-blue transition-colors duration-200 block"
                role="menuitem"
                onClick={onClose}
              >
                {item.label}
              </a>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              className="px-4 py-2 text-sm text-text-primary hover:bg-bg-warm hover:text-secondary-blue transition-colors duration-200"
              role="menuitem"
              onClick={onClose}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
