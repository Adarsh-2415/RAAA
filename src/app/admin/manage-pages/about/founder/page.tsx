import { ConsoleLayout } from "@/components/admin/layout";
import { FounderEditor } from "@/components/admin/manage-pages/about/founder/founder-editor";

export default function FounderCMSPage() {
  return (
    <ConsoleLayout>
      <FounderEditor />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Founder Page CMS | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to manage Founder credentials for R.A. Aggarwal & Associates.",
};
