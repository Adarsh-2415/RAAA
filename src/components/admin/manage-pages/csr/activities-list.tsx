"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Calendar, MapPin, Eye, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { CSRActivityData } from "@/types/csr";

interface ActivitiesListProps {
  category: string;
}

export function ActivitiesList({ category }: ActivitiesListProps) {
  const supabase = createClient();
  const [activities, setActivities] = useState<CSRActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("csr_activities")
        .select("*")
        .eq("category", category)
        .order("date", { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (err) {
      console.error("Load CSR activities error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [category]);

  const handleDelete = async (id: string, coverPath?: string | null, galleryPaths: string[] = []) => {
    if (!confirm("Are you sure you want to delete this activity? This will remove all associated media files permanently.")) return;
    try {
      setDeletingId(id);

      // Clean up Cover photo
      if (coverPath) {
        await supabase.storage.from("csr-media").remove([coverPath]);
      }

      // Clean up Gallery photos
      if (galleryPaths && galleryPaths.length > 0) {
        await supabase.storage.from("csr-media").remove(galleryPaths);
      }

      const { error } = await supabase
        .from("csr_activities")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await loadActivities();
    } catch (err) {
      console.error("Delete CSR activity error:", err);
      alert("Failed to delete activity record.");
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case "skill-development": return "Skill Development";
      case "social-activities": return "Social Activities";
      case "give-back": return "Give Back Initiatives";
      case "staff-welfare": return "Staff Welfare";
      default: return cat;
    }
  };

  if (loading) {
    return (
      <div className="h-64 bg-white border border-border-custom/80 rounded-3xl animate-pulse flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Title Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link href="/admin/manage-pages" className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors duration-200">
            <ArrowLeft size={12} />
            <span>Back to Manage Pages</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
            Manage {getCategoryTitle(category)}
          </h2>
        </div>

        <Link href={`/admin/manage-pages/csr/${category}/new`}>
          <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200 shadow-sm cursor-pointer shrink-0">
            <Plus size={14} />
            <span>Add Activity</span>
          </button>
        </Link>
      </div>

      {/* Grid of activities */}
      {activities.length === 0 ? (
        <div className="bg-white border border-border-custom/80 rounded-3xl p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-bg-warm text-accent-gold rounded-full flex items-center justify-center mx-auto border border-border-custom/40">
            <Calendar size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-primary-navy">No Activities Registered</h4>
            <p className="text-xs text-text-secondary">Click the "Add Activity" button above to publish your first event.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => (
            <div
              key={act.id}
              className="bg-white border border-border-custom/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-sm hover:border-accent-gold transition-all duration-200 flex flex-col justify-between"
            >
              {/* Cover Photo */}
              <div className="relative aspect-video w-full bg-bg-warm border-b border-border-custom/40 overflow-hidden">
                {act.cover_image_url ? (
                  <img src={act.cover_image_url} alt={act.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary/40">
                    <ImageIcon size={28} />
                  </div>
                )}
                
                {/* Status indicator */}
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  act.status === "published"
                    ? "bg-green-500 text-white shadow-sm"
                    : "bg-gray-150 text-gray-500"
                }`}>
                  {act.status}
                </span>
              </div>

              {/* Card content details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-primary-navy font-heading line-clamp-2">
                    {act.title}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-3">
                    {act.short_description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-border-custom/40 text-[10px] text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-accent-gold" />
                    <span>{act.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-accent-gold" />
                    <span>{act.location}</span>
                  </div>
                </div>

                {/* Operations triggers */}
                <div className="flex gap-2 pt-1.5">
                  <Link href={`/csr/${category}/${act.slug}`} target="_blank" className="flex-1">
                    <button className="w-full py-2 bg-[#FAFAF8] border border-border-custom text-primary-navy hover:text-accent-gold hover:bg-bg-warm text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors duration-150 flex items-center justify-center gap-1 cursor-pointer">
                      <Eye size={12} />
                      <span>Preview</span>
                    </button>
                  </Link>

                  <Link href={`/admin/manage-pages/csr/${category}/edit/${act.id}`}>
                    <button className="p-2 bg-[#FAFAF8] border border-border-custom text-text-secondary hover:text-accent-gold hover:bg-bg-warm rounded-lg transition-colors duration-150 cursor-pointer" title="Edit activity details">
                      <Edit size={13} />
                    </button>
                  </Link>

                  <button
                    disabled={deletingId === act.id}
                    onClick={() => handleDelete(act.id, act.cover_image_path, act.gallery_paths)}
                    className="p-2 bg-[#FAFAF8] border border-border-custom text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150 cursor-pointer disabled:opacity-50"
                    title="Delete activity"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
export default ActivitiesList;
