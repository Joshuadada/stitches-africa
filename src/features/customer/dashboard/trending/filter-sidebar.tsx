"use client"

import Button from "@/shared/components/button"

type Props = {
    selectedCategories: string[]
    onCategoryChange: (category: string) => void
    priceRange: [number, number]
    onPriceRangeChange: (range: [number, number]) => void
    selectedLocations: string[]
    onLocationChange: (location: string) => void
    onFilter: () => void
}

const CATEGORIES = ["Ready-to-Wear", "Made-to-Order", "Bespoke"]
const LOCATIONS = ["Nigeria", "Ghana", "International"]

const FilterSidebar = ({
    selectedCategories,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    selectedLocations,
    onLocationChange,
    onFilter,
}: Props) => {
    return (
        <div className="flex flex-col gap-7">
            {/* Category */}
            <div>
                <h4 className="text-[#262626] font-medium text-xs sm:text-sm md:text-base mb-3">
                    Category
                </h4>
                <div className="flex flex-col gap-2.5">
                    {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center gap-2.5 cursor-pointer select-none">
                            <div
                                onClick={() => onCategoryChange(cat)}
                                className={`h-4 w-4 border rounded-sm flex items-center justify-center shrink-0 cursor-pointer transition ${
                                    selectedCategories.includes(cat)
                                        ? "bg-[#262626] border-[#262626]"
                                        : "border-[#A3A3A3] bg-white"
                                }`}
                            >
                                {selectedCategories.includes(cat) && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path
                                            d="M1 4L3.5 6.5L9 1"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="text-[#525252] text-[10px] sm:text-xs md:text-sm">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="text-[#262626] font-medium text-xs sm:text-sm md:text-base mb-3">
                    Price Range
                </h4>
                <input
                    type="range"
                    min={50}
                    max={1000}
                    value={priceRange[1]}
                    onChange={(e) =>
                        onPriceRangeChange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full accent-[#262626] cursor-pointer"
                />
                <div className="flex justify-between mt-1.5">
                    <span className="text-[#737373] text-[10px] sm:text-xs">${priceRange[0]}</span>
                    <span className="text-[#737373] text-[10px] sm:text-xs">
                        ${priceRange[1] >= 1000 ? "1,000+" : priceRange[1]}
                    </span>
                </div>
            </div>

            {/* Location */}
            <div>
                <h4 className="text-[#262626] font-medium text-xs sm:text-sm md:text-base mb-3">
                    Location
                </h4>
                <div className="flex flex-wrap gap-2">
                    {LOCATIONS.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => onLocationChange(loc)}
                            className={`px-3 sm:px-4 py-1.5 rounded-[100px] text-[10px] sm:text-xs md:text-sm border cursor-pointer transition ${
                                selectedLocations.includes(loc)
                                    ? "bg-[#262626] text-white border-[#262626]"
                                    : "bg-white text-[#262626] border-[#E8E8E8] hover:border-[#262626]"
                            }`}
                        >
                            {loc}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter button */}
            <Button
                onClick={onFilter}
                className="bg-[#E2D5BE] text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium py-2 hover:bg-[#d4c4a8] transition"
            >
                Filter
            </Button>
        </div>
    )
}

export default FilterSidebar
