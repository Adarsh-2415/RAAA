"use client";

import React from "react";
import { Mail, Phone, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-primary-navy text-white/80 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Side: Social Media Icons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hover:text-accent-gold transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram size={14} />
          </a>
          <a
            href="#"
            className="hover:text-accent-gold transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={14} />
          </a>
          <a
            href="#"
            className="hover:text-accent-gold transition-colors duration-200"
            aria-label="Threads"
          >
            {/* Using MessageCircle as fallback representation for Threads */}
            <MessageCircle size={14} />
          </a>
        </div>

        {/* Right Side: Contact Information */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a
            href="tel:+911332273737"
            className="flex items-center gap-1.5 hover:text-accent-gold transition-colors duration-200"
          >
            <Phone size={13} className="text-accent-gold" />
            <span>+91-1332-273737</span>
          </a>
          <a
            href="mailto:mail@raaa.in"
            className="flex items-center gap-1.5 hover:text-accent-gold transition-colors duration-200"
          >
            <Mail size={13} className="text-accent-gold" />
            <span>mail@raaa.in</span>
          </a>
        </div>
      </div>
    </div>
  );
}
