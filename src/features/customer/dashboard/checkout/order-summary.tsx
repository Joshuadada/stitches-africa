import Image from "next/image"
import { StaticImageData } from "next/image"
import Button from "@/shared/components/button"

type LineItem = {
    label: string
    amount: string
}

type Props = {
    productImage: string | StaticImageData
    productName: string
    productPrice: string
    lineItems: LineItem[]
    total: string
    onCompletePurchase: () => void
    disabled?: boolean
}

const OrderSummary = ({
    productImage,
    productName,
    productPrice,
    lineItems,
    total,
    onCompletePurchase,
    disabled,
}: Props) => {
    return (
        <div className="border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
            <h3 className="font-garamond text-[#262626] font-medium text-lg sm:text-xl md:text-2xl">
                Order Summary
            </h3>

            {/* Product row */}
            <div className="flex items-start gap-3 sm:gap-4">
                <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-md overflow-hidden bg-[#F5F5F5] shrink-0">
                    <Image
                        src={productImage}
                        alt={productName}
                        height={72}
                        width={72}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium leading-snug">
                        {productName}
                    </p>
                    <p className="text-[#B5894A] font-semibold text-sm sm:text-base">
                        {productPrice}
                    </p>
                </div>
            </div>

            <hr className="border-[#E8E8E8]" />

            {/* Line items */}
            <div className="flex flex-col gap-3">
                {lineItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                        <p className="text-[#737373] text-[10px] sm:text-xs md:text-sm">{item.label}</p>
                        <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium">
                            {item.amount}
                        </p>
                    </div>
                ))}
            </div>

            <hr className="border-[#E8E8E8]" />

            {/* Total */}
            <div className="flex items-center justify-between">
                <p className="text-[#262626] text-xs sm:text-sm md:text-base font-semibold">Total</p>
                <p className="text-[#B5894A] text-sm sm:text-base md:text-lg font-bold">{total}</p>
            </div>

            {/* CTA */}
            <Button
                onClick={onCompletePurchase}
                disabled={disabled}
                className="bg-[#B5894A] text-white text-[10px] sm:text-xs md:text-sm font-medium py-3 sm:py-3.5 hover:bg-[#a07840] transition"
            >
                Complete Purchase
            </Button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className="text-[#A3A3A3] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                    Encrypted &amp; Secured Transaction
                </p>
            </div>
        </div>
    )
}

export default OrderSummary
