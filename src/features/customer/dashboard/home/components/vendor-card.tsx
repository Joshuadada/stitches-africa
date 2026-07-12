import Image, { StaticImageData } from "next/image"

export type VendorCardProps = {
    imgSrc: string | StaticImageData;
    title: string;
    location: string;
    years: string;
    tier: string;
    categories: string[];
    rating: string;
    onTime: string;
    sales: string
}

const VendorCard = (props: VendorCardProps) => {
    return (
        <div className="rounded-lg overflow-hidden border border-[#E8E8E8]">
            <Image src={props.imgSrc} alt={props.title} height={154} width={411} className="w-full"></Image>
            <div className="bg-white px-2 md:px-3 lg:px-4 pt-6 sm:pt-8 md:pt-10 lg:pt-13 pb-3 sm:pb-4 md:pb-5 lg:pb-6.5 h-full">
                <div>
                    <div className="flex flex-col gap-0.5 md:gap-1 lg:gap-1.5 mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                        <h4 className="text-[#262626] font-semibold text-sm sm:text-base md:text-lg lg:text-xl font-garamond">{props.title}</h4>
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center gap-1.5">
                                <Image src={'/svgs/location-icon.svg'} alt="location" height={16} width={16}></Image>
                                <p className="text-[#737373] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">{props.location}</p>
                            </div>
                            <div className="h-2 w-2 rounded-full"></div>
                            <p className="text-[#737373] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">{props.years} years</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-[#525252] font-medium text-[8px] sm:text-[10px] md:text-xs bg-[#F5F5F5] py-1 px-1.5 rounded-[100px] flex items-center gap-1 w-22 mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5">
                            <span>{props.tier}</span>
                            <Image src={'/svgs/info-icon.svg'} alt="info icon" height={12} width={12}></Image>
                        </p>

                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 flex-wrap mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                            {
                                props.categories.map((category) => (
                                    <p className="text-[#525252] font-medium text-[8px] sm:text-[10px] md:text-xs bg-[#F5F5F5] py-1.5 px-3 rounded-[100px] flex items-center gap-1" key={category}>
                                        {category}
                                    </p>
                                ))
                            }
                        </div>

                        <hr className="text-[#FAF7F2] mb-1 md:mb-1.5 lg:mb-2" />

                        <div className="grid grid-cols-3 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                            <div className="flex flex-col items-center justify-center border-r border-[#FAF7F2]">
                                <div className="flex items-center gap-1">
                                    <Image src={"/svgs/star-icon.svg"} alt="star icon" height={12} width={12}></Image>
                                    <h4 className="text-black font-medium text-sm md:text-base lg:text-lg">{props.rating}</h4>
                                </div>
                                <p className="text-[#737373] font-medium text-[8px] md:text-[10px] lg:text-xs">Rating</p>
                            </div>

                            <div className="flex flex-col items-center justify-center border-r border-[#FAF7F2]">
                                <div className="flex items-center gap-1">
                                    <Image src={"/svgs/star-icon.svg"} alt="star icon" height={12} width={12}></Image>
                                    <h4 className="text-black font-medium text-sm md:text-base lg:text-lg">{props.onTime}</h4>
                                </div>
                                <p className="text-[#737373] font-medium text-[8px] md:text-[10px] lg:text-xs">On-time</p>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center gap-1">
                                    <Image src={"/svgs/star-icon.svg"} alt="star icon" height={12} width={12}></Image>
                                    <h4 className="text-black font-medium text-sm md:text-base lg:text-lg">{props.sales}</h4>
                                </div>
                                <p className="text-[#737373] font-medium text-[8px] md:text-[10px] lg:text-xs">Sales</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button className="flex items-center justify-center gap-1 border-b cursor-pointer">
                                <span className="text-[#262626] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">View full profile</span>
                                <Image src={"/svgs/arrow-right-2.svg"} alt="arrow" height={16} width={16}></Image>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorCard