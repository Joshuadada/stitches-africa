"use client";

import { useState, useMemo, useEffect } from "react";
import ReviewSection from "./review-section";
import ReviewCard from "./review-card";
import ReviewFilters from "./review-filters";
import { useVendorHeaderStore } from "@/store/vendor-header";
import { useAuthStore } from "@/store/auth";
import { useSubmitRespondReview, useVendorReviews } from "@/hooks/api/vendor/useVendorReview";
import { showToast } from "@/utils/toast";
import Loader from "@/shared/components/loader";
import { VendorReview } from "@/types/vendor";

const Reviews = () => {
    const [filters, setFilters] = useState({
        rating: "all",
        category: "all",
        status: "all",
    });

    const {
        data: vendorReviews,
        isLoading,  // true only on the very first fetch, no cached data yet
        error,
    } = useVendorReviews();

    const { onSubmit, isPending } = useSubmitRespondReview(() => { })

    useEffect(() => {
        if (error) {
            showToast({
                type: "error",
                title: "Error",
                message: error.message,
            });
        }
    }, [error]);

    const filtered: VendorReview[] | undefined = useMemo(() =>
        vendorReviews?.filter((r) => {
            if (filters.rating !== "all" && r.rating !== Number(filters.rating)) return false;
            if (filters.category !== "all" && r.productCategory?.toLowerCase() !== filters.category) return false;
            if (filters.status !== "all" && r.status?.toLowerCase() !== filters.status) return false;
            return true;
        }),
        [vendorReviews, filters]
    );

    const handleFilterChange = (key: keyof typeof filters, value: string) =>
        setFilters((prev) => ({ ...prev, [key]: value }));

    const { vendorProfile } = useAuthStore()
    const { setVendorHeader } = useVendorHeaderStore()

    useEffect(() => {
        setVendorHeader({
            title: "Reviews",
            highlight: vendorProfile?.businessName || ''
        })
    }, [vendorProfile])

    // Block the shell only on the initial load — not on background refetches
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="space-y-4">
            <ReviewSection reviews={vendorReviews || []} />

            <ReviewFilters
                totalReviews={filtered?.length || 0}
                filters={filters}
                onChange={handleFilterChange}
            />

            <div className="space-y-3.5">
                {filtered?.map((review) => (
                    <ReviewCard
                        key={review.reviewId}
                        {...review}
                        isSubmitting={isPending}
                        onSubmitResponse={(response) => onSubmit({ reviewId: review.reviewId, response })}
                    />
                ))}

                {filtered?.length === 0 && (
                    <p className="text-center text-sm text-[#8A8278] py-12">
                        No reviews match the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Reviews;