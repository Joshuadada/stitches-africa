"use client"

import { useEffect, useState } from "react"
import OrderTable from "./order-table"
import Tabs from "@/shared/components/tabs"
import { useVendorHeaderStore } from "@/store/vendor-header"

const tabs = [
    {
        name: "New",
        count: 3,
        value: "new",
    },
    {
        name: "In Progress",
        count: 2,
        value: "in-progress",
    },
    {
        name: "Dispatched to Hub",
        count: 4,
        value: "dispatched",
    },
    {
        name: "Completed",
        count: 2,
        value: "completed",
    },
]

const orders = [
    {
        name: "Àṣà Adire Wrap Dress",
        category: "new",
        categoryData: {
            label: "New",
            className:
                "border-[#6EE7B7] bg-[#F0FDF4] text-[#065F46]",
        },
        country: "UK",
        date: "Apr 3",
        status: "Active",
    },
    {
        name: "Ìgbọ̀yà Kaftan Set",
        category: "new",
        categoryData: {
            label: "New",
            className:
                "border-[#93C5FD] bg-[#EFF6FF] text-[#1E3A8A]",
        },
        country: "UK",
        date: "Apr 3",
        status: "Active",
    },
    {
        name: "Àárò Bespoke Agbada",
        category: "in-progress",
        categoryData: {
            label: "In Progress",
            className:
                "border-[#C4B5FD] bg-[#F5F3FF] text-[#4C1D95]",
        },
        country: "UK",
        date: "Apr 3",
        status: "Active",
    },
    {
        name: "Àárò Bespoke Agbada",
        category: "in-progress",
        categoryData: {
            label: "In Progress",
            className:
                "border-[#C4B5FD] bg-[#F5F3FF] text-[#4C1D95]",
        },
        country: "UK",
        date: "Apr 3",
        status: "Active",
    },
    {
        name: "Àárò Bespoke Agbada",
        category: "dispatched",
        categoryData: {
            label: "Dispatched to Hub",
            className:
                "border-[#C4B5FD] bg-[#F5F3FF] text-[#4C1D95]",
        },
        country: "UK",
        date: "Apr 3",
        status: "Active",
    },
    {
        name: "Àárò Bespoke Agbada",
        category: "completed",
        categoryData: {
            label: "Completed",
            className:
                "border-[#C4B5FD] bg-[#F5F3FF] text-[#4C1D95]",
        },
        country: "UK",
        date: "Apr 3",
        status: "Active",
    },
]

export type Order = {
    name: string,
    category: string,
    categoryData: {
        label: string,
        className: string,
    },
    country: string,
    date: string,
    status: string,
}

const Orders = () => {
    const [activeTab, setActiveTab] = useState("new")
    const { setVendorHeader } = useVendorHeaderStore()

    useEffect(() => {
        setVendorHeader({
            title: "Order Management"
          })
    }, [])

    const filteredOrders = orders.filter(
        (order) => order.category === activeTab
    )

    return (
        <div className="space-y-5 sm:space-y-9 md:space-y-13 lg:space-y-17">
            {/* ================= TABS ================= */}
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* ================= TABLE ================= */}
            <OrderTable orders={filteredOrders} />
        </div>
    )
}

export default Orders