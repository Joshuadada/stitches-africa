"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ImageGallery from "./image-gallery"
import ProductInfo, { ProductType } from "./product-info"
import ProductTabs from "./product-tabs"
import ShippingCalculator from "./shipping-calculator"
import ProductGallerySection from "./product-gallery-section"
import BespokeSpecifications from "./bespoke-specifications"
import BespokeStyleOptions from "./bespoke-style-options"
import BespokeReferenceImages from "./bespoke-reference-images"
import SizeChartModal from "@/shared/modals/size-chart-modal"
import Button from "@/shared/components/button"
import { bespokeCustomizationSchema, BespokeCustomizationFormData } from "@/schema/customer/bespoke-customization.schema"

const PRODUCT_IMAGES = [
    "/svgs/dummy/product-image-1.svg",
    "/svgs/dummy/product-image-2.svg",
    "/svgs/dummy/product-image-3.svg",
    "/svgs/dummy/product-image-4.svg",
]

const GALLERY_IMAGES = [
    "/svgs/dummy/product-image-5.svg",
    "/svgs/dummy/product-image-6.svg",
    "/svgs/dummy/product-image-1.svg",
    "/svgs/dummy/product-image-2.svg",
]

const PRODUCT_TABS = [
    {
        label: "Product Description",
        value: "description",
        content:
            "Precision-cut. Hand-stitched. Entirely yours. Crafted from premium Ankara fabric sourced across West Africa, each pair is hand-stitched by a verified Nigerian artisan to the highest standard of tailoring.",
    },
    {
        label: "Vendor Process",
        value: "process",
        content:
            "Every piece undergoes a rigorous quality review by the vendor before dispatch. Our vendors follow a multi-step tailoring process — pattern drafting, fabric cutting, hand-stitching, and final quality inspection — ensuring every item meets Stitches Africa standards.",
    },
    {
        label: "Sustainability Impact",
        value: "sustainability",
        content:
            "This product is made using ethically sourced Ankara fabric. Our vendors prioritise local supply chains, minimal waste cutting techniques, and fair artisan wages. By purchasing this item, you directly support the livelihoods of skilled African craftspeople.",
    },
]

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

type Props = {
    productType?: ProductType
}

const ProductPage = ({ productType = "standard" }: Props) => {
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState<string>(PRODUCT_IMAGES[0])
    const [selectedSize, setSelectedSize] = useState("M")
    const [activeTab, setActiveTab] = useState("description")
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false)

    const isBespoke = productType === "bespoke"

    const bespokeForm = useForm<BespokeCustomizationFormData>({
        resolver: zodResolver(bespokeCustomizationSchema),
        mode: "onChange",
        defaultValues: {
            size: "M",
            unit: "cm",
            hips: "",
            length: "",
            sleeves: "",
            waist: "",
            fabricTypes: ["Ankara"],
            fabricNote: "",
            lining: "Fully lined",
            customerNote: "",
            referenceImages: [],
        },
    })

    const onSubmitBespoke = () => {
        router.push('/checkout')
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5">
                <Link href="/" className="text-[#737373] text-[10px] sm:text-xs md:text-sm hover:text-[#262626] transition">
                    Piece of Ruchee
                </Link>
                <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                <span className="text-[#262626] text-[10px] sm:text-xs md:text-sm">Ankara Pants</span>
            </div>

            {/* Hero: gallery + info */}
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
                {/* Left: image gallery */}
                <div className="lg:flex-1">
                    <ImageGallery
                        images={PRODUCT_IMAGES}
                        selectedImage={selectedImage}
                        onSelectImage={(img) => setSelectedImage(img as string)}
                    />
                </div>

                {/* Right: product info + bespoke sections */}
                <div className="lg:w-[42%] xl:w-[40%] shrink-0 flex flex-col gap-0">
                    <ProductInfo
                        title="Hand-Crafted stitched Ankara tailored Pants"
                        price="₦45,000"
                        priceUsd="$30.00"
                        vendorName="Piece of Ruchee"
                        vendorRating={4.0}
                        vendorTier="Gold tier"
                        productType={productType}
                        productionDays={12}
                        stockLeft={3}
                        sizes={SIZES}
                        selectedSize={selectedSize}
                        onSelectSize={setSelectedSize}
                        onAddToCart={() => router.push('/checkout')}
                        onBuyNow={() => router.push('/checkout')}
                        onViewSizeChart={() => setIsSizeChartOpen(true)}
                    />

                    {/* Bespoke-only accordion sections */}
                    {isBespoke && (
                        <FormProvider {...bespokeForm}>
                            <div className="flex flex-col mt-2">
                                <BespokeSpecifications onViewSizeChart={() => setIsSizeChartOpen(true)} />
                                <BespokeStyleOptions />
                                <BespokeReferenceImages />

                                {/* Bespoke CTAs live below the accordions */}
                                <div className="flex gap-3 pt-5 sm:pt-6">
                                    <Button
                                        onClick={bespokeForm.handleSubmit(onSubmitBespoke)}
                                        disabled={!bespokeForm.formState.isValid}
                                        className="flex-1 bg-[#E2D5BE] text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium py-3 hover:bg-[#d4c4a8] transition"
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button
                                        onClick={bespokeForm.handleSubmit(onSubmitBespoke)}
                                        disabled={!bespokeForm.formState.isValid}
                                        className="flex-1 bg-[#262626] text-white text-[10px] sm:text-xs md:text-sm font-medium py-3 hover:bg-black transition"
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        </FormProvider>
                    )}
                </div>
            </div>

            {/* Tabs + shipping */}
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
                <div className="lg:flex-1 min-w-0">
                    <ProductTabs tabs={PRODUCT_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
                <div className="lg:w-[42%] xl:w-[40%] shrink-0">
                    <ShippingCalculator />
                </div>
            </div>

            {/* Product gallery */}
            <ProductGallerySection images={GALLERY_IMAGES} />

            {isSizeChartOpen && (
                <SizeChartModal onClose={() => setIsSizeChartOpen(false)} />
            )}
        </div>
    )
}

export default ProductPage
