"use client"

import { useEffect, useState } from "react"
import { useAdminHeaderStore } from "@/store/admin-header"
import AdminTabs from "../components/admin-tabs"
import AdminStatCards, { AdminStat } from "../components/admin-stat-cards"
import ProductListingsTable from "./product-listings-table"
import AllVendorsTable from "./all-vendors-table"
import PendingKycTable from "./pending-kyc-table"

const TABS = [
    { label: "Inventory", value: "inventory" },
    { label: "Vendors", value: "vendors" },
    { label: "Vendor approval", value: "vendor-approval" },
]

const INVENTORY_STATS: AdminStat[] = [
    { label: "TOTAL LISTINGS", value: "1,248" },
    { label: "IN STOCK", value: "1,091" },
    { label: "LOW STOCK", value: "94" },
    { label: "OUT OF STOCK", value: "63" },
]

const VENDOR_STATS: AdminStat[] = [
    { label: "TOTAL VENDORS", value: "86" },
    { label: "ACTIVE", value: "74" },
    { label: "SUSPENDED", value: "3" },
    { label: "AVG ORDERS/VENDOR", value: "24" },
]

const VENDOR_APPROVAL_STATS: AdminStat[] = [
    { label: "PENDING REVIEWS", value: "18" },
    { label: "APPROVED THIS MONTH", value: "34" },
    { label: "REJECTED", value: "7" },
    { label: "AVG REVIEW TIME", value: "1.4" },
]

const AdminCatalogue = () => {
    const { setAdminHeader } = useAdminHeaderStore()
    const [activeTab, setActiveTab] = useState("inventory")

    useEffect(() => {
        setAdminHeader({
            eyebrow: "CATALOGUE",
            title: "Catalogue Overview",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <AdminTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

            {activeTab === "inventory" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={INVENTORY_STATS} />
                    <ProductListingsTable />
                </div>
            )}

            {activeTab === "vendors" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={VENDOR_STATS} />
                    <AllVendorsTable />
                </div>
            )}

            {activeTab === "vendor-approval" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={VENDOR_APPROVAL_STATS} />
                    <PendingKycTable />
                </div>
            )}
        </div>
    )
}

export default AdminCatalogue
