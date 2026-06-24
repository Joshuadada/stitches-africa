"use client"

import { useEffect, useState } from "react"
import OrderTable from "./order-table"
import Tabs from "@/shared/components/tabs"
import { useVendorHeaderStore } from "@/store/vendor-header"
import { useVendorOrders } from "@/hooks/api/vendor/useVendorOrders"
import { showToast } from "@/utils/toast"
import Loader from "@/shared/components/loader"

const Orders = () => {
    const [activeTab, setActiveTab] = useState("Paid")
    const { setVendorHeader } = useVendorHeaderStore()

    const {
        data: vendorOrders,
        isLoading,
        error,
    } = useVendorOrders();

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
            title: "Order Management"
        })
    }, [])

    const tabs = [
        {
            name: "Paid",
            count: vendorOrders?.filter((p) => p.status === "Paid").length ?? 0,
            value: "Paid",
        },
        {
            name: "Pending",
            count: vendorOrders?.filter((p) => p.status === "Pending").length ?? 0,
            value: "Pending",
        },
        {
            name: "In Production",
            count: vendorOrders?.filter((p) => p.status === "InProduction").length ?? 0,
            value: "InProduction",
        },
        {
            name: "Ready to Ship",
            count: vendorOrders?.filter((p) => p.status === "ReadyToShip").length ?? 0,
            value: "ReadyToShip",
        },
        {
            name: "Confirmed",
            count: vendorOrders?.filter((p) => p.status === "Confirmed").length ?? 0,
            value: "Confirmed",
        },
    ]

    const filteredOrders = vendorOrders?.filter(
        (order) => order.status === activeTab
    )

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="space-y-5 sm:space-y-9 md:space-y-13 lg:space-y-17">
            {/* ================= TABS ================= */}
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* ================= TABLE ================= */}
            <OrderTable orders={filteredOrders || []} activeTab={activeTab} />
        </div>
    )
}

export default Orders