"use client";

import React from "react";
import { Home, BookOpen, Award, Users, Briefcase, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { WebsitePageConfig } from "./page-config";

import Link from "next/link";

interface PageCardProps {
  page: WebsitePageConfig;
}

export function PageCard({ page }: PageCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home": return <Home className="w-5 h-5" />;
      case "BookOpen": return <BookOpen className="w-5 h-5" />;
      case "Award": return <Award className="w-5 h-5" />;
      case "Users": return <Users className="w-5 h-5" />;
      case "Briefcase": return <Briefcase className="w-5 h-5" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const isHome = page.route === "/";
  const isLatestUpdates = page.route === "/latest-updates";
  const isHistory = page.route === "/about/history";
  const isFounder = page.route === "/about/founder";
  const isTeam = page.route === "/about/team";
  const isService = page.route.startsWith("/services/");
  const isCsr = page.route.startsWith("/csr/");

  const handleComingSoon = () => {
    alert("Coming Soon! This editor will be available in the next phase.");
  };

  const getEditLink = () => {
    if (isHome) return "/admin/manage-pages/home";
    if (isLatestUpdates) return "/admin/manage-pages/latest-updates";
    if (isHistory) return "/admin/manage-pages/about/history";
    if (isFounder) return "/admin/manage-pages/about/founder";
    if (isTeam) return "/admin/manage-pages/about/team";
    if (isService) {
      const serviceId = page.route.split("/services/")[1];
      return `/admin/manage-pages/services/${serviceId}`;
    }
    if (isCsr) {
      const csrId = page.route.split("/csr/")[1];
      return `/admin/manage-pages/csr/${csrId}`;
    }
    return "";
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="p-5 bg-white border border-border-custom/80 rounded-2xl shadow-2xs hover:shadow-md hover:border-accent-gold transition-all duration-300 flex items-center justify-between gap-4 cursor-default"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="p-3 bg-bg-warm text-accent-gold rounded-xl border border-border-custom/50 shadow-3xs shrink-0">
          {getIcon(page.iconName)}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-primary-navy font-heading truncate">
            {page.name}
          </h4>
          <span className="text-[10px] text-text-secondary/60 font-sans block truncate select-all">
            {page.route}
          </span>
        </div>
      </div>

      {isHome || isLatestUpdates || isHistory || isFounder || isTeam || isService || isCsr ? (
        <Link href={getEditLink()}>
          <button className="px-3.5 py-1.5 bg-primary-navy text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-accent-gold hover:text-primary-navy transition-all duration-200 cursor-pointer">
            Edit
          </button>
        </Link>
      ) : (
        <button
          onClick={handleComingSoon}
          className="px-3.5 py-1.5 bg-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 hover:text-gray-600 transition-all duration-200 cursor-pointer"
        >
          Edit
        </button>
      )}
    </motion.div>
  );
}
export default PageCard;
