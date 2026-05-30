"use client";

import Image from "next/image";
import { useState } from "react";

type ProductType = "Bespoke" | "MTO" | "RTW";

type ReviewCardProps = {
    reviewer: string;
    rating: number;
    status: "awaiting" | "responded";
    reviewText: string;
    images?: string[];
    productName: string;
    productType: ProductType;
    existingResponse?: string;
    onSubmitResponse: (response: string) => void;
    isSubmitting?: boolean;
};

const TYPE_BADGE: Record<ProductType, string> = {
    Bespoke: "bg-[#EFE9FF] text-[#6B4FBB]",
    MTO:     "bg-[#EBF4FF] text-[#2563EB] border border-[#BFDBFE]",
    RTW:     "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]",
};

const ReviewCard = ({
    reviewer,
    rating,
    status,
    reviewText,
    images = [],
    productName,
    productType,
    existingResponse,
    onSubmitResponse,
    isSubmitting,
}: ReviewCardProps) => {
    const [response, setResponse] = useState(existingResponse ?? "");

    return (
        <div className="bg-white border border-[#F0EBE1] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-2.5">
                {/* Left */}
                <div>
                    <p className="text-sm font-medium text-[#1F1B17] mb-1">{reviewer}</p>
                    <div className="flex gap-0.5 mb-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Image
                                key={i}
                                src={i < rating ? "/svgs/star-icon-2.svg" : "/svgs/star-empty.svg"}
                                alt="star"
                                width={14}
                                height={14}
                            />
                        ))}
                    </div>
                    {status === "awaiting" && (
                        <p className="text-[11px] font-medium text-[#B5894A]">Awaiting response</p>
                    )}
                    {status === "responded" && (
                        <p className="text-[11px] font-medium text-[#15803D]">Responded</p>
                    )}
                </div>

                {/* Right */}
                <div className="text-right">
                    <p className="text-xs text-[#5C5650] mb-1.5">{productName}</p>
                    <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${TYPE_BADGE[productType]}`}>
                        {productType}
                    </span>
                </div>
            </div>

            <p className="text-[13px] text-[#5C5650] leading-relaxed mb-3.5">{reviewText}</p>

            {images.length > 0 && (
                <div className="flex gap-2 mb-4">
                    {images.map((src, i) => (
                        <div key={i} className="w-14 h-14 rounded-md overflow-hidden bg-[#2a2a2a] shrink-0">
                            <Image src={src} alt={`Review image ${i + 1}`} width={56} height={56} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            {/* Response input — hide if already responded */}
            {status === "awaiting" && (
                <div className="flex gap-2.5 flex-wrap">
                    <input
                        type="text"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Write a response..."
                        className="flex-1 border border-[#D4CFC9] rounded-md px-3.5 py-2.5 text-sm text-[#1F1B17] placeholder:text-[#A8A29E] outline-none transition focus:border-[#B5894A]"
                    />
                    <button
                        onClick={() => onSubmitResponse(response)}
                        disabled={isSubmitting || !response.trim()}
                        className="bg-[#B5894A] hover:bg-[#9F763B] disabled:opacity-50 text-white text-sm font-medium px-4 py-2.5 rounded-md transition whitespace-nowrap cursor-pointer"
                    >
                        {isSubmitting ? "Submitting..." : "Submit response"}
                    </button>
                </div>
            )}

            {status === "responded" && existingResponse && (
                <div className="bg-[#FAFAF8] border border-[#F0EBE1] rounded-lg px-3.5 py-2.5 text-[13px] text-[#5C5650]">
                    <span className="text-[11px] font-medium text-[#8A8278] block mb-1">Your response</span>
                    {existingResponse}
                </div>
            )}
        </div>
    );
};

export default ReviewCard;