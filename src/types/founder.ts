export interface FounderMilestone {
  year: string;
  title: string;
  desc: string;
}

export interface FounderExpertise {
  title: string;
  desc: string;
}

export interface FounderPageData {
  id: string;
  name: string;
  title: string;
  sub_title: string;
  intro: string;
  bio: string;
  philosophy: string;
  milestones: FounderMilestone[];
  expertise: FounderExpertise[];
  social_impact_title: string;
  social_impact_role: string;
  social_impact_desc: string;
  featured_image_url?: string;
  featured_image_path?: string;
  seo_title?: string;
  seo_description?: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}
