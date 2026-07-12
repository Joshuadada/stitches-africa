"use client"

import { useEffect, useState } from "react"
import { useAdminHeaderStore } from "@/store/admin-header"
import AdminTabs from "../components/admin-tabs"
import AdminStatCards, { AdminStat } from "../components/admin-stat-cards"
import AllOrdersTable from "./all-orders-table"
import ReturnOrdersTable from "./return-orders-table"
import ConsignmentTable from "./consignment-table"
import ManualOrderForm from "./manual-order-form"

const TABS = [
    { label: "All Orders", value: "all-orders" },
    { label: "Return Orders", value: "return-orders" },
    { label: "Consignment", value: "consignment" },
    { label: "Manual Orders", value: "manual-orders" },
]

const ALL_ORDERS_STATS: AdminStat[] = [
    { label: "TOTAL ORDERS", value: "2,047" },
    { label: "PENDING/CRAFTING", value: "1,091" },
    { label: "IN TRANSIT", value: "189" },
    { label: "DELIVERED", value: "1,456" },
]

const RETURN_ORDERS_STATS: AdminStat[] = [
    { label: "TOTAL RETURNS", value: "84" },
    { label: "PENDING REVIEW", value: "23" },
    { label: "APPROVED", value: "51" },
    { label: "REJECTED", value: "10" },
]

const CONSIGNMENT_STATS: AdminStat[] = [
    { label: "ACTIVE CONSIGNMENT", value: "38" },
    { label: "PENDING DISPATCH", value: "12" },
    { label: "SETTLED THIS MONTH", value: "21" },
    { label: "TOTAL VALUE HELD", value: "₦4.3M" },
]

const AdminOrders = () => {
    const { setAdminHeader } = useAdminHeaderStore()
    const [activeTab, setActiveTab] = useState("all-orders")

    useEffect(() => {
        setAdminHeader({
            eyebrow: "All orders, returns, consignments and manual order creation",
            title: "Orders",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <AdminTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

            {activeTab === "all-orders" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={ALL_ORDERS_STATS} />
                    <AllOrdersTable />
                </div>
            )}

            {activeTab === "return-orders" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={RETURN_ORDERS_STATS} />
                    <ReturnOrdersTable />
                </div>
            )}

            {activeTab === "consignment" && (
                <div className="flex flex-col gap-8 lg:gap-10">
                    <AdminStatCards stats={CONSIGNMENT_STATS} />
                    <ConsignmentTable />
                </div>
            )}

            {activeTab === "manual-orders" && <ManualOrderForm />}
        </div>
    )
}

export default AdminOrders
