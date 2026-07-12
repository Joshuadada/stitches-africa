"use client"

import OrderDetailsCard from "./order-details-card"
import ShippingInfoCard from "./shipping-info-card"

const ORDER = {
    number: "ABC-345-AQU89",
    estimatedArrival: "April 23 – April 30",
    productImage: "/svgs/dummy/product-image-1.svg",
    productName: "Hand-Crafted stitched Ankara tailored Pants",
    productSize: "M",
    productPrice: "₦125,000",
    lineItems: [
        { label: "Subtotal", amount: "₦125,000" },
        { label: "Shipping (DHL Express)", amount: "₦17,500" },
        { label: "Estimated Tax", amount: "₦22,000" },
    ],
    total: "₦164,500",
}

const SHIPPING_ADDRESS = {
    name: "David Manuchim",
    street: "123 Victoria Island",
    city: "Lagos",
    country: "Nigeria",
    postalCode: "50001",
}

/* Gold seal badge with checkmark */
const SealBadge = () => (
    <div className="relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 mx-auto">
        {/* Two rotated rounded squares create an 8-sided seal shape */}
        <div className="absolute inset-0 bg-[#B5894A] rounded-[22%]" />
        <div className="absolute inset-0 bg-[#B5894A] rounded-[22%] rotate-[22.5deg]" />
        {/* Checkmark */}
        <svg
            className="relative z-10"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    </div>
)

const OrderConfirmationPage = () => {
    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16 flex flex-col gap-10 sm:gap-12 md:gap-14">
            {/* Hero: badge + heading + subtext */}
            <div className="flex flex-col items-center gap-4 sm:gap-5 text-center">
                <SealBadge />
                <div className="flex flex-col gap-2 sm:gap-3">
                    <h1 className="font-garamond text-[#262626] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                        Your Order is being Crafted
                    </h1>
                    <p className="text-[#A3A3A3] text-[10px] sm:text-xs md:text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you for shopping on Stitches Africa. We&apos;ve sent a confirmation to your mail
                    </p>
                </div>
            </div>

            {/* Two-column cards */}
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-start">
                {/* Left: order details */}
                <div className="flex-1 w-full">
                    <OrderDetailsCard
                        orderNumber={ORDER.number}
                        estimatedArrival={ORDER.estimatedArrival}
                        productImage={ORDER.productImage}
                        productName={ORDER.productName}
                        productSize={ORDER.productSize}
                        productPrice={ORDER.productPrice}
                        lineItems={ORDER.lineItems}
                        total={ORDER.total}
                    />
                </div>

                {/* Right: shipping info + CTAs */}
                <div className="w-full lg:w-[44%] xl:w-[42%] shrink-0">
                    <ShippingInfoCard address={SHIPPING_ADDRESS} />
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmationPage
