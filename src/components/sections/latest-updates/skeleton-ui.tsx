"use client";

import React from "react";

export function SkeletonUi() {
  return (
    <div className="w-full space-y-12">
      {/* Search & Filter skeleton */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-md h-12 bg-gray-200 animate-pulse rounded-full" />
        <div className="flex gap-2 justify-center">
          <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>

      {/* Featured Card skeleton */}
      <div className="w-full h-80 bg-gray-200 animate-pulse rounded-3xl" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white border border-border-custom/60 rounded-2xl p-6 space-y-4">
            <div className="aspect-[16/10] w-full bg-gray-200 animate-pulse rounded-xl" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default SkeletonUi;
