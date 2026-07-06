export interface FounderMilestone {
  year: string;
  title: string;
  desc: string;
}

export interface FounderExpertise {
  title: string;
  desc: string;
}

export interface FounderConfigSchema {
  name: string;
  title: string;
  intro: string;
  bio: string;
  philosophy: string;
  milestones: FounderMilestone[];
  expertise: FounderExpertise[];
  socialImpact: {
    title: string;
    role: string;
    desc: string;
  };
}

export const founderConfig: FounderConfigSchema = {
  name: "Shri Ram Autar Aggarwal",
  title: "Advocate & Founder",
  intro:
    "Ram Autar Aggarwal, Advocate founder of 'R.A. Aggarwal & Associates' Roorkee (India) is a highly skilled and accomplished attorney and legal strategist with expertise in Taxation Law. Shri R. A. Aggarwal has sound knowledge of direct and indirect taxes issues, legal entity formation matters and is licensed to practice law in India.",
  bio:
    "Shri R. A. Aggarwal started his career in 1979 in the field of taxation. Along with tax advisory services has been teaching commerce and economics to graduate and postgraduate students and was providing training and guidance for competition. Shri R. A. Aggarwal has been the leading commerce teacher in Roorkee at his time and has shared his knowledge and experience with his students for more than two decades.",
  philosophy: "One step ahead in the process always.",
  milestones: [
    {
      year: "1979",
      title: "Career Beginning",
      desc: "Began taxation practice and commerce mentorship, educating students who have gone on to become CAs, bank executives, and corporate business leaders.",
    },
    {
      year: "Four Decades",
      title: "Litigation & Legal Practice",
      desc: "Has represented various clients - individuals and corporate bodies - before various authorities, handling all kinds of tax litigation and advisory services.",
    },
  ],
  expertise: [
    {
      title: "Taxation Law",
      desc: "Sound knowledge of direct and indirect taxes, direct tax litigation, and regulatory compliance reviews.",
    },
    {
      title: "Commercial & Business Law",
      desc: "Drafting documentation and providing legal advisory services in areas of Real Estate, investment, divestment, and collaborations.",
    },
  ],
  socialImpact: {
    title: "Community Contribution & Social Service",
    role: "Manager, Marwar Kanya Pathshala Roorkee",
    desc: "Serves as the Manager of Marwar Kanya Pathshala Roorkee, a Semi-Govt senior secondary school, which regularly caters to the educational needs of predominantly socially backward and poor family girls with a current strength of about 1200 students. Shri R. A. Aggarwal devotes his considerable time to the cause of society and various charitable organizations.",
  },
};
