"use client"

import { useState } from "react"
import Link from "next/link"
import VendorHero from "./vendor-hero"
import VendorSidebar from "./vendor-sidebar"
import VendorProducts, { VendorProduct } from "./vendor-products"
import VendorReviews, { VendorReview } from "./vendor-reviews"

const VENDOR_TABS = ["Products", "Reviews", "About"]

const VENDOR_DATA = {
    bannerSrc: "/svgs/dummy/vendor-image-1.svg",
    initials: "AC",
    tier: "Gold tier",
    location: "Ikeja, Lagos, Nigeria",
    years: "5",
    name: "Adire Couture",
    performance: {
        averageRating: "4.9",
        onTimeDelivery: "100%",
        totalSales: "401",
        responseTime: "Under 2hrs",
    },
    brandStory:
        "Adire Couture was founded in Lagos by designer Tolumba Adewale in 2019. We celebrate the beauty of African heritage through handcrafted Adire fabric sourced directly from Yoruba artisans in Abeokuta, then finished by a team of trained tailors in our Lagos atelier. We make fashion that carries memory.",
    specialities: ["Ready to wear", "Made to Order", "Bespoke"],
    email: "hello@adirecouture.ng",
}

const DUMMY_PRODUCTS: VendorProduct[] = [
    { id: "1", imgSrc: "/svgs/dummy/collection-dummy-1.svg", name: "Nifra Bespoke Co-ord Set", price: "₦56,000", tier: "Gold tier", rating: 4.9, reviews: 24 },
    { id: "2", imgSrc: "/svgs/dummy/collection-dummy-2.svg", name: "Oyin Wrap Dress", price: "₦96,000", tier: "Silver tier", rating: 4.4, reviews: 98 },
    { id: "3", imgSrc: "/svgs/dummy/collection-dummy-1.svg", name: "Inobi Linen Shirt", price: "₦56,000", tier: "Gold tier", rating: 4.9, reviews: 140 },
    { id: "4", imgSrc: "/svgs/dummy/collection-dummy-2.svg", name: "Nifra Bespoke Co-ord Set", price: "₦56,000", tier: "Gold tier", rating: 4.9, reviews: 24 },
    { id: "5", imgSrc: "/svgs/dummy/collection-dummy-1.svg", name: "Oyin Wrap Dress", price: "₦96,000", tier: "Silver tier", rating: 4.4, reviews: 140 },
    { id: "6", imgSrc: "/svgs/dummy/collection-dummy-2.svg", name: "Inobi Linen Shirt", price: "₦56,000", tier: "Gold tier", rating: 4.9, reviews: 24 },
]

const DUMMY_REVIEWS: VendorReview[] = [
    {
        id: "1",
        initials: "AO",
        avatarBg: "#262626",
        name: "Adaeze Okonkwo",
        date: "March 13, 2024",
        location: "London, UK",
        purchasedItem: "Adire Nifra Wrap Dress",
        size: "S1",
        rating: 5,
        text: "Absolutely stunning quality. The Adire fabric is so rich and the stitching is immaculate. I was nervous ordering from Nigeria to London but the escrow protection made me feel safe and it arrived in 8 days via DHL. I've already ordered another piece.",
    },
    {
        id: "2",
        initials: "TM",
        avatarBg: "#4B5563",
        name: "Temi Martins",
        date: "February 13, 2024",
        location: "Manchester, UK",
        purchasedItem: "Adire Linen Skirt",
        size: "M",
        rating: 5,
        text: "I ordered the Made to Order Kaftan and submitted my measurements through the app. It fit perfectly — like it was tailored in Manchester not Lagos. The production took 12 days which they communicated throughout. Will be a repeat customer.",
    },
]

const VendorProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Products")
    const [productFilter, setProductFilter] = useState("All")
    const [sortBy, setSortBy] = useState("Newest")
    const [currentPage, setCurrentPage] = useState(1)
    const [reviewFilter, setReviewFilter] = useState("All reviews")

    const reviewsProps = {
        totalReviews: 69,
        overallRating: 4.9,
        ratingCount: 60,
        reviews: DUMMY_REVIEWS,
        activeFilter: reviewFilter,
        onFilterChange: setReviewFilter,
    }

    return (
        <div className="bg-[#FAF7F2] min-h-screen">
            {/* Breadcrumb */}
            <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-4 sm:pt-5">
                <div className="flex items-center gap-1.5">
                    <Link href="/" className="text-[#737373] text-[10px] sm:text-xs hover:text-[#262626] transition">
                        Home
                    </Link>
                    <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                    <Link href="/vendors" className="text-[#737373] text-[10px] sm:text-xs hover:text-[#262626] transition">
                        Vendors
                    </Link>
                    <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                    <span className="text-[#262626] text-[10px] sm:text-xs">{VENDOR_DATA.name}</span>
                </div>
            </div>

            {/* Hero banner + profile header */}
            <VendorHero
                bannerSrc={VENDOR_DATA.bannerSrc}
                initials={VENDOR_DATA.initials}
                tier={VENDOR_DATA.tier}
                location={VENDOR_DATA.location}
                years={VENDOR_DATA.years}
                name={VENDOR_DATA.name}
            />

            {/* Two-column layout */}
            <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-14 xl:gap-16">
                {/* Left sidebar */}
                <div className="lg:w-[220px] xl:w-[240px] shrink-0">
                    <VendorSidebar
                        performance={VENDOR_DATA.performance}
                        brandStory={VENDOR_DATA.brandStory}
                        specialities={VENDOR_DATA.specialities}
                        email={VENDOR_DATA.email}
                    />
                </div>

                {/* Right column */}
                <div className="flex-1 min-w-0">
                    {/* Tab bar */}
                    <div className="flex items-center gap-6 sm:gap-8 border-b border-[#E8E8E8] mb-6 sm:mb-8">
                        {VENDOR_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-xs sm:text-sm font-medium cursor-pointer transition border-b-2 -mb-px ${
                                    activeTab === tab
                                        ? "text-[#262626] border-[#262626]"
                                        : "text-[#737373] border-transparent hover:text-[#262626]"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    {activeTab === "Products" && (
                        <VendorProducts
                            products={DUMMY_PRODUCTS}
                            activeFilter={productFilter}
                            onFilterChange={setProductFilter}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            currentPage={currentPage}
                            totalPages={68}
                            onPageChange={setCurrentPage}
                        />
                    )}

                    {activeTab === "Reviews" && <VendorReviews {...reviewsProps} />}

                    {activeTab === "About" && (
                        <div className="flex flex-col gap-4">
                            <h3 className="font-garamond text-[#262626] font-medium text-xl sm:text-2xl">Brand Story</h3>
                            <p className="text-[#525252] text-xs sm:text-sm leading-relaxed">{VENDOR_DATA.brandStory}</p>
                        </div>
                    )}

                    {/* Customer reviews — always shown below Products and About tabs */}
                    {activeTab !== "Reviews" && <VendorReviews {...reviewsProps} />}
                </div>
            </div>
        </div>
    )
}

export default VendorProfilePage
