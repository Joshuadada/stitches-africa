import { Order } from "."

const OrderTable = ({ orders }: { orders: Order[] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[850]">
                <thead className="rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-[20px]">
                    <tr className="bg-[#B5894A1A] border-b border-[#E7DED2]">
                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8 rounded-tl-lg sm:rounded-tl-xl md:rounded-tl-2xl lg:rounded-tl-[20px]">
                            PRODUCT
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                            CATEGORY
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                            COUNTRY
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                            DATE
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                            STATUS
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8 rounded-tr-lg sm:rounded-tr-xl md:rounded-tr-2xl lg:rounded-tr-[20px]">
                            ACTION
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#EEE6DA]"
                            >
                                {/* PRODUCT */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                                        <div className="relative w-6.5 sm:w-8.5 md:w-10.5 lg:w-12.5 h-5 sm:h-7 md:h-9 lg:h-11 rounded-lg overflow-hidden bg-black shrink-0"></div>

                                        <h3 className="text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                            {order.name}
                                        </h3>
                                    </div>
                                </td>

                                {/* CATEGORY */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                    <span
                                        className={`border text-[8px] sm:text-[10px] md:text-xs lg:text-sm rounded-full px-2.5 py-0.5 whitespace-nowrap ${order.categoryData.className}`}
                                    >
                                        {order.categoryData.label}
                                    </span>
                                </td>

                                {/* COUNTRY */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                    {order.country}
                                </td>

                                {/* DATE */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                    {order.date}
                                </td>

                                {/* STATUS */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {order.status}
                                </td>

                                {/* ACTION */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                    <div className="flex items-center gap-4">
                                        <button className="text-[#B5894A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                                            Edit
                                        </button>

                                        <button className="text-[#B54A4A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className="py-20 text-center text-[#8A7E6E] text-lg"
                            >
                                No orders found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable