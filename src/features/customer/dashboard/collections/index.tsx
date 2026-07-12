"use client"

import { useState } from "react"
import Link from "next/link"
import CollectionHero from "./collection-hero"
import CollectionInfo from "./collection-info"
import CollectionProductGrid from "./collection-product-grid"

const COLLECTION = {
    name: "AK1999",
    vendorName: "Piece of Ruchee",
    heroImage: "/svgs/dummy/collection-dummy-1.svg",
    description:
        "AK1999 is a love letter to the turn of a millennium – bold prints softened by memory, structured cuts that carry the weight of something inherited. Every piece is designed to feel familiar before it feels new; worn-in before it is worn.",
    bundlePrice: "₦235,000",
    totalPages: 68,
}

const DUMMY_PRODUCTS = [
    {
        id: "1",
        imgSrc: "/svgs/dummy/product-image-3.svg",
        title: "Ìmọ́lẹ̀ Linen Shirt",
        price: "₦58,000",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "2",
        imgSrc: "/svgs/dummy/product-image-2.svg",
        title: "Ankara Pants",
        price: "₦38,000",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "3",
        imgSrc: "/svgs/dummy/product-image-5.svg",
        title: "Nma Bespoke Co-ord Set",
        price: "₦90,000",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "4",
        imgSrc: "/svgs/dummy/product-image-1.svg",
        title: "Oge Wrap Dress",
        price: "₦62,000",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "5",
        imgSrc: "/svgs/dummy/product-image-5.svg",
        title: "Nma Bespoke Co-ord Set",
        price: "₦90,000",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "6",
        imgSrc: "/svgs/dummy/product-image-5.svg",
        title: "Nma Bespoke Co-ord Set",
        price: "₦90,000",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
]

const CollectionsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="flex flex-col">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4">
                <Link href="/" className="text-[#737373] text-[10px] sm:text-xs hover:text-[#262626] transition">
                    Home
                </Link>
                <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                <span className="text-[#262626] text-[10px] sm:text-xs">Collections</span>
            </div>

            {/* Hero */}
            <CollectionHero
                imgSrc={COLLECTION.heroImage}
                collectionName={COLLECTION.name}
                vendorName={COLLECTION.vendorName}
            />

            {/* Collection info */}
            <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-10 md:py-12">
                <CollectionInfo
                    vendorName={COLLECTION.vendorName}
                    description={COLLECTION.description}
                />
            </div>

            {/* Products */}
            <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-12 sm:pb-14 md:pb-16">
                <CollectionProductGrid
                    products={DUMMY_PRODUCTS}
                    totalCount={DUMMY_PRODUCTS.length}
                    bundlePrice={COLLECTION.bundlePrice}
                    currentPage={currentPage}
                    totalPages={COLLECTION.totalPages}
                    onPageChange={setCurrentPage}
                    onAddAllToCart={() => {}}
                />
            </div>
        </div>
    )
}

export default CollectionsPage
