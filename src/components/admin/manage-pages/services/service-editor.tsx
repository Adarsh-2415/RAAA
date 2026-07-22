"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, Upload, Trash2, CheckCircle2, AlertCircle, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { ServiceDetailData } from "@/types/services";

interface ServiceEditorProps {
  serviceId: string;
}

export function ServiceEditor({ serviceId }: ServiceEditorProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      breadcrumb: "",
      hero_quote: "",
      overview_paragraphs: "[]",
      highlights_title: "",
      highlights: "[]",
    }
  });

  useEffect(() => {
    async function loadServiceData() {
      try {
        setLoading(true);
        const { data, error: fetchErr } = await supabase
          .from("services_page")
          .select("*")
          .eq("id", serviceId)
          .single();

        if (fetchErr) throw fetchErr;

        if (data) {
          setValue("title", data.title);
          setValue("breadcrumb", data.breadcrumb);
          setValue("hero_quote", data.hero_quote);
          setValue("overview_paragraphs", JSON.stringify(data.overview_paragraphs, null, 2));
          setValue("highlights_title", data.highlights_title);
          setValue("highlights", JSON.stringify(data.highlights, null, 2));
          setImageUrl(data.featured_image_url || null);
          setImagePath(data.featured_image_path || null);
        }
      } catch (err) {
        console.error("Load service data error:", err);
        setError("Failed to fetch database record for service.");
      } finally {
        setLoading(false);
      }
    }
    loadServiceData();
  }, [serviceId, setValue, supabase]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid format. Acceptable formats: JPG, JPEG, PNG, WEBP.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setSuccess("Image selected successfully.");
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm("Are you sure you want to remove the banner photo?")) return;
    try {
      if (imagePath) {
        await supabase.storage.from("services-media").remove([imagePath]);
      }
      await supabase
        .from("services_page")
        .update({ featured_image_url: null, featured_image_path: null })
        .eq("id", serviceId);
      
      setImageUrl(null);
      setImagePath(null);
      setImageFile(null);
      setSuccess("Banner photo removed.");
    } catch (err) {
      console.error("Remove image error:", err);
      setError("Failed to delete banner photo.");
    }
  };

  const uploadImage = async (): Promise<{ url: string; path: string } | null> => {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `featured_${Date.now()}.${fileExt}`;

    const { error: uploadErr } = await supabase.storage
      .from("services-media")
      .upload(filePath, imageFile);

    if (uploadErr) throw uploadErr;

    const { data: { publicUrl } } = supabase.storage
      .from("services-media")
      .getPublicUrl(filePath);

    return { url: publicUrl, path: filePath };
  };

  const handleSave = async (data: any, action: "draft" | "published") => {
    setError(null);
    setSuccess(null);
    if (action === "draft") setSaving(true);
    else setPublishing(true);

    try {
      let parsedOverview = [];
      let parsedHighlights = [];
      try {
        parsedOverview = JSON.parse(data.overview_paragraphs);
        parsedHighlights = JSON.parse(data.highlights);
      } catch (jsonErr) {
        throw new Error("Invalid JSON format in Overview Paragraphs or Highlights fields.");
      }

      let finalUrl = imageUrl;
      let finalPath = imagePath;

      if (imageFile && imagePath) {
        await supabase.storage.from("services-media").remove([imagePath]);
      }

      const uploaded = await uploadImage();
      if (uploaded) {
        finalUrl = uploaded.url;
        finalPath = uploaded.path;
      }

      const payload = {
        title: data.title,
        breadcrumb: data.breadcrumb,
        hero_quote: data.hero_quote,
        overview_paragraphs: parsedOverview,
        highlights_title: data.highlights_title,
        highlights: parsedHighlights,
        featured_image_url: finalUrl,
        featured_image_path: finalPath,
        status: action,
      };

      const { error: updateErr } = await supabase
        .from("services_page")
        .update(payload)
        .eq("id", serviceId);

      if (updateErr) throw updateErr;

      setSuccess(action === "draft" ? "Draft Saved Successfully" : "Changes Published Successfully");
    } catch (err: any) {
      console.error("Save service error:", err);
      setError(err.message || "Failed to save records.");
    } finally {
      setSaving(false);
      setPublishing(false);
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
            Service Editor: {serviceId}
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            disabled={saving || publishing}
            onClick={handleSubmit((data) => handleSave(data, "draft"))}
            className="px-5 py-2.5 bg-white border border-border-custom text-primary-navy text-xs font-bold uppercase tracking-wider rounded-full hover:bg-bg-warm disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 shadow-3xs cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            disabled={saving || publishing}
            onClick={handleSubmit((data) => handleSave(data, "published"))}
            className="px-5 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy disabled:bg-gray-200 disabled:text-gray-400 transition-all duration-200 shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            {publishing ? "Publishing..." : "Publish Live"}
          </button>
        </div>
      </div>

      {/* Message banners */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 leading-relaxed font-sans">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <p className="text-xs text-green-700 leading-relaxed font-sans">{success}</p>
        </div>
      )}

      {/* Editor Form */}
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Fields */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card: Page Info */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Page Metadata Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Title *</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Breadcrumb Tag *</label>
                <input
                  type="text"
                  {...register("breadcrumb", { required: "Breadcrumb is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Hero banner Quote *</label>
              <textarea
                rows={3}
                {...register("hero_quote", { required: "Hero quote is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

          {/* Card: Detailed content arrays */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Detailed Narrative & Highlights
            </h3>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Overview Paragraphs JSON Array *</label>
              <textarea
                rows={5}
                {...register("overview_paragraphs", { required: "Overview paragraphs are required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Highlights Column Title *</label>
              <input
                type="text"
                {...register("highlights_title", { required: "Highlights title is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Highlights Points JSON Array *</label>
              <textarea
                rows={6}
                {...register("highlights", { required: "Highlights JSON list is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

        </div>

        {/* Right Column Fields */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card: Banner portrait */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Media & Cover Photo
            </h4>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
                Side Banner Image
              </label>
              
              {imageUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-border-custom/60 group">
                  <img src={imageUrl} alt="Service banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="p-2 bg-white rounded-full text-red-500 hover:scale-105 transition-all shadow-sm cursor-pointer"
                      title="Delete Image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video rounded-xl border border-dashed border-border-custom/80 bg-[#FAFAF8] hover:bg-gray-100/50 cursor-pointer transition-colors duration-200">
                  <ImageIcon size={28} className="text-text-secondary/40 shrink-0" />
                  <span className="text-[10px] text-text-secondary/70 mt-1 font-bold">Select Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
export default ServiceEditor;
