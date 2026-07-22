import { ConsoleLayout } from "@/components/admin/layout";
import { SliderManager } from "@/components/admin/manage-pages/home/slider-manager";

export default function HomeCMSPage() {
  return (
    <ConsoleLayout>
      <SliderManager />
    </ConsoleLayout>
  );
}

export const metadata = {
  title: "Home Page CMS | R.A. Aggarwal & Associates",
  description: "Secure CMS Admin portal to manage Home Page Slider for R.A. Aggarwal & Associates.",
};
