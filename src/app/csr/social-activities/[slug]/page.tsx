import { ActivityDetailsLoader } from "@/components/sections/csr/activity-details-loader";

interface SocialActivitiesDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default function SocialActivitiesDetailsPage({ params }: SocialActivitiesDetailsPageProps) {
  return (
    <ActivityDetailsLoader
      category="social-activities"
      breadcrumbLabel="Social Activities"
      baseRoute="/csr/social-activities"
      paramsPromise={params}
    />
  );
}

export const metadata = {
  title: "CSR Program Gallery | R.A. Aggarwal & Associates",
  description: "View photo gallery, timelines, and locations of our CSR activities.",
};
