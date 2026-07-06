import { TestimonialsConfig } from "./testimonial-types";

export const testimonialsConfig: TestimonialsConfig = {
  tagline: "TESTIMONIALS",
  headline: "What Our Clients Say",
  description:
    "We build long-term advisory partnerships based on legal precision, accounting diligence, and absolute client confidentiality.",
  items: [
    {
      id: "t1",
      clientName: "Suresh Sharma",
      designation: "Chief Financial Officer",
      company: "Apex Logistics India",
      rating: 5,
      testimonial:
        "R.A. Aggarwal & Associates revolutionized our corporate tax structure. Their precise filing practices and regulatory foresight saved us substantial compliance overhead.",
    },
    {
      id: "t2",
      clientName: "Meera Joshi",
      designation: "Managing Director",
      company: "Veda Healthcare",
      rating: 5,
      testimonial:
        "The legal advisory team guided us through a complex commercial merger with absolute competence. Their integrity and strategic counseling were invaluable.",
    },
    {
      id: "t3",
      clientName: "Rajiv Verma",
      designation: "Founder",
      company: "Pioneer Tech Ventures",
      rating: 5,
      testimonial:
        "Exceptional Chartered Accountants. They have managed our annual audits and financial reporting compliance for years with absolute accuracy and professional diligence.",
    },
  ],
};
export default testimonialsConfig;
