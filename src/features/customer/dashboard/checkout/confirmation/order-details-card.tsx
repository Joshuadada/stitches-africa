import Image from "next/image"
import { StaticImageData } from "next/image"

type LineItem = {
    label: string
    amount: string
}

type Props = {
    orderNumber: string
    estimatedArrival: string
    productImage: string | StaticImageData
    productName: string
    productSize: string
    productPrice: string
    lineItems: LineItem[]
    total: string
}

const META_LABEL = "text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase"
const META_VALUE = "text-[#262626] font-semibold text-sm sm:text-base"

const OrderDetailsCard = ({
    orderNumber,
    estimatedArrival,
    productImage,
    productName,
    productSize,
    productPrice,
    lineItems,
    total,
}: Props) => {
    return (
        <div className="border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 md:p-7 flex flex-col gap-5 sm:gap-6">
            {/* Order number */}
            <div className="flex flex-col gap-1">
                <p className={META_LABEL}>Order Number</p>
                <p className={META_VALUE}>{orderNumber}</p>
            </div>

            {/* Estimated arrival */}
            <div className="flex flex-col gap-1">
                <p className={META_LABEL}>Estimated Arrival</p>
                <p className={META_VALUE}>{estimatedArrival}</p>
            </div>

            <hr className="border-[#E8E8E8]" />

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
                    <p className="text-[#A3A3A3] text-[8px] sm:text-[10px]">Size: {productSize}</p>
                    <p className="text-[#B5894A] font-semibold text-sm sm:text-base">{productPrice}</p>
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
                <p className="text-[#262626] text-xs sm:text-sm font-semibold">Total</p>
                <p className="text-[#B5894A] text-base sm:text-lg font-bold">{total}</p>
            </div>
        </div>
    )
}

export default OrderDetailsCard
