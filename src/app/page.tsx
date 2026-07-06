import HeroSection from "@/components/sections/hero";
import WelcomeSection from "@/components/sections/welcome";
import TestimonialsSection from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <WelcomeSection />
      <TestimonialsSection />
    </main>
  );
}
