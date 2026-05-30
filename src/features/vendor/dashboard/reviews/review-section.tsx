import Image from "next/image"

const ratings = [
    { star: 5, value: 92 },
    { star: 4, value: 68 },
    { star: 3, value: 50 },
    { star: 2, value: 32 },
    { star: 1, value: 12 },
]

const ReviewSection = () => {
    return (
        <div className="bg-[#FFFDF9] border border-[#F4ECE1] rounded-3xl p-3 sm:p-4  lg:p-5">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* LEFT */}
                <div className="flex items-center gap-6 lg:min-w-[220]">
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
                        <h2 className="text-3xl sm:text-4px md:text-5xl lg:text-6xl xl:text-[64px] font-garamond text-[#262626] leading-none">
                            4.9
                        </h2>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Image
                                    key={index}
                                    src="/svgs/star-icon-2.svg"
                                    alt="star"
                                    width={16}
                                    height={16}
                                />
                            ))}
                        </div>

                        <p className="text-[#737373] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                            93 Sections
                        </p>
                    </div>

                    <div className="hidden lg:block w-[1] h-32 bg-[#E5E5E5]" />
                </div>

                {/* RIGHT */}
                <div className="flex-1 space-y-1">
                    {ratings.map((item) => (
                        <div
                            key={item.star}
                            className="flex items-center gap-3 sm:gap-5 md:gap-7 lg:gap-9"
                        >
                            <span className="text-[#737373] text-[8px] sm:tex-[10px] md:text-xs lg:text-sm">
                                {item.star}
                            </span>

                            <div className="flex-1 h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#B5894A] rounded-full"
                                    style={{
                                        width: `${item.value}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewSection