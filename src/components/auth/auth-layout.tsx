import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-bg-warm flex flex-col lg:flex-row font-sans">
      
      {/* LEFT PANEL: Split pane visual brand panel (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract Gold Background Grid */}
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 60%) pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Branding header */}
        <div className="relative z-10 space-y-2">
          <div className="h-[2px] w-8 bg-accent-gold" />
          <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
            R.A. Aggarwal & Associates
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight font-heading leading-tight">
            Chartered Accountants & Legal Consultants
          </h2>
        </div>

        {/* Branding Center Accent */}
        <div className="relative z-10 space-y-4 max-w-md">
          <span className="inline-block px-3 py-1 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full text-[10px] font-bold tracking-widest text-[#E5C158] uppercase">
            SECURE ADMINISTRATOR PORTAL
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight font-heading leading-tight text-white">
            Administrative Management Console
          </h1>
          <p className="text-sm text-white/70 leading-relaxed font-sans">
            Verify credentials to access direct/indirect tax tables, client portfolios, history logs, and CMS publications.
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-white/40 font-sans">
          <span>&copy; {new Date().getFullYear()} R.A. Aggarwal & Associates. All rights reserved.</span>
        </div>

      </div>

      {/* RIGHT PANEL: Centered Form Card (Mobile and Desktop) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

    </div>
  );
}
export default AuthLayout;
