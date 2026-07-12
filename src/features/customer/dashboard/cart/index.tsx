"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CartItemCard, { CartItem } from "./cart-item-card"
import CartSummary from "./cart-summary"
import RecentlyViewedSection from "@/features/customer/dashboard/components/recently-viewed-section"
import EmptyCart from "./empty-cart"

const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`

const INITIAL_CART_ITEMS: CartItem[] = [
    {
        id: "1",
        imgSrc: "/svgs/dummy/product-image-1.svg",
        title: "Hand-Crafted stitched Ankara tailored Pants",
        price: 125000,
        quantity: 1,
    },
]

const CartPage = () => {
    const router = useRouter()
    const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS)

    const incrementQuantity = (id: string) => {
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        )
    }

    const decrementQuantity = (id: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        )
    }

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
                    My Cart
                </h1>
            </div>

            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
                    {/* Main layout */}
                    <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
                        {/* Left: cart items */}
                        <div className="flex-1 w-full border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
                            <h3 className="text-[#262626] font-medium text-sm sm:text-base md:text-lg">
                                Cart ({cartItems.length})
                            </h3>

                            <div className="flex flex-col gap-5 sm:gap-6">
                                {cartItems.map((item, index) => (
                                    <div key={item.id}>
                                        {index > 0 && <hr className="border-[#E8E8E8] mb-5 sm:mb-6" />}
                                        <CartItemCard
                                            item={item}
                                            formatAmount={formatNaira}
                                            onIncrement={incrementQuantity}
                                            onDecrement={decrementQuantity}
                                            onRemove={removeItem}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: cart summary (sticky on desktop) */}
                        <div className="w-full lg:w-[38%] xl:w-[36%] shrink-0 lg:sticky lg:top-6">
                            <CartSummary
                                total={formatNaira(total)}
                                onCheckout={() => router.push('/checkout')}
                                onContinueShopping={() => router.push('/')}
                            />
                        </div>
                    </div>

                    <RecentlyViewedSection />
                </div>
            )}
        </div>
    )
}

export default CartPage
