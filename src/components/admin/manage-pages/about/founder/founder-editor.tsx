"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, Upload, Trash2, CheckCircle2, AlertCircle, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { FounderPageData } from "@/types/founder";

export function FounderEditor() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      title: "",
      sub_title: "",
      intro: "",
      bio: "",
      philosophy: "",
      milestones: "[]",
      expertise: "[]",
      social_impact_title: "",
      social_impact_role: "",
      social_impact_desc: "",
      seo_title: "",
      seo_description: "",
    }
  });

  useEffect(() => {
    async function loadFounderData() {
      try {
        setLoading(true);
        // Load the single record. Can be draft or published
        const { data, error: fetchErr } = await supabase
          .from("founder_page")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        if (fetchErr) throw fetchErr;

        if (data && data.length > 0) {
          const rec = data[0] as FounderPageData;
          setRecordId(rec.id);
          setValue("name", rec.name);
          setValue("title", rec.title);
          setValue("sub_title", rec.sub_title);
          setValue("intro", rec.intro);
          setValue("bio", rec.bio);
          setValue("philosophy", rec.philosophy);
          setValue("milestones", JSON.stringify(rec.milestones, null, 2));
          setValue("expertise", JSON.stringify(rec.expertise, null, 2));
          setValue("social_impact_title", rec.social_impact_title);
          setValue("social_impact_role", rec.social_impact_role);
          setValue("social_impact_desc", rec.social_impact_desc);
          setValue("seo_title", rec.seo_title || "");
          setValue("seo_description", rec.seo_description || "");
          setImageUrl(rec.featured_image_url || null);
          setImagePath(rec.featured_image_path || null);
        }
      } catch (err) {
        console.error("Load founder database error:", err);
        setError("Failed to fetch database record.");
      } finally {
        setLoading(false);
      }
    }
    loadFounderData();
  }, [setValue, supabase]);

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
    if (!confirm("Are you sure you want to remove the cover image?")) return;
    try {
      if (imagePath) {
        await supabase.storage.from("founder-page").remove([imagePath]);
      }
      if (recordId) {
        await supabase
          .from("founder_page")
          .update({ featured_image_url: null, featured_image_path: null })
          .eq("id", recordId);
      }
      setImageUrl(null);
      setImagePath(null);
      setImageFile(null);
      setSuccess("Image deleted successfully.");
    } catch (err) {
      console.error("Remove image error:", err);
      setError("Failed to delete cover image.");
    }
  };

  const uploadImage = async (): Promise<{ url: string; path: string } | null> => {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `featured_${Date.now()}.${fileExt}`;

    const { error: uploadErr } = await supabase.storage
      .from("founder-page")
      .upload(filePath, imageFile);

    if (uploadErr) throw uploadErr;

    const { data: { publicUrl } } = supabase.storage
      .from("founder-page")
      .getPublicUrl(filePath);

    return { url: publicUrl, path: filePath };
  };

  const handleSave = async (data: any, action: "draft" | "published") => {
    setError(null);
    setSuccess(null);
    if (action === "draft") setSaving(true);
    else setPublishing(true);

    try {
      // Parse JSON fields
      let parsedMilestones = [];
      let parsedExpertise = [];
      try {
        parsedMilestones = JSON.parse(data.milestones);
        parsedExpertise = JSON.parse(data.expertise);
      } catch (jsonErr) {
        throw new Error("Invalid JSON format in Milestones or Expertise fields.");
      }

      let finalUrl = imageUrl;
      let finalPath = imagePath;

      // Clean up previous image if replacing
      if (imageFile && imagePath) {
        await supabase.storage.from("founder-page").remove([imagePath]);
      }

      // Upload new image if selected
      const uploaded = await uploadImage();
      if (uploaded) {
        finalUrl = uploaded.url;
        finalPath = uploaded.path;
      }

      const payload = {
        name: data.name,
        title: data.title,
        sub_title: data.sub_title,
        intro: data.intro,
        bio: data.bio,
        philosophy: data.philosophy,
        milestones: parsedMilestones,
        expertise: parsedExpertise,
        social_impact_title: data.social_impact_title,
        social_impact_role: data.social_impact_role,
        social_impact_desc: data.social_impact_desc,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        featured_image_url: finalUrl,
        featured_image_path: finalPath,
        status: action,
      };

      if (recordId) {
        const { error: updateErr } = await supabase
          .from("founder_page")
          .update(payload)
          .eq("id", recordId);

        if (updateErr) throw updateErr;
      } else {
        const { data: inserted, error: insertErr } = await supabase
          .from("founder_page")
          .insert([payload])
          .select();

        if (insertErr) throw insertErr;
        if (inserted && inserted[0]) setRecordId(inserted[0].id);
      }

      setSuccess(action === "draft" ? "Draft Saved Successfully" : "Changes Published Successfully");
    } catch (err: any) {
      console.error("Save founder error:", err);
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
            Founder Page CMS
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

      {/* Editor grid form */}
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Fields */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card: Founder Info */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Founder Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Name *</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Title *</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Sub credentials title *</label>
              <input
                type="text"
                {...register("sub_title", { required: "Sub title is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

          {/* Card: Biography */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Biography & Narrative
            </h3>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Introduction Profile *</label>
              <textarea
                rows={4}
                {...register("intro", { required: "Introduction profile is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Detailed Biography *</label>
              <textarea
                rows={4}
                {...register("bio", { required: "Detailed bio is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Philosophy Quote *</label>
              <input
                type="text"
                {...register("philosophy", { required: "Philosophy is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

          {/* Card: Dynamic lists (JSON blocks) */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Milestones & Expertise Arrays
            </h3>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Milestones JSON Array *</label>
              <textarea
                rows={5}
                {...register("milestones", { required: "Milestones schema array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Expertise JSON Array *</label>
              <textarea
                rows={5}
                {...register("expertise", { required: "Expertise schema array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

        </div>

        {/* Right Column Fields */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card: Portrait & Community block */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Media & Portrait
            </h4>

            {/* Featured portrait Image upload block */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">
                Featured Portrait Image
              </label>
              
              {imageUrl ? (
                <div className="relative aspect-square max-w-[200px] mx-auto rounded-full overflow-hidden bg-gray-100 border border-border-custom/60 group">
                  <img src={imageUrl} alt="Founder portrait" className="w-full h-full object-cover" />
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
                <label className="flex flex-col items-center justify-center aspect-square max-w-[200px] mx-auto rounded-full border border-dashed border-border-custom/80 bg-[#FAFAF8] hover:bg-gray-100/50 cursor-pointer transition-colors duration-200">
                  <ImageIcon size={28} className="text-text-secondary/40 shrink-0" />
                  <span className="text-[10px] text-text-secondary/70 mt-1 font-bold">Select File</span>
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

          {/* Card: Community & Social Contribution */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Social Impact Contribution
            </h4>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">Contribution Section Title *</label>
              <input
                type="text"
                {...register("social_impact_title", { required: "Social title is required." })}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">Contribution Active Role *</label>
              <input
                type="text"
                {...register("social_impact_role", { required: "Social role is required." })}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">Description Details *</label>
              <textarea
                rows={4}
                {...register("social_impact_desc", { required: "Social description is required." })}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

          {/* Card: SEO Options */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              SEO Optimization (Optional)
            </h4>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">SEO Meta Title</label>
              <input
                type="text"
                {...register("seo_title")}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">SEO Meta Description</label>
              <textarea
                rows={3}
                {...register("seo_description")}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200 resize-none"
              />
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
export default FounderEditor;
