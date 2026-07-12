"use client"

import { useState } from "react"

type Props = {
    onClose: () => void
}

type Unit = "cm" | "in"

const SIZE_DATA = [
    { size: "XS", bust: [79, 83], waist: [60, 64], hips: [86, 90] },
    { size: "S", bust: [84, 88], waist: [65, 69], hips: [91, 95] },
    { size: "M", bust: [89, 94], waist: [70, 75], hips: [96, 101] },
    { size: "L", bust: [95, 101], waist: [76, 82], hips: [102, 108] },
    { size: "XL", bust: [102, 109], waist: [83, 90], hips: [109, 116] },
    { size: "XXL", bust: [110, 118], waist: [91, 99], hips: [117, 125] },
]

const toInches = (cm: number) => Math.round(cm * 0.394)

const formatRange = (range: [number, number], unit: Unit) => {
    if (unit === "cm") return `${range[0]}–${range[1]}`
    return `${toInches(range[0])}–${toInches(range[1])}`
}

const SizeChartModal = ({ onClose }: Props) => {
    const [unit, setUnit] = useState<Unit>("cm")

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-150 rounded-[10px] bg-white shadow-2xl px-5 sm:px-7 md:px-8 pt-5 sm:pt-6 md:pt-7 pb-6 sm:pb-7 md:pb-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-1.5">
                    <h2 className="font-garamond text-[#262626] font-medium text-xl sm:text-2xl md:text-3xl">
                        Size chart
                    </h2>

                    {/* Unit toggle */}
                    <div className="flex items-center bg-[#F5F5F5] rounded-lg p-1 gap-1">
                        {(["cm", "in"] as Unit[]).map((u) => (
                            <button
                                key={u}
                                type="button"
                                onClick={() => setUnit(u)}
                                className={`px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium cursor-pointer transition ${unit === u
                                    ? "bg-[#262626] text-white"
                                    : "text-[#737373] hover:text-[#262626]"
                                    }`}
                            >
                                {u}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="text-[#A3A3A3] text-[10px] sm:text-xs mb-5 sm:mb-6">
                    Measurements in {unit === "cm" ? "centimetres" : "inches"}
                </p>

                {/* Table */}
                <div className="w-full">
                    {/* Header row */}
                    <div className="grid grid-cols-4 pb-2 mb-1 border-b border-[#8A8175] font-bold">
                        {["SIZE", "BUST", "WAIST", "HIPS"].map((col) => (
                            <p
                                key={col}
                                className="text-[#A3A3A3] text-[8px] sm:text-[10px] font-medium tracking-widest"
                            >
                                {col}
                            </p>
                        ))}
                    </div>

                    {/* Data rows */}
                    {SIZE_DATA.map((row, idx) => (
                        <div
                            key={row.size}
                            className={`grid grid-cols-4 py-3 sm:py-3.5 rounded-md px-1 ${idx % 2 !== 0 ? "bg-[#FAF7F2]" : "bg-white"
                                }`}
                        >
                            <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-semibold">
                                {row.size}
                            </p>
                            <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm">
                                {formatRange(row.bust as [number, number], unit)}
                            </p>
                            <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm">
                                {formatRange(row.waist as [number, number], unit)}
                            </p>
                            <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm">
                                {formatRange(row.hips as [number, number], unit)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <p className="text-[#8A8175] text-[8px] sm:text-[10px] lg:text-xs leading-relaxed mt-5 sm:mt-6">
                    Standard ranges only. For the best made-to-order fit, enter your own measurements using the how-to-measure guide.
                </p>
            </div>
        </div>
    )
}

export default SizeChartModal
