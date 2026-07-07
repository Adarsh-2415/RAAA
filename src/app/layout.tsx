import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Mock font definitions for offline builds to avoid Google Fonts fetch failures
const inter = {
  variable: "font-sans",
};

const manrope = {
  variable: "font-heading",
};

export const metadata: Metadata = {
  title: "R.A. Aggarwal & Associates | Chartered Accountants & Legal Consultants",
  description:
    "Professional Chartered Accountant and Legal Consultancy firm offering expert services in taxation, legal advisory, business consulting, and corporate advisory.",
};

import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-text-primary bg-bg-warm min-h-screen flex flex-col">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
