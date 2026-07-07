"use client";

import React from "react";

export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-12 animate-pulse">
      {/* Stat Grid pulse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
          <div key={item} className="h-24 bg-gray-200 rounded-2xl" />
        ))}
      </div>
      
      {/* Actions pulse */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/6" />
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <div key={item} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Health pulse */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/6" />
        <div className="h-24 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}
export default DashboardSkeleton;
