type PriceSummaryProps = {
    basePrice: number;
    markupPercent?: number;
};

const PriceSummary = ({ basePrice, markupPercent = 20 }: PriceSummaryProps) => {
    const markup = basePrice * (markupPercent / 100);
    const totalPrice = basePrice + markup;

    return (
        <div className="rounded-2xl bg-[#111111] p-6 text-white">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-white/70">Your Base Price</span>
                <span className="text-[#D9A14A] font-medium">
                    ₦{basePrice.toLocaleString()}
                </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-sm text-white/70">
                    Platform Markup ({markupPercent}%)
                </span>
                <span className="text-white/80">₦{markup.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center pt-4">
                <span className="font-semibold">Customer Pays</span>
                <span className="text-xl font-bold">
                    ₦{totalPrice.toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default PriceSummary;