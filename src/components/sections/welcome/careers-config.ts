export interface JobOpening {
  id: string;
  title: string;
  roles: string[];
  education: string;
}

export const careersConfig: JobOpening[] = [
  {
    id: "accountant",
    title: "Accountant Required",
    roles: [
      "Processing & Reconciling Bank statement and Credit card statement and comparing with past transactions for consistency.",
      "Recording year end Journal entries",
      "Identify Suspense transactions and prepare Query doc.",
      "Preparing Balance sheet, Profit & Loss account and comparing with previous year finalised accounts.",
      "Clearing last year accounts payable/receivable during the year.",
      "Preparing Audit working paper file for auditor involve hyperlink on PDF file to the supporting documents.",
      "Daily, Weekly & Monthly reporting to Team Leader."
    ],
    education: "UG : B.Com in Any Specialization"
  }
];
