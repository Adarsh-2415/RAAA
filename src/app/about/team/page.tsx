"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ShieldCheck, ArrowRight, X } from "lucide-react";
import { teamConfig } from "@/components/sections/welcome/team-config";

export default function TeamPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeMember = teamConfig.find((t) => t.id === activeId) || null;

  const handleMemberSelect = (id: string) => {
    setActiveId(id);
    // Let state update render the div, then scroll to it
    setTimeout(() => {
      const element = document.getElementById("detailed-profile-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleClose = () => {
    setActiveId(null);
    setTimeout(() => {
      const element = document.getElementById("leadership-cards-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="w-full bg-bg-warm min-h-screen font-sans">
      
      {/* Hero Banner */}
      <div className="bg-[#0F172A] text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%) pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          
          <span className="inline-block px-3 py-1 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full text-[10px] font-bold tracking-widest text-[#E5C158] uppercase">
            OUR PROFESSIONALS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight max-w-3xl mx-auto">
            Expert Advisory & Counsel Team
          </h1>
          <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        </div>
      </div>

      {/* SECTION 1: Leadership Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center space-y-4">
        <span className="text-xs font-bold tracking-widest text-accent-gold uppercase block">
          Leadership
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-navy font-heading tracking-tight">
          Meet the Professionals Leading R.A. Aggarwal & Associates
        </h2>
        <div className="h-[2px] w-12 bg-accent-gold mx-auto rounded-full" />
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans max-w-2xl mx-auto pt-2">
          Our team of dedicated legal advocates and chartered accountants provide complete direct and indirect taxation audit consulting, corporate formations, and legal defense services.
        </p>
      </div>

      {/* SECTION 2: Large Founder/Team Profile Cards */}
      <div id="leadership-cards-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {teamConfig.map((member) => {
            const isActive = member.id === activeId;
            return (
              <motion.div
                key={member.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl ${
                  isActive ? "border-accent-gold ring-1 ring-accent-gold/45" : "border-border-custom/80"
                }`}
              >
                {/* 60-70% image height portion */}
                <div className="relative aspect-[4/3] w-full bg-bg-warm overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content details portion */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-primary-navy font-heading">
                      {member.name}
                    </h3>
                    <p className="text-sm text-accent-gold font-bold tracking-wider uppercase">
                      {member.designation}
                    </p>
                  </div>

                  {/* Contact Quick Details */}
                  <div className="space-y-2 text-xs text-text-secondary border-t border-border-custom/50 pt-4">
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 hover:text-accent-gold transition-colors duration-200"
                    >
                      <Phone size={13} className="text-accent-gold shrink-0" />
                      <span>{member.phone}</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 hover:text-accent-gold transition-colors duration-200"
                    >
                      <Mail size={13} className="text-accent-gold shrink-0" />
                      <span>{member.email}</span>
                    </a>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleMemberSelect(member.id)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 border border-primary-navy/25 text-primary-navy text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:border-accent-gold hover:text-primary-navy transition-all duration-200"
                  >
                    <span>View Professional Profile</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Dynamic Detailed Profile Section */}
      <div id="detailed-profile-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-24">
        <AnimatePresence mode="wait">
          {activeMember && (
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-custom-lg space-y-12 relative overflow-hidden"
            >
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white border border-primary-navy/20 flex items-center justify-center text-primary-navy hover:text-accent-gold hover:border-accent-gold hover:scale-105 transition-all duration-200 shadow-sm z-20 cursor-pointer"
                aria-label="Close profile"
              >
                <X size={18} />
              </button>

              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-border-custom/80">
                <div className="space-y-1.5 pr-10">
                  <span className="text-xs font-bold tracking-widest text-[#E56E58] uppercase">
                    Profile Showcase
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
                    {activeMember.name}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-[#C9A227]/10 text-accent-gold font-bold text-xs rounded-full">
                    {activeMember.designation}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${activeMember.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200"
                  >
                    <Phone size={13} />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${activeMember.email}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FAFAF8] border border-border-custom text-primary-navy text-xs font-bold uppercase tracking-wider rounded-full hover:border-[#C9A227] hover:text-[#C9A227] transition-all duration-200"
                  >
                    <Mail size={13} />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Narrative Bio */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-primary-navy font-heading">
                  Professional Biography
                </h3>
                <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  {activeMember.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Core Expertise Card Grid */}
              <div className="space-y-6">
                <h3 className="text-base font-bold text-primary-navy font-heading">
                  Practice & Expertise Areas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeMember.expertise.map((exp, index) => (
                    <div
                      key={index}
                      className="p-5 bg-[#FAFAF8] border-t-2 border-accent-gold rounded-xl border border-border-custom/50 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <h4 className="text-sm font-bold text-primary-navy font-heading flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-accent-gold shrink-0" />
                        {exp.title}
                      </h4>
                      <p className="mt-2 text-xs text-text-secondary leading-relaxed font-sans">
                        {exp.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Timeline Milestones */}
              <div className="space-y-6">
                <h3 className="text-base font-bold text-primary-navy font-heading">
                  Key Milestones
                </h3>
                <div className="relative border-l border-border-custom pl-6 space-y-8">
                  {activeMember.timeline.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-accent-gold shadow-sm" />
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-heading font-extrabold text-sm text-accent-gold">
                          {event.year}
                        </span>
                        <h4 className="text-sm font-bold text-primary-navy font-heading">
                          {event.title}
                        </h4>
                        <p className="text-xs text-text-secondary font-sans leading-relaxed mt-0.5">
                          {event.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
