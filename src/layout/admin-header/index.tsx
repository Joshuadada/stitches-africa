"use client";

import Link from "next/link";
import { useAdminHeaderStore } from "@/store/admin-header";

const AdminHeader = ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => {
  const { eyebrow, title, actions } = useAdminHeaderStore();

  return (
    <header className="w-full bg-[#FAF7F2] border-b border-[#C8C0B5]/30">
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-5 md:py-7 xl:py-9.5">
        <div className="flex items-center gap-6">
          <button className="xl:hidden p-2 rounded-md mr-2" onClick={onToggleSidebar} aria-label="Open sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div className="flex flex-col gap-1">
            {eyebrow && (
              <p className="text-[#B5894A] text-[10px] md:text-xs font-medium">
                {eyebrow}
              </p>
            )}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-garamond font-medium text-[#171717]">
              {title}
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {actions.map((action) => {
            const className = action.variant === "filled"
              ? "px-4 sm:px-5 py-2.5 bg-[#B5894A] hover:bg-[#a07840] rounded-md text-xs sm:text-sm font-medium text-white transition cursor-pointer"
              : "px-4 sm:px-5 py-2.5 border border-[#E8E8E8] rounded-md text-xs sm:text-sm font-medium text-[#262626] bg-white hover:bg-gray-50 transition cursor-pointer"

            if (action.href) {
              return (
                <Link key={action.label} href={action.href} className={className}>
                  {action.label}
                </Link>
              )
            }

            return (
              <button key={action.label} onClick={action.onClick} className={className}>
                {action.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
