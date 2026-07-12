export type AdminTab = {
    label: string
    value: string
}

type Props = {
    tabs: AdminTab[]
    active: string
    onChange: (value: string) => void
}

const AdminTabs = ({ tabs, active, onChange }: Props) => {
    return (
        <div className="border-b border-[#E8E8E8]">
            <div className="flex items-center gap-6 sm:gap-8">
                {tabs.map((tab) => {
                    const isActive = active === tab.value

                    return (
                        <button
                            key={tab.value}
                            onClick={() => onChange(tab.value)}
                            className={`relative pb-3 text-xs sm:text-sm font-medium transition cursor-pointer ${isActive ? "text-[#262626]" : "text-[#A3A3A3] hover:text-[#525252]"
                                }`}
                        >
                            {tab.label}
                            {isActive && (
                                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#262626] rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminTabs
