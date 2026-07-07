import { CSRListingSection } from "@/components/sections/csr";

export default function StaffWelfarePage() {
  // Reuse the CSR module. Empty props are passed by default.
  return (
    <CSRListingSection
      activities={[]}
      isLoading={false}
      error={null}
      pageTitle="Staff Welfare Programs"
      breadcrumbLabel="Staff Welfare"
      baseRoute="/csr/staff-welfare"
    />
  );
}

export const metadata = {
  title: "Staff Welfare | CSR | R.A. Aggarwal & Associates",
  description: "Workplace initiatives, staff development, and healthcare workshops in India.",
};
