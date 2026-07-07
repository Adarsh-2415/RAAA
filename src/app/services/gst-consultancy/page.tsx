import { ServiceLayout } from "@/components/sections/services/service-layout";
import { servicesConfig } from "@/components/sections/services/service-config";
import { notFound } from "next/navigation";

export default function GstConsultancyPage() {
  const data = servicesConfig.find((s) => s.id === "gst-consultancy");
  if (!data) return notFound();

  return <ServiceLayout data={data} />;
}
export const metadata = {
  title: "Goods & Service Tax (GST) | R.A. Aggarwal & Associates",
  description: "Proficient Goods & Service Tax advisory and compliance reviews in India.",
};
