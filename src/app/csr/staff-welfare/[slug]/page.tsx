import { ActivityDetailsLoader } from "@/components/sections/csr/activity-details-loader";

interface StaffWelfareDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default function StaffWelfareDetailsPage({ params }: StaffWelfareDetailsPageProps) {
  return (
    <ActivityDetailsLoader
      category="staff-welfare"
      breadcrumbLabel="Staff Welfare"
      baseRoute="/csr/staff-welfare"
      paramsPromise={params}
    />
  );
}

export const metadata = {
  title: "CSR Program Gallery | R.A. Aggarwal & Associates",
  description: "View photo gallery, timelines, and locations of our CSR activities.",
};
