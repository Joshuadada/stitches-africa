"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useVendorHeaderStore } from "@/store/vendor-header";

const VendorHeader = ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => {
  const router = useRouter();
  const { title, highlight } = useVendorHeaderStore();

  return (
    <header className="w-full bg-[#FAF7F2] border-b border-[#C8C0B5]/30">
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-5 md:py-7 xl:py-9.5">
        <div className="flex items-center gap-6">
          <button className="lg:hidden p-2 rounded-md mr-2" onClick={onToggleSidebar} aria-label="Open sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-garamond font-medium text-[#171717]">
            {title}

            {highlight && (
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#B5894A] font-dm">
                <span className="text-black">{", "}</span>{highlight}
              </span>
            )}
          </h1>
        </div>

        <div className="hidden xl:flex items-center gap-3">
          <button
            onClick={() => router.replace('/vendor/products')}
            className="inline-flex items-center gap-2.5 cursor-pointer px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-3.5 md:py-4 lg:py-4.5 border border-[#B5894A] rounded-md text-sm font-medium text-black bg-[#FFFDF9] hover:bg-gray-50"
          >
            <span>View Store</span>
            <Image src={"/svgs/arrow-right-3.svg"} alt="arrow right" height={14} width={14} />
          </button>

          <button
            onClick={() => router.push('/vendor/add-product')}
            className="inline-flex items-center gap-2.5 cursor-pointer px-2 md:px-2.5 lg:px-3 py-3 sm:py-3.5 md:py-4 lg:py-4.5 bg-[#B5894A] hover:bg-[#B5894A]/90 text-white rounded-md text-sm font-medium"
          >
            + Add New Product
          </button>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
