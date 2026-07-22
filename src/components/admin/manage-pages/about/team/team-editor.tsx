"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { Upload, Trash2, CheckCircle2, AlertCircle, Image as ImageIcon, ArrowLeft, Plus, Loader2, Edit } from "lucide-react";
import Link from "next/link";
import { TeamMemberDetails } from "@/types/team";

export function TeamEditor() {
  const supabase = createClient();
  const [members, setMembers] = useState<TeamMemberDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states for creating / editing one member
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      id: "",
      name: "",
      designation: "",
      phone: "",
      email: "",
      description: "[]",
      timeline: "[]",
      expertise: "[]",
    }
  });

  const loadMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error("Load team error:", err);
      setError("Failed to fetch team members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleEditInit = (member: TeamMemberDetails) => {
    setEditingId(member.id);
    setValue("id", member.id);
    setValue("name", member.name);
    setValue("designation", member.designation);
    setValue("phone", member.phone);
    setValue("email", member.email);
    setValue("description", JSON.stringify(member.description, null, 2));
    setValue("timeline", JSON.stringify(member.timeline, null, 2));
    setValue("expertise", JSON.stringify(member.expertise, null, 2));
    setImageUrl(member.featured_image_url || null);
    setImagePath(member.featured_image_path || null);
    setImageFile(null);
  };

  const handleCreateInit = () => {
    setEditingId("new");
    reset({
      id: "",
      name: "",
      designation: "",
      phone: "",
      email: "",
      description: "[]",
      timeline: "[]",
      expertise: "[]",
    });
    setImageUrl(null);
    setImagePath(null);
    setImageFile(null);
  };

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

  const handleDeleteImage = async () => {
    if (!confirm("Are you sure you want to remove the profile photo?")) return;
    try {
      if (imagePath) {
        await supabase.storage.from("team-page").remove([imagePath]);
      }
      if (editingId && editingId !== "new") {
        await supabase
          .from("team_members")
          .update({ featured_image_url: null, featured_image_path: null })
          .eq("id", editingId);
      }
      setImageUrl(null);
      setImagePath(null);
      setImageFile(null);
      setSuccess("Profile photo removed.");
    } catch (err) {
      console.error("Remove image error:", err);
    }
  };

  const uploadImage = async (): Promise<{ url: string; path: string } | null> => {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `profile_${Date.now()}.${fileExt}`;

    const { error: uploadErr } = await supabase.storage
      .from("team-page")
      .upload(filePath, imageFile);

    if (uploadErr) throw uploadErr;

    const { data: { publicUrl } } = supabase.storage
      .from("team-page")
      .getPublicUrl(filePath);

    return { url: publicUrl, path: filePath };
  };

  const handleSave = async (data: any, action: "draft" | "published") => {
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      // Parse JSON fields
      let parsedDesc = [];
      let parsedMilestones = [];
      let parsedExpertise = [];
      try {
        parsedDesc = JSON.parse(data.description);
        parsedMilestones = JSON.parse(data.timeline);
        parsedExpertise = JSON.parse(data.expertise);
      } catch (jsonErr) {
        throw new Error("Invalid JSON format in Description, Milestones or Expertise fields.");
      }

      let finalUrl = imageUrl;
      let finalPath = imagePath;

      // Clean up previous image if replacing
      if (imageFile && imagePath) {
        await supabase.storage.from("team-page").remove([imagePath]);
      }

      // Upload new image if selected
      const uploaded = await uploadImage();
      if (uploaded) {
        finalUrl = uploaded.url;
        finalPath = uploaded.path;
      }

      const payload = {
        name: data.name,
        designation: data.designation,
        phone: data.phone,
        email: data.email,
        description: parsedDesc,
        timeline: parsedMilestones,
        expertise: parsedExpertise,
        featured_image_url: finalUrl,
        featured_image_path: finalPath,
        status: action,
      };

      if (editingId === "new") {
        // Create new member (id is derived from title slug/input)
        const computedId = data.id.trim() || data.name.toLowerCase().replace(/\s+/g, "-");
        const { error: insertErr } = await supabase
          .from("team_members")
          .insert([{ id: computedId, ...payload }]);

        if (insertErr) throw insertErr;
      } else {
        // Update existing member
        const { error: updateErr } = await supabase
          .from("team_members")
          .update(payload)
          .eq("id", editingId);

        if (updateErr) throw updateErr;
      }

      setSuccess("Changes Saved Successfully");
      setEditingId(null);
      await loadMembers();
    } catch (err: any) {
      console.error("Save team member error:", err);
      setError(err.message || "Failed to process database write.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id: string, imagePath?: string | null) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      if (imagePath) {
        await supabase.storage.from("team-page").remove([imagePath]);
      }
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setSuccess("Team member deleted successfully.");
      await loadMembers();
    } catch (err) {
      console.error("Delete member error:", err);
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
          {editingId ? (
            <button
              onClick={() => setEditingId(null)}
              className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft size={12} />
              <span>Back to Listing</span>
            </button>
          ) : (
            <Link href="/admin/manage-pages" className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors duration-200">
              <ArrowLeft size={12} />
              <span>Back to Manage Pages</span>
            </Link>
          )}
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
            Team Members CMS
          </h2>
        </div>

        {!editingId && (
          <button
            onClick={handleCreateInit}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200 shadow-sm cursor-pointer shrink-0"
          >
            <Plus size={14} />
            <span>Add Member</span>
          </button>
        )}
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

      {/* Conditional layouts: Listing vs Form */}
      {editingId ? (
        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Fields */}
          <div className="lg:col-span-8 bg-white border border-border-custom/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
              Member Credentials
            </h3>

            {editingId === "new" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Unique ID (slug format) *</label>
                <input
                  type="text"
                  placeholder="e.g. deepak-aggarwal"
                  {...register("id", { required: "Unique ID is required for new records." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy font-mono focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
            )}

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
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Designation *</label>
                <input
                  type="text"
                  {...register("designation", { required: "Designation is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Phone Number *</label>
                <input
                  type="text"
                  {...register("phone", { required: "Phone is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy">Email *</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required." })}
                  className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
              </div>
            </div>

            {/* Description lines array */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Description Paragraphs JSON Array *</label>
              <textarea
                rows={4}
                {...register("description", { required: "Description array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            {/* Timelines and expertise dynamic arrays */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Timeline milestones JSON Array *</label>
              <textarea
                rows={4}
                {...register("timeline", { required: "Timeline milestones array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy font-mono">Expertise areas JSON Array *</label>
              <textarea
                rows={4}
                {...register("expertise", { required: "Expertise fields array is required." })}
                className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-xs font-mono text-primary-navy focus:outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

          </div>

          {/* Right Column Fields */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Featured Portrait upload block */}
            <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy border-b border-border-custom/40 pb-2">
                Profile Photo
              </h4>
              
              {imageUrl ? (
                <div className="relative aspect-square max-w-[180px] mx-auto rounded-xl overflow-hidden bg-gray-100 border border-border-custom/60 group">
                  <img src={imageUrl} alt="Profile preview" className="w-full h-full object-cover" />
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
                <label className="flex flex-col items-center justify-center aspect-square max-w-[180px] mx-auto rounded-xl border border-dashed border-border-custom/80 bg-[#FAFAF8] hover:bg-gray-100/50 cursor-pointer transition-colors duration-200">
                  <ImageIcon size={28} className="text-text-secondary/40 shrink-0" />
                  <span className="text-[10px] text-text-secondary/70 mt-1 font-bold">Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Save trigger block */}
            <div className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-xs space-y-3">
              <button
                type="button"
                disabled={saving}
                onClick={handleSubmit((data) => handleSave(data, "draft"))}
                className="w-full py-2.5 bg-white border border-border-custom text-primary-navy text-xs font-bold uppercase tracking-wider rounded-full hover:bg-bg-warm disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSubmit((data) => handleSave(data, "published"))}
                className="w-full py-2.5 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy disabled:bg-gray-200 disabled:text-gray-400 transition-all duration-200 cursor-pointer"
              >
                Publish Live
              </button>
            </div>

          </div>

        </form>
      ) : (
        /* Listing view */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-border-custom/80 rounded-3xl p-6 shadow-2xs hover:shadow-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {member.featured_image_url ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-border-custom/50 bg-gray-50 shrink-0">
                    <img src={member.featured_image_url} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-bg-warm border border-border-custom/50 flex items-center justify-center text-text-secondary/40 shrink-0">
                    <ImageIcon size={18} />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-primary-navy font-heading truncate">
                    {member.name}
                  </h4>
                  <span className="text-xs text-text-secondary/70 font-sans block truncate">
                    {member.designation}
                  </span>
                  
                  {/* Status badges */}
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide mt-1.5 ${
                    member.status === "published"
                      ? "bg-green-50 text-green-700 border border-green-150"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEditInit(member)}
                  className="p-2 hover:bg-gray-100 rounded-full text-text-secondary hover:text-accent-gold transition-colors duration-150 cursor-pointer"
                  title="Edit member details"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id, member.featured_image_path)}
                  className="p-2 hover:bg-red-50 rounded-full text-text-secondary hover:text-red-500 transition-colors duration-150 cursor-pointer"
                  title="Remove member"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
export default TeamEditor;
