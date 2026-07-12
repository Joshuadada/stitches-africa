const segments = [
    { label: "RTW (Ready to Wear)", amount: "₦21.7M", percent: 45, color: "#B5894A" },
    { label: "MTO (Made to Order)", amount: "₦16.9M", percent: 35, color: "#292524" },
    { label: "Bespoke", amount: "₦9.6M", percent: 20, color: "#E8DCC8" },
]

const buildConicGradient = () => {
    let cursor = 0
    const stops = segments.map((segment) => {
        const start = cursor
        cursor += segment.percent
        return `${segment.color} ${start}% ${cursor}%`
    })
    return `conic-gradient(${stops.join(", ")})`
}

const RevenueBreakdownChart = () => {
    return (
        <div className="border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-[#262626] font-medium text-xs sm:text-sm">Revenue breakdown</h3>
                <span className="text-[#A3A3A3] text-[8px] sm:text-[10px]">Total ₦48.2M — by order type</span>
            </div>

            <div className="flex items-center gap-6 sm:gap-8">
                <div
                    className="relative h-32 w-32 sm:h-36 sm:w-36 shrink-0 rounded-full"
                    style={{ background: buildConicGradient() }}
                >
                    <div className="absolute inset-3 sm:inset-4 rounded-full bg-white flex items-center justify-center">
                        <span className="text-[#262626] font-garamond font-medium text-sm sm:text-base">
                            ₦48.2M
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 sm:gap-3">
                    {segments.map((segment) => (
                        <div key={segment.label} className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 rounded-sm shrink-0"
                                style={{ backgroundColor: segment.color }}
                            />
                            <div className="flex flex-col">
                                <span className="text-[#262626] text-[10px] sm:text-xs font-medium">
                                    {segment.label}
                                </span>
                                <span className="text-[#A3A3A3] text-[8px] sm:text-[10px]">
                                    {segment.amount} · {segment.percent}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RevenueBreakdownChart
