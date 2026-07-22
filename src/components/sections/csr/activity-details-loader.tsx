"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CSRDetailsSection } from "@/components/sections/csr/details";
import { CSRActivity } from "@/components/sections/csr/types";
import { Loader2 } from "lucide-react";
import * as ReactBasic from "react";

interface ActivityDetailsLoaderProps {
  category: "skill-development" | "social-activities" | "give-back" | "staff-welfare";
  breadcrumbLabel: string;
  baseRoute: string;
  paramsPromise: Promise<{ slug: string }>;
}

export function ActivityDetailsLoader({
  category,
  breadcrumbLabel,
  baseRoute,
  paramsPromise,
}: ActivityDetailsLoaderProps) {
  const supabase = createClient();
  const params = ReactBasic.use(paramsPromise);
  const [activity, setActivity] = useState<CSRActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("csr_activities")
          .select("*")
          .eq("category", category)
          .eq("slug", params.slug)
          .eq("status", "published")
          .limit(1)
          .single();

        if (error) throw error;

        if (data) {
          const mapped: CSRActivity = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            coverImage: data.cover_image_url || undefined,
            date: data.date,
            location: data.location || undefined,
            shortDescription: data.short_description,
            fullDescription: data.full_description || undefined,
            galleryImages: data.gallery_images || [],
            status: data.status,
            featured: data.featured,
            seoTitle: data.seo_title || undefined,
            seoDescription: data.seo_description || undefined,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          setActivity(mapped);
        }
      } catch (err) {
        console.error("Fetch CSR activity details error:", err);
        setActivity(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [category, params.slug, supabase]);

  if (loading) {
    return (
      <div className="w-full bg-bg-warm min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  return (
    <CSRDetailsSection
      activity={activity}
      breadcrumbLabel={breadcrumbLabel}
      baseRoute={baseRoute}
    />
  );
}
export default ActivityDetailsLoader;
