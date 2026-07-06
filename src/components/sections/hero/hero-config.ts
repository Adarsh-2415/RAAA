export interface HeroSlide {
  id: number;
  src: string;
  alt: string;
}

export const heroCarouselConfig = {
  tagline: "ESTABLISHED 2010",
  headline: "Decades of Integrity. Tailored Financial & Legal Counsel.",
  description:
    "We provide professional Chartered Accountant, Legal Advocacy, and Corporate Advisory solutions designed to protect assets and drive commercial growth with absolute compliance.",
  primaryButton: {
    label: "Schedule Consultation",
    href: "/contact",
  },
  secondaryButton: {
    label: "Explore Services",
    href: "/services",
  },
  slides: [
    { id: 1, src: "/images/Slider 1.jpg", alt: "Corporate office entrance" },
    { id: 2, src: "/images/slider 2.jpg", alt: "Executive meeting discussion" },
    { id: 3, src: "/images/slider 3.jpg", alt: "Chartered accountant tax consulting" },
    { id: 4, src: "/images/slider 4.jpg", alt: "Legal advice and business planning" },
    { id: 5, src: "/images/slider 5.jpg", alt: "Corporate team consulting session" },
    { id: 6, src: "/images/slider 6.png", alt: "Business growth boardroom discussion" },
  ] as HeroSlide[],
  showScrollIndicator: true,
};
