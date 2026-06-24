"use client"

import { useVendorHeaderStore } from "@/store/vendor-header"
import RecentOrders from "./recent-orders"
import Review from "./review"
import StatCards from "./stat-cards"
import { useEffect } from "react"
import { useAuthStore } from "@/store/auth"
import { useVendorDashboard } from "@/hooks/api/vendor/useVendorDashboard"
import { showToast } from "@/utils/toast"
import Loader from "@/shared/components/loader"

const VendorHome = () => {
    const { vendorProfile } = useAuthStore()
    const { setVendorHeader } = useVendorHeaderStore()

    const {
        data: vendorDashboard,
        isLoading,
        error,
    } = useVendorDashboard();

    useEffect(() => {
        if (error) {
            showToast({
                type: "error",
                title: "Error",
                message: error.message,
            });
        }
    }, [error]);

    useEffect(() => {
        setVendorHeader({
            title: "Welcome back",
            highlight: vendorProfile?.businessName || '',
        })
    }, [vendorProfile])

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8 lg:space-y-10">

            {/* ================= STATS CARDS ================= */}
            <StatCards dashboardData={vendorDashboard || null} />

            {/* ================= REVIEWS SECTION ================= */}
            <Review dashboardData={vendorDashboard || null} />

            {/* ================= RECENT ORDERS ================= */}
            <RecentOrders dashboardData={vendorDashboard || null} />
        </div>
    )
}

export default VendorHome