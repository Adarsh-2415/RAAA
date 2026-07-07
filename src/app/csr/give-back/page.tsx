import { CSRListingSection } from "@/components/sections/csr";

export default function GiveBackPage() {
  // Reuse the CSR module. Empty props are passed by default.
  return (
    <CSRListingSection
      activities={[]}
      isLoading={false}
      error={null}
      pageTitle="Give Back Initiatives"
      breadcrumbLabel="Give Back"
      baseRoute="/csr/give-back"
    />
  );
}

export const metadata = {
  title: "Give Back | CSR | R.A. Aggarwal & Associates",
  description: "Philanthropic events, giving campaigns, and welfare programs in India.",
};
