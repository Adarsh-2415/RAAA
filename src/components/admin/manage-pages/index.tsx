"use client";

import React from "react";
import { ALLOWED_MANAGE_PAGES } from "./page-config";
import { Section } from "./section";

export function ManagePagesIndex() {
  return (
    <div className="space-y-10">
      
      {/* Title block */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold tracking-widest text-[#E56E58] uppercase block">
          Website Structure
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
          Manage Pages
        </h1>
        <div className="h-[2px] w-10 bg-accent-gold rounded-full" />
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-2xl pt-1">
          Manage all website pages from one place. Clicking on pages will open their CMS layout manager once editing modules are deployed.
        </p>
      </div>

      {/* Categories listing */}
      <div className="space-y-8">
        {ALLOWED_MANAGE_PAGES.map((group) => (
          <Section key={group.category} group={group} />
        ))}
      </div>

    </div>
  );
}
export default ManagePagesIndex;
