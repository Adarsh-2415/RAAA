import { ServiceLayout } from "@/components/sections/services/service-layout";
import { servicesConfig } from "@/components/sections/services/service-config";
import { notFound } from "next/navigation";

export default function VatConsultancyPage() {
  const data = servicesConfig.find((s) => s.id === "vat-consultancy");
  if (!data) return notFound();

  return <ServiceLayout data={data} />;
}
export const metadata = {
  title: "Commercial Tax (VAT) Consultancy | R.A. Aggarwal & Associates",
  description: "Value Added Tax calculations and trade barrier reforms.",
};
