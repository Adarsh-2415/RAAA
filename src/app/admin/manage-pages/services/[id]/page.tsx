import { ConsoleLayout } from "@/components/admin/layout";
import { ServiceEditor } from "@/components/admin/manage-pages/services/service-editor";

interface ServiceCMSPageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceCMSPage({ params }: ServiceCMSPageProps) {
  const { id } = await params;

  return (
    <ConsoleLayout>
      <ServiceEditor serviceId={id} />
    </ConsoleLayout>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
