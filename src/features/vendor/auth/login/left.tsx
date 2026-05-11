import Image from "next/image"

const Left = () => {
    return (
        <div className="bg-[url('/svgs/vendor-auth-bg.svg')] bg-cover p-7 sm:p-9 md:p-11 lg:p-13 h-full flex flex-col justify-between gap-12 sm:gap-20 md:gap-28 lg:gap-36 overflow-y-auto">
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5">
                <Image src={"/svgs/sa-logo.svg"} alt="logo" height={85} width={85} />
                <div>
                    <h3 className="text-[#FAF7F2] font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl font-garamond">Stitches Africa</h3>
                    <p className="text-[#C8C0B5] font-medium text-[10px] sm:text-xs md:text-sm lg:text-base">VENDOR PORTAL</p>
                </div>
            </div>

            <div className="ml-3 sm:ml-4 md:ml-5 lg:ml-6.5">
                <div className="flex mb-5 sm:mb-6 md:mb-7 lg:mb-8.5">
                    <p className="text-[#B5894A] bg-[#B5894A33] border border-[#B5894A] px-5 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-5 rounded-[20] font-medium text-[10px] sm:text-xs md:text-sm lg:text-base">CAC- Verified sellers only</p>
                </div>

                <h2 className="text-white font-garamond font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[64px] mb-1 sm:mb-2 md:mb-3 lg:mb-4">Craft. Create. <br /> <span className="text-[#B5894A] italic">Connect</span></h2>

                <p className="text-[#C8C0B5] text-[10px] sm:text-xs md:text-sm lg:text-base mb-5 sm:mb-6 md:mb-7 lg:mb-8.5">
                    List your ready-to-wear, made-to-order, and bespoke pieces on Africa's most trusted cross-border fashion marketplace. Every sale is escrow-protected. Every payout is automatic.
                </p>

                <div className="grid grid-cols-2 items-center justify-between text-[#FAF7F2] gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-[10px] sm:text-xs md:text-sm lg:text-base mb-12 sm:mb-16 md:mb-20 lg:mb-23">
                    <p>Product management</p>
                    <p>Escrow-protected orders</p>
                    <p>Automatic payouts</p>
                    <p>Vendor analytics</p>
                    <p>Badge tier system</p>
                    <p>Discount campaigns</p>
                </div>

                <p className="text-[#A3A3A3] text-[6px] md:text-[10px] lg:text-xs">72 verified Nigerian designers currently active on the platform — Lagos, Abuja, Port Harcourt and beyond</p>
            </div>
        </div>
    )
}

export default Left