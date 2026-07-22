"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FileText, Briefcase, Award, Users, 
  Mail, GraduationCap, Key, LogOut, ChevronLeft, ChevronRight, Menu, X, FolderTree, Settings
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Manage Pages", href: "/admin/manage-pages", icon: <FolderTree size={18} /> },
    { label: "Contact Enquiries", href: "/admin/contact-enquiries", icon: <Mail size={18} /> },
    { label: "Careers Forms", href: "/admin/careers", icon: <GraduationCap size={18} /> },
    { label: "Global Settings", href: "/admin/global-settings", icon: <Settings size={18} /> },
    { label: "Change Password", href: "/admin/change-password", icon: <Key size={18} /> },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/admin/login");
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#0F172A] text-white border-r border-white/10 relative z-30">
      
      {/* Header Info */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-accent-gold rounded-full shrink-0" />
          {!collapsed && (
            <span className="font-heading font-extrabold tracking-tight text-sm uppercase">
              RAAA Admin
            </span>
          )}
        </div>
        
        {/* Toggle Collapse Button (Desktop Only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center p-1 bg-white/5 border border-white/10 rounded-lg hover:bg-accent-gold hover:text-primary-navy transition-colors duration-200 cursor-pointer"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Menu Navigation Items */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold font-sans tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-accent-gold/10 border-l-4 border-accent-gold text-accent-gold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-accent-gold" : "text-white/60"}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Signout Option */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs sm:text-sm font-bold font-sans text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 cursor-pointer"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* MOBILE TRIGGER NAV */}
      <div className="lg:hidden bg-[#0F172A] text-white p-4 flex items-center justify-between border-b border-white/10 relative z-40">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-accent-gold rounded-full" />
          <span className="font-heading font-extrabold text-sm uppercase">RAAA Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 border border-white/10 rounded-lg hover:bg-white/5"
          aria-label="Toggle Navigation menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* MOBILE OVERLAY DRAWER PANEL */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative flex-1 max-w-[260px] h-full"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR GRID SYSTEM */}
      <aside className={`hidden lg:block h-screen sticky top-0 shrink-0 transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[260px]"
      }`}>
        {sidebarContent}
      </aside>
    </>
  );
}
export default AdminSidebar;
