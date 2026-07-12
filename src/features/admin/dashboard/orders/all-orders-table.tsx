import Link from "next/link"
import { MoreVertical } from "lucide-react"

const STATUS_STYLES: Record<string, string> = {
    green: "bg-[#D1FAE5] text-[#065F46]",
    blue: "bg-[#DBEAFE] text-[#1E3A8A]",
    amber: "bg-[#FEF3C7] text-[#92400E]",
}

const orders = [
    { orderId: "ABC-345-AQU89", customer: "David M.", vendor: "Fabric Couture", amount: "₦125,000", date: "10 Apr 2026", status: "Delivered", statusColor: "green" },
    { orderId: "ABC-345-AQU89", customer: "Amara O.", vendor: "Kente Kings", amount: "₦89,000", date: "10 Apr 2026", status: "Delivered", statusColor: "blue" },
    { orderId: "ABC-345-AQU89", customer: "Nkechi A.", vendor: "Heritage Weaves", amount: "₦155,000", date: "14 Feb 2026", status: "Awaiting Vendor", statusColor: "amber" },
]

const AllOrdersTable = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">All Orders</h3>
                <Link href="/admin/orders" className="text-[#B5894A] text-[10px] sm:text-xs font-medium hover:underline">
                    Manage all
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E8E8E8]">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F4EBDD]">
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Order ID
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Customer
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Vendor
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Amount
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Date
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Status
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{o.orderId}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#B5894A] text-[10px] sm:text-xs font-medium">{o.customer}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{o.vendor}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{o.amount}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{o.date}</td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${STATUS_STYLES[o.statusColor]}`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 sm:px-5">
                                    <button
                                        className="p-1 rounded hover:bg-[#F5F5F5] transition cursor-pointer"
                                        aria-label={`More actions for order ${o.orderId}`}
                                    >
                                        <MoreVertical size={16} className="text-[#737373]" />
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

export default AllOrdersTable
