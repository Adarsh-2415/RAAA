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
  image: string;
  phone: string;
  email: string;
  description: string[];
  timeline: TeamMilestone[];
  expertise: TeamExpertise[];
}

export const teamConfig: TeamMemberDetails[] = [
  {
    id: "deepak-aggarwal",
    name: "Deepak Aggarwal",
    designation: "Advocate",
    image: "/images/Founder 1.jpg",
    phone: "+91-9760377763",
    email: "da@raaa.in",
    description: [
      "After completing his graduation in commerce, Deepak Aggarwal joined M/s R.A. Aggarwal & Associates, the leading taxation consultancy firm founded by his father, Shri R. A. Aggarwal, Advocate.",
      "He developed in-depth knowledge and expertise in setting up new industrial units in Uttarakhand. Following the introduction of the new Industrial Policy in Uttarakhand in 2003, he gained extensive expertise in Central Excise, Service Tax, DIC, Pollution Control Board provisions related to Uttarakhand State, and successfully provided consultancy services to numerous industries establishing their units in Uttarakhand.",
      "During these years of training, he emerged as a promising young professional.",
      "After completing his LLB, he began providing consultancy in Slump Sale, Mergers, Drafting, Deed Writing, and Mobile Squad Litigations.",
      "In 2009, he married Sarika Aggarwal, a Chartered Accountant by profession. Since then, she has extended her professional services to R.A. Aggarwal & Associates as an expert consultant.",
      "He has gained significant exposure in VAT Act appeals up to the Tribunal.",
      "Since the implementation of the GST Act on 01 July 2017, he has been providing GST consultancy covering both legal and technical aspects. He has been enrolled as a GST Practitioner since December 2017."
    ],
    timeline: [
      {
        year: "2003",
        title: "Industrial Policy & Setup",
        desc: "Gained expertise in Central Excise, Service Tax, DIC, and Pollution Control Board provisions for Uttarakhand State, consulting for numerous industries."
      },
      {
        year: "2009",
        title: "Partnership & Marriage",
        desc: "Married Sarika Aggarwal, CA, who joined R.A. Aggarwal & Associates as an expert consultant."
      },
      {
        year: "2017",
        title: "GST Implementations",
        desc: "Began offering comprehensive legal & technical GST consultation; officially enrolled as a GST Practitioner in December 2017."
      }
    ],
    expertise: [
      {
        title: "Industrial Setup & Clearances",
        desc: "Consultancy for Central Excise, Service Tax, DIC, and Pollution Control Board provisions related to Uttarakhand State."
      },
      {
        title: "Legal Drafting & Litigations",
        desc: "Specialized advisory in Slump Sale, Mergers, Drafting, Deed Writing, and Mobile Squad Litigations."
      },
      {
        title: "Indirect Tax & Appeals",
        desc: "Significant exposure in VAT Act appeals up to the Tribunal and comprehensive GST consulting."
      }
    ]
  },
  {
    id: "sarika-aggarwal",
    name: "Sarika Aggarwal",
    designation: "Chartered Accountant",
    image: "/images/Founder 2.jpg",
    phone: "+91-1332-796134",
    email: "sa@raaa.in",
    description: [
      "After completing her graduation from CSJM University, Kanpur in 2001, Sarika Aggarwal joined the Chartered Accountancy course.",
      "Alongside her CA studies, she completed her post-graduation (M.Com.) in 2003 and qualified as a Chartered Accountant in May 2005.",
      "After qualifying as a CA, she joined a Kanpur-based broking company promoted by the Dainik Jagran Group, where she managed the Arbitrage Division. During her tenure, she also handled Equity Trading, Derivative Trading, and Income Tax matters related to the Stock Broking Company.",
      "She also obtained NCFM certifications related to Equity Market, Derivatives, and Commodity Market.",
      "In 2007, she completed the Diploma in Information System Audit (DISA), a post-qualification course offered by ICAI that enhances professional expertise in Information Systems Audit, Information Security, Business Continuity, and IT-related professional services.",
      "In 2009, she married Deepak Aggarwal, Advocate, Roorkee. Since then, she has been actively providing consultancy services while handling Income Tax Compliance, VAT Compliance, Litigation Matters, and Industry Related Services.",
      "She has been enrolled as a GST Practitioner since June 2017. Following the implementation of the GST Act on 01 July 2017, she has been providing consultancy while managing GST Return Filing, GST Refunds, Show Cause Notice Replies, Appeals, Complete GST Compliance, and Goods & Services Tax related matters."
    ],
    timeline: [
      {
        year: "2001 - 2005",
        title: "Academic & CA Qualification",
        desc: "Graduated from CSJM University in 2001, completed M.Com in 2003, and qualified as a Chartered Accountant in May 2005."
      },
      {
        year: "2007",
        title: "DISA Qualification",
        desc: "Completed Diploma in Information System Audit (DISA) from ICAI, enhancing expertise in Information Security and IT auditing."
      },
      {
        year: "2009",
        title: "Litigation & Compliance",
        desc: "Began actively handling Income Tax Compliance, VAT Compliance, Litigation Matters, and Industry Related Services after her marriage to Deepak Aggarwal."
      },
      {
        year: "2017",
        title: "GST Returns & Appeals",
        desc: "Enrolled as a GST Practitioner in June 2017, managing complete GST compliance, refunds, show cause notices, and appeals."
      }
    ],
    expertise: [
      {
        title: "Chartered Accountancy & Audit",
        desc: "Income Tax Compliance, VAT compliance, and litigation matters related to corporate audits."
      },
      {
        title: "Information Systems Audit",
        desc: "Certified DISA (ICAI) expert in Information Security, Business Continuity, and IT-related advisory services."
      },
      {
        title: "Arbitrage & Stock Broking Management",
        desc: "NCFM certified in Equity, Derivatives, and Commodity Markets; managed stock arbitrage divisions."
      }
    ]
  }
];
