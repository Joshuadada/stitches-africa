export type ShippingOption = {
    id: string
    carrier: string
    description: string
    price: string
    amount: number
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
    {
        id: "dhl",
        carrier: "DHL Express",
        description: "Estimated delivery 3-5 Business Days",
        price: "₦17,500.00",
        amount: 17500,
    },
    {
        id: "terminal",
        carrier: "Terminal Africa",
        description: "Estimated delivery 7-12 Business Days",
        price: "₦9,750.00",
        amount: 9750,
    },
]

type Props = {
    selected: string
    onSelect: (id: string) => void
}

const ShippingMethod = ({ selected, onSelect }: Props) => {
    return (
        <div className="border border-[#E8E8E8] rounded-lg overflow-hidden">
            {SHIPPING_OPTIONS.map((option, idx) => (
                <button
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 cursor-pointer transition ${
                        idx > 0 ? "border-t border-[#E8E8E8]" : ""
                    } ${
                        selected === option.id ? "bg-white" : "bg-white hover:bg-[#FAF7F2]"
                    }`}
                >
                    {/* Radio */}
                    <div
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                            selected === option.id ? "border-[#B5894A]" : "border-[#E8E8E8]"
                        }`}
                    >
                        {selected === option.id && (
                            <div className="h-1.5 w-1.5 rounded-full bg-[#B5894A]" />
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium">
                            {option.carrier}
                        </p>
                        <p className="text-[#A3A3A3] text-[8px] sm:text-[10px] mt-0.5">
                            {option.description}
                        </p>
                    </div>

                    {/* Price */}
                    <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-semibold shrink-0">
                        {option.price}
                    </p>
                </button>
            ))}
        </div>
    )
}

export default ShippingMethod
