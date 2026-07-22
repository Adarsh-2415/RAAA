"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, Upload, Trash2, CheckCircle2, AlertCircle, Image as ImageIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ActivityFormProps {
  category: string;
  activityId?: string; // If supplied, we are editing
}

export function ActivityForm({ category, activityId }: ActivityFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Cover Image
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [coverPath, setCoverPath] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Gallery Images arrays
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [galleryPaths, setGalleryPaths] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      date: "",
      location: "",
      short_description: "",
      full_description: "",
      featured: false,
      seo_title: "",
      seo_description: "",
    }
  });

  const titleValue = watch("title");

  // Slug Generator while typing
  useEffect(() => {
    if (!activityId && titleValue) {
      const formattedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special characters
        .replace(/\s+/g, "-") // replace spaces with dashes
        .replace(/-+/g, "-"); // merge multi-dashes
      setValue("slug", formattedSlug);
    }
  }, [titleValue, setValue, activityId]);

  // Load activity if editing
  useEffect(() => {
    if (activityId) {
      async function loadActivity() {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("csr_activities")
            .select("*")
            .eq("id", activityId)
            .single();

          if (error) throw error;

          if (data) {
            setValue("title", data.title);
            setValue("slug", data.slug);
            setValue("date", data.date);
            setValue("location", data.location);
            setValue("short_description", data.short_description);
            setValue("full_description", data.full_description);
            setValue("featured", data.featured);
            setValue("seo_title", data.seo_title || "");
            setValue("seo_description", data.seo_description || "");
            setCoverUrl(data.cover_image_url || null);
            setCoverPath(data.cover_image_path || null);
            setGalleryUrls(data.gallery_images || []);
            setGalleryPaths(data.gallery_paths || []);
          }
        } catch (err) {
          console.error("Load CSR activity error:", err);
          setError("Failed to fetch activity records.");
        } finally {
          setLoading(false);
        }
      }
      loadActivity();
    }
  }, [activityId, setValue, supabase]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverUrl(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...selectedFiles]);
      const selectedUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setGalleryUrls((prev) => [...prev, ...selectedUrls]);
    }
  };

  const handleDeleteCover = async () => {
    if (!confirm("Are you sure you want to delete the cover image?")) return;
    try {
      if (coverPath) {
        await supabase.storage.from("csr-media").remove([coverPath]);
      }
      if (activityId) {
        await supabase
          .from("csr_activities")
          .update({ cover_image_url: null, cover_image_path: null })
          .eq("id", activityId);
      }
      setCoverUrl(null);
      setCoverPath(null);
      setCoverFile(null);
      setSuccess("Cover image deleted.");
    } catch (err) {
      console.error("Delete cover error:", err);
    }
  };

  const handleDeleteGalleryItem = async (index: number) => {
    if (!confirm("Are you sure you want to remove this gallery photo?")) return;
    try {
      const pathToRemove = galleryPaths[index];
      if (pathToRemove) {
        await supabase.storage.from("csr-media").remove([pathToRemove]);
      }
      
      const newUrls = galleryUrls.filter((_, idx) => idx !== index);
      const newPaths = galleryPaths.filter((_, idx) => idx !== index);
      
      if (activityId) {
        await supabase
          .from("csr_activities")
          .update({ gallery_images: newUrls, gallery_paths: newPaths })
          .eq("id", activityId);
      }
      
      setGalleryUrls(newUrls);
      setGalleryPaths(newPaths);
      setSuccess("Gallery photo removed.");
    } catch (err) {
      console.error("Delete gallery photo error:", err);
    }
  };

  const uploadFile = async (file: File): Promise<{ url: string; path: string }> => {
    const fileExt = file.name.split(".").pop();
    const filePath = `csr_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error } = await supabase.storage.from("csr-media").upload(filePath, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("csr-media").getPublicUrl(filePath);
    return { url: publicUrl, path: filePath };
  };

  const handleSave = async (data: any, action: "draft" | "published") => {
    setError(null);
    setSuccess(null);
    if (action === "draft") setSaving(true);
    else setPublishing(true);

    try {
      let finalCoverUrl = coverUrl;
      let finalCoverPath = coverPath;

      // Upload Cover
      if (coverFile) {
        if (coverPath) {
          await supabase.storage.from("csr-media").remove([coverPath]);
        }
        const uploadedCover = await uploadFile(coverFile);
        finalCoverUrl = uploadedCover.url;
        finalCoverPath = uploadedCover.path;
      }

      // Upload Gallery Images
      let newUploadedUrls: string[] = [];
      let newUploadedPaths: string[] = [];
      for (const file of galleryFiles) {
        const uploaded = await uploadFile(file);
        newUploadedUrls.push(uploaded.url);
        newUploadedPaths.push(uploaded.path);
      }

      const finalGalleryUrls = [...galleryPaths.map((_, i) => galleryUrls[i]), ...newUploadedUrls];
      const finalGalleryPaths = [...galleryPaths, ...newUploadedPaths];

      const payload = {
        category,
        title: data.title || "",
        slug: data.slug || "",
        date: data.date ? data.date : null,
        location: data.location || "",
        short_description: data.short_description || "",
        full_description: data.full_description || "",
        featured: data.featured,
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        cover_image_url: finalCoverUrl,
        cover_image_path: finalCoverPath,
        gallery_images: finalGalleryUrls,
        gallery_paths: finalGalleryPaths,
        status: action,
      };

      if (activityId) {
        const { error: updateErr } = await supabase
          .from("csr_activities")
          .update(payload)
          .eq("id", activityId);

        if (updateErr) throw updateErr;
      } else {
        const { error: insertErr } = await supabase
          .from("csr_activities")
          .insert([payload]);

        if (insertErr) throw insertErr;
      }

      setSuccess(action === "draft" ? "Draft Saved Successfully" : "Changes Published Successfully");
      setTimeout(() => {
        router.push(`/admin/manage-pages/csr/${category}`);
      }, 1500);
    } catch (err: any) {
      console.error("Save CSR activity error:", err);
      if (err.code === "23505") {
        setError("This slug is already in use under this category. Please modify your title.");
      } else {
        setError(err.message || "Failed to process database write.");
      }
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
          <Link href={`/admin/manage-pages/csr/${category}`} className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors duration-200">
            <ArrowLeft size={12} />
            <span>Back to Category List</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
            {activityId ? "Edit CSR Activity" : "Create CSR Activity"}
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

      {/* Form Grid */}
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column fields */}
        <div className="lg:col-span-8 space-y-8 bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="e.g. Donation drive at Roorkee primary school"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">URL Slug</label>
            <input
              type="text"
              {...register("slug")}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Location</label>
              <input
                type="text"
                {...register("location")}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                placeholder="Roorkee, Haridwar"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Short Excerpt / Preview</label>
            <textarea
              rows={3}
              {...register("short_description")}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200 resize-none"
              placeholder="Short description displayed on card listing overview..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Full Description Content</label>
            <textarea
              rows={6}
              {...register("full_description")}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="Detailed description of the activity event..."
            />
          </div>

        </div>

        {/* Right Column fields */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card: Images */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Media & Images
            </h4>

            {/* Cover photo */}
            <div className="space-y-2">
              <label className="block text-xs text-text-secondary font-bold">Cover Photo</label>
              {coverUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-border-custom/60 group">
                  <img src={coverUrl} alt="Cover preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={handleDeleteCover}
                      className="p-2 bg-white rounded-full text-red-500 hover:scale-105 transition-all shadow-sm cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video rounded-xl border border-dashed border-border-custom/80 bg-[#FAFAF8] hover:bg-gray-100/50 cursor-pointer transition-colors duration-200">
                  <ImageIcon size={24} className="text-text-secondary/40" />
                  <span className="text-[10px] font-bold text-text-secondary/70 mt-1">Select Cover File</span>
                  <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                </label>
              )}
            </div>

            {/* Gallery images */}
            <div className="space-y-3">
              <label className="block text-xs text-text-secondary font-bold">Gallery Photos ({galleryUrls.length})</label>
              
              <div className="grid grid-cols-3 gap-2">
                {galleryUrls.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border-custom/60 group">
                    <img src={url} alt="Gallery item" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleDeleteGalleryItem(idx)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-500 transition-opacity duration-150 cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}

                <label className="flex flex-col items-center justify-center aspect-square rounded-lg border border-dashed border-border-custom/80 bg-[#FAFAF8] hover:bg-gray-100/50 cursor-pointer transition-colors duration-150">
                  <Plus size={16} className="text-text-secondary/45" />
                  <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Card: Options and SEO */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              SEO (Optional)
            </h4>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" {...register("featured")} className="rounded border-border-custom text-primary-navy focus:ring-accent-gold" />
              <label htmlFor="featured" className="text-xs text-text-secondary font-bold cursor-pointer">Featured Activity</label>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">SEO Title</label>
              <input
                type="text"
                {...register("seo_title")}
                className="w-full px-4 py-2 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">SEO Description</label>
              <textarea
                rows={3}
                {...register("seo_description")}
                className="w-full px-4 py-2 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200 resize-none"
              />
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
export default ActivityForm;
