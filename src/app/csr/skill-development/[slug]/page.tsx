import { CSRDetailsSection } from "@/components/sections/csr/details";

export default function SkillDevelopmentDetailsPage() {
  // Built around CMS data. Empty props are passed by default.
  return (
    <CSRDetailsSection
      activity={null}
      breadcrumbLabel="Skill Development"
      baseRoute="/csr/skill-development"
    />
  );
}

export const metadata = {
  title: "CSR Program Gallery | R.A. Aggarwal & Associates",
  description: "View photo gallery, timelines, and locations of our CSR activities.",
};
