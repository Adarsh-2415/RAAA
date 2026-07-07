import LatestUpdatesSection from "@/components/sections/latest-updates";

export default function LatestUpdatesPage() {
  // Built around CMS data. Empty props are passed by default.
  return (
    <LatestUpdatesSection
      articles={[]}
      categories={[]}
      isLoading={false}
      error={null}
      currentPage={1}
      totalPages={1}
    />
  );
}

export const metadata = {
  title: "Latest Updates | R.A. Aggarwal & Associates",
  description: "Stay updated with Tax, Legal & Corporate Developments in India.",
};
