"use client"

type Tab = {
    label: string
    value: string
    content: string
}

type Props = {
    activeTab: string
    onTabChange: (tab: string) => void
    tabs: Tab[]
}

const ProductTabs = ({ activeTab, onTabChange, tabs }: Props) => {
    const active = tabs.find((t) => t.value === activeTab)

    return (
        <div className="flex flex-col gap-5 sm:gap-6">
            {/* Tab bar */}
            <div className="border-b border-[#E8E8E8]">
                <div className="flex items-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.value
                        return (
                            <button
                                key={tab.value}
                                onClick={() => onTabChange(tab.value)}
                                className={`relative pb-2.5 sm:pb-3 text-[10px] sm:text-xs md:text-sm whitespace-nowrap cursor-pointer transition ${
                                    isActive ? "text-[#262626] font-medium" : "text-[#A3A3A3] hover:text-[#737373]"
                                }`}
                            >
                                {tab.label}
                                {isActive && (
                                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#262626] rounded-full" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Tab content */}
            {active && (
                <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm leading-relaxed max-w-2xl">
                    {active.content}
                </p>
            )}
        </div>
    )
}

export default ProductTabs
