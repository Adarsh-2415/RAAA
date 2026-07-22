"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SettingsContextType {
  phone: string;
  email: string;
  address: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  phone: "+91-9760377763",
  email: "mail@raaa.in",
  address: "M/s R.A. Aggarwal & Associates, Advocates, 298/6, Civil Lines, Near Main Post Office, Roorkee (U.K.) - 247667",
  facebook: "#",
  twitter: "#",
  linkedin: "#",
  loading: true,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    phone: "+91-9760377763",
    email: "mail@raaa.in",
    address: "M/s R.A. Aggarwal & Associates, Advocates, 298/6, Civil Lines, Near Main Post Office, Roorkee (U.K.) - 247667",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  });

  useEffect(() => {
    async function loadGlobalSettings() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("global_settings")
          .select("*");

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = { ...settings };
          data.forEach((item: { key: string; value: string }) => {
            if (item.key === "phone_number") mapped.phone = item.value;
            if (item.key === "email_address") mapped.email = item.value;
            if (item.key === "office_address") mapped.address = item.value;
            if (item.key === "facebook_link") mapped.facebook = item.value;
            if (item.key === "twitter_link") mapped.twitter = item.value;
            if (item.key === "linkedin_link") mapped.linkedin = item.value;
          });
          setSettings(mapped);
        }
      } catch (err) {
        console.warn("Global settings table not seeded yet. Loading default fallbacks:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGlobalSettings();
  }, [supabase]);

  return (
    <SettingsContext.Provider value={{ ...settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useGlobalSettings = () => useContext(SettingsContext);
