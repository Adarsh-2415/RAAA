"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CSRListingSection } from "@/components/sections/csr";
import { CSRActivity } from "@/components/sections/csr/types";
import { Loader2 } from "lucide-react";

interface CategoryListingLoaderProps {
  category: "skill-development" | "social-activities" | "give-back" | "staff-welfare";
  pageTitle: string;
  breadcrumbLabel: string;
  baseRoute: string;
}

export function CategoryListingLoader({
  category,
  pageTitle,
  breadcrumbLabel,
  baseRoute,
}: CategoryListingLoaderProps) {
  const supabase = createClient();
  const [activities, setActivities] = useState<CSRActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);
        const { data, error: fetchErr } = await supabase
          .from("csr_activities")
          .select("*")
          .eq("category", category)
          .eq("status", "published")
          .order("date", { ascending: false });

        if (fetchErr) throw fetchErr;

        if (data) {
          const mapped: CSRActivity[] = data.map((act) => ({
            id: act.id,
            title: act.title,
            slug: act.slug,
            coverImage: act.cover_image_url || undefined,
            date: act.date,
            location: act.location || undefined,
            shortDescription: act.short_description,
            fullDescription: act.full_description || undefined,
            galleryImages: act.gallery_images || [],
            status: act.status,
            featured: act.featured,
            seoTitle: act.seo_title || undefined,
            seoDescription: act.seo_description || undefined,
            createdAt: act.created_at,
            updatedAt: act.updated_at,
          }));
          setActivities(mapped);
        }
      } catch (err: any) {
        console.error("Fetch CSR activities error:", err);
        setError("Failed to fetch published activities from database.");
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, [category, supabase]);

  if (loading) {
    return (
      <div className="w-full bg-bg-warm min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  return (
    <CSRListingSection
      activities={activities}
      isLoading={loading}
      error={error}
      pageTitle={pageTitle}
      breadcrumbLabel={breadcrumbLabel}
      baseRoute={baseRoute}
    />
  );
}
export default CategoryListingLoader;
