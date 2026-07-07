import { ServiceLayout } from "@/components/sections/services/service-layout";
import { servicesConfig } from "@/components/sections/services/service-config";
import { notFound } from "next/navigation";

export default function StartupServicesPage() {
  const data = servicesConfig.find((s) => s.id === "startup-services");
  if (!data) return notFound();

  return <ServiceLayout data={data} />;
}
export const metadata = {
  title: "Business Start-Up Services | R.A. Aggarwal & Associates",
  description: "Incorporation and registrations of companies, firms, trusts, and societies.",
};
