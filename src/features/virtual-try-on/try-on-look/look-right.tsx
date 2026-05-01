"use client"

import Button from "@/components/shared/button"
import Image from "next/image"
import Link from "next/link"

const LookRight = () => {
    return (
        <div className='flex flex-col py-8 sm:py-11 md:py-15 lg:py-19 px-12 sm:px-16 md:px-20 lg:px-24.5'>
            <h2 className="font-garamond font-medium text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-10 md:mb-14 lg:mb-18">Looks great, David</h2>
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 mb-16 sm:mb-20 md:mb-28 lg:mb-36">
                <div className='bg-white p-3 sm:p-5 md:p-7 lg:p-9'>
                    <p className='text-[#525252] text-sm sm:text-base md:text-lg lg:text-xl'>
                        This photo will be saved to your account and used to
                        generate AI Virtual Try-On previews across all products.
                        You can update or delete it anytime from My Account.
                    </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 md:p-8 lg:gap-11 bg-[#E1F5EE] py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-12 lg:px-15">
                    <Image src={'/svgs/mark-icon-2.svg'} alt="mark icon" height={24} width={24}></Image>
                    <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-[#086547]">Photo is clear and well-lit</p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 md:p-8 lg:gap-11 bg-[#E1F5EE] py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-12 lg:px-15">
                    <Image src={'/svgs/mark-icon-2.svg'} alt="mark icon" height={24} width={24}></Image>
                    <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-[#086547]">Upper body and shoulder visible</p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 md:p-8 lg:gap-11 bg-[#E1F5EE] py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-12 lg:px-15">
                    <Image src={'/svgs/mark-icon-2.svg'} alt="mark icon" height={24} width={24}></Image>
                    <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-[#086547]">Face clearly visible</p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 md:p-8 lg:gap-11 bg-[#E1F5EE] py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-12 lg:px-15">
                    <Image src={'/svgs/mark-icon-2.svg'} alt="mark icon" height={24} width={24}></Image>
                    <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-[#086547]">Standing straight, front-facing</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-center">
                <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3'>
                    <p className='font-medium text-sm sm:text-base md:text-lg lg:text-xl text-white'>Save photo and continue</p>
                </Button>

                <Link href="" className="text-[#525252] font-medium text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer">Retake photo</Link>
            </div>
        </div>
    )
}

export default LookRight