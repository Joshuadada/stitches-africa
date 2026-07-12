"use client"

import { useEffect, useState } from "react"
import { useAdminHeaderStore } from "@/store/admin-header"
import AdminTabs from "../components/admin-tabs"
import AdminStatCards, { AdminStat } from "../components/admin-stat-cards"
import VendorStatementsTable from "./vendor-statements-table"
import CampaignsTable from "./campaigns-table"

const TABS = [
    { label: "Statement of account", value: "statement" },
    { label: "Promotions", value: "promotions" },
]

const STATEMENT_STATS: AdminStat[] = [
    { label: "TOTAL REVENUE", value: "₦48.2M", trend: "12% vs last month" },
    { label: "PLATFORM FEES", value: "₦4.8M", trend: "10% avg" },
    { label: "VENDOR PAYOUTS", value: "₦41.7M" },
    { label: "PENDING PAYOUTS", value: "₦1.7M" },
]

const PROMOTIONS_STATS: AdminStat[] = [
    { label: "ACTIVE CAMPAIGNS", value: "3", trend: "12% vs last month" },
    { label: "TOTAL REDEMPTIONS", value: "421", trend: "38 today" },
    { label: "REVENUE IMPACT", value: "₦2.1M" },
    { label: "EXPIRING SOON", value: "3" },
]

const AdminFinance = () => {
    const { setAdminHeader } = useAdminHeaderStore()
    const [activeTab, setActiveTab] = useState("statement")

    useEffect(() => {
        setAdminHeader({
            eyebrow: "Statement of account and promotional campaigns",
            title: "Finance",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <AdminTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

            {activeTab === "statement" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={STATEMENT_STATS} />
                    <VendorStatementsTable />
                </div>
            )}

            {activeTab === "promotions" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={PROMOTIONS_STATS} />
                    <CampaignsTable />
                </div>
            )}
        </div>
    )
}

export default AdminFinance
