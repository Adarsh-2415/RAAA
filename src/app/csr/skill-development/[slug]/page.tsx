import { ActivityDetailsLoader } from "@/components/sections/csr/activity-details-loader";

interface SkillDevelopmentDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default function SkillDevelopmentDetailsPage({ params }: SkillDevelopmentDetailsPageProps) {
  return (
    <ActivityDetailsLoader
      category="skill-development"
      breadcrumbLabel="Skill Development"
      baseRoute="/csr/skill-development"
      paramsPromise={params}
    />
  );
}

export const metadata = {
  title: "CSR Program Gallery | R.A. Aggarwal & Associates",
  description: "View photo gallery, timelines, and locations of our CSR activities.",
};
