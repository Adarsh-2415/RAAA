import { CSRListingSection } from "@/components/sections/csr";

export default function SocialActivitiesPage() {
  // Reuse the CSR module. Empty props are passed by default.
  return (
    <CSRListingSection
      activities={[]}
      isLoading={false}
      error={null}
      pageTitle="Social Activities"
      breadcrumbLabel="Social Activities"
      baseRoute="/csr/social-activities"
    />
  );
}

export const metadata = {
  title: "Social Activities | CSR | R.A. Aggarwal & Associates",
  description: "Community welfare, social campaigns, and CSR activities in India.",
};
