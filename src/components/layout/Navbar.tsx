"use client";

import React from "react";
import Link from "next/link";
import TopBar from "./TopBar";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="w-full flex flex-col z-40 bg-card-white border-b border-border-custom shadow-xs sticky top-0">
      {/* Slim Information bar on top */}
      <TopBar />

      {/* Main navigation container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 bg-bg-warm/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20">
          {/* Brand Identity / Firm Name */}
          <Link
            href="/"
            className="flex flex-col justify-center select-none group focus:outline-none"
          >
            <span className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-primary-navy tracking-tight leading-tight transition-colors duration-200 group-hover:text-secondary-blue">
              R.A. Aggarwal & Associates
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-sans font-semibold tracking-wider text-text-secondary mt-0.5">
              Chartered Accountants & Legal Consultants
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <DesktopMenu />

          {/* Mobile Navigation Drawer */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
