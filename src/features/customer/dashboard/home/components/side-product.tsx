import Image from "next/image"

const SideProduct = () => {
    return (
        <div className="flex flex-col rounded-lg border border-[#E8E8E8] overflow-hidden">
            <div className="relative">
                <Image src={"/svgs/dummy/product-image-7.svg"} alt="product image" height={441} width={411} className="w-full"></Image>
                <p className="py-1 px-3 text-[#525252] font-medium text-[8px] sm:text-[10px] md:text-xs border border-[#525252] bg-[#F5F5F5] rounded-[100px] absolute top-4 right-4">Most Viewed</p>
            </div>

            <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-13 pb-4 sm:5 md:pb-6 lg:pb-8 px-2.5 sm:px-3 md:px-3.5 lg:px-4">
                <h4 className="text-[#262626] text-sm sm:text-base md:text-lg lg:text-xl">Ìdánwò Ankara Trousers</h4>
                <div className="flex gap-2 items-end justify-between">
                    <div className="flex items-center gap-3 sm:gap-5 md:gap-7 lg:gap-9">
                        <p className="text-[#525252] font-medium text-[8px] sm:text-[10px] md:text-xs bg-[#F5F5F5] py-1 px-1.5 rounded-[100px]">Gold tier</p>
                        <div className="flex items-center gap-1">
                            <p className="text-[#737373] font-medium text-[8px] sm:text-[10px] md:text-xs">★★★★☆</p>
                            <p className="text-[#737373] font-medium text-[8px] sm:text-[10px] md:text-xs">(24)</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm">N45,000</p>
                        <p className="text-[#8A8A8A] text-[6px] sm:text-[8px] md:text-[10px]">$30.00 USD</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideProduct