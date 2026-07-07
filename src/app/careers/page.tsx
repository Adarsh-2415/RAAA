"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, Upload, CheckCircle2 } from "lucide-react";
import { careersConfig } from "@/components/sections/welcome/careers-config";

import { createClient } from "@/lib/supabase/client";

export default function CareersPage() {
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "photo" | "resume") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "photo") {
        setPhotoFile(file);
      } else {
        setResumeFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message || !photoFile || !resumeFile) {
      alert("Please fill in all required fields and upload the requested files.");
      return;
    }

    try {
      setLoading(true);

      // Unique file names
      const fileExtPhoto = photoFile.name.split(".").pop();
      const photoPath = `photo_${Date.now()}.${fileExtPhoto}`;

      const fileExtResume = resumeFile.name.split(".").pop();
      const resumePath = `resume_${Date.now()}.${fileExtResume}`;

      // Upload Photo to storage bucket
      const { error: photoErr } = await supabase.storage
        .from("photos")
        .upload(photoPath, photoFile);
      if (photoErr) throw photoErr;

      // Upload Resume to storage bucket
      const { error: resumeErr } = await supabase.storage
        .from("resumes")
        .upload(resumePath, resumeFile);
      if (resumeErr) throw resumeErr;

      // Public URLs
      const { data: { publicUrl: photoUrl } } = supabase.storage
        .from("photos")
        .getPublicUrl(photoPath);

      const { data: { publicUrl: resumeUrl } } = supabase.storage
        .from("resumes")
        .getPublicUrl(resumePath);

      // Insert submission row
      const { error: insertErr } = await supabase.from("careers_submissions").insert([
        {
          candidate_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          photo_url: photoUrl,
          resume_url: resumeUrl,
          status: "pending",
        },
      ]);

      if (insertErr) throw insertErr;

      setSubmitted(true);
      // Reset Form
      setFormData({ name: "", phone: "", email: "", message: "" });
      setPhotoFile(null);
      setResumeFile(null);
    } catch (err) {
      console.error("Submit application error:", err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-bg-warm min-h-screen font-sans pb-20">
      
      {/* Hero Banner */}
      <div className="bg-[#0F172A] text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%) pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <nav className="text-xs text-white/50 space-x-2 font-sans tracking-wide">
            <span>Home</span>
            <span>/</span>
            <span className="text-accent-gold">Careers</span>
          </nav>
          
          <span className="inline-block px-3 py-1 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full text-[10px] font-bold tracking-widest text-[#E5C158] uppercase">
            JOIN OUR TEAM
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight max-w-3xl mx-auto">
            Opportunities at R.A. Aggarwal & Associates
          </h1>
          <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* SECTION 2: Accordion Job Description */}
        {careersConfig.map((job) => (
          <div key={job.id} className="border border-border-custom/80 rounded-2xl bg-white overflow-hidden shadow-xs">
            {/* Job Header */}
            <div className="px-6 py-4 bg-white border-b border-border-custom/40 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-accent-gold rounded-full" />
              <h2 className="text-lg font-bold text-primary-navy font-heading">
                {job.title}
              </h2>
            </div>

            {/* Accordion Trigger Header */}
            <button
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="w-full flex items-center justify-between px-6 py-4 bg-[#E5E7EB] hover:bg-gray-200 transition-colors duration-200 text-left font-sans font-bold text-primary-navy text-sm border-b border-border-custom/40"
            >
              <span>Roles and Responsibilities</span>
              {accordionOpen ? <Minus size={16} /> : <Plus size={16} />}
            </button>

            {/* Accordion Content Panel */}
            <AnimatePresence initial={false}>
              {accordionOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-6 bg-[#FAFAF8] text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                    <ul className="list-disc pl-5 space-y-2">
                      {job.roles.map((role, idx) => (
                        <li key={idx} className="pl-1">
                          {role}
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-border-custom/50 pt-4">
                      <h4 className="font-bold text-primary-navy mb-1">Education:</h4>
                      <p>{job.education}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* SECTION 3: Dynamic Application Form */}
        <div className="border border-border-custom/80 rounded-2xl bg-white p-6 sm:p-10 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-border-custom/40 pb-4">
            <div className="w-1.5 h-6 bg-accent-gold rounded-full" />
            <h2 className="text-lg font-bold text-primary-navy font-heading">
              Apply
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary-navy font-heading">
                  Application Submitted!
                </h3>
                <p className="text-sm text-text-secondary max-w-md mx-auto">
                  Thank you for submitting your application to R.A. Aggarwal & Associates. We will review your profile and get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-primary-navy text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-accent-gold hover:text-primary-navy transition-all duration-200"
                >
                  Apply Again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block font-bold text-primary-navy">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom/80 rounded-lg focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                  />
                </div>

                {/* Contact Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block font-bold text-primary-navy">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom/80 rounded-lg focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block font-bold text-primary-navy">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom/80 rounded-lg focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                  />
                </div>

                {/* Comment or Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block font-bold text-primary-navy">
                    Comment or Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-border-custom/80 rounded-lg focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 resize-y"
                  />
                </div>

                {/* Upload Photo */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-primary-navy">
                    Upload your Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-border-custom rounded-lg bg-[#FAFAF8] hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-xs font-bold text-primary-navy">
                      <Upload size={14} className="text-accent-gold" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "photo")}
                        required
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-text-secondary truncate">
                      {photoFile ? photoFile.name : "No file chosen"}
                    </span>
                  </div>
                </div>

                {/* Upload Resume */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-primary-navy">
                    Upload Your Resume/CV <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-border-custom rounded-lg bg-[#FAFAF8] hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-xs font-bold text-primary-navy">
                      <Upload size={14} className="text-accent-gold" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={(e) => handleFileChange(e, "resume")}
                        required
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-text-secondary truncate">
                      {resumeFile ? resumeFile.name : "No file chosen"}
                    </span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-32 flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#00A8E8] hover:bg-opacity-95 rounded-md hover:scale-[1.01] transition-all duration-300 shadow-md cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
