import { ConsoleLayout } from "@/components/admin/layout";
import { ActivitiesList } from "@/components/admin/manage-pages/csr/activities-list";

interface CategoryCMSPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryCMSPage({ params }: CategoryCMSPageProps) {
  const { category } = await params;

  return (
    <ConsoleLayout>
      <ActivitiesList category={category} />
    </ConsoleLayout>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
