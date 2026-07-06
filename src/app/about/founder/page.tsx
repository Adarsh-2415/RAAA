"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Scale, Briefcase, Heart, GraduationCap } from "lucide-react";
import { founderConfig } from "@/components/sections/welcome/founder-config";

export default function FounderPage() {
  const c = founderConfig;

  return (
    <div className="w-full bg-bg-warm min-h-screen">
      
      {/* Hero Banner */}
      <div className="bg-[#0F172A] text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%) pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side portrait placeholder */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-accent-gold/30 bg-bg-warm/10 overflow-hidden flex items-center justify-center shadow-lg">
                <GraduationCap className="w-20 h-20 text-accent-gold/45" />
              </div>
            </div>

            {/* Right side credentials info */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-4">
              <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
                {c.title}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
                {c.name}
              </h1>
              <div className="h-1 w-12 bg-accent-gold mx-auto lg:mx-0 rounded-full" />
              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed font-sans">
                A litigation lawyer representing individual and corporate bodies in taxation practice for almost four decades.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        
        {/* Section 2: Founder Introduction Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-border-custom/80 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col justify-center space-y-4"
          >
            <h3 className="text-lg font-bold text-primary-navy font-heading">
              Professional Integrity
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
              {c.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-border-custom/80 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col justify-center space-y-4"
          >
            <h3 className="text-lg font-bold text-primary-navy font-heading">
              Teaching & Mentorship
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
              {c.bio}
            </p>
          </motion.div>
        </div>

        {/* Section 6: Leadership Philosophy Quote Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-border-custom/85 rounded-2xl p-8 sm:p-12 shadow-custom-lg max-w-3xl mx-auto relative overflow-hidden text-center group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gold" />
          <Quote className="absolute right-8 top-8 w-16 h-16 text-accent-gold/5 pointer-events-none" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent-gold">
            Philosophy
          </span>
          <p className="mt-4 font-heading italic text-xl sm:text-2xl lg:text-3xl text-primary-navy font-bold">
            "{c.philosophy}"
          </p>
        </motion.div>

        {/* Section 3: Career Journey (Vertical Timeline) */}
        <div className="space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
              Milestones
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
              Career Journey
            </h2>
            <div className="mt-3 h-1 w-10 bg-accent-gold mx-auto rounded-full" />
          </div>

          <div className="relative border-l border-border-custom max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
            {c.milestones.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-bg-warm bg-accent-gold shadow-sm" />
                <div className="bg-white p-6 border border-border-custom/60 rounded-xl shadow-xs flex flex-col space-y-1">
                  <span className="font-heading font-extrabold text-lg text-accent-gold">
                    {event.year}
                  </span>
                  <h3 className="text-base font-bold text-primary-navy font-heading">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans mt-1">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 4: Areas of Expertise */}
        <div className="space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
              Focus Areas
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
              Areas of Expertise
            </h2>
            <div className="mt-3 h-1 w-10 bg-accent-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {c.expertise.map((item, index) => {
              const icons = [
                <Scale key="1" className="w-5 h-5" />,
                <Briefcase key="2" className="w-5 h-5" />,
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white border border-border-custom/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4"
                >
                  <div className="p-3 bg-bg-warm rounded-lg text-accent-gold">
                    {icons[index % icons.length]}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-base font-bold text-primary-navy font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 7: Community Contribution Social Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-border-custom/85 rounded-2xl p-8 sm:p-12 shadow-xs max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6 group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <div className="p-4 bg-bg-warm rounded-xl text-accent-gold group-hover:bg-accent-gold/10 transition-colors duration-300 shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
              {c.socialImpact.title}
            </span>
            <h3 className="text-lg font-bold text-primary-navy font-heading">
              {c.socialImpact.role}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
              {c.socialImpact.desc}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
