import { ConsoleLayout } from "@/components/admin/layout";
import { TeamEditor } from "@/components/admin/manage-pages/about/team/team-editor";

export default function TeamCMSPage() {
  return (
    <ConsoleLayout>
      <TeamEditor />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Team CMS | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to manage Team credentials for R.A. Aggarwal & Associates.",
};
