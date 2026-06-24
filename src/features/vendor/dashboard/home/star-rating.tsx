import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
                const fillPercentage = Math.max(
                    0,
                    Math.min(100, (rating - index) * 100)
                );

                return (
                    <div key={index} className="relative w-4 h-4">
                        {/* Empty Star */}
                        <Star
                            className="absolute inset-0 w-4 h-4 text-[#D4D4D4]"
                            strokeWidth={1.5}
                        />

                        {/* Filled Portion */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fillPercentage}%` }}
                        >
                            <Star
                                className="w-4 h-4 fill-[#B5894A] text-[#B5894A]"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};