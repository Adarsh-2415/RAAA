"use client";

import React, { useEffect, useState } from "react";
import { Upload, Trash2, Eye, EyeOff, Check, X, Loader2, RefreshCw, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { SliderImage } from "@/types/slider";

export function SliderManager() {
  const supabase = createClient();
  const [slides, setSlides] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load ALL slides including drafts
  const loadSlides = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("home_slider")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSlides(data || []);
    } catch (err: any) {
      console.error("Load slides error:", err);
      setError("Failed to fetch existing slides from the database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  // Upload a file to Supabase storage immediately and register it as draft
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // File validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid format. Acceptable formats: JPG, JPEG, PNG, WEBP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const fileExt = file.name.split(".").pop();
      const imagePath = `slide_${Date.now()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("home-slider")
        .upload(imagePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("home-slider")
        .getPublicUrl(imagePath);

      // Insert record to DB as 'draft'
      const { data: inserted, error: insertError } = await supabase
        .from("home_slider")
        .insert([
          {
            image_url: publicUrl,
            image_path: imagePath,
            status: "draft",
            display_order: slides.length + 1,
          },
        ])
        .select();

      if (insertError) throw insertError;

      if (inserted && inserted[0]) {
        setSlides((prev) => [...prev, inserted[0]]);
        setSuccess("New slide draft uploaded successfully!");
      }
    } catch (err: any) {
      console.error("Upload slider error:", err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Mark record for deletion locally/draft level
  const handleMarkDelete = async (id: string, currentStatus: "draft" | "published" | "deleted") => {
    if (currentStatus === "draft") {
      // If it's a draft that was never published, delete it directly from storage & database
      const slide = slides.find((s) => s.id === id);
      if (!slide) return;

      if (!confirm("Are you sure you want to delete this slide draft?")) return;

      try {
        setLoading(true);
        // Delete from Storage
        await supabase.storage.from("home-slider").remove([slide.image_path]);
        // Delete from Database
        await supabase.from("home_slider").delete().eq("id", id);
        
        setSlides((prev) => prev.filter((s) => s.id !== id));
        setSuccess("Slide draft removed.");
      } catch (err) {
        console.error("Delete draft error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      // If it is published, toggle its status to 'deleted' (marked for deletion on publish changes)
      const nextStatus = currentStatus === "deleted" ? "published" : "deleted";
      try {
        const { error } = await supabase
          .from("home_slider")
          .update({ status: nextStatus })
          .eq("id", id);

        if (error) throw error;
        setSlides((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s))
        );
      } catch (err) {
        console.error("Mark delete error:", err);
      }
    }
  };

  // Perform transaction-like batch publishing inside database
  const handlePublishChanges = async () => {
    try {
      setPublishing(true);
      setError(null);
      setSuccess(null);

      // 1. Process deletions
      const deletedSlides = slides.filter((s) => s.status === "deleted");
      for (const slide of deletedSlides) {
        // Remove file from storage
        await supabase.storage.from("home-slider").remove([slide.image_path]);
        // Delete row from database
        await supabase.from("home_slider").delete().eq("id", slide.id);
      }

      // 2. Process drafts to published
      const { error: publishError } = await supabase
        .from("home_slider")
        .update({ status: "published" })
        .eq("status", "draft");

      if (publishError) throw publishError;

      setSuccess("Changes published live successfully!");
      // Reload slides fresh
      await loadSlides();
    } catch (err: any) {
      console.error("Publish error:", err);
      setError(err.message || "Failed to publish changes.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link href="/admin/manage-pages" className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors duration-200">
            <ArrowLeft size={12} />
            <span>Back to Manage Pages</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
            Hero Slider Manager
          </h2>
          <p className="text-xs text-text-secondary font-sans">
            Add, preview, or remove slides. Changes apply to the live site only after clicking "Publish Changes".
          </p>
        </div>

        {/* Publish Action Button */}
        <button
          onClick={handlePublishChanges}
          disabled={publishing || uploading || loading}
          className="px-6 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy disabled:bg-gray-200 disabled:text-gray-400 transition-all duration-200 shadow-sm cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          {publishing ? "Publishing..." : "Publish Changes"}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 leading-relaxed font-sans">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <p className="text-xs text-green-700 leading-relaxed font-sans">{success}</p>
        </div>
      )}

      {/* Upload trigger card */}
      <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-primary-navy font-heading">
            Upload Slider Image
          </h3>
          <p className="text-xs text-text-secondary max-w-sm leading-relaxed font-sans">
            Acceptable file formats: JPEG, JPG, PNG, WEBP. Max size: 5MB. Slides are configured with status "draft" on upload.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 border border-border-custom rounded-full bg-bg-warm hover:bg-gray-100 cursor-pointer transition-all duration-250 text-xs font-bold text-primary-navy shadow-3xs">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin text-accent-gold" />
          ) : (
            <Upload size={14} className="text-accent-gold" />
          )}
          <span>{uploading ? "Uploading..." : "Select File"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading || publishing}
            className="hidden"
          />
        </label>
      </div>

      {/* Slider Items listing */}
      {loading ? (
        <div className="h-64 bg-white border border-border-custom/80 rounded-3xl animate-pulse" />
      ) : slides.length === 0 ? (
        <div className="text-center py-16 bg-white border border-border-custom/80 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-bg-warm rounded-full flex items-center justify-center mx-auto text-text-secondary/40">
            <EyeOff size={20} />
          </div>
          <p className="text-xs sm:text-sm text-text-secondary">No slides found in the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`bg-white border rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between transition-all duration-200 ${
                slide.status === "deleted"
                  ? "border-red-200 bg-red-50/5"
                  : slide.status === "draft"
                  ? "border-accent-gold/40"
                  : "border-border-custom/80"
              }`}
            >
              {/* Image Frame with Status badge */}
              <div className="relative aspect-video bg-gray-100 border-b border-border-custom/50">
                <img
                  src={slide.image_url}
                  alt="Slide preview"
                  className="w-full h-full object-cover"
                />
                
                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {slide.status === "draft" && (
                    <span className="px-2.5 py-0.5 bg-accent-gold/90 text-primary-navy text-[9px] font-extrabold uppercase tracking-wider rounded-full shadow-3xs">
                      Draft
                    </span>
                  )}
                  {slide.status === "deleted" && (
                    <span className="px-2.5 py-0.5 bg-red-500 text-white text-[9px] font-extrabold uppercase tracking-wider rounded-full shadow-3xs">
                      Marked Deleted
                    </span>
                  )}
                  {slide.status === "published" && (
                    <span className="px-2.5 py-0.5 bg-green-600 text-white text-[9px] font-extrabold uppercase tracking-wider rounded-full shadow-3xs">
                      Live / Published
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-bg-warm/30 flex items-center justify-between border-t border-border-custom/30 text-xs">
                <span className="text-[10px] text-text-secondary/60 truncate max-w-[120px] font-mono">
                  {slide.image_path}
                </span>

                <div className="flex gap-2">
                  <a
                    href={slide.image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 hover:bg-gray-100 rounded-full text-text-secondary hover:text-accent-gold transition-colors duration-150"
                    title="Preview Image"
                  >
                    <Eye size={15} />
                  </a>

                  <button
                    onClick={() => handleMarkDelete(slide.id, slide.status)}
                    disabled={publishing}
                    className={`p-2 rounded-full transition-colors duration-150 cursor-pointer ${
                      slide.status === "deleted"
                        ? "bg-red-50 text-red-500 hover:bg-red-100"
                        : "hover:bg-red-50 text-text-secondary hover:text-red-500"
                    }`}
                    title={slide.status === "deleted" ? "Keep slide" : "Remove slide"}
                  >
                    {slide.status === "deleted" ? <RefreshCw size={15} className="animate-spin-slow" /> : <Trash2 size={15} />}
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
export default SliderManager;
