"use client"

import Button from "@/components/shared/button"
import Image from "next/image"
import Link from "next/link"

const TryOnEnd = () => {
    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className="bg-black w-[168]"></div>
            <div className="px-14 sm:px-18 md:px-22 lg:px-26 py-5 sm:py-6 md:py-7 lg:py-8 flex flex-col flex-1 overflow-y-auto">
                <div className="flex flex-col mb-8 sm:mb-12 md:mb-16 lg:mb-20">
                    <Image src={'/svgs/mark-icon.svg'} alt="mark icon" height={116.67} width={116.67} className="mx-auto mb-5 sm:mb-6 md:mb-7 lg:mb-8"></Image>
                    <h2 className="font-garamond font-medium text-center text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-7 md:mb-8 lg:mb-9">You’re all set, David</h2>
                    <p className="mx-auto text-center max-w-[775] text-[#525252] text-sm sm:text-base md:text-lg lg:text-xl">Your account is ready and your AI Try-On photo is saved. Start discovering verified African designers and see pieces on you before you order.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4.5 lg:gap-5.5 mb-14 sm:mb-18 md:mb-22 lg:mb-27">
                    <div className="bg-white py-5 sm:py-6 md:py-7 lg:py-8.5 px-6 sm:px-7 md:px-8 lg:px-9.5 rounded-lg flex flex-col gap-1.5 sm:gap-2.5 md:gap-3.5 lg:gap-4.5">
                        <Image src={'/svgs/sparkle-circle.svg'} alt="sparkle" height={51} width={51}></Image>
                        <h4 className="text-black font-medium text-base sm:text-lg md:text-xl lg:text-2xl">AI Try-On active</h4>
                        <p className="text-[#404040] font-light text-xs sm:text-sm md:text-base lg:text-lg">Tap the button on any product
                            listing to see it on you instantly</p>
                    </div>

                    <div className="bg-white py-5 sm:py-6 md:py-7 lg:py-8.5 px-6 sm:px-7 md:px-8 lg:px-9.5 rounded-lg flex flex-col gap-1.5 sm:gap-2.5 md:gap-3.5 lg:gap-4.5">
                        <Image src={'/svgs/money-circle.svg'} alt="money" height={51} width={51}></Image>
                        <h4 className="text-black font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Payment protection</h4>
                        <p className="text-[#404040] font-light text-xs sm:text-sm md:text-base lg:text-lg">Every order is covered. Funds
                            are only released only when
                            you confirm delivery</p>
                    </div>

                    <div className="bg-white py-5 sm:py-6 md:py-7 lg:py-8.5 px-6 sm:px-7 md:px-8 lg:px-9.5 rounded-lg flex flex-col gap-1.5 sm:gap-2.5 md:gap-3.5 lg:gap-4.5">
                        <Image src={'/svgs/delivery-circle.svg'} alt="delivery" height={51} width={51}></Image>
                        <h4 className="text-black font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Tracked delivery</h4>
                        <p className="text-[#404040] font-light text-xs sm:text-sm md:text-base lg:text-lg">DHL, FedEx, Terminal Africa etc.
                            Full tracking information to your
                            doorstep.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-center">
                    <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3 max-w-[607] w-full'>
                        <p className='font-medium text-sm sm:text-base md:text-lg lg:text-xl text-white'>Start Shopping</p>
                    </Button>

                    <Link href="" className="text-[#525252] font-medium text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer underline">Explore the platform first</Link>
                </div>
            </div>
        </div>
    )
}

export default TryOnEnd