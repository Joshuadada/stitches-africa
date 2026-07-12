import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
    imgSrc: string | StaticImageData;
    title: string;
    vendorName: string;
    amount: string;
    tier: string;
    rating: number;
    numberOfRatings: number;
    salePercent?: number;
}

const ProductCard = ({ imgSrc, title, vendorName, amount, tier, rating, numberOfRatings, salePercent }: Props) => {
    const stars = Array.from({ length: 5 }, (_, i) => (i < rating ? "★" : "☆")).join("");

    return (
        <Link href="/product/1" className="flex flex-col rounded-lg border border-[#E8E8E8] overflow-hidden bg-white hover:shadow-md transition-shadow">
            <div className="relative">
                <Image
                    src={imgSrc}
                    alt={title}
                    height={280}
                    width={300}
                    className="object-cover w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px]"
                />
                {salePercent && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[8px] sm:text-[10px] px-2 py-0.5 rounded">
                        Sale -{salePercent}%
                    </span>
                )}
                <button
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                >
                    <Image src="/svgs/like-icon.svg" alt="like" height={32} width={32} />
                </button>
            </div>

            <div className="pt-3 pb-4 px-3 flex flex-col gap-1.5">
                <h4 className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium italic">{title}</h4>

                <div className="flex items-center gap-1.5">
                    <p className="text-[#A3A3A3] text-[8px] sm:text-[10px] md:text-xs font-medium uppercase tracking-wide">
                        {vendorName}
                    </p>
                    <span className="h-2 w-2 rounded-full bg-[#B5894A] shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-2">
                    <p className="text-[#525252] font-medium text-[8px] sm:text-[10px] md:text-xs bg-[#F5F5F5] py-1 px-1.5 rounded-[100px]">
                        {tier}
                    </p>
                    <div className="flex items-center gap-0.5">
                        <span className="text-[#737373] text-[8px] sm:text-[10px] md:text-xs">{stars}</span>
                        <span className="text-[#737373] text-[8px] sm:text-[10px] md:text-xs">({numberOfRatings})</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-0.5">
                    <p className="text-[#262626] font-semibold text-[10px] sm:text-xs md:text-sm">{amount}</p>
                    <button
                        className="h-7 w-7 rounded-full bg-[#B5894A] flex items-center justify-center text-white text-base font-medium cursor-pointer hover:bg-[#a07840] transition"
                        onClick={(e) => e.preventDefault()}
                    >
                        +
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
