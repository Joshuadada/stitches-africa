"use client"

import Image from "next/image"
import { useRef } from "react"
import Button from "@/shared/components/button"
import { useRouter } from "next/navigation"

type CuratedCollection = {
    imgSrc: string
    name: string
    vendor: string
}

const collectionsData: CuratedCollection[] = [
    { imgSrc: "/svgs/dummy/collection-dummy-1.svg", name: "AK1999", vendor: "Piece of Ríchee" },
    { imgSrc: "/svgs/dummy/collection-dummy-2.svg", name: "Tongoro", vendor: "Chika" },
    { imgSrc: "/svgs/dummy/collection-dummy-1.svg", name: "Adire Reborn", vendor: "Aso Studio" },
]

const CuratedCollectionsSection = () => {
    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollNext = () => {
        const container = scrollRef.current
        if (!container) return

        const cardWidth = container.firstElementChild?.clientWidth ?? container.clientWidth
        container.scrollBy({ left: cardWidth + 24, behavior: "smooth" })
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-13 flex flex-col gap-4 sm:gap-8 md:gap-12 lg:gap-16">
            <h3 className='font-garamond text-center text-black font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Curated Collections</h3>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
                >
                    {collectionsData.map((collection, index) => (
                        <div
                            key={collection.name + index}
                            className="relative shrink-0 overflow-hidden snap-start"
                        >
                            <Image
                                src={collection.imgSrc}
                                alt={`${collection.name} by ${collection.vendor}`}
                                width={627}
                                height={531}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-6 md:py-8 lg:py-11 flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9">
                                <h4 className="text-white font-medium text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-garamond">
                                    {collection.name} by {collection.vendor}
                                </h4>
                                <Button onClick={() => router.push(`/collections/${index + 1}`)} className="bg-white w-fit px-3 py-2 rounded-md border border-[#262626] max-w-44.75">
                                    <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium">View Collection</p>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-x-0 top-[45%] -translate-y-1/2 flex flex-col gap-4 pointer-events-none">
                    <div className="border-t-3 border-dotted border-white/80" />
                    <div className="border-t-3 border-dotted border-white/80" />
                    <div className="border-t-3 border-dotted border-white/80" />
                </div>

                <button
                    type="button"
                    onClick={scrollNext}
                    aria-label="Next collection"
                    className="hidden sm:flex absolute right-4 sm:right-8 md:right-12 top-[45%] -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 rounded-full bg-black items-center justify-center cursor-pointer"
                >
                    <Image src={'/svgs/arrow-right-2.svg'} alt="next" height={16} width={16} className="invert" />
                </button>
            </div>
        </div>
    )
}

export default CuratedCollectionsSection
