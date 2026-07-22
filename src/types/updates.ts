export interface UpdateArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "GST" | "Income Tax" | "Accounting" | "Audit" | "Corporate" | "General";
  featured_image_url?: string;
  featured_image_path?: string;
  seo_title?: string;
  seo_description?: string;
  status: "draft" | "published" | "deleted";
  created_at: string;
  updated_at: string;
  published_at?: string;
}
