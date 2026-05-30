"use client";

import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReviewSection from "./review-section";
import toast from "react-hot-toast";
import ReviewCard from "./review-card";
import ReviewFilters from "./review-filters";

// Replace with your actual data type / API call
const MOCK_REVIEWS = [
    {
        id: "1",
        reviewer: "Amara O.",
        rating: 5,
        status: "awaiting" as const,
        reviewText: "The fit was absolutely perfect and the indigo is even richer in person worth every naira. Will be ordering again for my sister's wedding.",
        images: [],
        productName: "Àṣà Adire Wrap Dress",
        productType: "Bespoke" as const,
    },
    {
        id: "2",
        reviewer: "Amara O.",
        rating: 5,
        status: "awaiting" as const,
        reviewText: "The fit was absolutely perfect and the indigo is even richer in person worth every naira. Will be ordering again for my sister's wedding.",
        images: [],
        productName: "Tunde A.Adire Print Maxi Skirt",
        productType: "RTW" as const,
    },
    {
        id: "3",
        reviewer: "Amara O.",
        rating: 5,
        status: "awaiting" as const,
        reviewText: "The fit was absolutely perfect and the indigo is even richer in person worth every naira. Will be ordering again for my sister's wedding.",
        images: [],
        productName: "Asoebi Lace Kaftan",
        productType: "MTO" as const,
    },
];

const Reviews = () => {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({
        rating: "all",
        category: "all",
        status: "awaiting",
    });

   
    const filtered = useMemo(() =>
        MOCK_REVIEWS.filter((r) => {
            if (filters.rating !== "all" && r.rating !== Number(filters.rating)) return false;
            if (filters.category !== "all" && r.productType !== filters.category) return false;
            if (filters.status !== "all" && r.status !== filters.status) return false;
            return true;
        }),
        [filters]
    );

    const handleFilterChange = (key: keyof typeof filters, value: string) =>
        setFilters((prev) => ({ ...prev, [key]: value }));

    return (
        <div className="space-y-4">
            <ReviewSection />

            <ReviewFilters
                totalReviews={filtered.length}
                filters={filters}
                onChange={handleFilterChange}
            />

            <div className="space-y-3.5">
                {filtered.map((review) => (
                    <ReviewCard
                        key={review.id}
                        {...review}
                        isSubmitting={false}
                        onSubmitResponse={(response) => {}}
                    />
                ))}

                {filtered.length === 0 && (
                    <p className="text-center text-sm text-[#8A8278] py-12">
                        No reviews match the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Reviews;