import React from "react";
import Link from "next/link";
import { Settings, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function QuickActions() {
  const actions = [
    {
      label: "Settings",
      href: "/admin/change-password",
      icon: <Settings size={16} />,
    },
    {
      label: "View Website",
      href: "/",
      icon: <Globe size={16} />,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-primary-navy font-heading uppercase tracking-wider">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {actions.map((act, index) => (
          <Link href={act.href} key={index} className="block">
            <motion.div
              whileHover={{ y: -3, scale: 1.015 }}
              className="p-4 bg-white border border-border-custom/80 rounded-xl shadow-2xs hover:shadow-sm text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 group"
            >
              <div className="text-accent-gold group-hover:text-primary-navy transition-colors duration-200">
                {act.icon}
              </div>
              <span className="text-xs font-bold text-text-secondary group-hover:text-primary-navy transition-colors duration-200 font-sans">
                {act.label}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default QuickActions;
