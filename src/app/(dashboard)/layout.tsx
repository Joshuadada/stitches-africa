"use client";

import Header from "@/layout/header";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto bg-[#FAF7F2]">{children}</div>
    </div>
  );
}
