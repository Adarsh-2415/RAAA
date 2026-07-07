"use client";

import React from "react";

export function CSRSkeletonUi() {
  return (
    <div className="w-full space-y-12 animate-pulse">
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white border border-border-custom/60 rounded-2xl p-6 space-y-4">
            <div className="aspect-[16/10] w-full bg-gray-200 rounded-xl" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CSRSkeletonUi;
