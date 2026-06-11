"use client"

import { useVendorHeaderStore } from "@/store/vendor-header"
import RecentOrders from "./recent-orders"
import Review from "./review"
import StatCards from "./stat-cards"
import { useEffect } from "react"
import { useAuthStore } from "@/store/auth"

const VendorHome = () => {
    const { vendorProfile } = useAuthStore()
    const { setVendorHeader } = useVendorHeaderStore()

    useEffect(() => {
        setVendorHeader({
            title: "Welcome back",
            highlight: vendorProfile?.businessName || '',
        })
    }, [vendorProfile])

    return (
        <div className="space-y-8 lg:space-y-10">

            {/* ================= STATS CARDS ================= */}
            <StatCards />

            {/* ================= REVIEWS SECTION ================= */}
            <Review />

            {/* ================= RECENT ORDERS ================= */}
            <RecentOrders />
        </div>
    )
}

export default VendorHome