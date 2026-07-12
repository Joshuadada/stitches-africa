"use client"

import { useState } from "react"
import Link from "next/link"
import FilterSidebar from "./filter-sidebar"
import ProductGrid from "./product-grid"

const DUMMY_PRODUCTS = [
    {
        imgSrc: "/svgs/dummy/product-image-3.svg",
        title: "Ìmọ́lẹ̀ Linen Shirt",
        vendorName: "PIECE OF KUCHE",
        amount: "N₦56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 34,
    },
    {
        imgSrc: "/svgs/dummy/product-image-2.svg",
        title: "Ankara Pants",
        vendorName: "PIECE OF KUCHE",
        amount: "N₦56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 24,
        salePercent: 21,
    },
    {
        imgSrc: "/svgs/dummy/product-image-5.svg",
        title: "Nma Bespoke Co-ord Set",
        vendorName: "PIECE OF KUCHE",
        amount: "N₦56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 34,
    },
    {
        imgSrc: "/svgs/dummy/product-image-1.svg",
        title: "Oge Wrap Dress",
        vendorName: "PIECE OF KUCHE",
        amount: "N₦56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 24,
    },
]

const TrendingPage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["Bespoke"])
    const [priceRange, setPriceRange] = useState<[number, number]>([50, 1000])
    const [selectedLocations, setSelectedLocations] = useState<string[]>(["International"])
    const [sortBy, setSortBy] = useState("Newest arrivals")
    const [currentPage, setCurrentPage] = useState(1)

    const handleCategoryChange = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        )
    }

    const handleLocationChange = (loc: string) => {
        setSelectedLocations((prev) =>
            prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
        )
    }

    const activeFilters = [
        ...selectedCategories.map((c) => ({
            label: c,
            onRemove: () => setSelectedCategories((prev) => prev.filter((x) => x !== c)),
        })),
        ...selectedLocations.map((l) => ({
            label: l,
            onRemove: () => setSelectedLocations((prev) => prev.filter((x) => x !== l)),
        })),
    ]

    const clearAll = () => {
        setSelectedCategories([])
        setSelectedLocations([])
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-6 sm:mb-8">
                <Link href="/" className="text-[#737373] text-[10px] sm:text-xs md:text-sm hover:text-[#262626] transition">
                    Home
                </Link>
                <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                <span className="text-[#262626] text-[10px] sm:text-xs md:text-sm">Trending</span>
            </div>

            {/* Page title */}
            <h2 className="font-garamond text-[#262626] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-12">
                Trending Products{" "}
                <span className="text-[#A3A3A3] font-normal text-base sm:text-lg md:text-xl lg:text-2xl">
                    (350 products found)
                </span>
            </h2>

            {/* Main layout: sidebar + content */}
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-14 xl:gap-18">
                {/* Filter sidebar */}
                <div className="lg:w-[220px] xl:w-[240px] shrink-0">
                    <FilterSidebar
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        selectedLocations={selectedLocations}
                        onLocationChange={handleLocationChange}
                        onFilter={() => {}}
                    />
                </div>

                {/* Product grid */}
                <div className="flex-1 min-w-0">
                    <ProductGrid
                        products={DUMMY_PRODUCTS}
                        activeFilters={activeFilters}
                        onClearAll={clearAll}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        currentPage={currentPage}
                        totalPages={68}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default TrendingPage
