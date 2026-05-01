import Image from "next/image"

const InfoSection = () => {
    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="flex flex-col items-center gap-6 sm:gap-10 md:gap-14 lg:gap-16">
                <p className='text-black text-center max-w-[901] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px]'>
                    With Stitches Africa, your customers
                    can discover verified vendors, shop with escrow protection,
                    and receive tracked delivery to their door —
                    wherever they are in the world.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16 md:gap-24 lg:gap-32">
                    <div className="flex items-center gap-3">
                        <Image src={'/svgs/verified-icon.svg'} alt="verified icon" height={45} width={45}></Image>
                        <div>
                            <h4 className="font-bold text-[10px] sm:text-xs md:text-sm text-black">Verified Vendors</h4>
                            <p className="text-black text-[6px] md:text-[8px]">Quality & authenticity guaranteed</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image src={'/svgs/payment-icon.svg'} alt="payment icon" height={45} width={45}></Image>
                        <div>
                            <h4 className="font-bold text-[10px] sm:text-xs md:text-sm text-black">Secured Payments</h4>
                            <p className="text-black text-[6px] md:text-[8px]">Your funds are safe until delivery</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image src={'/svgs/delivery-icon.svg'} alt="payment icon" height={45} width={45}></Image>
                        <div>
                            <h4 className="font-bold text-[10px] sm:text-xs md:text-sm text-black">Tracked delivery</h4>
                            <p className="text-black text-[6px] md:text-[8px]">Global shipping with end-end tracking</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection