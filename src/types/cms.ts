export interface CTAButton {
  label: string;
  href: string;
  style: "primary" | "secondary" | "outline";
}

export interface HeroSectionData {
  title: string;
  subtitle: string;
  backgroundImageUrl?: string;
  ctas: CTAButton[];
}

export interface ServiceItemData {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic icon reference from Lucide
  slug: string;
  detailedContent?: string[]; // Paragraphs of detailed services
}

export interface AboutSectionData {
  title: string;
  subtitle: string;
  storyParagraphs: string[];
  vision: string;
  mission: string;
  stats: {
    value: string;
    label: string;
  }[];
}

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  bio: string;
  specialties: string[];
}

export interface ContactInfoData {
  address: string;
  googleMapEmbedUrl?: string;
  phoneNumbers: string[];
  emails: string[];
  officeHours: string[];
}

export interface WebSettingsData {
  companyName: string;
  logoText: string;
  navigationLinks: { label: string; href: string }[];
}
