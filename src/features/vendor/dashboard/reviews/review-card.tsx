"use client";

import { ProductType, ReviewStatus } from "@/types/vendor";
import Image from "next/image";
import { useState } from "react";

type ReviewCardProps = {
    reviewId: number;
    customerName: string;
    rating: number;
    status: ReviewStatus;
    reviewText: string;
    photoUrls?: string[];
    productName: string;
    productCategory: ProductType;
    vendorResponseText?: string | null;
    onSubmitResponse: (response: string) => Promise<any>;
    isSubmitting?: boolean;
};

const TYPE_BADGE: Record<ProductType, string> = {
    Bespoke: "bg-[#EFE9FF] text-[#6B4FBB]",
    MTO: "bg-[#EBF4FF] text-[#2563EB] border border-[#BFDBFE]",
    RTW: "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]",
};

const ReviewCard = ({
    customerName,
    rating,
    status,
    reviewText,
    photoUrls = [],
    productName,
    productCategory,
    vendorResponseText,
    onSubmitResponse,
    isSubmitting,
}: ReviewCardProps) => {
    const [response, setResponse] = useState(vendorResponseText ?? "");

    const handleSubmit = async () => {
        try {
            await onSubmitResponse(response);
            setResponse(""); // Clear input after successful submit
        } catch (error) {
            // Leave input intact if submission fails
        }
    };

    return (
        <div className="bg-white border border-[#F0EBE1] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-2.5">
                {/* Left */}
                <div>
                    <p className="text-sm font-medium text-[#1F1B17] mb-1">{customerName}</p>
                    <div className="flex gap-0.5 mb-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Image
                                key={i}
                                src={i < rating ? "/svgs/star-icon-2.svg" : "/svgs/star-icon.svg"}
                                alt="star"
                                width={14}
                                height={14}
                            />
                        ))}
                    </div>

                    <p className="text-[11px] font-medium text-[#B5894A]">{status}</p>
                </div>

                {/* Right */}
                <div className="text-right">
                    <p className="text-xs text-[#5C5650] mb-1.5">{productName}</p>
                    <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${TYPE_BADGE[productCategory]}`}>
                        {productCategory}
                    </span>
                </div>
            </div>

            <p className="text-[13px] text-[#5C5650] leading-relaxed mb-3.5">{reviewText}</p>

            {photoUrls.length > 0 && (
                <div className="flex gap-2 mb-4">
                    {photoUrls.map((src, i) => (
                        <div key={i} className="w-14 h-14 rounded-md overflow-hidden bg-[#2a2a2a] shrink-0">
                            <Image src={src} alt={`Review image ${i + 1}`} width={56} height={56} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            {/* Response input — hide if already responded */}
            {!vendorResponseText && (
                <div className="flex gap-2.5 flex-wrap">
                    <input
                        type="text"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Write a response..."
                        className="flex-1 border border-[#D4CFC9] rounded-md px-3.5 py-2.5 text-sm text-[#1F1B17] placeholder:text-[#A8A29E] outline-none transition focus:border-[#B5894A]"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !response.trim()}
                        className="bg-[#B5894A] hover:bg-[#9F763B] disabled:opacity-50 text-white text-sm font-medium px-4 py-2.5 rounded-md transition whitespace-nowrap cursor-pointer"
                    >
                        {isSubmitting ? "Submitting..." : "Submit response"}
                    </button>
                </div>
            )}

            {vendorResponseText && (
                <div className="bg-[#FAFAF8] border border-[#F0EBE1] rounded-lg px-3.5 py-2.5 text-[13px] text-[#5C5650]">
                    <span className="text-[11px] font-medium text-[#8A8278] block mb-1">Your response</span>
                    {vendorResponseText}
                </div>
            )}
        </div>
    );
};

export default ReviewCard;