import Button from "@/shared/components/button"

export type ProductType = "standard" | "bespoke"

type Props = {
    title: string
    price: string
    priceUsd?: string
    vendorName: string
    vendorRating: number
    vendorTier: string
    productType?: ProductType
    productionDays?: number
    stockLeft: number
    sizes: string[]
    selectedSize: string
    onSelectSize: (size: string) => void
    onAddToCart: () => void
    onBuyNow: () => void
    onViewSizeChart: () => void
}

const ProductInfo = ({
    title,
    price,
    priceUsd,
    vendorName,
    vendorRating,
    vendorTier,
    productType = "standard",
    productionDays = 12,
    stockLeft,
    sizes,
    selectedSize,
    onSelectSize,
    onAddToCart,
    onBuyNow,
    onViewSizeChart,
}: Props) => {
    const filledStars = "★".repeat(Math.floor(vendorRating))
    const emptyStars = "☆".repeat(5 - Math.floor(vendorRating))
    const isBespoke = productType === "bespoke"

    return (
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            {/* Title */}
            <h1 className="font-garamond text-[#262626] font-medium text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-tight">
                {title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
                <p className="text-[#262626] font-semibold text-lg sm:text-xl md:text-2xl">{price}</p>
                {priceUsd && (
                    <p className="text-[#A3A3A3] text-[10px] sm:text-xs">{priceUsd} USD</p>
                )}
            </div>

            {/* AI Virtual Try-On */}
            <div className="flex flex-col gap-1.5">
                <button className="w-full bg-[#E2D5BE] text-[#262626] flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium cursor-pointer hover:bg-[#d4c4a8] transition">
                    <span>👁</span>
                    <span>AI Virtual Try-on</span>
                </button>
                <p className="text-center text-[#A3A3A3] text-[8px] sm:text-[10px]">
                    No try-on required.{" "}
                    <a href="#" className="text-[#262626] underline hover:text-[#737373] transition">
                        Add one in My Account
                    </a>
                </p>
            </div>

            {/* Vendor row */}
            <button className="flex items-center gap-3 py-2.5 px-3 border border-[#E8E8E8] rounded-lg w-full cursor-pointer hover:border-[#A3A3A3] transition text-left">
                <div className="h-8 w-8 rounded-full bg-[#E2D5BE] flex items-center justify-center shrink-0">
                    <span className="text-[#262626] text-[10px] font-semibold">{vendorName.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium truncate">{vendorName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[#737373] text-[8px] sm:text-[10px]">
                            {filledStars}{emptyStars} {vendorRating.toFixed(1)}
                        </span>
                        <span className="bg-[#B5894A] text-white text-[6px] sm:text-[8px] px-1.5 py-0.5 rounded-[100px] shrink-0">
                            {vendorTier}
                        </span>
                    </div>
                </div>
                <span className="text-[#A3A3A3] text-base shrink-0">›</span>
            </button>

            {isBespoke ? (
                /* Bespoke: MADE TO ORDER badge + production time */
                <div className="flex items-center justify-between">
                    <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#262626]">
                        Made to Order
                    </span>
                    <span className="flex items-center gap-1 text-[#737373] text-[8px] sm:text-[10px]">
                        🕐 {productionDays} days production time
                    </span>
                </div>
            ) : (
                /* Standard: size selector + CTAs */
                <>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[#262626] text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                                Select Size
                            </p>
                            <button
                                onClick={onViewSizeChart}
                                className="text-[#262626] text-[8px] sm:text-[10px] md:text-xs underline hover:text-[#737373] transition cursor-pointer"
                            >
                                View Size chart
                            </button>
                        </div>

                        {stockLeft <= 5 && (
                            <p className="text-red-500 text-[8px] sm:text-[10px]">Only {stockLeft} stocks left</p>
                        )}

                        <div className="flex items-center gap-2 flex-wrap">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => onSelectSize(size)}
                                    className={`h-8 w-10 sm:h-9 sm:w-11 md:h-10 md:w-12 flex items-center justify-center rounded text-[8px] sm:text-[10px] md:text-xs border cursor-pointer transition ${
                                        selectedSize === size
                                            ? "bg-[#262626] text-white border-[#262626]"
                                            : "bg-white text-[#262626] border-[#E8E8E8] hover:border-[#262626]"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        <p className="text-[#A3A3A3] text-[8px] sm:text-[10px] italic">
                            Please note this is an AI suggestion size.
                        </p>
                    </div>

                    <div className="flex gap-3 mt-1">
                        <Button
                            onClick={onAddToCart}
                            className="flex-1 bg-[#E2D5BE] text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium py-3 hover:bg-[#d4c4a8] transition"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            onClick={onBuyNow}
                            className="flex-1 bg-[#262626] text-white text-[10px] sm:text-xs md:text-sm font-medium py-3 hover:bg-black transition"
                        >
                            Buy Now
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductInfo
