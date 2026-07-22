import { CategoryListingLoader } from "@/components/sections/csr/category-listing-loader";

export default function SkillDevelopmentPage() {
  return (
    <CategoryListingLoader
      category="skill-development"
      pageTitle="Skill Development Programs"
      breadcrumbLabel="Skill Development"
      baseRoute="/csr/skill-development"
    />
  );
}

export const metadata = {
  title: "Skill Development | CSR | R.A. Aggarwal & Associates",
  description: "Skill development workshops, corporate training, and CSR seminars in India.",
};
