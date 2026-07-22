"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Landmark, FileText, Globe, Award, ShieldCheck, Heart, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { HistoryConfigSchema, historyConfig } from "@/components/sections/welcome/history-config";

export default function HistoryPage() {
  const supabase = createClient();
  const [c, setC] = useState<HistoryConfigSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("about_history")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          setC(data[0] as any);
        } else {
          // Fallback to static config if no published row exists in DB
          setC(historyConfig);
        }
      } catch (err) {
        console.error("Load history page error:", err);
        setC(historyConfig);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, [supabase]);

  if (loading) {
    return (
      <div className="w-full bg-bg-warm min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  if (!c) return null;

  return (
    <div className="w-full bg-bg-warm min-h-screen">
      
      {/* Premium Hero Banner */}
      <div className="bg-[#0F172A] text-white py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%) pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
            {c.tagline}
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Firm History
          </h1>
          <div className="mt-4 h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        
        {/* Section 2: Firm Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-l-4 border-accent-gold rounded-r-2xl p-8 sm:p-12 shadow-custom-lg max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-bl-full pointer-events-none" />
          <p className="text-base sm:text-lg text-primary-navy leading-relaxed font-sans font-medium text-left">
            {c.intro}
          </p>
        </motion.div>

        {/* Section 3: Journey Section (Timeline style) */}
        {c.timeline && c.timeline.length > 0 && (
          <div className="space-y-12">
            <div className="text-center">
              <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
                Our Path
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
                The Journey
              </h2>
              <div className="mt-3 h-1 w-10 bg-accent-gold mx-auto rounded-full" />
            </div>

            <div className="relative border-l border-border-custom max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
              {c.timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-bg-warm bg-accent-gold shadow-sm" />
                  <div className="flex flex-col space-y-1 bg-white p-6 border border-border-custom/60 rounded-xl shadow-xs">
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
        )}

        {/* Section 4: Core Expertise (Grid Cards) */}
        {c.services && c.services.length > 0 && (
          <div className="space-y-12">
            <div className="text-center">
              <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
                What We Do
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
                Core Expertise
              </h2>
              <div className="mt-3 h-1 w-10 bg-accent-gold mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {c.services.map((item, index) => {
                const icons = [
                  <Landmark key="1" className="w-6 h-6 text-accent-gold" />,
                  <FileText key="2" className="w-6 h-6 text-accent-gold" />,
                  <Globe key="3" className="w-6 h-6 text-accent-gold" />,
                  <Award key="4" className="w-6 h-6 text-accent-gold" />,
                ];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-white border border-border-custom/75 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-bg-warm rounded-lg text-accent-gold group-hover:bg-accent-gold/10 transition-colors duration-300">
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
        )}

        {/* Section 5: Client Philosophy */}
        {c.philosophy && c.philosophy.length > 0 && (
          <div className="space-y-12">
            <div className="text-center">
              <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
                Our Vision
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
                Client Philosophy
              </h2>
              <div className="mt-3 h-1 w-10 bg-accent-gold mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {c.philosophy.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 bg-white border border-border-custom/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <h3 className="text-lg font-bold text-primary-navy font-heading flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent-gold" />
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Working Approach */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-border-custom/85 rounded-2xl p-8 sm:p-12 shadow-xs max-w-4xl mx-auto space-y-4"
        >
          <h3 className="text-xl font-bold text-primary-navy font-heading text-center">
            Our Working Approach
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans text-center max-w-2xl mx-auto">
            {c.approach}
          </p>
        </motion.div>

        {/* Section 7: Elegant Closing Section */}
        <div className="max-w-3xl mx-auto text-center py-6 border-t border-border-custom">
          <p className="text-xs uppercase font-bold tracking-widest text-text-secondary">
            {c.closing}
          </p>
        </div>

      </div>
    </div>
  );
}
