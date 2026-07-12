"use client"

import Image from "next/image"
import { StaticImageData } from "next/image"

type Props = {
    images: (string | StaticImageData)[]
    selectedImage: string | StaticImageData
    onSelectImage: (img: string | StaticImageData) => void
}

const ImageGallery = ({ images, selectedImage, onSelectImage }: Props) => {
    return (
        <div className="flex gap-2.5 sm:gap-3 md:gap-4">
            {/* Thumbnail strip */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelectImage(img)}
                        className={`w-11 sm:w-13 md:w-15 rounded-md overflow-hidden border-2 cursor-pointer transition shrink-0 ${
                            selectedImage === img
                                ? "border-[#262626]"
                                : "border-[#E8E8E8] hover:border-[#A3A3A3]"
                        }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            height={80}
                            width={56}
                            className="object-cover w-full h-14 sm:h-16 md:h-18"
                        />
                    </button>
                ))}
            </div>

            {/* Main image */}
            <div className="flex-1 rounded-lg overflow-hidden bg-[#F5F5F5]">
                <Image
                    src={selectedImage}
                    alt="Product image"
                    height={560}
                    width={420}
                    className="object-cover w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px]"
                />
            </div>
        </div>
    )
}

export default ImageGallery
