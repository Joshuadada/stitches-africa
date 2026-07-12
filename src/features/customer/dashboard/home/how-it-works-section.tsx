"use client"

import Image from "next/image"
import { useState } from "react"

type Step = {
    number: string
    title: string
    description: string
}

type Audience = "shoppers" | "vendors"

const stepsByAudience: Record<Audience, Step[]> = {
    shoppers: [
        {
            number: "01",
            title: "Discover & Connect",
            description: "Browse verified vendors across the continent. Filter by country, style, or production type (Bespoke or RTW)",
        },
        {
            number: "02",
            title: "Secure Purchase",
            description: "Your payments are held in escrow. Funds are only released once you confirm receipt of your handcrafted pieces.",
        },
        {
            number: "03",
            title: "Global Logistics",
            description: "We handle the complexity of cross-border logistics so you don't have to.",
        },
    ],
    vendors: [
        {
            number: "01",
            title: "List Your Products",
            description: "Showcase your designs and collections to a global diaspora audience.",
        },
        {
            number: "02",
            title: "Get Verified & Paid",
            description: "Get your store verified and receive automatic payouts once orders are confirmed.",
        },
        {
            number: "03",
            title: "Ship With Confidence",
            description: "We handle cross-border logistics so you can focus on your craft.",
        },
    ],
}

const HowItWorksSection = () => {
    const [audience, setAudience] = useState<Audience>("shoppers")
    const steps = stepsByAudience[audience]

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-13 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <h3 className='font-garamond text-center text-black font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl'>How It Works</h3>

            <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 text-xs sm:text-sm">
                <button
                    type="button"
                    onClick={() => setAudience("shoppers")}
                    className={`pb-1 border-b-2 transition-colors cursor-pointer ${audience === "shoppers" ? "border-black text-black font-medium" : "border-transparent text-[#737373]"
                        }`}
                >
                    For Shoppers
                </button>
                <button
                    type="button"
                    onClick={() => setAudience("vendors")}
                    className={`pb-1 border-b-2 transition-colors cursor-pointer ${audience === "vendors" ? "border-black text-black font-medium" : "border-transparent text-[#737373]"
                        }`}
                >
                    For Vendors
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 md:gap-14 lg:gap-21 xl:gap-25 items-center">
                <div className="relative w-full max-w-67 sm:max-w-75 md:max-w-90 lg:w-1/3 lg:max-w-none mx-auto lg:mx-0 overflow-hidden">
                    <Image
                        src="/svgs/dummy/how-it-work.png"
                        alt="How it works"
                        width={362}
                        height={468}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="relative w-full flex-1 flex flex-col gap-8 sm:gap-9 md:gap-10">
                    <div className="absolute left-4.75 top-2 bottom-2 w-px bg-[#E8E8E8]" />

                    {steps.map((step) => (
                        <div key={step.title} className="relative flex gap-4 sm:gap-5 md:gap-6">
                            <span className="relative z-10 shrink-0 w-10 font-garamond text-black text-xl md:text-2xl lg:text-3xl bg-[#FAF7F2]">
                                {step.number}
                            </span>

                            <div className="flex flex-col gap-1 sm:gap-1.5">
                                <h4 className="text-black font-semibold text-base md:text-lg lg:text-xl tracking-wide font-garamond uppercase">
                                    {step.title}
                                </h4>
                                <p className="text-[#000000BF] text-[10px] sm:text-xs md:text-sm max-w-141.5">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HowItWorksSection
