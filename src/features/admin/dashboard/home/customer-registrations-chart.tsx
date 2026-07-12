const data = [
    { label: "Jan", value: 320 },
    { label: "Feb", value: 480 },
    { label: "March", value: 410 },
]

const MAX = 500
const Y_AXIS_STEPS = [500, 400, 300, 200, 100, 0]

const CustomerRegistrationsChart = () => {
    return (
        <div className="border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-xs sm:text-sm">
                    Monthly customer registrations
                </h3>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#B5894A]" />
                    <span className="text-[#737373] text-[10px] sm:text-xs">New customers</span>
                </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col justify-between text-[#A3A3A3] text-[8px] sm:text-[10px] h-40 sm:h-48 pb-px">
                    {Y_AXIS_STEPS.map((step) => (
                        <span key={step}>{step}</span>
                    ))}
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-end justify-around gap-4 sm:gap-6 h-40 sm:h-48 border-l border-b border-[#E8E8E8] pl-3 sm:pl-4">
                        {data.map((d) => (
                            <div
                                key={d.label}
                                className="flex-1 max-w-14 sm:max-w-16 bg-[#B5894A] rounded-t-sm"
                                style={{ height: `${(d.value / MAX) * 100}%` }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-around gap-4 sm:gap-6 pl-3 sm:pl-4 mt-2">
                        {data.map((d) => (
                            <span
                                key={d.label}
                                className="flex-1 max-w-14 sm:max-w-16 text-center text-[#737373] text-[8px] sm:text-[10px]"
                            >
                                {d.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerRegistrationsChart
