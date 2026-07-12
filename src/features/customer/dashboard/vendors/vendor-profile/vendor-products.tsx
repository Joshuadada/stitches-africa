import Link from "next/link"
import Image from "next/image"
import Button from "@/shared/components/button"

const PRODUCT_FILTERS = ["All", "Ready to wear", "Made to order", "Bespoke"]
const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Best Rated"]

export type VendorProduct = {
    id: string
    imgSrc: string
    name: string
    price: string
    tier: "Gold tier" | "Silver tier"
    rating: number
    reviews: number
}

const TIER_COLOR: Record<string, string> = {
    "Gold tier": "text-[#B5894A]",
    "Silver tier": "text-[#737373]",
}

const getPaginationPages = (currentPage: number, totalPages: number): (number | "...")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages]
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
}

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
    <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="10" height="10" viewBox="0 0 12 12" fill={s <= Math.round(rating) ? "#B5894A" : "#E8E8E8"}>
                    <path d="M6 1.5L7.39 4.31L10.5 4.77L8.25 6.97L8.78 10.07L6 8.62L3.22 10.07L3.75 6.97L1.5 4.77L4.61 4.31L6 1.5Z" />
                </svg>
            ))}
        </div>
        <span className="text-[#737373] text-[9px] sm:text-[10px]">({count})</span>
    </div>
)

type Props = {
    products: VendorProduct[]
    activeFilter: string
    onFilterChange: (f: string) => void
    sortBy: string
    onSortChange: (s: string) => void
    currentPage: number
    totalPages: number
    onPageChange: (p: number) => void
}

const VendorProducts = ({
    products,
    activeFilter,
    onFilterChange,
    sortBy,
    onSortChange,
    currentPage,
    totalPages,
    onPageChange,
}: Props) => {
    const pages = getPaginationPages(currentPage, totalPages)

    return (
        <div className="flex flex-col gap-5 sm:gap-6">
            {/* Filter pills + sort */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    {PRODUCT_FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => onFilterChange(f)}
                            className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-[100px] text-[10px] sm:text-xs border cursor-pointer transition ${
                                activeFilter === f
                                    ? "bg-[#262626] text-white border-[#262626]"
                                    : "bg-white text-[#262626] border-[#E8E8E8] hover:border-[#262626]"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="text-[#737373] text-[10px] sm:text-xs shrink-0">Sort by:</span>
                    <div className="relative flex items-center">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="appearance-none text-[#262626] text-[10px] sm:text-xs font-medium pr-4 bg-transparent cursor-pointer border-none outline-none"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none text-[#262626] text-[8px] ml-0.5">▼</span>
                    </div>
                </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="flex flex-col group">
                        <div className="relative overflow-hidden rounded-md mb-2 sm:mb-2.5">
                            <Image
                                src={product.imgSrc}
                                alt={product.name}
                                width={260}
                                height={340}
                                className="object-cover w-full aspect-[3/4] group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium mb-0.5 sm:mb-1 line-clamp-2 leading-snug">
                            {product.name}
                        </p>
                        <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm mb-1">{product.price}</p>
                        <p className={`text-[9px] sm:text-[10px] font-medium mb-1 ${TIER_COLOR[product.tier] ?? "text-[#737373]"}`}>
                            {product.tier}
                        </p>
                        <StarRating rating={product.rating} count={product.reviews} />
                    </Link>
                ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center mt-1">
                <Button
                    onClick={() => {}}
                    className="bg-transparent border border-[#A3A3A3] text-[#262626] text-[10px] sm:text-xs font-medium py-2 w-full max-w-sm tracking-widest hover:bg-[#F5F5F5] transition"
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

export default VendorProducts
