"use client"

import { useState } from "react"

type ShippingOption = {
    id: string
    carrier: string
    duration: string
    price: string
}

const SHIPPING_OPTIONS: ShippingOption[] = [
    { id: "dhl", carrier: "DHL Express", duration: "3-5 Business Days", price: "$30.00" },
    { id: "terminal", carrier: "Terminal Africa", duration: "7-10 Business Days", price: "$20.00" },
]

const ShippingCalculator = () => {
    const [destination, setDestination] = useState("")
    const [selectedOption, setSelectedOption] = useState("dhl")

    return (
        <div className="border border-[#E8E8E8] rounded-lg p-4 sm:p-5 md:p-6 flex flex-col gap-4">
            <h4 className="text-[#262626] font-medium text-xs sm:text-sm md:text-base">
                Estimated Shipping
            </h4>

            {/* Destination input */}
            <div className="relative">
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter Destination (City, Country)"
                    className="w-full border border-[#E8E8E8] rounded-md py-2 pl-3 pr-9 text-[10px] sm:text-xs md:text-sm text-[#262626] placeholder:text-[#A3A3A3] outline-none focus:border-[#262626] transition bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] text-sm">
                    📍
                </span>
            </div>

            {/* Shipping options */}
            <div className="flex flex-col gap-3">
                {SHIPPING_OPTIONS.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        className="flex items-center gap-3 cursor-pointer text-left w-full"
                    >
                        {/* Radio */}
                        <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                                selectedOption === option.id
                                    ? "border-[#B5894A]"
                                    : "border-[#E8E8E8]"
                            }`}
                        >
                            {selectedOption === option.id && (
                                <div className="h-1.5 w-1.5 rounded-full bg-[#B5894A]" />
                            )}
                        </div>

                        {/* Option details */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[#262626] text-[10px] sm:text-xs font-medium">{option.carrier}</p>
                            <p className="text-[#A3A3A3] text-[8px] sm:text-[10px]">{option.duration}</p>
                        </div>

                        <p className="text-[#262626] text-[10px] sm:text-xs font-semibold shrink-0">
                            {option.price}
                        </p>
                    </button>
                ))}
            </div>

            <p className="text-[#A3A3A3] text-[8px] sm:text-[10px] leading-relaxed">
                Shipping costs, import duties or taxes may apply depending on your country. All payments are processed securely.
            </p>
        </div>
    )
}

export default ShippingCalculator
