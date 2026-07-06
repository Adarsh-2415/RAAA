"use client";

import React from "react";
import { motion } from "framer-motion";
import { Landmark, Users, Briefcase, UserCheck } from "lucide-react";
import { CounterNumber } from "./counter-number";

export function WelcomeMetrics() {
  const metrics = [
    {
      id: 1,
      icon: <Landmark className="w-10 h-10 text-accent-gold" />,
      value: 41,
      suffix: "+",
      label: "Years Experience",
    },
    {
      id: 2,
      icon: <Users className="w-10 h-10 text-accent-gold" />,
      value: 1000,
      suffix: "+",
      label: "Clients Served",
    },
    {
      id: 3,
      icon: <Briefcase className="w-10 h-10 text-accent-gold" />,
      value: 15,
      suffix: "+",
      label: "Services Offered",
    },
    {
      id: 4,
      icon: <UserCheck className="w-10 h-10 text-accent-gold" />,
      value: 20,
      suffix: "+",
      label: "Team Members",
    },
  ];

  return (
    <div className="w-full py-16 sm:py-20 bg-bg-warm">
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
            Welcome to R.A. Aggarwal & Associates
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-primary-navy tracking-tight"
          >
            A Legacy of Legal & Financial Distinction
          </motion.h2>
          <div className="mt-4 h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        </div>

        {/* Dynamic Grid Layout containing the animated metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {metrics.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white border border-border-custom/60 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-3 bg-bg-warm rounded-lg group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="mt-4">
                <CounterNumber value={item.value} suffix={item.suffix} />
              </div>
              <span className="mt-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default WelcomeMetrics;
