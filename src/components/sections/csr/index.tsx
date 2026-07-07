"use client";

import React from "react";
import { CSRListingProps } from "./types";
import { CSRHero } from "./hero";
import { CSREmptyState } from "./empty-state";
import { CSRErrorState } from "./error-state";
import { CSRSkeletonUi } from "./skeleton-ui";
import { CSRActivityCard } from "./activity-card";

export default function CSRListingSection({
  activities = [],
  isLoading = false,
  error = null,
  pageTitle,
  breadcrumbLabel,
  baseRoute,
}: CSRListingProps) {
  return (
    <div className="w-full bg-bg-warm min-h-screen">
      
      {/* Hero Banner */}
      <CSRHero title={pageTitle} breadcrumbLabel={breadcrumbLabel} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {isLoading ? (
          <CSRSkeletonUi />
        ) : error ? (
          <CSRErrorState title="Unable to Load Activities" onRetry={() => window.location.reload()} />
        ) : (
          <div className="space-y-12">
            
            {/* Empty State / Listing Grid */}
            {activities.length === 0 ? (
              <CSREmptyState
                title={`No ${breadcrumbLabel} Activities Available`}
                description={`${breadcrumbLabel} workshops and CSR activities will appear here once published through the CMS.`}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity) => (
                  <CSRActivityCard key={activity.id} activity={activity} baseRoute={baseRoute} />
                ))}
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
}
export { CSRListingSection };
