import { ConsoleLayout } from "@/components/admin/layout";
import { ActivityForm } from "@/components/admin/manage-pages/csr/activity-form";

interface NewActivityCMSPageProps {
  params: Promise<{ category: string }>;
}

export default async function NewActivityCMSPage({ params }: NewActivityCMSPageProps) {
  const { category } = await params;

  return (
    <ConsoleLayout>
      <ActivityForm category={category} />
    </ConsoleLayout>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
