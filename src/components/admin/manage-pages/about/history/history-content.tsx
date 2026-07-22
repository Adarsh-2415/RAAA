"use client";

import React from "react";
import { Landmark, FileText, Globe, Award, ShieldCheck, Clock, BookOpen, Heart } from "lucide-react";
import { HistoryConfigSchema } from "@/components/sections/welcome/history-config";

interface HistoryContentProps {
  content: HistoryConfigSchema;
}

export function HistoryContent({ content }: HistoryContentProps) {
  return (
    <div className="space-y-12">
      
      {/* Introduction Card block */}
      <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
          Page Introduction
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm font-sans text-text-secondary">
          <div>
            <span className="font-bold text-primary-navy block">Tagline</span>
            <span>{content.tagline}</span>
          </div>
          <div>
            <span className="font-bold text-primary-navy block">Headline</span>
            <span>{content.headline}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="font-bold text-primary-navy block">Introductory Paragraph</span>
            <p className="leading-relaxed bg-[#FAFAF8] p-4 rounded-xl border border-border-custom/50 mt-1">
              {content.intro}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline items card block */}
      <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
          Timeline Events Journey
        </h3>
        <div className="space-y-4">
          {content.timeline.map((event, index) => (
            <div key={index} className="flex gap-4 p-4 bg-[#FAFAF8] border border-border-custom/50 rounded-xl font-sans text-xs">
              <div className="w-12 shrink-0 font-extrabold text-accent-gold font-heading text-right pr-2 border-r border-border-custom/60">
                {event.year}
              </div>
              <div className="space-y-1">
                <span className="font-bold text-primary-navy block">{event.title}</span>
                <p className="text-text-secondary leading-relaxed">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid segments: Services & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Expertise list block */}
        <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
            Core Expertise List
          </h3>
          <div className="space-y-4">
            {content.services.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-xs">
                <div className="p-2 bg-bg-warm rounded-lg text-accent-gold mt-0.5">
                  <Landmark size={14} />
                </div>
                <div>
                  <span className="font-bold text-primary-navy block">{item.title}</span>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy list block */}
        <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
            Client Philosophy Rules
          </h3>
          <div className="space-y-4">
            {content.philosophy.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-xs">
                <div className="p-2 bg-bg-warm rounded-lg text-accent-gold mt-0.5">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <span className="font-bold text-primary-navy block">{item.title}</span>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Closing details card block */}
      <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
          Closing Metadata
        </h3>
        <div className="space-y-4 text-xs font-sans text-text-secondary">
          <div>
            <span className="font-bold text-primary-navy block">Working Approach Paragraph</span>
            <p className="leading-relaxed bg-[#FAFAF8] p-4 rounded-xl border border-border-custom/50 mt-1">
              {content.approach}
            </p>
          </div>
          <div>
            <span className="font-bold text-primary-navy block">Closing Editorial Statement</span>
            <span className="italic block mt-1">{content.closing}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
export default HistoryContent;
