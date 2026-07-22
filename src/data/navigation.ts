import { NavItem } from "@/types/navigation";

export const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "#",
    children: [
      { label: "History", href: "/about/history" },
      { label: "Founder", href: "/about/founder" },
      { label: "Team", href: "/about/team" },
    ],
  },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Accounting and Auditing Services", href: "/services/accounting-auditing" },
      { label: "Business Process Outsourcing", href: "/services/bpo" },
      { label: "Business Start Up Services", href: "/services/startup-services" },
      { label: "Commercial Tax (VAT) Consultancy", href: "/services/vat-consultancy" },
      { label: "Goods and Service Tax Consultant", href: "/services/gst-consultancy" },
      { label: "Income Tax", href: "/services/income-tax" },
    ],
  },
  {
    label: "Utilities",
    href: "#",
    children: [
      { label: "Income Tax Calendar", href: "https://www.incometaxindia.gov.in/", isExternal: true },
      { label: "GST Calendar", href: "https://www.gst.gov.in/", isExternal: true },
      { label: "HSN Code & GST Rates Finder", href: "https://cbic-gst.gov.in/gst-goods-services-rates.html", isExternal: true },
    ],
  },
  {
    label: "Latest Updates",
    href: "/latest-updates",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "CSR",
    href: "#",
    children: [
      { label: "Skill Development", href: "/csr/skill-development" },
      { label: "Social Activities", href: "/csr/social-activities" },
      { label: "Staff Welfare", href: "/csr/staff-welfare" },
      { label: "Give Back", href: "/csr/give-back" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];
