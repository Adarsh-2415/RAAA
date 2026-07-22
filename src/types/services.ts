export interface ServiceHighlight {
  title: string;
  desc: string;
}

export interface ServiceDetailData {
  id: string;
  title: string;
  breadcrumb: string;
  hero_quote: string;
  overview_paragraphs: string[];
  highlights_title: string;
  highlights: ServiceHighlight[];
  featured_image_url?: string;
  featured_image_path?: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}
