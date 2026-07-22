export interface TeamMilestone {
  year: string;
  title: string;
  desc: string;
}

export interface TeamExpertise {
  title: string;
  desc: string;
}

export interface TeamMemberDetails {
  id: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  description: string[];
  timeline: TeamMilestone[];
  expertise: TeamExpertise[];
  featured_image_url?: string;
  featured_image_path?: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}
