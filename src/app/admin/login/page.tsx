import React from "react";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="space-y-8 bg-white border border-border-custom/80 rounded-3xl p-8 sm:p-10 shadow-custom-lg">
        
        {/* Branding header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-primary-navy/5 rounded-full flex items-center justify-center mx-auto border border-border-custom/50">
            <div className="h-1.5 w-6 bg-accent-gold rounded-full" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-primary-navy font-heading tracking-tight">
              Sign In to Admin
            </h2>
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              Enter your credentials below to access the administrative dashboard.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <LoginForm />

      </div>
    </AuthLayout>
  );
}

export const metadata = {
  title: "Admin Sign In | R.A. Aggarwal & Associates",
  description: "Secure Admin Login Portal for R.A. Aggarwal & Associates CMS console.",
};
