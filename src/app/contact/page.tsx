"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, RefreshCw, Send } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Generate random 6-character captcha string
  const generateCaptcha = () => {
    const chars = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // omitted confusing chars like 1, 0, O, I, L
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    setMounted(true);
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaCode) {
      alert("Verification code is incorrect. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("contact_enquiries").insert([
        {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      alert("Thank you! Your message has been sent successfully.");
      // Reset form
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setCaptchaInput("");
      generateCaptcha();
    } catch (err) {
      console.error("Submit contact enquiry error:", err);
      alert("Failed to submit message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-bg-warm min-h-screen">
      
      {/* Page Title Header Banner */}
      <div className="bg-[#0F172A] text-white py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%) pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
            Get in touch
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Contact Us
          </h1>
          <div className="mt-4 h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        
        {/* Top Section: Split Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-4">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#E56E58] uppercase">
                Reach Out
              </span>
              <h2 className="text-3xl font-extrabold text-primary-navy font-heading tracking-tight leading-tight">
                Contact Information
              </h2>
              <div className="h-[2px] w-12 bg-accent-gold rounded-full" />
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans max-w-md">
                For corporate filings, auditing services, tax assistance, legal consults, or business registration advisories, please contact our Roorkee helpdesk.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              {/* Card 1: Location */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4 p-5 bg-white border border-border-custom/85 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="p-3 bg-[#FAFAF8] rounded-xl text-accent-gold group-hover:bg-accent-gold/10 transition-colors duration-300">
                  <MapPin size={22} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-bold text-primary-navy font-heading">
                    Office Location
                  </span>
                  <span className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
                    354 C, 30 Civil Lines, Near Indian Institute of Technology, Roorkee, Uttarakhand 247667
                  </span>
                  <a
                    href="https://maps.google.com/?q=R.+A.+Aggarwal+%26+Associates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-accent-gold hover:underline mt-2 inline-block w-fit"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Call Desk */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4 p-5 bg-white border border-border-custom/85 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="p-3 bg-[#FAFAF8] rounded-xl text-accent-gold group-hover:bg-accent-gold/10 transition-colors duration-300">
                  <Phone size={22} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-bold text-primary-navy font-heading">
                    Call Desk
                  </span>
                  <a
                    href="tel:+911332273737"
                    className="text-xs sm:text-sm text-text-secondary font-sans hover:text-accent-gold transition-colors duration-200"
                  >
                    Primary: +91-1332-273737
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Email */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4 p-5 bg-white border border-border-custom/85 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="p-3 bg-[#FAFAF8] rounded-xl text-accent-gold group-hover:bg-accent-gold/10 transition-colors duration-300">
                  <Mail size={22} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-bold text-primary-navy font-heading">
                    E-Mail
                  </span>
                  <a
                    href="mailto:mail@raaa.in"
                    className="text-xs sm:text-sm text-text-secondary font-sans hover:text-accent-gold transition-colors duration-200"
                  >
                    mail@raaa.in
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Message Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-border-custom/85 rounded-2xl p-6 sm:p-10 shadow-custom-lg"
            >
              <h3 className="text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
                Send a Message
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent-gold mt-1 block">
                Fields marked with * are required
              </span>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-primary-navy">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-primary-navy">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="client@example.com"
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Row 2: Phone and Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-primary-navy">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-primary-navy">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Inquiry Topic"
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-primary-navy">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write details of your query..."
                    className="w-full px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 resize-none"
                  />
                </div>

                {/* CAPTCHA human verification layout */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="captcha" className="text-xs font-bold uppercase tracking-wider text-primary-navy">
                    Verification Code *
                  </label>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="px-4 py-2.5 bg-gradient-to-r from-red-100 to-yellow-100 text-[#E56E58] tracking-widest font-mono font-extrabold text-base select-none border border-red-200 rounded-lg shadow-inner pointer-events-none decoration-line-through">
                        {mounted ? captchaCode : "......"}
                      </div>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        aria-label="Refresh captcha code"
                        className="p-3 bg-[#FAFAF8] border border-border-custom hover:bg-[#FAFAF8]/90 text-text-secondary hover:text-accent-gold rounded-lg transition-all duration-200 focus:outline-none cursor-pointer"
                      >
                        <RefreshCw size={15} />
                      </button>
                    </div>

                    <input
                      type="text"
                      id="captcha"
                      required
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Type code"
                      className="px-4 py-3 bg-[#FAFAF8] border border-border-custom rounded-lg text-sm text-primary-navy focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 uppercase tracking-widest font-mono font-extrabold w-32"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-primary-navy hover:bg-[#C9A227] hover:text-primary-navy hover:scale-[1.02] transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A227] shadow-lg cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    <Send size={13} />
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Full-Width Google Maps Frame */}
      <div className="w-full h-[500px] border-t border-border-custom relative z-10 bg-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27679.009312585968!2d77.88834!3d29.867845000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb37bd9b855f3%3A0xd33d2ce80b321dc9!2sR.%20A.%20Aggarwal%20%26%20Associates!5e0!3m2!1sen!2sin!4v1783076945437!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Google Map location of R.A. Aggarwal & Associates"
        ></iframe>
      </div>

    </div>
  );
}
