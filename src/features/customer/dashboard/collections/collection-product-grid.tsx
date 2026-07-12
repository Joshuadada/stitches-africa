"use client"

import { StaticImageData } from "next/image"
import Button from "@/shared/components/button"
import CollectionProductCard from "./collection-product-card"

type Product = {
    id: string
    imgSrc: string | StaticImageData
    title: string
    price: string
    sizes: string[]
}

type Props = {
    products: Product[]
    totalCount: number
    bundlePrice: string
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    onAddAllToCart: () => void
}

const getPaginationPages = (currentPage: number, totalPages: number): (number | "...")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages]
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
}

const CollectionProductGrid = ({
    products,
    totalCount,
    bundlePrice,
    currentPage,
    totalPages,
    onPageChange,
    onAddAllToCart,
}: Props) => {
    const pages = getPaginationPages(currentPage, totalPages)

    return (
        <div className="flex flex-col gap-6 sm:gap-8">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-[#262626] text-xs sm:text-sm md:text-base font-medium">
                    {totalCount} Products
                </p>
                <button
                    onClick={onAddAllToCart}
                    className="bg-[#262626] text-white text-[10px] sm:text-xs font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-black transition cursor-pointer whitespace-nowrap"
                >
                    Add all to Cart – Bundle {bundlePrice}
                </button>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10">
                {products.map((product) => (
                    <CollectionProductCard key={product.id} {...product} />
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

export default CollectionProductGrid
