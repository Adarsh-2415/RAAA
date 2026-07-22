import { CategoryListingLoader } from "@/components/sections/csr/category-listing-loader";

export default function GiveBackPage() {
  return (
    <CategoryListingLoader
      category="give-back"
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
