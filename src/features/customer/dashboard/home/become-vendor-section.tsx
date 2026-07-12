"use client"

import { useRouter } from "next/navigation"
import Button from "@/shared/components/button"

const BecomeVendorSection = () => {
    const router = useRouter()

    return (
        <div className="bg-black px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-7 sm:py-9 md:py-11 lg:py-13 flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-5">
            <h3 className="font-garamond text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] max-w-2xl">
                Your Craft Deserves a Global Market
            </h3>
            <p className="text-[#FFFFFFBF] text-xs sm:text-sm md:text-base max-w-xl">
                Get verified, list your collections, and reach diaspora customers worldwide. Payments protection and automatic payouts.
            </p>
            <Button
                onClick={() => router.push('/vendor/register')}
                className="bg-white max-w-63 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full"
            >
                <p className="text-black font-semibold text-xs sm:text-sm">Become a vendor</p>
            </Button>
        </div>
    )
}

export default BecomeVendorSection
