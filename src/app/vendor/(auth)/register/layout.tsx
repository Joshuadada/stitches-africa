"use client";

import Header from "@/layout/header";
import { usePathname } from "next/navigation";

const STEPS = [
  { label: "Business details", suffix: "register" },
  { label: "Documents", suffix: "document-upload" },
  { label: "Review & Submit", suffix: "review-application" },
];

const getActiveStep = (pathname: string) => {
  if (pathname.endsWith("/review-application")) return 2;
  if (pathname.endsWith("/document-upload")) return 1;
  return 0;
};

export default function VendorRegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const activeStep = getActiveStep(pathname);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {children}
    </div>
  );
}