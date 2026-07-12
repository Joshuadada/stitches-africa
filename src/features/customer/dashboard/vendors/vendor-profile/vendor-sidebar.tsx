const SPECIALITY_STYLES: Record<string, string> = {
    "Ready to wear": "bg-[#D1FAE5] text-[#065F46]",
    "Made to Order": "bg-[#FEDDBB] text-[#92400E]",
    "Bespoke": "bg-[#4B2D7F] text-white",
}

type PerformanceData = {
    averageRating: string
    onTimeDelivery: string
    totalSales: string
    responseTime: string
}

type Props = {
    performance: PerformanceData
    brandStory: string
    specialities: string[]
    email: string
}

const SidebarCard = ({ children }: { children: React.ReactNode }) => (
    <div className="border border-[#E8E8E8] rounded-lg p-4 sm:p-5 bg-white">
        {children}
    </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-[#262626] font-medium text-xs sm:text-sm mb-3 sm:mb-4">{children}</h4>
)

const VendorSidebar = ({ performance, brandStory, specialities, email }: Props) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            {/* Performance */}
            <SidebarCard>
                <SectionTitle>Performance</SectionTitle>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                    {[
                        { label: "Average rating", value: performance.averageRating, gold: false },
                        { label: "On-time delivery", value: performance.onTimeDelivery, gold: true },
                        { label: "Total sales", value: performance.totalSales, gold: false },
                        { label: "Response time", value: performance.responseTime, gold: false },
                    ].map(({ label, value, gold }) => (
                        <div key={label} className="flex items-center justify-between gap-2">
                            <span className="text-[#737373] text-[10px] sm:text-xs">{label}</span>
                            <span className={`text-[10px] sm:text-xs font-medium ${gold ? "text-[#B5894A]" : "text-[#262626]"}`}>
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </SidebarCard>

            {/* Brand Story */}
            <SidebarCard>
                <SectionTitle>Brand Story</SectionTitle>
                <p className="text-[#525252] text-[10px] sm:text-xs leading-relaxed">{brandStory}</p>
            </SidebarCard>

            {/* Specialises in */}
            <SidebarCard>
                <SectionTitle>Specialises in</SectionTitle>
                <div className="flex flex-wrap gap-2">
                    {specialities.map((s) => (
                        <span
                            key={s}
                            className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-[100px] font-medium ${SPECIALITY_STYLES[s] ?? "bg-[#E8E8E8] text-[#262626]"}`}
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </SidebarCard>

            {/* Contact */}
            <SidebarCard>
                <SectionTitle>Contact</SectionTitle>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[#737373] text-[10px] sm:text-xs">Email</span>
                    <p className="text-[#262626] text-[10px] sm:text-xs">{email}</p>
                </div>
            </SidebarCard>
        </div>
    )
}

export default VendorSidebar
