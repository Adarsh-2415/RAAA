import {
  HeroSectionData,
  ServiceItemData,
  AboutSectionData,
  TeamMemberData,
  ContactInfoData,
  WebSettingsData,
} from "@/types/cms";

export const webSettings: WebSettingsData = {
  companyName: "R.A. Aggarwal & Associates",
  logoText: "R.A. Aggarwal & Associates",
  navigationLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export const heroSectionContent: HeroSectionData = {
  title: "R.A. Aggarwal & Associates",
  subtitle: "Chartered Accountants and Legal Consultants",
  ctas: [
    { label: "Our Services", href: "/services", style: "primary" },
    { label: "Contact Us", href: "/contact", style: "outline" },
  ],
};

export const servicesContent: ServiceItemData[] = [
  {
    id: "ca-services",
    title: "Chartered Accountant Services",
    description: "Professional accounting, auditing, and financial consultancy.",
    iconName: "FileText",
    slug: "chartered-accountant-services",
  },
  {
    id: "tax-consultancy",
    title: "Tax Consultancy",
    description: "Expert tax planning, compliance, and advisory services.",
    iconName: "TrendingUp",
    slug: "tax-consultancy",
  },
  {
    id: "legal-advocate",
    title: "Legal & Advocate Services",
    description: "Comprehensive legal advisory, support, and corporate law services.",
    iconName: "Scale",
    slug: "legal-advocate-services",
  },
  {
    id: "business-advisory",
    title: "Business Advisory",
    description: "Strategic guidance for business growth, risk management, and operations.",
    iconName: "Briefcase",
    slug: "business-advisory",
  },
  {
    id: "corporate-consultancy",
    title: "Corporate Consultancy",
    description: "Corporate governance, regulatory compliance, and transaction advisory.",
    iconName: "Building",
    slug: "corporate-consultancy",
  },
];

export const aboutSectionContent: AboutSectionData = {
  title: "About Our Firm",
  subtitle: "Decades of Professional Excellence & Integrity",
  storyParagraphs: [
    "R.A. Aggarwal & Associates is a premier professional services firm integrating Chartered Accountancy and Legal Consultancy.",
  ],
  vision: "To deliver elite financial and legal solutions based on professionalism, credibility, and corporate excellence.",
  mission: "To support our clients with reliable, compliant, and highly analytical advisory services.",
  stats: [
    { value: "5", label: "Core Service Verticals" },
  ],
};

export const teamMembersContent: TeamMemberData[] = [];

export const contactInfoContent: ContactInfoData = {
  address: "",
  phoneNumbers: [],
  emails: [],
  officeHours: [],
};
