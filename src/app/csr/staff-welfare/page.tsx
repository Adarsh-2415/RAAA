import { CategoryListingLoader } from "@/components/sections/csr/category-listing-loader";

export default function StaffWelfarePage() {
  return (
    <CategoryListingLoader
      category="staff-welfare"
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
