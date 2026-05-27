import Image from "next/image"

const StatCards = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <div className="py-2.5 sm:py-3.5 md:py-4.5 lg:py-5.5 px-5 sm:px-6 md:px-7 lg:px-8 border border-[#F8E6CD] bg-[#FFFDF9] rounded-md flex flex-col justify-between">
                <h4 className="text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 lg:mb-1.5">
                    SALES THIS MONTH
                </h4>

                <p className="text-black font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5">
                    N2.4M
                </p>

                <div className="flex items-center gap-1.5">
                    <Image
                        src={"/svgs/arr-up.svg"}
                        alt="up arrow"
                        height={14.16}
                        width={13}
                    />

                    <span className="text-[#1D9E75] text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs">
                        18% vs last month
                    </span>
                </div>
            </div>

            <div className="py-2.5 sm:py-3.5 md:py-4.5 lg:py-5.5 px-5 sm:px-6 md:px-7 lg:px-8 border border-[#F8E6CD] bg-[#FFFDF9] rounded-md flex flex-col justify-between">
                <h4 className="text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 lg:mb-1.5">
                    ACTIVE ORDERS
                </h4>

                <p className="text-black font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5">
                    14
                </p>

                <div className="flex gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4">
                    <div className="flex items-center justify-center">
                        <span className="border-[0.2px] border-[#6EE7B7] bg-[#F0FDF4] text-[#065F46] text-[4px] md:text-[6px] lg:text-[8px] rounded-[20px] py-[2.5px] px-2.5 text-center">
                            RTW
                        </span>
                    </div>

                    <div className="flex items-center justify-center">
                        <span className="border-[0.2px] border-[#93C5FD] bg-[#EFF6FF] text-[#1E3A8A] text-[4px] md:text-[6px] lg:text-[8px] rounded-[20px] py-[2.5px] px-2.5 text-center">
                            MTO
                        </span>
                    </div>

                    <div className="flex items-center justify-center">
                        <span className="border-[0.2px] border-[#C4B5FD] bg-[#F5F3FF] text-[#4C1D95] text-[4px] md:text-[6px] lg:text-[8px] rounded-[20px] py-[2.5px] px-2.5 text-center">
                            Bespoke
                        </span>
                    </div>
                </div>
            </div>

            <div className="py-2.5 sm:py-3.5 md:py-4.5 lg:py-5.5 px-5 sm:px-6 md:px-7 lg:px-8 border border-[#F8E6CD] bg-[#000000] rounded-md flex flex-col justify-between">
                <h4 className="text-[#A3A3A3] text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 lg:mb-1.5">
                    ACTIVE ORDERS
                </h4>

                <p className="text-[#B5894A] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5">
                    N384,000
                </p>

                <p className="text-[#A3A3A3] text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs">
                    Next processing: Mon 7 Apr
                </p>
            </div>

            <div className="py-2.5 sm:py-3.5 md:py-4.5 lg:py-5.5 px-5 sm:px-6 md:px-7 lg:px-8 border border-[#F8E6CD] bg-[#FFFDF9] rounded-md flex flex-col justify-between">
                <h4 className="text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 lg:mb-1.5">
                    AVG REVIEW SCORE
                </h4>

                <div className="flex gap-1 md:gap-1.5 items-start">
                    <Image
                        src={"/svgs/star-icon-2.svg"}
                        alt="star icon"
                        height={24}
                        width={24}
                    />

                    <p className="text-[#B5894A] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5">
                        4.9
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StatCards