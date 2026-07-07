"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, LoginInput } from "@/schemas/login.schema";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        // Map Supabase auth errors to secure, clean admin validations
        if (error.message.includes("Invalid login credentials") || error.status === 400) {
          setErrorMessage("Invalid email or password.");
        } else if (error.message.includes("Email not confirmed")) {
          setErrorMessage("Unable to sign in. Please contact the administrator.");
        } else {
          setErrorMessage("Authentication failed. Please try again.");
        }
        setLoading(false);
        return;
      }

      // Success transition: Route to protected dashboard
      router.refresh();
      router.push("/admin/dashboard");
    } catch {
      setErrorMessage("Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Alert Warning Error Banner */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-red-800 font-sans">
              Sign In Error
            </h4>
            <p className="text-xs text-red-700 leading-relaxed font-sans">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Email Input */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block font-bold text-primary-navy text-sm">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          autoFocus
          autoComplete="email"
          spellCheck="false"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={loading}
          {...register("email")}
          className={`w-full px-4 py-2.5 bg-[#FAFAF8] border rounded-lg focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 text-sm font-sans ${
            errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border-custom/80"
          }`}
        />
        {errors.email && <p className="text-xs text-red-500 font-sans">{errors.email.message}</p>}
      </div>

      {/* Password Input */}
      <PasswordInput
        disabled={loading}
        id="password"
        autoComplete="current-password"
        spellCheck="false"
        autoCapitalize="none"
        autoCorrect="off"
        error={errors.password?.message}
        registerProps={register("password")}
      />

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          disabled={loading}
          {...register("rememberMe")}
          className="h-4 w-4 rounded border-border-custom text-primary-navy focus:ring-accent-gold cursor-pointer"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-xs font-bold text-text-secondary cursor-pointer font-sans">
          Remember Me
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-primary-navy hover:bg-accent-gold hover:text-primary-navy disabled:bg-gray-300 disabled:text-gray-500 rounded-md transition-all duration-300 shadow-md cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </div>

    </form>
  );
}
export default LoginForm;
