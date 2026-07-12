"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "@/shared/components/button"
import VendorCard, { VendorCardProps } from "./components/vendor-card"

const vendorCardData: VendorCardProps[] = [
    {
        imgSrc: "/svgs/dummy/vendor-image-1.svg",
        title: "Adire Couture",
        location: "Ikeja, Lagos, Nigeria",
        years: "5",
        tier: "Gold tier",
        categories: ["Ready to wear", "Made to Order", "Bespoke"],
        rating: "4.9",
        onTime: "100%",
        sales: "401"
    },
    {
        imgSrc: "/svgs/dummy/vendor-image-2.svg",
        title: "Aso Studio",
        location: "Yaounde, Cameron",
        years: "2",
        tier: "Silver tier",
        categories: ["Ready to wear", "Made to Order"],
        rating: "4.4",
        onTime: "95%",
        sales: "562"
    },
    {
        imgSrc: "/svgs/dummy/vendor-image-3.svg",
        title: "Ori Designs",
        location: "Abuja, Nigeria",
        years: "2",
        tier: "Silver tier",
        categories: ["Ready to wear", "Made to Order", "Bespoke"],
        rating: "4.1",
        onTime: "93%",
        sales: "92"
    }
]

const FeatureVendorsSection = () => {
    const router = useRouter()

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-13 flex flex-col gap-4 sm:gap-8 md:gap-12 lg:gap-16">
            <h3 className='font-garamond text-center text-black font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-5 md:mb-7 lg:mb-9'>Featured Vendors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {vendorCardData.map((vendor, index) => (
                    <VendorCard imgSrc={vendor.imgSrc} title={vendor.title} location={vendor.location} years={vendor.years} tier={vendor.tier} categories={vendor.categories} rating={vendor.rating} onTime={vendor.onTime} sales={vendor.sales} key={vendor.title + index} />
                ))}
            </div>
            <div className='flex justify-center'>
                <Button onClick={() => router.push('/vendors')} type='submit' className='bg-transparent py-1.5 px-3.5 max-w-[180] w-full border border-[#A3A3A3] rounded-md flex items-center gap-2'>
                    <p className='text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#262626]'>Browse all vendors</p>
                    <Image src={'/svgs/arrow-right.svg'} alt='arrow' height={16} width={16}></Image>
                </Button>
            </div>
        </div>
    )
}

export default FeatureVendorsSection