import Image from "next/image"
import { Star } from "lucide-react"
import Link from "next/link"

const helpLinks = ["Help", "Track Order", "Delivery & Returns"]
const aboutLinks = ["About us", "Vendor responsibility"]
const moreLinks = ["About us", "Vendor responsibility"]

const socialIcons: { label: string; src: string }[] = [
    {
        label: "Instagram",
        src: "/svgs/socials/instagram.svg",
    },
    {
        label: "LinkedIn",
        src: "/svgs/socials/linkedin.svg",
    },
    {
        label: "X",
        src: "/svgs/socials/twitter.svg",
    },
    {
        label: "TikTok",
        src: "/svgs/socials/tiktok.svg",
    },
    {
        label: "YouTube",
        src: "/svgs/socials/youtube.svg",
    },
]

const Footer = () => {
    return (
        <footer className="bg-[#FAF7F2]">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-16">
                <div className="bg-black px-10 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 md:py-12 lg:py-16 flex flex-col gap-5 md:gap-6 lg:gap-7 w-full md:w-96.25 shrink-0 order-2 md:order-1">
                    <div className="flex items-center gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9">
                        <div className="bg-white rounded-md p-1">
                            <Image src={'/svgs/sa-logo-3.svg'} alt="Stitches Africa logo" height={72} width={72} />
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <p className="text-white text-sm lg:text-base">Stitches<br />Africa</p>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="w-3 h-3 fill-white text-white" strokeWidth={1.5} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="self-start bg-white text-[#262626] text-[10px] sm:text-xs font-medium uppercase px-4 py-2.5 rounded-md cursor-pointer hover:bg-white/90 transition-colors"
                    >
                        Download the app
                    </button>

                </div>

                <div className="flex-1 min-w-0 w-full order-1 md:order-2 px-10 sm:px-12 md:px-[unset] flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-11.5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 md:gap-14 lg:gap-20">
                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6.5">
                            <h5 className="text-black text-base md:text-lg lg:text-xl font-medium uppercase tracking-wide mb-1">Help & Information</h5>
                            <div className="flex flex-col gap-2 md:gap-3">
                                {helpLinks.map((link) => (
                                    <Link key={link} href="#" className="text-black text-xs sm:text-sm hover:underline transition-all">{link}</Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6.5">
                            <h5 className="text-black text-base md:text-lg lg:text-xl font-medium uppercase tracking-wide mb-1">About Stitches</h5>
                            <div className="flex flex-col gap-2 md:gap-3">
                                {aboutLinks.map((link) => (
                                    <Link key={link} href="#" className="text-black text-xs sm:text-sm hover:underline transition-all">{link}</Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6.5">
                            <h5 className="text-black text-base md:text-lg lg:text-xl font-medium uppercase tracking-wide mb-1">More</h5>
                            <div className="flex flex-col gap-2 md:gap-3">
                                {moreLinks.map((link) => (
                                    <Link key={link} href="#" className="text-black text-xs sm:text-sm hover:underline transition-all">{link}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-5.5">
                        {socialIcons.map((icon) => (
                            <Link
                                key={icon.label}
                                href="#"
                                aria-label={icon.label}
                            >
                                <Image src={icon.src} alt={icon.label} width={18.38} height={18.41}></Image>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
