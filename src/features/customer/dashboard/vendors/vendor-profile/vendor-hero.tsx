import Image from "next/image"

const TIER_STYLES: Record<string, string> = {
    "Gold tier": "bg-[#E2D5BE] text-[#8B6914]",
    "Silver tier": "bg-[#E8E8E8] text-[#525252]",
}

type Props = {
    bannerSrc: string
    initials: string
    tier: string
    location: string
    years: string
    name: string
}

const VendorHero = ({ bannerSrc, initials, tier, location, years, name }: Props) => {
    return (
        <div>
            {/* Banner image with overlapping avatar */}
            <div className="relative w-full" style={{ height: "clamp(200px, 32vw, 380px)" }}>
                <Image src={bannerSrc} alt={name} fill className="object-cover object-top" />
                <div className="absolute bottom-0 left-4 sm:left-8 md:left-12 lg:left-16 xl:left-20 translate-y-1/2 z-10">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px] rounded-full bg-[#3D2D1A] border-2 border-white shadow-md flex items-center justify-center">
                        <span className="text-white font-medium text-sm sm:text-base md:text-lg">{initials}</span>
                    </div>
                </div>
            </div>

            {/* Info row + name */}
            <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-10 sm:pt-12 md:pt-14 pb-4 sm:pb-5 md:pb-6">
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mb-2 sm:mb-3">
                    <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-[100px] font-medium ${TIER_STYLES[tier] ?? "bg-[#E8E8E8] text-[#525252]"}`}>
                        {tier}
                    </span>
                    <div className="flex items-center gap-1 text-[#737373]">
                        <Image src="/svgs/location-icon.svg" alt="location" width={12} height={12} />
                        <span className="text-[10px] sm:text-xs">{location}</span>
                    </div>
                    <span className="text-[#737373] text-[10px] sm:text-xs">· {years} years</span>
                </div>
                <h1 className="font-garamond text-[#262626] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {name}
                </h1>
            </div>
        </div>
    )
}

export default VendorHero
