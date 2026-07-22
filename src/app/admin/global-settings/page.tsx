import { ConsoleLayout } from "@/components/admin/layout";
import { SettingsForm } from "@/components/admin/global-settings/settings-form";

export default function GlobalSettingsCMSPage() {
  return (
    <ConsoleLayout>
      <SettingsForm />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Global Settings | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to manage global contact info and socials credentials.",
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
