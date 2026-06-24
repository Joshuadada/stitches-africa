"use client"

import { useEffect, useState } from "react"
import ProductTable from "./product-table"
import Tabs from "@/shared/components/tabs"
import { useVendorHeaderStore } from "@/store/vendor-header"
import { showToast } from "@/utils/toast"
import { useVendorProducts } from "@/hooks/api/vendor/useVendorProducts"
import Loader from "@/shared/components/loader"
import { CollectionTable } from "./collection-table"
import { useVendorCollections } from "@/hooks/api/vendor/useVendorCollections"

const Products = () => {
    const [activeTab, setActiveTab] = useState("all")
    const { setVendorHeader } = useVendorHeaderStore()

    const {
        data: vendorProducts,
        isLoading: isProductsLoading,
        error: productsError,
    } = useVendorProducts();

    const {
        data: vendorCollections,
        isLoading: isCollectionsLoading,
        error: collectionsError,
    } = useVendorCollections()

    useEffect(() => {
        if (productsError) {
            showToast({
                type: "error",
                title: "Error",
                message: productsError.message,
            });
        }

        if (collectionsError) {
            showToast({
                type: "error",
                title: "Error",
                message: collectionsError.message,
            });
        }
    }, [productsError, collectionsError]);

    useEffect(() => {
        setVendorHeader({
            title: "Product Management"
        })
    }, [])

    const tabs = [
        {
            name: "All Products",
            count: vendorProducts?.length ?? 0,
            value: "all",
        },
        {
            name: "Ready to Wear",
            count: vendorProducts?.filter((p) => p.listingType === "ReadyToWear").length ?? 0,
            value: "ReadyToWear",
        },
        {
            name: "Made to Order",
            count: vendorProducts?.filter((p) => p.listingType === "MadeToOrder").length ?? 0,
            value: "MadeToOrder",
        },
        {
            name: "Bespoke",
            count: vendorProducts?.filter((p) => p.listingType === "Bespoke").length ?? 0,
            value: "Bespoke",
        },
        {
            name: "Collections",
            count: vendorCollections?.length ?? 0,
            value: "Collections",
        },
    ]

    const filteredProducts =
        activeTab === "all"
            ? vendorProducts
            : vendorProducts?.filter(
                (product) => product.listingType === activeTab
            )

    if (isProductsLoading || isCollectionsLoading) {
        return <Loader />;
    }

    return (
        <div className="space-y-5 sm:space-y-9 md:space-y-13 lg:space-y-17">
            {/* ================= TABS ================= */}
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {
                activeTab === "Collections" ? (
                    <CollectionTable collections={vendorCollections || []} />
                ) : (
                    <ProductTable products={filteredProducts || []} />
                )
            }
        </div>
    )
}

export default Products