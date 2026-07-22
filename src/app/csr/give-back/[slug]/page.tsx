import { ActivityDetailsLoader } from "@/components/sections/csr/activity-details-loader";

interface GiveBackDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default function GiveBackDetailsPage({ params }: GiveBackDetailsPageProps) {
  return (
    <ActivityDetailsLoader
      category="give-back"
      breadcrumbLabel="Give Back"
      baseRoute="/csr/give-back"
      paramsPromise={params}
    />
  );
}

export const metadata = {
  title: "CSR Program Gallery | R.A. Aggarwal & Associates",
  description: "View photo gallery, timelines, and locations of our CSR activities.",
};
