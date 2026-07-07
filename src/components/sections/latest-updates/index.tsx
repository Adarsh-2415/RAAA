"use client";

import React, { useState } from "react";
import { LatestUpdatesProps } from "./types";
import { LatestUpdatesHero } from "./hero";
import { SearchBar } from "./search";
import { CategoryFilters } from "./filters";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { SkeletonUi } from "./skeleton-ui";

export default function LatestUpdatesSection({
  articles = [],
  categories = [],
  isLoading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onSearch,
  onCategorySelect,
  selectedCategory = "All",
  searchQuery = "",
}: LatestUpdatesProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    if (onSearch) onSearch("");
  };

  return (
    <div className="w-full bg-bg-warm min-h-screen">
      
      {/* Hero Banner */}
      <LatestUpdatesHero
        title="Stay Updated with Tax, Legal & Corporate Developments"
        subtitle="Real-time circular updates, compliance guidelines, and announcements from R.A. Aggarwal & Associates."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {isLoading ? (
          <SkeletonUi />
        ) : error ? (
          <ErrorState title="Unable to Load Updates" onRetry={() => window.location.reload()} />
        ) : (
          <div className="space-y-12">
            
            {/* Search and Category Filters Stack */}
            <div className="flex flex-col items-center gap-6">
              <SearchBar value={localSearch} onChange={handleSearchChange} />
              
              {categories.length > 0 && onCategorySelect && (
                <CategoryFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={onCategorySelect}
                />
              )}
            </div>

            {/* Empty State / Grid display */}
            {articles.length === 0 ? (
              localSearch ? (
                <EmptyState
                  title="No Results Found"
                  description="We couldn't find any updates matching your search."
                  actionLabel="Clear Search"
                  onActionClick={handleClearSearch}
                />
              ) : (
                <EmptyState
                  title="No Updates Published Yet"
                  description="Latest updates from R.A. Aggarwal & Associates will appear here after they are published through the CMS."
                />
              )
            ) : (
              // Prepared grid container (renders nothing currently since articles is locked empty)
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Dynamically mapped UpdateCards will render here */}
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
}
export { LatestUpdatesSection };
