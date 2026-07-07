export interface CSRActivity {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  date: string;
  location?: string;
  shortDescription: string;
  fullDescription?: string;
  galleryImages?: string[];
  status: "draft" | "published";
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CSRListingProps {
  activities: CSRActivity[];
  isLoading?: boolean;
  error?: string | null;
  pageTitle: string;
  breadcrumbLabel: string;
  baseRoute: string;
}
