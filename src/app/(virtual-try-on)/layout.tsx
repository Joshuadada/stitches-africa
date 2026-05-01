"use client";

export default function VirtualTryOnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
        <div>Header</div>
        <div className="flex-1 overflow-y-auto bg-[#FAF7F2]">{children}</div>
    </div>
  );
}
