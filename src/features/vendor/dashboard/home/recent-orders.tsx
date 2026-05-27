const orders = [
    {
        ref: "SA-00001",
        product: "Àṣà Adire Wrap Dress",
        category: {
            name: "RTW",
            className:
                "border-[#6EE7B7] bg-[#F0FDF4] text-[#065F46]",
        },
        country: "UK",
        status: "New",
        action: "Accept",
    },
    {
        ref: "SA-00002",
        product: "Ìgbọ̀yà Kaftan Set",
        category: {
            name: "MTO",
            className:
                "border-[#93C5FD] bg-[#EFF6FF] text-[#1E3A8A]",
        },
        country: "USA",
        status: "Dispatched",
        action: "Track",
    },
    {
        ref: "SA-00003",
        product: "Àárò Bespoke Agbada",
        category: {
            name: "Bespoke",
            className:
                "border-[#C4B5FD] bg-[#F5F3FF] text-[#4C1D95]",
        },
        country: "Canada",
        status: "Production",
        action: "View",
    },
]

const RecentOrders = () => {
    return (
        <div className="overflow-hidden">
            {/* HEADER */}
            <div className="bg-[#B5894A1A] rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-[20px] p-2.5 sm:p-3.5 md:p-4.5 lg:p-5.5 flex items-center justify-between">
                <h3 className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-black">
                    RECENT ORDERS
                </h3>

                <button className="text-[#B5894A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                    View all
                </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full mx-2.5 sm:mx-3.5 md:mx-4.5 lg:mx-5.5">
                    <thead>
                        <tr className="border-b border-[#E9DFD0]">
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                ORDER REF
                            </th>

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                PRODUCT
                            </th>

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                CATEGORY
                            </th>

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                COUNTRY
                            </th>

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                STATUS
                            </th>

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal py-3 sm:py-4 md:py-5 lg:py-6">
                                ACTION
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#EFE7DA] last:border-none"
                            >
                                <td className="pt-2 sm:pt-4 md:pt-6 ď pr-1 font-garamond text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-black">
                                    {order.ref}
                                </td>

                                <td className="pt-2 sm:pt-4 md:pt-6 ď pr-1 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {order.product}
                                </td>

                                <td className="pt-2 sm:pt-4 md:pt-6 ď pr-1">
                                    <span
                                        className={`border text-[8px] sm:text-[10px] md:text-xs lg:text-sm rounded-full px-4 py-1 ${order.category.className}`}
                                    >
                                        {order.category.name}
                                    </span>
                                </td>

                                <td className="pt-2 sm:pt-4 md:pt-6 ď pr-1 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {order.country}
                                </td>

                                <td className="pt-2 sm:pt-4 md:pt-6 ď pr-1 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {order.status}
                                </td>

                                <td className="pt-2 sm:pt-4 md:pt-6 ď pr-1">
                                    <button className="text-[#B5894A] text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer underline">
                                        {order.action}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentOrders