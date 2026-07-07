export interface ServiceHighlight {
  title: string;
  desc: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  breadcrumb: string;
  heroQuote: string;
  overviewParagraphs: string[];
  highlightsTitle: string;
  highlights: ServiceHighlight[];
  image: string;
  extraSections?: {
    title: string;
    type: "grid" | "list" | "card";
    items: { title: string; desc: string }[];
  }[];
  closingText?: string;
}

export const servicesConfig: ServiceDetail[] = [
  {
    id: "accounting-auditing",
    title: "Accounting & Auditing Services",
    breadcrumb: "Accounting & Auditing",
    image: "/images/Accounting & Auditing Services.jpg",
    heroQuote: "We at R.A.AGARWAL and Associates offer bookkeeping and related cycles administrations to customers who either don't wish to make their own abilities or are attempting to discover serious and proficient answers for their bookkeeping and related cycles.",
    overviewParagraphs: [
      "We at R.A.AGARWAL and Associates offer bookkeeping and related cycles administrations to customers who either don't wish to make their own abilities or are attempting to discover serious and proficient answers for their bookkeeping and related cycles. an outsized number of HNIs/Business elements like better to rethink different bookkeeping and related cycles to spare heaps of on expenses and in this way the abstain from assuming liability of drawing in staggered full time money and bookkeeping experts.",
      "Our way to deal with re-appropriated tasks includes picking up an entire comprehension of customers requisites which shapes the bedrock of task usage plan, planning measure plan, evaluating asset necessities, sending satisfactory assets, playing out the predetermined capacities, steady observing by Group pioneers, producing customer expectations and opportune customer revealing. All commitment are lead by an Accomplice to ensure quality affirmation."
    ],
    highlightsTitle: "Cloud Accounting",
    highlights: [
      {
        title: "Cloud Accounting Strategy",
        desc: "To augment efficiencies in bookkeeping capacity, we prescribe cloud bookkeeping to independent companies. Cloud bookkeeping is kind of practically like conventional bookkeeping in many regards asafer that the bookkeeping programming is facilitated on distant workers and accordingly permits you to get to your records from any program , whenever and anyplace."
      },
      {
        title: "Implementation & Support",
        desc: "upheld a comprehension of your business needs, to begin with we will help you in distinguishing what cloud arrangement would be ideal for you and from that point render bookkeeping administrations to your total fulfillment."
      }
    ]
  },
  {
    id: "bpo",
    title: "Business Process Outsourcing",
    breadcrumb: "Business Process Outsourcing",
    image: "/images/Business Process Outsourcing.jpg",
    heroQuote: "As R.A.Agarwal & Associates mainly deal in Direct & Indirect Taxation. but in order to cater to the need of clients business and to provide them ease of doing business under single window, all the other services which are needed to run the business and not directly provided by us ,are also dealt with by us under business process outsourcing model.",
    overviewParagraphs: [
      "As R.A.Agarwal & Associates mainly deal in Direct & Indirect Taxation. but in order to cater to the need of clients business and to provide them ease of doing business under single window, all the other services which are needed to run the business and not directly provided by us ,are also dealt with by us under business process outsourcing model."
    ],
    highlightsTitle: "Business Strategy",
    highlights: [
      {
        title: "Outsourcing Model",
        desc: "We have our team of expert professionals who deal with these types of matter and our integral goal behind this is to empower our all clients to focus on their core area of business keeping them free from all peripheral worries related to legal compliances."
      }
    ]
  },
  {
    id: "startup-services",
    title: "Business Start-Up Services",
    breadcrumb: "Business Start-Up",
    image: "/images/Business Start-Up Services.jpg",
    heroQuote: "To help Entrepreneurs to start or expand their business or project, we provide the following services to help them to provide all solutions at one place.",
    overviewParagraphs: [
      "Our service range includes a wide range of Business Start-Up Service, Income Tax Consultancy Service, Commercial Tax (VAT) Consultancy Service, Service Tax Consultancy Service, Project Report Bank Finance Consultancy Service and Pollution Control Board Clearance Service.",
      "To help Entrepreneurs to start or expand their business or project, we provide the following services to help them to provide all solutions at one place :-"
    ],
    highlightsTitle: "Startup Solutions",
    highlights: [
      { title: "Corporate Incorporation", desc: "Incorporation of Companies." },
      { title: "Branch Setup", desc: "Opening of Branch Office." },
      { title: "Firms Formation", desc: "Formation of Firms." },
      { title: "Trust Formations", desc: "Formation of Trust." },
      { title: "Societies Registrations", desc: "Formation & Registration of Societies." },
      { title: "Corporate Partnerships", desc: "Joint Ventures." }
    ]
  },
  {
    id: "vat-consultancy",
    title: "Commercial Tax (VAT) Consultancy",
    breadcrumb: "VAT Consultancy",
    image: "/images/Commercial Tax (VAT) Consultancy.jpg",
    heroQuote: "Value added tax (VAT) may be a sort of tax that's imposed on goods and services.",
    overviewParagraphs: [
      "Value added tax (VAT) may be a sort of tax that's imposed on goods and services. Sometimes, when the govt operates on a budget surplus or wants to extend its revenue so as to finance its deficit . an issue that arises is whether or not value added tax has been a boon or misery for a developing country like India. Around 136 countries in Asia have recognized the importance useful added tax.",
      "In one among the foremost large scale reforms of the country’s public finances in over the past 50 years, India has finally agreed the launch of its much delayed value added tax from 1st April, 2005 at a rate of 12.5%. The rate is fixed by meeting of various state level minister of finance , in New Delhi , designed to form accounting more transparent, to chop short trade barriers and boost tax revenues.",
      "the govt imposes taxes and duty charges on the guy people for fulfilling the infrastructural, technological, entrepreneurial demand of the country. VAT is omnipresent altogether goods and services provided to the buyer .",
      "The paper aims at presenting the importance useful added tax within the Indian society, its impact and therefore the future prospect for product and repair industry in India. the info collected is secondary based from the governmental publications and standard for chartered accountants."
    ],
    highlightsTitle: "Strategic Impact",
    highlights: [
      {
        title: "VAT Launch & Reform",
        desc: "India has finally agreed the launch of its much delayed value added tax from 1st April, 2005 at a rate of 12.5%. The rate is fixed by meeting of various state level minister of finance , in New Delhi , designed to form accounting more transparent, to chop short trade barriers and boost tax revenues."
      },
      {
        title: "Economic Objectives",
        desc: "the govt imposes taxes and duty charges on the guy people for fulfilling the infrastructural, technological, entrepreneurial demand of the country. VAT is omnipresent altogether goods and services provided to the buyer ."
      },
      {
        title: "Industry Perspective",
        desc: "The paper aims at presenting the importance useful added tax within the Indian society, its impact and therefore the future prospect for product and repair industry in India."
      }
    ]
  },
  {
    id: "gst-consultancy",
    title: "Goods & Service Tax (GST)",
    breadcrumb: "GST",
    image: "/images/Goods & Service Tax (GST).jpg",
    heroQuote: "Goods & Service Tax(GST) is a generally new duty in India, having been presented in 2017 and is charged on most business exchanges in India.",
    overviewParagraphs: [
      "Goods & Service Tax(GST) is a generally new duty in India, having been presented in 2017 and is charged on most business exchanges in India. Being a developing duty, GST in India, is both mind boggling and dynamic, since incessant strategy and administrative changes are being made which are both Government and State explicit.",
      "Besides, from various rate structures, halfway exception computations, organization plot, to switch charge rules, cross-fringe exchanging and so forth the potential entanglements and complexities are many. It is crucial to get proficient GST guidance as the expense can be incredible on the off chance that you settle on some unacceptable choice. Arrangement ahead of time is priceless."
    ],
    highlightsTitle: "GST Implementation & Advice",
    highlights: [
      {
        title: "Consulting Scope",
        desc: "We at R.A.AGARWAL and Associates can advise on passage/leave techniques, estimating, store network, ERP structure, documentation, drafting including survey of different arrangements, record keeping, compliances, and so on"
      },
      {
        title: "PAN-India Representation",
        desc: "Especially in State explicit Enactments, similar to Tank, the Firm can address issues emerging in all the conditions of India because of its container India reach."
      }
    ]
  },
  {
    id: "income-tax",
    title: "Income Tax Services",
    breadcrumb: "Income Tax",
    image: "/images/Income Tax Services.jpg",
    heroQuote: "Income Tax in India is categorized as direct tax.Direct tax is a tax you pay on your income directly to the government.",
    overviewParagraphs: [
      "Income Tax in India is categorized as direct tax.Direct tax is a tax you pay on your income directly to the government.",
      "Everyone who earns or gets an income in India is subject to income tax. (Yes, be it a resident or a non-resident of India ). Your income could be salary, pension or could be from a savings account interest. Even, winners of 'Kaun Banega Cobrepati' have to pay tax on their prize too."
    ],
    highlightsTitle: "Tax Classifications",
    highlights: [
      {
        title: "Income Tax",
        desc: "This is taxes an individual or a Hindu Undivided Family or any taxpayer other than companies, pay on the income received. The law prescribes the rate at which such income should be taxed."
      },
      {
        title: "Corporate Tax",
        desc: "This is the tax that companies pay on the profits they make from their businesses. Here again, a specific rate of tax for corporates has been prescribed by the income tax laws of India."
      }
    ]
  }
];
