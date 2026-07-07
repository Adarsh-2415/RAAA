"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import { SystemHealthStatus } from "./types";

interface HealthProps {
  health: SystemHealthStatus;
}

export function SystemHealth({ health }: HealthProps) {
  const getIndicatorColor = (status: "green" | "yellow" | "red") => {
    if (status === "green") return "bg-green-500 text-green-500";
    if (status === "yellow") return "bg-amber-500 text-amber-500";
    return "bg-red-500 text-red-500";
  };

  const getIndicatorIcon = (status: "green" | "yellow" | "red") => {
    if (status === "green") return <CheckCircle2 size={13} className="text-green-600" />;
    if (status === "yellow") return <AlertTriangle size={13} className="text-amber-600" />;
    return <XCircle size={13} className="text-red-600" />;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-primary-navy font-heading uppercase tracking-wider">
        System Health
      </h3>
      <div className="bg-white border border-border-custom/80 rounded-2xl p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Supabase status check */}
        <div className="flex items-center justify-between border-b sm:border-b-0 sm:border-r border-border-custom/40 pb-4 sm:pb-0 sm:pr-6">
          <div className="space-y-0.5">
            <span className="text-xs text-text-secondary/70 font-sans">Supabase Server</span>
            <h4 className="text-xs sm:text-sm font-bold text-primary-navy font-heading">Connection</h4>
          </div>
          <div className="flex items-center gap-1.5">
            {getIndicatorIcon(health.supabaseConnection)}
            <span className={`w-2 h-2 rounded-full ${getIndicatorColor(health.supabaseConnection)} animate-pulse`} />
          </div>
        </div>

        {/* Database status check */}
        <div className="flex items-center justify-between border-b md:border-b-0 md:border-r border-border-custom/40 pb-4 sm:pb-0 sm:pr-6">
          <div className="space-y-0.5">
            <span className="text-xs text-text-secondary/70 font-sans">Database Status</span>
            <h4 className="text-xs sm:text-sm font-bold text-primary-navy font-heading">PostgreSQL</h4>
          </div>
          <div className="flex items-center gap-1.5">
            {getIndicatorIcon(health.databaseStatus)}
            <span className={`w-2 h-2 rounded-full ${getIndicatorColor(health.databaseStatus)} animate-pulse`} />
          </div>
        </div>

        {/* Storage status check */}
        <div className="flex items-center justify-between border-b sm:border-b-0 sm:border-r border-border-custom/40 pb-4 sm:pb-0 sm:pr-6">
          <div className="space-y-0.5">
            <span className="text-xs text-text-secondary/70 font-sans">Auth Status</span>
            <h4 className="text-xs sm:text-sm font-bold text-primary-navy font-heading">Session Sync</h4>
          </div>
          <div className="flex items-center gap-1.5">
            {getIndicatorIcon(health.authenticationStatus)}
            <span className={`w-2 h-2 rounded-full ${getIndicatorColor(health.authenticationStatus)} animate-pulse`} />
          </div>
        </div>

        {/* Sync status check */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-text-secondary/70 font-sans">Environment</span>
            <h4 className="text-xs sm:text-sm font-bold text-primary-navy font-heading uppercase">{health.environment}</h4>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <RefreshCw size={13} className="text-accent-gold" />
            <span>Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
export default SystemHealth;
