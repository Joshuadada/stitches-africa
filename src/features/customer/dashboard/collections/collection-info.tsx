type Props = {
    vendorName: string
    description: string
}

const CollectionInfo = ({ vendorName, description }: Props) => {
    return (
        <div className="flex flex-col items-center gap-3 sm:gap-4 text-center max-w-2xl mx-auto px-4">
            {/* Vendor badge */}
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#B5894A] flex items-center justify-center shrink-0">
                    <span className="text-white text-[8px] font-bold">{vendorName.charAt(0)}</span>
                </div>
                <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium">{vendorName}</p>
            </div>

            {/* Description */}
            <p className="text-[#737373] text-[10px] sm:text-xs md:text-sm leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export default CollectionInfo
