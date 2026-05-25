"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const VendorHeader = ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => {
  const router = useRouter();

  return (
    <header className="w-full bg-white border-b border-[#efe7db]">
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-14 py-5">
        <div className="flex items-center gap-6">
          <button className="lg:hidden p-2 rounded-md mr-2" onClick={onToggleSidebar} aria-label="Open sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <h1 className="text-xl sm:text-2xl font-garamond font-medium text-[#171717]">Welcome back, <span className="font-bold">Adire Couture</span></h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.replace('/vendor/home')}
            className="inline-flex items-center px-4 py-2 border border-[#e8e8e8] rounded-md text-sm text-[#171717] bg-white hover:bg-gray-50"
          >
            View Store
          </button>

          <button
            onClick={() => router.push('/vendor/add-product')}
            className="inline-flex items-center px-4 py-2 bg-[#b8924a] hover:bg-[#a07a38] text-white rounded-md text-sm font-semibold"
          >
            + Add New Product
          </button>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
