"use client"

import Button from "@/shared/components/button"
import Image from "next/image"
import Link from "next/link"

const TryOnHow = () => {
    return (
        <div className='flex flex-col md:flex-row h-full'>
            <div className='max-w-[502] bg-black flex flex-col items-center justify-center p-10 sm:p-12 md:p-14 lg:p-16 overflow-y-auto'>
                <Image src={'/svgs/try-on-shirt.svg'} alt="try on shirt" height={128} width={128} className="mb-5 sm:mb-6 md:mb-7 lg:mb-8"></Image>
                <h2 className="font-garamond font-semibold text-white text-center max-w-[331] text-4xl sm:text-5xl md:text-6xl lg:text-[67px] mb-16 sm:mb-20 md:mb-24 lg:mb-28">AI Virtual Try-On</h2>
                <p className="text-[#A3A3A3] text-lg sm:text-xl md:text-2xl lg:text-[33px] max-w-[361] text-center">Upload one photo of yourself and see how any piece looks on you before you order -
                    across every product on the platform</p>
            </div>

            <div className="flex-1 py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 px-14 sm:px-16 md:px-20 lg:px-24 xl:px-28 overflow-y-auto">
                <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-17">
                    <h2 className="font-garamond text-center text-[#171717] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl">How It Works</h2>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 mb-8 sm:mb-10 md:mb-12 lg:mb-13.5">
                    <div className="flex gap-5 sm:gap-7 md:gap-9 lg:gap-11 bg-white px-10 sm:px-12 md:px-14 py-3 sm:py-4 md:py-5 lg:py-6">
                        <div className="h-14 w-14 bg-black flex items-center justify-center rounded-md sm:rounded-lg md:rounded-xl">
                            <p className="text-white font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl">1</p>
                        </div>

                        <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                            <h4 className="text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl">Upload your photo once</h4>
                            <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base">A clear, well-lit upper body shot saved securely to your account</p>
                        </div>
                    </div>

                    <div className="flex gap-5 sm:gap-7 md:gap-9 lg:gap-11 bg-white px-10 sm:px-12 md:px-14 py-3 sm:py-4 md:py-5 lg:py-6">
                        <div className="h-14 w-14 bg-black flex items-center justify-center rounded-md sm:rounded-lg md:rounded-xl">
                            <p className="text-white font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl">2</p>
                        </div>

                        <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                            <h4 className="text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl">Tap AI Try-On</h4>
                            <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base">On any product detail page across the platform.</p>
                        </div>
                    </div>

                    <div className="flex gap-5 sm:gap-7 md:gap-9 lg:gap-11 bg-white px-10 sm:px-12 md:px-14 py-3 sm:py-4 md:py-5 lg:py-6">
                        <div className="h-14 w-14 bg-black flex items-center justify-center rounded-md sm:rounded-lg md:rounded-xl">
                            <p className="text-white font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl">1</p>
                        </div>

                        <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                            <h4 className="text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl">See the result instantly</h4>
                            <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base">You wearing the piece, before the buy</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 bg-white py-6 sm:py-7 md:py-8 lg:py-9 px-10 sm:px-12 md:px-14 mb-8 sm:mb-10 md:mb-12 lg:mb-13.5">
                    <h5 className="text-black font-semibold text-xs sm:text-sm md:text-base">Your privacy is protected</h5>
                    <p className="text-[#525252] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                        Your photo is used only to generate try-on previews. It is never shared publicly, used for advertising, or shown to vendors. You can delete it from your account at any time.
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-center">
                    <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3'>
                        <p className='font-medium text-sm sm:text-base md:text-lg lg:text-xl text-white'>Add my try-on photo now</p>
                    </Button>

                    <Link href="" className="text-[#525252] font-medium text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer">Skip for now</Link>
                </div>
            </div>
        </div>
    )
}

export default TryOnHow