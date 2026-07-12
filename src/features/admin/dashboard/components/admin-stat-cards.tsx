import Image from "next/image"

export type AdminStat = {
    label: string
    value: string
    trend?: string
}

const AdminStatCards = ({ stats }: { stats: AdminStat[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="py-4 sm:py-5 px-5 sm:px-6 border border-[#F8E6CD] bg-[#FFFDF9] rounded-md flex flex-col gap-1.5 sm:gap-2"
                >
                    <h4 className="text-[#525252] text-[10px] sm:text-xs font-medium uppercase tracking-wide">
                        {stat.label}
                    </h4>

                    <p className="text-black font-medium text-2xl sm:text-3xl font-garamond">
                        {stat.value}
                    </p>

                    {stat.trend && (
                        <div className="flex items-center gap-1.5">
                            <Image src={"/svgs/arr-up.svg"} alt="up arrow" height={12} width={11} />
                            <span className="text-[#1D9E75] text-[10px] sm:text-xs">{stat.trend}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AdminStatCards
