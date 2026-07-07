import { CSRDetailsSection } from "@/components/sections/csr/details";

export default function StaffWelfareDetailsPage() {
  // Reuse the CSR module. Empty props are passed by default.
  return (
    <CSRDetailsSection
      activity={null}
      breadcrumbLabel="Staff Welfare"
      baseRoute="/csr/staff-welfare"
    />
  );
}

export const metadata = {
  title: "CSR Program Gallery | R.A. Aggarwal & Associates",
  description: "View photo gallery, timelines, and locations of our CSR activities.",
};
