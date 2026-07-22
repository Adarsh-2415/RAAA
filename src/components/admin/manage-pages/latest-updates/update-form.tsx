"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Upload, ArrowLeft, Loader2, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { RichTextEditor } from "./rich-text-editor";

interface UpdateFormProps {
  articleId?: string; // If supplied, we are editing
}

export function UpdateForm({ articleId }: UpdateFormProps) {
  const supabase = createClient();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Featured Image variables
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const categories = ["GST", "Income Tax", "Accounting", "Audit", "Corporate", "General"];

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      category: "General",
      excerpt: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
    }
  });

  const titleValue = watch("title");
  const contentValue = watch("content");

  // Slug Generator while typing
  useEffect(() => {
    if (!articleId && titleValue) {
      const formattedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special characters
        .replace(/\s+/g, "-") // replace spaces with dashes
        .replace(/-+/g, "-"); // merge multi-dashes
      setValue("slug", formattedSlug);
    }
  }, [titleValue, setValue, articleId]);

  // Load article if editing
  useEffect(() => {
    if (articleId) {
      async function loadArticle() {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("latest_updates")
            .select("*")
            .eq("id", articleId)
            .single();

          if (error) throw error;

          if (data) {
            setValue("title", data.title);
            setValue("slug", data.slug);
            setValue("category", data.category);
            setValue("excerpt", data.excerpt);
            setValue("content", data.content);
            setValue("seoTitle", data.seo_title || "");
            setValue("seoDescription", data.seo_description || "");
            setImageUrl(data.featured_image_url);
            setImagePath(data.featured_image_path);
          }
        } catch (err) {
          console.error("Load article error:", err);
          setError("Failed to load article metadata.");
        } finally {
          setLoading(false);
        }
      }
      loadArticle();
    }
  }, [articleId, setValue, supabase]);

  // Image select helper
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
    }
  };

  // Upload file helper
  const uploadImage = async (): Promise<{ url: string; path: string } | null> => {
    if (!imageFile) return null;
    
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `featured-images/img_${Date.now()}.${fileExt}`;
    
    const { error: uploadErr } = await supabase.storage
      .from("updates-media")
      .upload(filePath, imageFile);
      
    if (uploadErr) throw uploadErr;
    
    const { data: { publicUrl } } = supabase.storage
      .from("updates-media")
      .getPublicUrl(filePath);
      
    return { url: publicUrl, path: filePath };
  };

  const handleSave = async (data: any, action: "draft" | "published") => {
    setError(null);
    setSuccess(null);

    if (action === "draft") setSaving(true);
    else setPublishing(true);

    try {
      let finalUrl = imageUrl;
      let finalPath = imagePath;

      // Clean up previous image if replacing
      if (imageFile && imagePath) {
        await supabase.storage.from("updates-media").remove([imagePath]);
      }

      // Upload new image if selected
      const uploaded = await uploadImage();
      if (uploaded) {
        finalUrl = uploaded.url;
        finalPath = uploaded.path;
      }

      const payload: any = {
        title: data.title,
        slug: data.slug,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        seo_title: data.seoTitle,
        seo_description: data.seoDescription,
        status: action,
        featured_image_url: finalUrl,
        featured_image_path: finalPath,
      };

      if (action === "published") {
        payload.published_at = new Date().toISOString();
      }

      if (articleId) {
        // UPDATE
        const { error: updateErr } = await supabase
          .from("latest_updates")
          .update(payload)
          .eq("id", articleId);

        if (updateErr) throw updateErr;
        setSuccess(action === "draft" ? "Draft saved successfully." : "Update published successfully.");
      } else {
        // INSERT
        const { error: insertErr } = await supabase
          .from("latest_updates")
          .insert([payload]);

        if (insertErr) throw insertErr;
        setSuccess(action === "draft" ? "Draft saved successfully." : "Update published successfully.");
        
        // Redirect to edit page
        setTimeout(() => {
          router.push("/admin/manage-pages/latest-updates");
        }, 1500);
      }
    } catch (err: any) {
      console.error("Save update error:", err);
      if (err.code === "23505") {
        setError("This slug is already in use. Please modify your title or slug.");
      } else {
        setError(err.message || "Failed to process database write.");
      }
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm("Are you sure you want to remove the cover image?")) return;

    try {
      if (imagePath) {
        await supabase.storage.from("updates-media").remove([imagePath]);
      }
      if (articleId) {
        await supabase
          .from("latest_updates")
          .update({ featured_image_url: null, featured_image_path: null })
          .eq("id", articleId);
      }
      setImageUrl(null);
      setImagePath(null);
      setImageFile(null);
      setSuccess("Featured image deleted successfully.");
    } catch (err) {
      console.error("Remove image error:", err);
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
          <Link href="/admin/manage-pages/latest-updates" className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors duration-200">
            <ArrowLeft size={12} />
            <span>Back to listing</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
            {articleId ? "Edit Update Article" : "Create New Update"}
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

      {/* Form grid */}
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Fields details */}
        <div className="lg:col-span-8 bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
              Article Title *
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required." })}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
              placeholder="e.g. New GST Filing Requirements for FY 2026-27"
            />
            {errors.title && <span className="text-[10px] text-red-500 font-bold">{errors.title.message}</span>}
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label htmlFor="slug" className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
              URL Slug *
            </label>
            <input
              type="text"
              id="slug"
              {...register("slug", { required: "Slug is required." })}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm font-mono text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
              placeholder="url-friendly-slug-format"
            />
            {errors.slug && <span className="text-[10px] text-red-500 font-bold">{errors.slug.message}</span>}
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label htmlFor="excerpt" className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
              Short Description / Excerpt *
            </label>
            <textarea
              id="excerpt"
              rows={3}
              {...register("excerpt", { required: "Excerpt description is required." })}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 resize-none"
              placeholder="Summary of the update displayed on updates listing overview..."
            />
            {errors.excerpt && <span className="text-[10px] text-red-500 font-bold">{errors.excerpt.message}</span>}
          </div>

          {/* Full content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
              Full Content *
            </label>
            <RichTextEditor
              value={contentValue}
              onChange={(val) => setValue("content", val)}
              disabled={saving || publishing}
            />
          </div>

        </div>

        {/* Right Form: Categories, Image, and SEO */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Metadata Block card */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-5">
            
            {/* Category Select */}
            <div className="space-y-1.5">
              <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
                Category Group *
              </label>
              <select
                id="category"
                {...register("category")}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Featured Image upload block */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
                Featured Cover Image
              </label>
              
              {imageUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-border-custom/60 group">
                  <img src={imageUrl} alt="Featured cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-200">
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
                  <span className="text-[10px] text-text-secondary/70 mt-1 font-bold">Select Cover File</span>
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

          {/* SEO Block card */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              SEO Optimization (Optional)
            </h4>

            {/* SEO Title */}
            <div className="space-y-1.5">
              <label htmlFor="seoTitle" className="block text-xs text-text-secondary font-bold">
                SEO Meta Title
              </label>
              <input
                type="text"
                id="seoTitle"
                {...register("seoTitle")}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                placeholder="Meta title fallback link label"
              />
            </div>

            {/* SEO Description */}
            <div className="space-y-1.5">
              <label htmlFor="seoDescription" className="block text-xs text-text-secondary font-bold">
                SEO Meta Description
              </label>
              <textarea
                id="seoDescription"
                rows={3}
                {...register("seoDescription")}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 resize-none"
                placeholder="Google index snippet description text..."
              />
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
export default UpdateForm;
