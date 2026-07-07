"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  registerProps?: any;
  label?: string;
}

export function PasswordInput({ error, registerProps, label, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 relative">
      <label htmlFor={props.id || "password"} className="block font-bold text-primary-navy text-sm">
        {label || "Password"} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={props.id || "password"}
          {...registerProps}
          {...props}
          className={`w-full pl-4 pr-11 py-2.5 bg-[#FAFAF8] border rounded-lg focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors duration-200 text-sm font-sans ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border-custom/80"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-text-secondary/80 cursor-pointer p-1"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 font-sans">{error}</p>}
    </div>
  );
}
export default PasswordInput;
