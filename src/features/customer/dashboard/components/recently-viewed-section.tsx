"use client"

import Link from "next/link"
import ProductCard from "@/features/customer/dashboard/home/components/product-card"

const recentlyViewedProducts = [
    {
        imgSrc: "/svgs/dummy/product-image-1.svg",
        title: "Nma Bespoke Co-ord Set",
        amount: "N56,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-2.svg",
        title: "Oge Wrap Dress",
        amount: "N55,000",
        tier: "Silver tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-3.svg",
        title: "Ìmọ́lẹ̀ Linen Shirt",
        amount: "N85,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    },
    {
        imgSrc: "/svgs/dummy/product-image-4.svg",
        title: "Ìmọ́lẹ̀ Linen Shirt",
        amount: "N85,000",
        tier: "Gold tier",
        rating: 4,
        numberOfRatings: 25
    }
]

const RecentlyViewedSection = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <div className="flex items-center justify-between">
                <h3 className="font-garamond text-[#262626] font-medium text-lg sm:text-xl md:text-2xl">
                    Recently Viewed
                </h3>
                <Link href="/trending" className="text-[#B5894A] text-[10px] sm:text-xs md:text-sm font-medium hover:underline">
                    See All
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {recentlyViewedProducts.map((product, index) => (
                    <Link key={product.title + index} href="/product/1">
                        <ProductCard
                            imgSrc={product.imgSrc}
                            title={product.title}
                            amount={product.amount}
                            tier={product.tier}
                            rating={product.rating}
                            numberOfRatings={product.numberOfRatings}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RecentlyViewedSection
