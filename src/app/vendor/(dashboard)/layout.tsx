"use client";

export default function VendorAuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen bg-[#FAF7F2]">
        <div className="flex-1 overflow-y-auto p-7 sm:p-9 md:p-11 lg:p-13">{children}</div>
    </div>
  );
}
