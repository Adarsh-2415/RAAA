import React from "react";
import { ConsoleLayout } from "@/components/admin/layout";
import { UpdateForm } from "@/components/admin/manage-pages/latest-updates/update-form";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUpdatePage({ params }: EditPageProps) {
  const { id } = await params;

  return (
    <ConsoleLayout>
      <UpdateForm articleId={id} />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Edit Update | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to edit articles for R.A. Aggarwal & Associates.",
};
