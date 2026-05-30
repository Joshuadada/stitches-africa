"use client"

import { useEffect, useState } from "react"
import ProductTable from "./product-table"
import Tabs from "@/shared/components/tabs"
import { useVendorHeaderStore } from "@/store/vendor-header"

const tabs = [
    {
        name: "All Products",
        count: 12,
        value: "all",
    },
    {
        name: "Ready to Wear",
        count: 6,
        value: "rtw",
    },
    {
        name: "Made to Order",
        count: 4,
        value: "mto",
    },
    {
        name: "Bespoke",
        count: 2,
        value: "bespoke",
    },
]

const products = [
    {
        id: "product-1",
        name: "Àṣà Adire Wrap Dress",
        category: "rtw",
        categoryData: {
            label: "RTW",
            className:
                "border-[#6EE7B7] bg-[#F0FDF4] text-[#065F46]",
        },
        price: "N38,500",
        customerFees: "N46,200",
        stock: 12,
        status: "Active",
    },
    {
        id: "product-2",
        name: "Ìgbọ̀yà Kaftan Set",
        category: "mto",
        categoryData: {
            label: "MTO",
            className:
                "border-[#93C5FD] bg-[#EFF6FF] text-[#1E3A8A]",
        },
        price: "N65,000",
        customerFees: "N78,500",
        stock: 8,
        status: "Active",
    },
    {
        id: "product-3",
        name: "Àárò Bespoke Agbada",
        category: "bespoke",
        categoryData: {
            label: "Bespoke",
            className:
                "border-[#C4B5FD] bg-[#F5F3FF] text-[#4C1D95]",
        },
        price: "N120,000",
        customerFees: "N145,000",
        stock: 4,
        status: "Active",
    },
]

export type Product = {
    id: string,
    name: string,
    category: string,
    categoryData: {
        label: string,
        className: string,
    },
    price: string,
    customerFees: string,
    stock: number,
    status: string,
}

const Products = () => {
    const [activeTab, setActiveTab] = useState("all")
    const { setVendorHeader } = useVendorHeaderStore()

    useEffect(() => {
        setVendorHeader({
            title: "Product Management"
        })
    }, [])

    const filteredProducts =
        activeTab === "all"
            ? products
            : products.filter(
                (product) => product.category === activeTab
            )

    return (
        <div className="space-y-5 sm:space-y-9 md:space-y-13 lg:space-y-17">
            {/* ================= TABS ================= */}
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* ================= TABLE ================= */}
            <ProductTable products={filteredProducts} />
        </div>
    )
}

export default Products