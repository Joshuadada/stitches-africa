import Image from "next/image"
import { StaticImageData } from "next/image"

type Props = {
    images: (string | StaticImageData)[]
}

const ProductGallerySection = ({ images }: Props) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h4 className="text-[#262626] font-medium text-xs sm:text-sm md:text-base">
                    Product Gallery
                </h4>
                <button className="flex items-center gap-1.5 text-[#262626] text-[10px] sm:text-xs underline cursor-pointer hover:text-[#737373] transition">
                    VIEW ALL PHOTOS →
                </button>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="rounded-md overflow-hidden bg-[#F5F5F5]">
                        <Image
                            src={img}
                            alt={`Gallery image ${idx + 1}`}
                            height={120}
                            width={160}
                            className="object-cover w-full h-16 sm:h-20 md:h-24 lg:h-28"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductGallerySection
