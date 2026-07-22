"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export function HistoryEditor() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      tagline: "",
      headline: "",
      intro: "",
      timeline: "[]",
      services: "[]",
      philosophy: "[]",
      approach: "",
      closing: "",
    }
  });

  useEffect(() => {
    async function loadHistoryData() {
      try {
        setLoading(true);
        const { data, error: fetchErr } = await supabase
          .from("about_history")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        if (fetchErr) throw fetchErr;

        if (data && data.length > 0) {
          const rec = data[0];
          setRecordId(rec.id);
          setValue("tagline", rec.tagline);
          setValue("headline", rec.headline);
          setValue("intro", rec.intro);
          setValue("timeline", JSON.stringify(rec.timeline, null, 2));
          setValue("services", JSON.stringify(rec.services, null, 2));
          setValue("philosophy", JSON.stringify(rec.philosophy, null, 2));
          setValue("approach", rec.approach);
          setValue("closing", rec.closing);
        }
      } catch (err) {
        console.error("Load history database error:", err);
        setError("Failed to fetch database record.");
      } finally {
        setLoading(false);
      }
    }
    loadHistoryData();
  }, [setValue, supabase]);

  const handleSave = async (data: any, action: "draft" | "published") => {
    setError(null);
    setSuccess(null);
    if (action === "draft") setSaving(true);
    else setPublishing(true);

    try {
      // Parse JSON fields
      let parsedTimeline = [];
      let parsedServices = [];
      let parsedPhilosophy = [];
      try {
        parsedTimeline = JSON.parse(data.timeline);
        parsedServices = JSON.parse(data.services);
        parsedPhilosophy = JSON.parse(data.philosophy);
      } catch (jsonErr) {
        throw new Error("Invalid JSON format in Timeline, Services or Philosophy fields.");
      }

      const payload = {
        tagline: data.tagline,
        headline: data.headline,
        intro: data.intro,
        timeline: parsedTimeline,
        services: parsedServices,
        philosophy: parsedPhilosophy,
        approach: data.approach,
        closing: data.closing,
        status: action,
      };

      if (recordId) {
        const { error: updateErr } = await supabase
          .from("about_history")
          .update(payload)
          .eq("id", recordId);

        if (updateErr) throw updateErr;
      } else {
        const { data: inserted, error: insertErr } = await supabase
          .from("about_history")
          .insert([payload])
          .select();

        if (insertErr) throw insertErr;
        if (inserted && inserted[0]) setRecordId(inserted[0].id);
      }

      setSuccess(action === "draft" ? "Draft Saved Successfully" : "Changes Published Successfully");
    } catch (err: any) {
      console.error("Save history error:", err);
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
            History Page CMS
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
          
          {/* Card: Introduction */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Page Introduction
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Tagline *</label>
                <input
                  type="text"
                  {...register("tagline", { required: "Tagline is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Headline *</label>
                <input
                  type="text"
                  {...register("headline", { required: "Headline is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Introductory Paragraph *</label>
              <textarea
                rows={4}
                {...register("intro", { required: "Introduction paragraph is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

          {/* Card: Biography / Timeline Milestones */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Timeline Journey
            </h3>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Timeline Events JSON Array *</label>
              <textarea
                rows={6}
                {...register("timeline", { required: "Timeline milestones array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

          {/* Card: Dynamic lists (JSON blocks) */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Expertise & Philosophy Lists
            </h3>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Core Expertise JSON Array *</label>
              <textarea
                rows={5}
                {...register("services", { required: "Services list array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Philosophy JSON Array *</label>
              <textarea
                rows={5}
                {...register("philosophy", { required: "Philosophy array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

        </div>

        {/* Right Column Fields */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card: Closing Details */}
          <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Closing & Approach
            </h4>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">Working Approach Paragraph *</label>
              <textarea
                rows={4}
                {...register("approach", { required: "Approach description is required." })}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-text-secondary font-bold">Closing Statement *</label>
              <textarea
                rows={4}
                {...register("closing", { required: "Closing statement is required." })}
                className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
export default HistoryEditor;
