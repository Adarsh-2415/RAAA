"use client";

import React from "react";
import { PageCategoryGroup } from "./page-config";
import { PageCard } from "./page-card";

interface SectionProps {
  group: PageCategoryGroup;
}

export function Section({ group }: SectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-bold text-text-secondary/70 font-sans uppercase tracking-wider">
          {group.category}
        </h3>
        <div className="h-[1px] flex-1 bg-border-custom/50" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {group.pages.map((page) => (
          <PageCard key={page.name} page={page} />
        ))}
      </div>
    </div>
  );
}
export default Section;
