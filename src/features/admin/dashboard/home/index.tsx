"use client"

import { useEffect } from "react"
import { useAdminHeaderStore } from "@/store/admin-header"
import AdminStatCards, { AdminStat } from "../components/admin-stat-cards"
import CustomerRegistrationsChart from "./customer-registrations-chart"
import RevenueBreakdownChart from "./revenue-breakdown-chart"
import MostOrderedProducts from "./most-ordered-products"
import VendorActivityFeed from "./vendor-activity-feed"

const stats: AdminStat[] = [
    { label: "TOTAL REVENUE", value: "₦48.2M", trend: "18% vs last month" },
    { label: "TOTAL CUSTOMERS", value: "4,821", trend: "128 last month" },
    { label: "TOTAL ORDERS", value: "2,047", trend: "148 last month" },
    { label: "TOTAL VENDORS", value: "87" },
]

const AdminHome = () => {
    const { setAdminHeader } = useAdminHeaderStore()

    useEffect(() => {
        setAdminHeader({
            eyebrow: "ADMIN DASHBOARD",
            title: "Platform Overview",
        })
    }, [])

    return (
        <div className="flex flex-col gap-8 lg:gap-10">
            <AdminStatCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <CustomerRegistrationsChart />
                <RevenueBreakdownChart />
            </div>

            <MostOrderedProducts />
            <VendorActivityFeed />
        </div>
    )
}

export default AdminHome
