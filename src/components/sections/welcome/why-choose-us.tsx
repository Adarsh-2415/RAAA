"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Scale, Headphones } from "lucide-react";

export function WhyChooseUs() {
  const points = [
    {
      id: 1,
      icon: <Award className="w-8 h-8 text-accent-gold" />,
      title: "Best Service",
      description: "We provide bespoke legal advocacy and accounting practices customized to fit precise business operational plans.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8 text-accent-gold" />,
      title: "Client Confidentiality",
      description: "We handle sensitive corporate credentials under complete legal safeguards and security audits.",
    },
    {
      id: 3,
      icon: <Scale className="w-8 h-8 text-accent-gold" />,
      title: "No Hidden Fees",
      description: "Honest transaction values with itemized project estimates and regular progress updates.",
    },
    {
      id: 4,
      icon: <Headphones className="w-8 h-8 text-accent-gold" />,
      title: "Client Support",
      description: "On-demand regulatory briefings and emergency support channels for strategic corporate assistance.",
    },
  ];

  return (
    <div className="w-full py-16 sm:py-20 bg-card-white border-t border-border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest text-accent-gold uppercase"
          >
            Why Choose Us?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-primary-navy tracking-tight"
          >
            Strategic Counsel You Can Rely On
          </motion.h2>
          <div className="mt-4 h-1 w-12 bg-accent-gold mx-auto rounded-full" />
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-text-secondary leading-relaxed"
          >
            We do everything you’d expect from accountants and tax advisors, but there’s more to us. We offer business consulting services too alongside a customized and wide selection of tax and accounting advice. So, whether you’re a long time business otherwise you are just beginning, we are here to support you and guide you thru the step-by-step process of business and financial needs for your business.
          </motion.p>
        </div>

        {/* 4-column value pillars grid card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col p-6 bg-bg-warm/40 border border-border-custom/50 rounded-xl hover:-translate-y-1.5 hover:shadow-lg hover:bg-white transition-all duration-300 group"
            >
              <div className="p-3 bg-white rounded-lg w-fit shadow-xs group-hover:bg-accent-gold/10 transition-colors duration-300">
                {point.icon}
              </div>
              <h3 className="mt-6 text-lg font-bold text-primary-navy">
                {point.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default WhyChooseUs;
