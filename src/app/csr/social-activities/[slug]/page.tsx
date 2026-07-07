import { CSRDetailsSection } from "@/components/sections/csr/details";

export default function SocialActivitiesDetailsPage() {
  // Reuse the CSR module. Empty props are passed by default.
  return (
    <CSRDetailsSection
      activity={null}
      breadcrumbLabel="Social Activities"
      baseRoute="/csr/social-activities"
    />
  );
}

export const metadata = {
  title: "CSR Program Gallery | R.A. Aggarwal & Associates",
  description: "View photo gallery, timelines, and locations of our CSR activities.",
};
