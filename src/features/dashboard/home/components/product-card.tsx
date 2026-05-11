import Image from "next/image";
import { StaticImageData } from "next/image";

type Props = {
    imgSrc: string | StaticImageData;
    title: string;
    amount: string;
    tier: string;
    rating: number;
    numberOfRatings: number;
}

const ProductCard = ({imgSrc, title, amount, tier, rating, numberOfRatings}:Props) => {
  return (
    <div className="flex flex-col rounded-lg border border-[#E8E8E8] overflow-hidden">
        <div className="relative">
            <Image src={imgSrc} alt={title} height={160} width={220} className="object-cover w-full"></Image>
            <Image src={'/svgs/like-icon.svg'} alt="like icon" height={34} width={34} className="absolute top-5 right-2"></Image>
        </div>

        <div className="pt-2.5 sm:pt-3 md:pt-3.5 lg:pt-4 pb-3.5 sm:pb-4 md:pb-5.5 lg:pb-6 px-2 sm:px-2.5 md:px-3 lg:px-3.5">
            <h4 className="text-[#262626] text-[10px] sm:text-xs md:text-sm">{title}</h4>
            <div className="flex items-center justify-between gap-2">
                <p className="text-[#A3A3A3] font-medium text-[8px] sm:text-[10px] md:text-xs">{amount}</p>
                <Image src={'/svgs/add-icon.svg'} alt="add icon" height={26} width={26}></Image>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className="text-[#525252] font-medium text-[8px] sm:text-[10px] md:text-xs bg-[#F5F5F5] py-1 px-1.5 rounded-[100px]">{tier}</p>
                <div className="flex items-center gap-1">
                    <p className="text-[#737373] font-medium text-[8px] sm:text-[10px] md:text-xs">★★★★☆</p>
                    <p className="text-[#737373] font-medium text-[8px] sm:text-[10px] md:text-xs">({numberOfRatings})</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard