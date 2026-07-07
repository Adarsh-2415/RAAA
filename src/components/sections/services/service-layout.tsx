"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { ServiceHero } from "./service-hero";
import { ServiceDetail } from "./service-config";

interface ServiceLayoutProps {
  data: ServiceDetail;
}

export function ServiceLayout({ data }: ServiceLayoutProps) {
  return (
    <div className="w-full bg-bg-warm min-h-screen font-sans pb-20">
      
      {/* SECTION 1: Premium Hero Banner */}
      <ServiceHero title={data.title} breadcrumb={data.breadcrumb} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        
        {/* SECTION 2: Service Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Overview text (Verbatim Client Content) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-accent-gold uppercase block">
                Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
                About the Service
              </h2>
              <div className="h-[2px] w-10 bg-accent-gold rounded-full" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-[750px]">
              {data.overviewParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Verbatim client image mapping */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border-custom bg-bg-warm shadow-md">
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* SECTION 3 & 4: Highlight Cards / Timelines */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-accent-gold uppercase block">
              Key Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
              {data.highlightsTitle}
            </h2>
            <div className="h-[2px] w-10 bg-accent-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="p-6 bg-white border-t-2 border-accent-gold rounded-2xl border border-border-custom/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2 w-fit bg-bg-warm rounded-lg text-accent-gold">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-primary-navy font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
export default ServiceLayout;
