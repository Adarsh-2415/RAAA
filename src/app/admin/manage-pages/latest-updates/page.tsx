import { ConsoleLayout } from "@/components/admin/layout";
import { UpdatesList } from "@/components/admin/manage-pages/latest-updates/updates-list";

export default function AdminUpdatesPage() {
  return (
    <ConsoleLayout>
      <UpdatesList />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Latest Updates CMS | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to manage Updates listings for R.A. Aggarwal & Associates.",
};
