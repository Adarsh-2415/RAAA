import { ConsoleLayout } from "@/components/admin/layout";
import { UpdateForm } from "@/components/admin/manage-pages/latest-updates/update-form";

export default function NewUpdatePage() {
  return (
    <ConsoleLayout>
      <UpdateForm />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Add New Update | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to create news articles for R.A. Aggarwal & Associates.",
};
