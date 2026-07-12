"use client"

import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import Button from "@/shared/components/button"

const EmptyWishlist = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 py-16 sm:py-20 md:py-24 lg:py-28 text-center">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                <Heart size={32} className="text-[#B5894A] fill-[#B5894A]" />
            </div>
            <p className="text-[#262626] text-sm sm:text-base md:text-lg font-semibold">
                You haven&apos;t saved an item yet!
            </p>
            <p className="text-[#737373] text-[10px] sm:text-xs md:text-sm max-w-xs">
                Like something? Tap the heart to save it — your wishlist will appear here.
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

export default EmptyWishlist
