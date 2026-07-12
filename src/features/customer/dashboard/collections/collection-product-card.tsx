"use client"

import { useState } from "react"
import Image from "next/image"
import { StaticImageData } from "next/image"
import Link from "next/link"

type Props = {
    id: string
    imgSrc: string | StaticImageData
    title: string
    price: string
    sizes: string[]
}

const CollectionProductCard = ({ id, imgSrc, title, price, sizes }: Props) => {
    const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "")
    const [wishListed, setWishListed] = useState(false)

    return (
        <div className="flex flex-col gap-2.5">
            {/* Image area */}
            <Link href={`/product/${id}`} className="relative block overflow-hidden rounded-md bg-[#F5F5F5] group">
                <Image
                    src={imgSrc}
                    alt={title}
                    height={320}
                    width={280}
                    className="object-cover w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] group-hover:scale-105 transition-transform duration-300"
                />
                {/* Wishlist button */}
                <button
                    onClick={(e) => { e.preventDefault(); setWishListed((v) => !v) }}
                    className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white/80 flex items-center justify-center cursor-pointer hover:bg-white transition"
                >
                    <svg
                        width="14" height="14" viewBox="0 0 24 24"
                        fill={wishListed ? "#B5894A" : "none"}
                        stroke="#B5894A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </Link>

            {/* Card info */}
            <div className="flex flex-col gap-1.5 px-0.5">
                <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium leading-snug line-clamp-1">
                    {title}
                </p>

                {/* Size selector */}
                <div className="relative w-fit">
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="appearance-none text-[#737373] text-[8px] sm:text-[10px] pr-4 bg-transparent cursor-pointer border-none outline-none"
                    >
                        {sizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#737373] text-[8px] pointer-events-none">▼</span>
                </div>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between gap-2">
                    <p className="text-[#262626] font-semibold text-[10px] sm:text-xs md:text-sm">{price}</p>
                    <button className="text-[#B5894A] text-[8px] sm:text-[10px] font-medium underline underline-offset-2 cursor-pointer hover:text-[#a07840] transition whitespace-nowrap">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CollectionProductCard
