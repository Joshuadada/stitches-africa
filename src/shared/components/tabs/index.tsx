"use client"

import { useState } from "react"

type Props = {
    tabs: {
        name: string,
        count: number,
        value: string,
    }[],
    activeTab: string,
    setActiveTab: (tab: string) => void
}

const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
    // const [activeTab, setActiveTab] = useState("all")

    return (
        <div className="border-b border-[#73655133] overflow-x-auto max-w-full">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 min-w-max">
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.value

                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(tab.value)}
                            className={`relative pb-1 sm:pb-1.5 md:pb-2.5 lg:pb-3.5 px-2 text-[10px] sm:text-xl md:text-sm lg:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${isActive
                                ? "text-black"
                                : "text-[#A79A88]"
                                }`}
                        >
                            {tab.name} ({tab.count})

                            {isActive && (
                                <span className="absolute left-0 bottom-0 h-[3] w-full bg-black rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Tabs