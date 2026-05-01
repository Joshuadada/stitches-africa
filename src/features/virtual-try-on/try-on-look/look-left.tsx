import Image from "next/image"

const LookLeft = () => {
    return (
        <div className="w-full bg-black overflow-y-auto p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-col items-center justify-center">
                <h2 className="font-garamond font-semibold text-white text-center max-w-[331] text-4xl sm:text-5xl md:text-6xl lg:text-[67px] mb-6 sm:mb-8 md:mb-10 lg:mb-12">AI Virtual Try-On</h2>
                <div className="relative">
                    <Image src={'/svgs/try-on-cloth.svg'} alt="try on cloth" height={615} width={516}></Image>
                    <Image src={'/svgs/mark-icon.svg'} alt="mark icon" height={71.67} width={71.67} className="absolute -right-8 -top-16"></Image>
                </div>
            </div>
            <div className="mt-1 sm:mt-1.5 md:mt-2 flex flex-col gap-2 sm:gap-3 md:gap-4">
                <div className="flex">
                    <div className="bg-white p-1 sm:p-1.5 md:p-2 lg:p-2.5 text-center">
                        <p className="text-black font-medium text-sm sm:text-base md:text-lg lg:text-xl">AI Try-On ready</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-[171] mx-auto relative">
                        <button className="text-white bg-transparent border border-[#737373] rounded-md py-2.5 sm:py-3 md:py-4 lg:py-5 font-medium text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer w-full">Retake</button>
                        <Image src={'/svgs/sparkle-icon.svg'} alt="sparkle icon" height={50} width={52} className="absolute -top-6 -right-5"></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookLeft