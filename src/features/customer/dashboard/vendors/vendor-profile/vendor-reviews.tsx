import Button from "@/shared/components/button"

export type VendorReview = {
    id: string
    initials: string
    avatarBg: string
    name: string
    date: string
    location: string
    purchasedItem: string
    size: string
    rating: number
    text: string
}

const RATING_FILTERS = ["All reviews", "★★★★★", "★★★★", "★★"]

const RATING_BARS = [
    { stars: 5, pct: 85 },
    { stars: 4, pct: 55 },
    { stars: 3, pct: 20 },
    { stars: 2, pct: 10 },
    { stars: 1, pct: 5 },
]

const StarRow = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} width="14" height="14" viewBox="0 0 12 12" fill={s <= count ? "#B5894A" : "#E8E8E8"}>
                <path d="M6 1.5L7.39 4.31L10.5 4.77L8.25 6.97L8.78 10.07L6 8.62L3.22 10.07L3.75 6.97L1.5 4.77L4.61 4.31L6 1.5Z" />
            </svg>
        ))}
    </div>
)

type Props = {
    totalReviews: number
    overallRating: number
    ratingCount: number
    reviews: VendorReview[]
    activeFilter: string
    onFilterChange: (f: string) => void
}

const VendorReviews = ({ totalReviews, overallRating, ratingCount, reviews, activeFilter, onFilterChange }: Props) => {
    return (
        <div className="flex flex-col gap-6 sm:gap-8 pt-8 sm:pt-10 mt-6 sm:mt-8 border-t border-[#E8E8E8]">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <h2 className="font-garamond text-[#262626] font-medium text-xl sm:text-2xl md:text-3xl">
                    Customer reviews
                </h2>
                <span className="text-[#737373] text-[10px] sm:text-xs shrink-0">{totalReviews} reviews total</span>
            </div>

            {/* Rating overview */}
            <div className="flex items-start gap-6 sm:gap-8 md:gap-12">
                {/* Big number + stars */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <span className="font-garamond text-[#262626] font-medium text-4xl sm:text-5xl md:text-6xl leading-none">
                        {overallRating}
                    </span>
                    <StarRow count={Math.round(overallRating)} />
                    <span className="text-[#737373] text-[10px] sm:text-xs">{ratingCount} reviews</span>
                </div>

                {/* Rating bars */}
                <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 justify-center py-1">
                    {RATING_BARS.map(({ stars, pct }) => (
                        <div key={stars} className="flex items-center gap-2 sm:gap-2.5">
                            <span className="text-[#737373] text-[10px] sm:text-xs w-3 text-right shrink-0">{stars}</span>
                            <div className="flex-1 bg-[#E8E8E8] rounded-full h-1.5">
                                <div
                                    className="bg-[#B5894A] h-1.5 rounded-full transition-all"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
                {RATING_FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={`px-3 sm:px-4 py-1.5 rounded-[100px] text-[10px] sm:text-xs border cursor-pointer transition ${
                            activeFilter === f
                                ? "bg-[#262626] text-white border-[#262626]"
                                : "bg-white text-[#262626] border-[#E8E8E8] hover:border-[#262626]"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Review list */}
            <div className="flex flex-col gap-6 sm:gap-8 divide-y divide-[#F5F5F5]">
                {reviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-3 pt-6 first:pt-0">
                        <div className="flex items-start gap-3">
                            <div
                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: review.avatarBg }}
                            >
                                <span className="text-white text-[10px] sm:text-xs font-medium">{review.initials}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[#262626] text-xs sm:text-sm font-medium">{review.name}</span>
                                <span className="text-[#737373] text-[10px] sm:text-xs">
                                    {review.date} · {review.location}
                                </span>
                                <span className="text-[#737373] text-[10px] sm:text-xs">
                                    Purchased: {review.purchasedItem} · Size: {review.size}
                                </span>
                            </div>
                        </div>
                        <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm leading-relaxed">
                            {review.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center">
                <Button
                    onClick={() => {}}
                    className="bg-transparent border border-[#A3A3A3] text-[#262626] text-[10px] sm:text-xs font-medium py-2 w-full max-w-sm tracking-widest hover:bg-[#F5F5F5] transition"
                >
                    LOAD MORE REVIEWS
                </Button>
            </div>
        </div>
    )
}

export default VendorReviews
