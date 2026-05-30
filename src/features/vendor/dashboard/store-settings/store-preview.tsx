import Image from "next/image";
import { Medal } from "lucide-react";

type ProductCategory = "rtw" | "mto" | "bespoke";

type StorePreviewProps = {
    logoPreview: string | null;
    bannerPreview: string | null;
    brandStory: string;
    activeCategories: ProductCategory[];
};

const CAT_LABELS: Record<ProductCategory, string> = {
    rtw: "Ready to wear",
    mto: "Made to Order",
    bespoke: "Bespoke",
};

const StorePreview = ({ logoPreview, bannerPreview, brandStory, activeCategories }: StorePreviewProps) => (
    <div className="sticky top-6">
        <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xs font-medium text-[#1F1B17]">Live preview</span>
            <span className="text-xs text-[#8A8278]">Updates as you edit</span>
        </div>

        <div className="bg-white border border-[#F0EBE1] rounded-2xl overflow-hidden">
            {/* Banner */}
            <div className="h-22.5
             bg-[#1A1A1A] overflow-hidden">
                {bannerPreview && (
                    <Image src={bannerPreview} alt="Banner preview" width={380} height={90} className="w-full h-full object-cover" />
                )}
            </div>

            <div className="px-4 pb-5">
                {/* Avatar + rating */}
                <div className="flex items-start justify-between -mt-5 mb-2.5">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-sm font-medium text-[#1A1A1A] overflow-hidden z-10 relative">
                        {logoPreview
                            ? <Image src={logoPreview} alt="Logo" width={40} height={40} className="w-full h-full object-cover" />
                            : "AC"
                        }
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-[#8A8278]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-[#B5894A] text-[11px]">★</span>
                        ))}
                        <span>4.9 (128)</span>
                    </div>
                </div>

                <p className="font-garamond text-[17px] font-medium text-[#1F1B17] mb-2">Adire Couture</p>

                <span className="inline-flex items-center gap-1 bg-[#FDF3E3] text-[#8A5C1A] border border-[#E8C97A] rounded-full px-3 py-1 text-[11px] font-medium mb-2.5">
                    <Medal size={11} /> Gold tier
                </span>

                <p className="text-xs text-[#5C5650] leading-relaxed mb-3">
                    {brandStory || "Your brand story will appear here."}
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {activeCategories.map((key) => (
                        <span key={key} className="text-[11px] border border-[#E8E3DC] rounded-full px-2.5 py-0.5 text-[#5C5650]">
                            {CAT_LABELS[key]}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default StorePreview;