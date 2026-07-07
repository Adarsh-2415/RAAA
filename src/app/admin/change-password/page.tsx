"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ConsoleLayout } from "@/components/admin/layout";
import { PasswordInput } from "@/components/auth/password-input";

export default function ChangePasswordPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const newPassword = watch("password");

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password
      });

      if (updateError) throw updateError;

      setSuccess(true);
      reset();
    } catch (err: any) {
      console.error("Change password error:", err);
      setError(err.message || "Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConsoleLayout>
      
      {/* Header section */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold tracking-widest text-[#E56E58] uppercase block">
          Security Settings
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-navy font-heading tracking-tight">
          Change Password
        </h1>
        <div className="h-[2px] w-10 bg-accent-gold rounded-full" />
      </div>

      <div className="max-w-md bg-white border border-border-custom/80 rounded-3xl p-8 shadow-sm space-y-6">
        
        {/* Error Alert Display */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed font-sans">{error}</p>
          </div>
        )}

        {/* Success Alert Display */}
        {success && (
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-xs text-green-700 leading-relaxed font-sans">
              Password updated successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* New password input */}
          <PasswordInput
            id="password"
            label="New Password"
            disabled={loading}
            registerProps={register("password", {
              required: "Password is required.",
              minLength: { value: 8, message: "Password must be at least 8 characters." }
            })}
            error={errors.password?.message}
          />

          {/* Confirm password input */}
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            disabled={loading}
            registerProps={register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (val) => val === newPassword || "Passwords do not match."
            })}
            error={errors.confirmPassword?.message}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-primary-navy hover:bg-accent-gold hover:text-primary-navy disabled:bg-gray-300 disabled:text-gray-500 rounded-md transition-all duration-300 shadow-md cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </div>

        </form>

      </div>

    </ConsoleLayout>
  );
}
