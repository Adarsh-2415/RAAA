"use client";

import React, { useEffect, useState } from "react";
import { LogOut, Mail, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminDashboardProps } from "./types";
import { StatCard } from "./stat-card";
import { QuickActions } from "./quick-actions";
import { SystemHealth } from "./system-health";
import { DashboardSkeleton } from "./skeleton-ui";
import { DashboardError } from "./error-state";

export default function DashboardLayout({
  stats,
  activities = [],
  health,
  isLoading = false,
  error = null,
}: AdminDashboardProps) {
  const router = useRouter();
  const supabase = createClient();
  const [greeting, setGreeting] = useState("Welcome");
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    // Timezone based greetings
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email || "admin@raaa.com");
      }
    }
    fetchUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-bg-warm font-sans p-6 sm:p-12 lg:p-16">
        <DashboardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-bg-warm font-sans flex items-center justify-center p-6">
        <DashboardError message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-bg-warm font-sans flex flex-col justify-between">
      
      {/* Header section */}
      <header className="bg-[#0F172A] text-white py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-accent-gold rounded-full" />
            <span className="font-heading font-extrabold tracking-tight text-base sm:text-lg">
              R.A. Aggarwal & Associates
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold font-sans">
            <div className="hidden sm:flex items-center gap-1.5 text-white/70">
              <Mail size={13} className="text-accent-gold" />
              <span>{adminEmail}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-full hover:bg-accent-gold hover:border-accent-gold hover:text-primary-navy transition-all duration-200 cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Console Grid */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10 flex-1">
        
        {/* Welcome Block */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold tracking-widest text-[#E56E58] uppercase block">
            Management Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
            {greeting}, Admin
          </h1>
          <div className="h-[2px] w-10 bg-accent-gold rounded-full" />
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-2xl pt-1">
            Overview statistics of the website. Connect to Supabase database tables to dynamically fetch metrics counts.
          </p>
        </div>

        {/* Real-time stats grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            label="Total Contact Enquiries"
            value={stats.totalContactEnquiries}
            icon={<Mail size={18} />}
          />
          <StatCard
            label="Total Careers Forms"
            value={stats.totalCareersForm}
            icon={<GraduationCap size={18} />}
          />
        </div>

        {/* Action items shortcuts */}
        <QuickActions />

        {/* Health connectivity Status metrics */}
        <SystemHealth health={health} />

      </main>

      {/* Footer copyright */}
      <footer className="py-6 text-center text-xs text-text-secondary/50 font-sans border-t border-border-custom/30">
        <span>&copy; {new Date().getFullYear()} R.A. Aggarwal & Associates. All rights reserved.</span>
      </footer>

    </div>
  );
}
export { DashboardLayout };
