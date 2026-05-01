"use client";

import Button from "@/components/shared/button"
import Image from "next/image"

const EmailVerified = () => {

    return (
        <div className='p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16'>
            <div className='max-w-[412] mx-auto'>
                <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-7 sm:mb-8 md:mb-9 lg:mb-10'>
                    <h2 className='text-center text-[#171717] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond'>Email verified</h2>
                    <p className='text-[10px] sm:text-xs md:text-sm text-center text-black'>Welcome to Stitches Africa</p>
                </div>

                <div className="flex flex-col items-center bg-[#E1F5EE] border border-[#1D9E75] rounded-sm md:rounded-md p-2 sm:p-3 md-p-4 lg:p-5 mb-4 sm:mb-5 md:mb-6 lg:mb-7">
                    <Image src={'/svgs/check-circle.svg'} alt="success icon" height={48} width={48} className="mb-2 sm:mb-3 md:mb-4 lg-mb-5"></Image>
                    <h4 className="text-[#086547] font-extrabold text-[10px] sm:text-xs md:text-sm text-center mb-1 sm:mb-2 md:mb-3">Account activated</h4>
                    <p className="text-center font-semibold text-[8px] sm:text-[10px] md:text-xs text-[#1D9E75] max-w-[289]">Your account is ready. You’re being redirected to
                        your dashboard now. </p>
                </div>

                <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3'>
                    <p className='font-medium text-[10px] sm:text-xs lg:text-sm text-white'>Login now</p>
                </Button>
            </div>
        </div>
    )
}

export default EmailVerified