"use client"

import { useState } from "react"
import Link from "next/link"
import VendorFilterSidebar from "./vendor-filter-sidebar"
import VendorGrid from "./vendor-grid"

const DUMMY_VENDORS = [
    {
        id: "1",
        imgSrc: "/svgs/dummy/vendor-image-1.svg",
        title: "Adire Couture",
        location: "Ikeja, Lagos, Nigeria",
        years: "5",
        tier: "Gold tier",
        categories: ["Ready to wear", "Made to Order", "Bespoke"],
        rating: "4.9",
        onTime: "100%",
        sales: "401",
        isSelected: true,
    },
    {
        id: "2",
        imgSrc: "/svgs/dummy/vendor-image-2.svg",
        title: "Piece of Ruchee",
        location: "Yaoundé, Cameroon",
        years: "2",
        tier: "Silver tier",
        categories: ["Ready to wear", "Made to Order"],
        rating: "4.4",
        onTime: "95%",
        sales: "562",
    },
    {
        id: "3",
        imgSrc: "/svgs/dummy/vendor-image-3.svg",
        title: "Ori Designs",
        location: "Abuja, Nigeria",
        years: "2",
        tier: "Silver tier",
        categories: ["Ready to wear", "Made to Order", "Bespoke"],
        rating: "4.1",
        onTime: "93%",
        sales: "92",
    },
    {
        id: "4",
        imgSrc: "/svgs/dummy/vendor-image-3.svg",
        title: "Ori Designs",
        location: "Abuja, Nigeria",
        years: "2",
        tier: "Silver tier",
        categories: ["Ready to wear", "Made to Order", "Bespoke"],
        rating: "4.1",
        onTime: "93%",
        sales: "92",
    },
]

const VendorsPage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["Bespoke"])
    const [selectedLocations, setSelectedLocations] = useState<string[]>(["International"])
    const [sortBy, setSortBy] = useState("Location")
    const [currentPage, setCurrentPage] = useState(1)

    const handleCategoryChange = (cat: string) =>
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        )

    const handleLocationChange = (loc: string) =>
        setSelectedLocations((prev) =>
            prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
        )

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

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-6 sm:mb-8">
                <Link href="/" className="text-[#737373] text-[10px] sm:text-xs md:text-sm hover:text-[#262626] transition">
                    Home
                </Link>
                <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                <span className="text-[#262626] text-[10px] sm:text-xs md:text-sm">Vendors</span>
            </div>

            {/* Page title */}
            <h2 className="font-garamond text-[#262626] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 md:mb-12">
                All Vendors{" "}
                <span className="text-[#A3A3A3] font-normal text-base sm:text-lg md:text-xl lg:text-2xl">
                    72 Vendors found)
                </span>
            </h2>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-14 xl:gap-18">
                {/* Sidebar */}
                <div className="lg:w-[220px] xl:w-[240px] shrink-0">
                    <VendorFilterSidebar
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        selectedLocations={selectedLocations}
                        onLocationChange={handleLocationChange}
                        onFilter={() => {}}
                    />
                </div>

                {/* Vendor grid */}
                <div className="flex-1 min-w-0">
                    <VendorGrid
                        vendors={DUMMY_VENDORS}
                        activeFilters={activeFilters}
                        onClearAll={() => { setSelectedCategories([]); setSelectedLocations([]) }}
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

export default VendorsPage
