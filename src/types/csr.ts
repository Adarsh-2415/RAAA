export interface CSRActivityData {
  id: string;
  category: "skill-development" | "social-activities" | "give-back" | "staff-welfare";
  title: string;
  slug: string;
  date: string;
  location: string;
  cover_image_url?: string;
  cover_image_path?: string;
  short_description: string;
  full_description: string;
  gallery_images: string[];
  gallery_paths: string[];
  status: "draft" | "published";
  featured?: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}
