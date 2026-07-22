"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { SettingsProvider } from "@/components/providers/settings-provider";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="font-sans antialiased text-text-primary bg-bg-warm min-h-screen flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <SettingsProvider>
      <SmoothScroll>
        <Navbar />
        {children}
        <Footer />
      </SmoothScroll>
    </SettingsProvider>
  );
}
export default ClientLayoutWrapper;
