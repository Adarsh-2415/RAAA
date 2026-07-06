export interface TestimonialItem {
  id: string;
  clientName: string;
  designation?: string;
  company?: string;
  rating?: number;
  testimonial: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface TestimonialsConfig {
  tagline: string;
  headline: string;
  description: string;
  items: TestimonialItem[];
}
