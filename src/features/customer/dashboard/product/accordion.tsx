"use client"

import { ReactNode, useState } from "react"

type Props = {
    title: string
    children: ReactNode
    defaultOpen?: boolean
}

const Accordion = ({ title, children, defaultOpen = true }: Props) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="border-t border-[#E8E8E8]">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center justify-between w-full py-3 sm:py-4 cursor-pointer"
            >
                <p className="text-[#262626] text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                    {title}
                </p>
                <span
                    className={`text-[#737373] text-xs transition-transform duration-200 ${
                        isOpen ? "rotate-0" : "rotate-180"
                    }`}
                >
                    ∧
                </span>
            </button>

            {isOpen && (
                <div className="pb-4 sm:pb-5 flex flex-col gap-4">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Accordion
