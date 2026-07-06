export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
}

export interface PhilosophyItem {
  title: string;
  desc: string;
}

export interface HistoryConfigSchema {
  tagline: string;
  headline: string;
  intro: string;
  timeline: TimelineEvent[];
  services: ServiceItem[];
  philosophy: PhilosophyItem[];
  approach: string;
  closing: string;
}

export const historyConfig: HistoryConfigSchema = {
  tagline: "ESTABLISHED 2010",
  headline: "A Legacy of Financial & Advisory Dilligence",
  intro:
    "R.A. Aggarwal & Associates, Roorkee was established in the year 2010 with the aim of providing accounting and a wide range of finance related services to its clients. We aspire to be recognized as a quality service provider within India, driven by absolute compliance and professional expertise.",
  timeline: [
    {
      year: "2010",
      title: "Establishment of the Firm",
      desc: "Founded in Roorkee, Distt. Haridwar, India, with the core aim of delivering top-tier accounting and finance-related services to private and corporate organizations.",
    },
    {
      year: "Growth & Focus",
      title: "Expanding Corporate Consultations",
      desc: "Built a team of dedicated Corporate & Tax consultants with vast knowledge and professional experience to handle day-to-day challenges and dynamic tax laws in India.",
    },
  ],
  services: [
    {
      title: "Auditing Services",
      desc: "Comprehensive Management Audits, Internal Audits, and Statutory Audits ensuring absolute compliance and transparency.",
    },
    {
      title: "Taxation Law Practice",
      desc: "Dedicated Taxation law firm expertise in Roorkee, Haridwar district, providing business taxation representation.",
    },
    {
      title: "Market Entry & Formation",
      desc: "Wide range of market entry services, company formation advisory, and foreign investment approvals for operating in India.",
    },
    {
      title: "Financial & Payroll Management",
      desc: "Bespoke Accounting Services, Payroll management, and other statutory compliances that need to be done by various organizations.",
    },
  ],
  philosophy: [
    {
      title: "Tailored Solutions",
      desc: "We believe that each client has individual requirements. Our objective is to provide efficient and cost-effective services tailored to specific needs.",
    },
    {
      title: "Investment Protection",
      desc: "Our goal is to develop a lasting relationship with our clients with a focus on protecting their investments and maximizing their returns in India.",
    },
  ],
  approach:
    "We are committed to develop a close relationship with our clients and meet regularly to keep them informed about the dynamic tax law in India and develop our knowledge of their affairs. Our considerable depth of in-house expertise and our hands-on approach enable us to understand and work with our clients in dealing with many day-to-day challenges and opportunities.",
  closing:
    "Serving a varied clientele from small to medium-sized privately owned companies as well as large corporations with integrity, commitment, and professional expertise.",
};
