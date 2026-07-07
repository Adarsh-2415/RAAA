import { CSRListingSection } from "@/components/sections/csr";

export default function SkillDevelopmentPage() {
  // Built around CMS data. Empty props are passed by default.
  return (
    <CSRListingSection
      activities={[]}
      isLoading={false}
      error={null}
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
