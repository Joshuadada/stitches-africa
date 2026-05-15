"use client"

import Button from '@/shared/components/button'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
    const router = useRouter()

    return (
        <div className='px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
            <div className="relative overflow-hidden bg-[url('/svgs/hero-bg.svg')] bg-cover bg-center px-8 sm:px-12 md:px-16 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24">

                {/* Black overlay */}
                <div className="absolute inset-0 bg-black/40 z-0" />

                {/* Content */}
                <div className='relative z-10 max-w-[606]'>
                    <p className='text-[#E2D5BE] font-medium text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 md:mb-1.5 lg:mb-2'>
                        VERIFIED AFRICAN DEIGNERS
                    </p>

                    <h3 className='font-medium text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 md:mb-4 lg:mb-5'>
                        The Global <br />
                        home for <span>African</span> <br />
                        Craftsmanship
                    </h3>

                    <p className='max-w-[541] text-white font-medium text-[10px] sm:text-xs md:text-sm lg:text-base mb-10 sm:mb-12 md:mb-14 lg:mb-16.5'>
                        Connect with top-tier African vendors. Shop Ready-to-wear,
                        Made-to-Order and Bespoke fashion curated from across the continent
                    </p>

                    <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-center">
                        <Button
                            onClick={() => { }}
                            type='submit'
                            className='bg-transparent border border-white rounded-[100px]! p-2.5 sm:p-3 md:p-4 lg:p-5.5 max-w-[244] w-full'
                        >
                            <p className='font-medium text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-white'>
                                Shop now
                            </p>
                        </Button>

                        <Button
                            onClick={() => router.replace('/vendor/register')}
                            type='submit'
                            className='bg-[#E2D5BE] rounded-[100px]! p-2.5 sm:p-3 md:p-4 lg:p-5.5 max-w-[244] w-full'
                        >
                            <p className='font-medium text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#262626]'>
                                Become a vendor
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection