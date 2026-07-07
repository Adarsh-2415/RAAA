import { ServiceLayout } from "@/components/sections/services/service-layout";
import { servicesConfig } from "@/components/sections/services/service-config";
import { notFound } from "next/navigation";

export default function AccountingAuditingPage() {
  const data = servicesConfig.find((s) => s.id === "accounting-auditing");
  if (!data) return notFound();

  return <ServiceLayout data={data} />;
}
export const metadata = {
  title: "Accounting & Auditing Services | R.A. Aggarwal & Associates",
  description: "Bookkeeping and related cycles administrations.",
};
