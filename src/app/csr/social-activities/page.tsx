import { CategoryListingLoader } from "@/components/sections/csr/category-listing-loader";

export default function SocialActivitiesPage() {
  return (
    <CategoryListingLoader
      category="social-activities"
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
