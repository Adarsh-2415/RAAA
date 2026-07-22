"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

export function SettingsForm() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      phone_number: "",
      email_address: "",
      office_address: "",
      facebook_link: "",
      twitter_link: "",
      linkedin_link: "",
    }
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("global_settings")
          .select("*");

        if (error) throw error;

        if (data) {
          data.forEach((setting: { key: string; value: string }) => {
            setValue(setting.key as any, setting.value);
          });
        }
      } catch (err) {
        console.error("Load settings error:", err);
        setError("Failed to fetch settings from database.");
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [setValue, supabase]);

  const handleSave = async (data: any) => {
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      // Execute upsert query calls for each field
      const upserts = Object.keys(data).map((key) => {
        return supabase
          .from("global_settings")
          .upsert({ key, value: data[key], updated_at: new Date().toISOString() });
      });

      const results = await Promise.all(upserts);
      
      // Check for errors in transaction results
      const failed = results.find((res) => res.error);
      if (failed) throw failed.error;

      setSuccess("Settings Saved Successfully");
    } catch (err: any) {
      console.error("Save settings error:", err);
      setError(err.message || "Failed to process database write.");
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl space-y-8">
      
      {/* Title Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-custom/40 pb-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
            Global Settings CMS
          </h2>
          <p className="text-xs text-text-secondary">Configure central contact credentials and social profile links across the public website.</p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={handleSubmit(handleSave)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200 shadow-sm cursor-pointer disabled:bg-gray-200"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>Save Settings</span>
        </button>
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

      {/* Settings Grid form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Contact Details */}
        <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2 flex items-center gap-2">
            <Phone size={14} className="text-accent-gold" />
            <span>Contact Credentials</span>
          </h3>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Phone Number</label>
            <input
              type="text"
              {...register("phone_number")}
              className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="+91-XXXXXXXXXX"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Email Address</label>
            <input
              type="email"
              {...register("email_address")}
              className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="mail@raaa.in"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Office Location Address</label>
            <textarea
              rows={4}
              {...register("office_address")}
              className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="Full office postal coordinates..."
            />
          </div>
        </div>

        {/* Card 2: Social Links */}
        <div className="bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2 flex items-center gap-2">
            <Linkedin size={14} className="text-accent-gold" />
            <span>Social Profile links</span>
          </h3>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
              <Facebook size={12} className="text-blue-600" />
              <span>Facebook Page Link</span>
            </label>
            <input
              type="url"
              {...register("facebook_link")}
              className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
              <Twitter size={12} className="text-sky-500" />
              <span>Twitter Account Link</span>
            </label>
            <input
              type="url"
              {...register("twitter_link")}
              className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy flex items-center gap-1.5">
              <Linkedin size={12} className="text-blue-700" />
              <span>LinkedIn profile Link</span>
            </label>
            <input
              type="url"
              {...register("linkedin_link")}
              className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              placeholder="https://linkedin.com/company/..."
            />
          </div>
        </div>

      </form>

    </div>
  );
}
export default SettingsForm;
