"use client";

import React from "react";
import { Mail, Phone, Instagram, Linkedin, MessageCircle, Facebook, Twitter } from "lucide-react";
import { useGlobalSettings } from "@/components/providers/settings-provider";

export default function TopBar() {
  const settings = useGlobalSettings();

  return (
    <div className="w-full bg-primary-navy text-white/80 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Side: Social Media Icons */}
        <div className="flex items-center gap-4">
          {settings.facebook && settings.facebook !== "#" && (
            <a
              href={settings.facebook}
              className="hover:text-accent-gold transition-colors duration-200"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={14} />
            </a>
          )}
          {settings.linkedin && settings.linkedin !== "#" && (
            <a
              href={settings.linkedin}
              className="hover:text-accent-gold transition-colors duration-200"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={14} />
            </a>
          )}
          {settings.twitter && settings.twitter !== "#" && (
            <a
              href={settings.twitter}
              className="hover:text-accent-gold transition-colors duration-200"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={14} />
            </a>
          )}
        </div>

        {/* Right Side: Contact Information */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-1.5 hover:text-accent-gold transition-colors duration-200"
          >
            <Phone size={13} className="text-accent-gold" />
            <span>{settings.phone}</span>
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-1.5 hover:text-accent-gold transition-colors duration-200"
          >
            <Mail size={13} className="text-accent-gold" />
            <span>{settings.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
