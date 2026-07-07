import { ServiceLayout } from "@/components/sections/services/service-layout";
import { servicesConfig } from "@/components/sections/services/service-config";
import { notFound } from "next/navigation";

export default function IncomeTaxPage() {
  const data = servicesConfig.find((s) => s.id === "income-tax");
  if (!data) return notFound();

  return <ServiceLayout data={data} />;
}
export const metadata = {
  title: "Income Tax Services | R.A. Aggarwal & Associates",
  description: "Direct tax calculations, corporate taxes, and compliance services in India.",
};
