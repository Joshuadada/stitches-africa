"use client"

import { StaticImageData } from "next/image"
import Button from "@/shared/components/button"
import ProductCard from "./components/product-card"

type Product = {
    imgSrc: string | StaticImageData
    title: string
    vendorName: string
    amount: string
    tier: string
    rating: number
    numberOfRatings: number
    salePercent?: number
}

type ActiveFilter = {
    label: string
    onRemove: () => void
}

type Props = {
    products: Product[]
    activeFilters: ActiveFilter[]
    onClearAll: () => void
    sortBy: string
    onSortChange: (sort: string) => void
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const SORT_OPTIONS = [
    "Newest arrivals",
    "Price: Low to High",
    "Price: High to Low",
    "Most popular",
]

const getPaginationPages = (currentPage: number, totalPages: number): (number | "...")[] => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages]
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
}

const ProductGrid = ({
    products,
    activeFilters,
    onClearAll,
    sortBy,
    onSortChange,
    currentPage,
    totalPages,
    onPageChange,
}: Props) => {
    const pages = getPaginationPages(currentPage, totalPages)

    return (
        <div className="flex flex-col gap-6 sm:gap-8">
            {/* Active filters + sort bar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    {activeFilters.map((filter) => (
                        <span
                            key={filter.label}
                            className="flex items-center gap-1.5 bg-white border border-[#E8E8E8] text-[#262626] text-[10px] sm:text-xs px-2.5 py-1 rounded-[100px]"
                        >
                            {filter.label}
                            <button
                                onClick={filter.onRemove}
                                className="text-[#737373] hover:text-[#262626] cursor-pointer leading-none"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    {activeFilters.length > 0 && (
                        <button
                            onClick={onClearAll}
                            className="text-[#262626] text-[10px] sm:text-xs underline cursor-pointer hover:text-[#737373] transition"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[#737373] text-[10px] sm:text-xs shrink-0">Sort by:</span>
                    <div className="relative flex items-center">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="appearance-none text-[#262626] text-[10px] sm:text-xs font-medium pr-4 bg-transparent cursor-pointer border-none outline-none"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none text-[#262626] text-[8px] ml-0.5">▼</span>
                    </div>
                </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {products.map((product, idx) => (
                    <ProductCard key={product.title + idx} {...product} />
                ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center mt-2">
                <Button
                    onClick={() => {}}
                    className="bg-transparent border border-[#A3A3A3] text-[#262626] text-[10px] sm:text-xs font-medium max-w-[160px] py-2 tracking-widest hover:bg-[#F5F5F5] transition"
                >
                    LOAD MORE
                </Button>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 text-[#737373] text-[10px] sm:text-xs px-2 py-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-[#262626] transition"
                >
                    ← Previous
                </button>

                {pages.map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof page === "number" ? onPageChange(page) : undefined}
                        disabled={page === "..."}
                        className={`h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded text-[10px] sm:text-xs transition ${
                            page === currentPage
                                ? "bg-[#262626] text-white cursor-default"
                                : page === "..."
                                ? "text-[#737373] cursor-default"
                                : "text-[#262626] hover:bg-[#F5F5F5] cursor-pointer"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 text-[#737373] text-[10px] sm:text-xs px-2 py-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-[#262626] transition"
                >
                    Next →
                </button>
            </div>
        </div>
    )
}

export default ProductGrid
