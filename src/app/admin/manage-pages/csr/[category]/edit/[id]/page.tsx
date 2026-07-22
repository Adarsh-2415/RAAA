import { ConsoleLayout } from "@/components/admin/layout";
import { ActivityForm } from "@/components/admin/manage-pages/csr/activity-form";

interface EditActivityCMSPageProps {
  params: Promise<{ category: string; id: string }>;
}

export default async function EditActivityCMSPage({ params }: EditActivityCMSPageProps) {
  const { category, id } = await params;

  return (
    <ConsoleLayout>
      <ActivityForm category={category} activityId={id} />
    </ConsoleLayout>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
