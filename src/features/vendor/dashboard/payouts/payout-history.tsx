

const PayoutHistory = ({ payouts }: { payouts: any[] }) => {
    const toCurrecy = (amount: number, currency: string = "NGN"): string => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency,
        }).format(amount);
    };

    const formatShortDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="overflow-hidden">
            {/* HEADER */}
            <div className="bg-[#B5894A1A] rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-[20px] p-2.5 sm:p-3.5 md:p-4.5 lg:p-5.5 flex items-center justify-between">
                <h3 className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-black">
                    PAYOUT HISTORY
                </h3>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full mx-2.5 sm:mx-3.5 md:mx-4.5 lg:mx-5.5">
                    <thead>
                        <tr className="border-b border-[#E9DFD0]">
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                DATE
                            </th>

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                GROSS
                            </th>

                            {/* <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                PLATFORM MARKUP
                            </th> */}

                            {/* <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                NET PAYOUT
                            </th> */}

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                STATUS
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {payouts.map((payout, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#EFE7DA] last:border-none"
                            >
                                <td className="pt-2 sm:pt-4 md:pt-6 lg:pt-7 pb-2 lg:pb-2.5 pr-1 font-garamond text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-black">
                                    {formatShortDate(payout.periodStart)}
                                </td>

                                <td className="pt-2 sm:pt-4 md:pt-6 lg:pt-7 pb-2 lg:pb-2.5 pr-1 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {toCurrecy(payout.totalAmount)}
                                </td>

                                {/* <td className="pt-2 sm:pt-4 md:pt-6 lg:pt-7 pb-2 lg:pb-2.5 pr-1 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {payout.platformMarkup}
                                </td> */}

                                {/* <td className="pt-2 sm:pt-4 md:pt-6 lg:pt-7 pb-2 lg:pb-2.5 pr-1 text-[#1D9E75] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold">
                                    {payout.netPayout}
                                </td> */}

                                <td className="pt-2 sm:pt-4 md:pt-6 lg:pt-7 pb-2 lg:pb-2.5 pr-1 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {payout.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PayoutHistory