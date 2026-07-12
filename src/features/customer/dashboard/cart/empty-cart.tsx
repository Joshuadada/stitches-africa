"use client"

import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import Button from "@/shared/components/button"

const EmptyCart = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 py-16 sm:py-20 md:py-24 lg:py-28">
            <ShoppingCart size={64} strokeWidth={1.2} className="text-[#A3A3A3]" />
            <p className="text-[#262626] text-sm sm:text-base md:text-lg font-medium">
                Your shopping cart is empty
            </p>
            <Button
                onClick={() => router.push('/')}
                className="bg-[#262626] text-white text-[10px] sm:text-xs md:text-sm font-medium py-3 sm:py-3.5 px-6 sm:px-8 w-auto rounded-full hover:bg-[#171717] transition"
            >
                Continue Shopping
            </Button>
        </div>
    )
}

export default EmptyCart
