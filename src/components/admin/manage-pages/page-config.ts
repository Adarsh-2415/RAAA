export interface WebsitePageConfig {
  name: string;
  route: string;
  iconName: "Home" | "BookOpen" | "Award" | "Users" | "Briefcase" | "TrendingUp";
}

export interface PageCategoryGroup {
  category: "Home" | "About Us" | "Services" | "CSR" | "Latest Updates";
  pages: WebsitePageConfig[];
}

export const ALLOWED_MANAGE_PAGES: PageCategoryGroup[] = [
  {
    category: "Home",
    pages: [
      { name: "Home Page", route: "/", iconName: "Home" }
    ]
  },
  {
    category: "About Us",
    pages: [
      { name: "History", route: "/about/history", iconName: "BookOpen" },
      { name: "Founder", route: "/about/founder", iconName: "Award" },
      { name: "Team Members", route: "/about/team", iconName: "Users" }
    ]
  },
  {
    category: "Services",
    pages: [
      { name: "Accounting & Auditing Services", route: "/services/accounting-auditing", iconName: "Briefcase" },
      { name: "Business Process Outsourcing", route: "/services/bpo", iconName: "Briefcase" },
      { name: "Business Start-Up Services", route: "/services/startup-services", iconName: "Briefcase" },
      { name: "Commercial Tax (VAT) Consultancy", route: "/services/vat-consultancy", iconName: "Briefcase" },
      { name: "Goods & Service Tax (GST)", route: "/services/gst-consultancy", iconName: "Briefcase" },
      { name: "Income Tax Services", route: "/services/income-tax", iconName: "Briefcase" }
    ]
  },
  {
    category: "CSR",
    pages: [
      { name: "Skill Development", route: "/csr/skill-development", iconName: "Award" },
      { name: "Social Activities", route: "/csr/social-activities", iconName: "Users" },
      { name: "Give Back", route: "/csr/give-back", iconName: "Award" },
      { name: "Staff Welfare", route: "/csr/staff-welfare", iconName: "Users" }
    ]
  },
  {
    category: "Latest Updates",
    pages: [
      { name: "Latest Updates", route: "/latest-updates", iconName: "TrendingUp" }
    ]
  }
];
