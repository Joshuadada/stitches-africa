"use client";

import { ChevronDown } from "lucide-react";

type Filters = {
    rating: string;
    category: string;
    status: string;
};

type ReviewFiltersProps = {
    totalReviews: number;
    filters: Filters;
    onChange: (key: keyof Filters, value: string) => void;
};

const FilterSelect = ({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: { label: string; value: string }[];
}) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none border border-[#D4CFC9] rounded-md pl-3 pr-8 py-2 text-xs text-[#1F1B17] bg-white outline-none focus:border-[#B5894A] cursor-pointer transition"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8278] pointer-events-none" />
    </div>
);

const ReviewFilters = ({ totalReviews, filters, onChange }: ReviewFiltersProps) => (
    <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <p className="text-sm font-medium text-[#1F1B17]">{totalReviews} reviews</p>
        <div className="flex gap-2 flex-wrap">
            <FilterSelect
                value={filters.rating}
                onChange={(v) => onChange("rating", v)}
                options={[
                    { label: "All ratings", value: "all" },
                    { label: "5 stars", value: "5" },
                    { label: "4 stars", value: "4" },
                    { label: "3 stars", value: "3" },
                    { label: "2 stars", value: "2" },
                    { label: "1 star", value: "1" },
                ]}
            />
            <FilterSelect
                value={filters.category}
                onChange={(v) => onChange("category", v)}
                options={[
                    { label: "All categories", value: "all" },
                    { label: "Bespoke", value: "Bespoke" },
                    { label: "MTO", value: "MTO" },
                    { label: "RTW", value: "RTW" },
                ]}
            />
            <FilterSelect
                value={filters.status}
                onChange={(v) => onChange("status", v)}
                options={[
                    { label: "Awaiting response", value: "awaiting" },
                    { label: "Responded", value: "responded" },
                    { label: "All", value: "all" },
                ]}
            />
        </div>
    </div>
);

export default ReviewFilters;