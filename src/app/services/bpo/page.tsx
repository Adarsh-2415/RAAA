import { ServiceLayout } from "@/components/sections/services/service-layout";
import { servicesConfig } from "@/components/sections/services/service-config";
import { notFound } from "next/navigation";

export default function BpoPage() {
  const data = servicesConfig.find((s) => s.id === "bpo");
  if (!data) return notFound();

  return <ServiceLayout data={data} />;
}
export const metadata = {
  title: "Business Process Outsourcing | R.A. Aggarwal & Associates",
  description: "Ease of doing business under single window.",
};
