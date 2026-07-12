"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import WishlistItemCard, { WishlistItem } from "./wishlist-item-card"
import EmptyWishlist from "./empty-wishlist"
import RecentlyViewedSection from "@/features/customer/dashboard/components/recently-viewed-section"

const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`

const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [
    {
        id: "1",
        imgSrc: "/svgs/dummy/product-image-1.svg",
        title: "Hand-Crafted stitched Ankara tailored Pants",
        price: 125000,
        quantity: 1,
    },
    {
        id: "2",
        imgSrc: "/svgs/dummy/product-image-2.svg",
        title: "Hand-Crafted stitched Ankara tailored Pants",
        price: 125000,
        quantity: 1,
    },
]

const WishlistPage = () => {
    const router = useRouter()
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(INITIAL_WISHLIST_ITEMS)

    const incrementQuantity = (id: string) => {
        setWishlistItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        )
    }

    const decrementQuantity = (id: string) => {
        setWishlistItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        )
    }

    const removeItem = (id: string) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id))
    }

    const total = wishlistItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-6 sm:mb-8">
                <Link href="/" className="text-[#737373] text-[10px] sm:text-xs hover:text-[#262626] transition">
                    Piece of Ruchee
                </Link>
                <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                <span className="text-[#262626] text-[10px] sm:text-xs">Ankara Pants</span>
            </div>

            {/* Page title */}
            <div className="mb-8 sm:mb-10 md:mb-12">
                <h1 className="font-garamond text-[#262626] font-medium text-3xl sm:text-4xl md:text-5xl">
                    My Wishlist
                </h1>
            </div>

            <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
                <div className="border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
                    <h3 className="text-[#262626] font-medium text-sm sm:text-base md:text-lg">
                        My wish
                    </h3>

                    {wishlistItems.length === 0 ? (
                        <EmptyWishlist />
                    ) : (
                        <>
                            <div className="flex flex-col gap-5 sm:gap-6">
                                {wishlistItems.map((item, index) => (
                                    <div key={item.id}>
                                        {index > 0 && <hr className="border-[#E8E8E8] mb-5 sm:mb-6" />}
                                        <WishlistItemCard
                                            item={item}
                                            formatAmount={formatNaira}
                                            onIncrement={incrementQuantity}
                                            onDecrement={decrementQuantity}
                                            onRemove={removeItem}
                                            onAddToCart={() => router.push('/cart')}
                                            onBuyNow={() => router.push('/checkout')}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-5 sm:pt-6 border-t border-[#E8E8E8]">
                                <div className="flex items-center gap-2">
                                    <p className="text-[#737373] text-[10px] sm:text-xs md:text-sm">
                                        Total Wishlist value
                                    </p>
                                    <p className="text-[#262626] font-semibold text-xs sm:text-sm md:text-base">
                                        {formatNaira(total)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => router.push('/cart')}
                                    className="shrink-0 bg-[#262626] text-white text-[10px] sm:text-xs md:text-sm font-medium rounded-md py-2.5 sm:py-3 px-5 sm:px-6 hover:bg-[#171717] transition cursor-pointer"
                                >
                                    Add all to Cart
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <RecentlyViewedSection />
            </div>
        </div>
    )
}

export default WishlistPage
