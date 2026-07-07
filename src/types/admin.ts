export interface ContactEnquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface CareerSubmission {
  id: string;
  candidate_name: string;
  email: string;
  phone: string;
  message: string;
  photo_url: string;
  resume_url: string;
  status: "pending" | "reviewed";
  created_at: string;
}
