import Image from "next/image"
import { StaticImageData } from "next/image"

type Props = {
    imgSrc: string | StaticImageData
    collectionName: string
    vendorName: string
}

const CollectionHero = ({ imgSrc, collectionName, vendorName }: Props) => {
    return (
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 45vw, 520px)" }}>
            <Image
                src={imgSrc}
                alt={`${collectionName} by ${vendorName}`}
                fill
                className="object-cover object-top"
                priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
                <h1 className="font-garamond text-white font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                    {collectionName} by {vendorName}
                </h1>
            </div>
        </div>
    )
}

export default CollectionHero
