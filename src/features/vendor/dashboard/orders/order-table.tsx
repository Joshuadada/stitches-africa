"use client"

import { useState } from "react"
import AcceptOrderModal from "./accept-order-modal"
import AcceptDispatchModal from "./accept-dispatch-modal"
import RejectOrderModal from "./reject-order-modal"
import { Order } from "@/types/vendor"

const OrderTable = ({ orders, activeTab }: { orders: Order[], activeTab: string }) => {
    const [openAcceptOrderModal, setOpenAcceptOrderModal] = useState(false)
    const [openAcceptDispatchModal, setOpenAcceptDispatchModal] = useState(false)
    const [openRejectModal, setOpenRejectModal] = useState(false)

    const handleCloseModal = () => {
        setOpenAcceptOrderModal(false)
        setOpenAcceptDispatchModal(false)
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full">
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

                            {/* <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                                DATE
                            </th> */}

                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                                STATUS
                            </th>

                            {
                                (activeTab.toLowerCase() === "pending" || activeTab.toLowerCase() === "inproduction") && (
                                    <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8 rounded-tr-lg sm:rounded-tr-xl md:rounded-tr-2xl lg:rounded-tr-[20px]">
                                        ACTION
                                    </th>
                                )
                            }
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
                                                {order.lineItems[0].productName}
                                            </h3>
                                        </div>
                                    </td>

                                    {/* CATEGORY */}
                                    <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                        <span
                                           className={`border border-[#6EE7B7] bg-[#F0FDF4] text-[#065F46] text-[8px] sm:text-[10px] md:text-xs lg:text-sm rounded-full px-2.5 py-0.5 whitespace-nowrap`}
                                        >
                                            {order.orderType}
                                        </span>
                                    </td>

                                    {/* COUNTRY */}
                                    <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                        {order.country}
                                    </td>

                                    {/* DATE */}
                                    {/* <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                        {order.date}
                                    </td> */}

                                    {/* STATUS */}
                                    <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                        {order.status}
                                    </td>

                                    {/* ACTION */}
                                    {
                                        (activeTab.toLowerCase() === "pending" || activeTab.toLowerCase() === "inproduction") && (
                                            <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => {
                                                        if (activeTab.toLowerCase() === "pending") {
                                                            setOpenAcceptOrderModal(true)
                                                        }
                                                        if (activeTab.toLowerCase() === "inproduction") {
                                                            setOpenAcceptDispatchModal(true)
                                                        }
                                                    }} className="text-[#B5894A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                                                        Accept
                                                    </button>

                                                    <button onClick={() => setOpenRejectModal(true)} className="text-[#B54A4A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        )
                                    }
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

            {openAcceptOrderModal && (
                <AcceptOrderModal
                    isPending={false}
                    onClose={handleCloseModal}
                    onSubmit={handleCloseModal}
                    order={{
                        id: "SA-2847",
                        placedDate: "May 30",
                        shipsTo: "Canada",
                        shippingHub: "SA Hub",
                        product: {
                            name: "Àṣà Adire Wrap Dress",
                            qty: 1,
                            price: 78000,
                            isBespoke: true,
                            referenceImages: [""],
                        },
                        measurements: {
                            bust: '36"',
                            waist: '28"',
                            hips: '40"',
                            length: '52"',
                            sleeve: '23"',
                            height: '5\'7"',
                        },
                        customization: {
                            fabric: "Indigo Adire, traditional",
                            lining: "Silk, ivory",
                            customerNote: '"Wedding guest in August. Prefer slightly looser fit at waist."',
                        },
                        timeline: {
                            requiredBy: "Jul 14, 2026",
                            daysRemaining: 45,
                            suggestedProduction: "14–18 days",
                        },
                        payout: {
                            subtotal: 78000,
                            markupPercent: 20,
                            markupAmount: 15600,
                            total: 93600,
                        }
                    }}
                />
            )}

            {openAcceptDispatchModal && (
                <AcceptDispatchModal
                    isPending={false}
                    onClose={handleCloseModal}
                    onSubmit={handleCloseModal}
                    order={{
                        id: "SA-2847",
                        placedDate: "May 30",
                        shipsTo: "Canada",
                        shippingHub: "SA Hub",
                        product: {
                            name: "Àṣà Adire Wrap Dress",
                            qty: 1,
                            price: 78000,
                            isBespoke: true,
                        },
                        details: {
                            size: 'L (Bust 38–40", Waist 32–34")',
                            color: "red"
                        },
                        customization: {
                            fabric: "Indigo Adire, traditional",
                            lining: "Silk, ivory",
                            customerNote: '"Wedding guest in August. Prefer slightly looser fit at waist."',
                        },
                        timeline: {
                            requiredBy: "Jul 14, 2026",
                            daysRemaining: 45,
                            suggestedProduction: "14–18 days",
                        },
                        payout: {
                            subtotal: 78000,
                            markupPercent: 20,
                            markupAmount: 15600,
                            total: 93600,
                        }
                    }}
                />
            )}

            {
                openRejectModal && (
                    <RejectOrderModal
                        isPending={false}
                        onClose={() => setOpenRejectModal(false)}
                        onSubmit={() => setOpenRejectModal(false)}
                        order={{
                            id: "SA-2845",
                            placedDate: "Apr 3",
                            shipsTo: "Canada",
                            shippingHub: "SA Hub",
                            product: {
                                name: "Asoebi Lace Kaftan",
                                qty: 1,
                                price: 95000,
                                type: "MTO",
                            },
                        }}
                    />
                )
            }
        </div>
    )
}

export default OrderTable