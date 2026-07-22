import { ConsoleLayout } from "@/components/admin/layout";
import { ManagePagesIndex } from "@/components/admin/manage-pages";

export default function ManagePagesPage() {
  return (
    <ConsoleLayout>
      <ManagePagesIndex />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Manage Pages | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to manage website structure for R.A. Aggarwal & Associates.",
};
