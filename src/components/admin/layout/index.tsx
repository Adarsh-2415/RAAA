"use client";

import React from "react";
import { AdminSidebar } from "../sidebar";

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export function ConsoleLayout({ children }: ConsoleLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-bg-warm flex flex-col lg:flex-row font-sans">
      
      {/* Sidebar Nav */}
      <AdminSidebar />

      {/* Main Console View panel */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-10 space-y-10">
        {children}
      </main>

    </div>
  );
}
export default ConsoleLayout;
