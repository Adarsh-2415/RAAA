"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navigationItems } from "@/data/navigation";

export default function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Reset expanded submenus on close
    if (isOpen) {
      setExpandedItem(null);
    }
  };

  const toggleAccordion = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <div className="lg:hidden flex items-center">
      {/* Mobile Menu Trigger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-text-primary hover:text-primary-navy hover:bg-bg-warm rounded-md transition-colors focus:outline-none"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Slide-In Navigation Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleMenu}
            />

            {/* Menu Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-card-white border-l border-border-custom shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header of Mobile Menu */}
                <div className="flex items-center justify-between pb-6 border-b border-border-custom mb-6">
                  <span className="font-heading font-bold text-lg text-primary-navy">
                    Navigation
                  </span>
                  <button
                    onClick={toggleMenu}
                    className="p-1.5 text-text-secondary hover:text-primary-navy hover:bg-bg-warm rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col gap-1">
                  {navigationItems.map((item) => {
                    const hasChildren = !!item.children;
                    const isExpanded = expandedItem === item.label;
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href) ||
                          (item.children &&
                            item.children.some((child) => pathname.startsWith(child.href)));

                    return (
                      <div key={item.label} className="border-b border-border-custom/50 py-1">
                        {hasChildren ? (
                          <div>
                            <button
                              onClick={() => toggleAccordion(item.label)}
                              className={`w-full flex items-center justify-between py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                                isActive ? "text-primary-navy font-semibold" : "text-text-primary"
                              }`}
                            >
                              <span>{item.label}</span>
                              <ChevronDown
                                size={16}
                                className={`text-text-secondary transition-transform duration-200 ${
                                  isExpanded ? "rotate-180 text-accent-gold" : ""
                                }`}
                              />
                            </button>

                            {/* Collapsible Nested Content */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden bg-bg-warm/50 rounded-md px-3 py-1 flex flex-col gap-1 mb-2"
                                >
                                  {item.children!.map((child, cIdx) => {
                                    if (child.isExternal) {
                                      return (
                                        <a
                                          key={cIdx}
                                          href={child.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="py-2 text-xs transition-colors hover:text-secondary-blue text-text-secondary block"
                                          onClick={toggleMenu}
                                        >
                                          {child.label}
                                        </a>
                                      );
                                    }

                                    return (
                                      <Link
                                        key={cIdx}
                                        href={child.href}
                                        className={`py-2 text-xs transition-colors hover:text-secondary-blue ${
                                          pathname === child.href
                                            ? "text-primary-navy font-semibold"
                                            : "text-text-secondary"
                                        }`}
                                        onClick={toggleMenu}
                                      >
                                        {child.label}
                                      </Link>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={`block py-2.5 text-sm font-medium transition-colors ${
                              isActive ? "text-primary-navy font-semibold" : "text-text-primary"
                            }`}
                            onClick={toggleMenu}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* Slim Quick Contact Details at bottom of Drawer */}
                <div className="pt-6 border-t border-border-custom mt-auto flex flex-col gap-3 text-xs text-text-secondary">
                  <div className="font-semibold text-primary-navy uppercase tracking-wider text-[10px]">
                    Get in Touch
                  </div>
                  <div>Phone: +91-1332-273737</div>
                  <div>Email: mail@raaa.in</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
