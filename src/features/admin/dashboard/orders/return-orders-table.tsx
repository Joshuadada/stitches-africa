import Link from "next/link"
import { MoreVertical } from "lucide-react"

const STATUS_STYLES: Record<string, string> = {
    Pending: "bg-[#FEF3C7] text-[#92400E]",
    Approved: "bg-[#D1FAE5] text-[#065F46]",
    Rejected: "bg-[#FEE2E2] text-[#991B1B]",
}

const returns = [
    { returnId: "RET-001", orderId: "ABC-278", customer: "Tobi F.", reason: "Wrong size", requested: "5 Jan 2026", status: "Pending" },
    { returnId: "RET-002", orderId: "ABC-211", customer: "Amara O.", reason: "Fabric defect", requested: "10 Apr 2026", status: "Rejected" },
    { returnId: "RET-003", orderId: "ABC-190", customer: "Nkechi A.", reason: "Not as described", requested: "14 Feb 2026", status: "Approved" },
]

const ReturnOrdersTable = () => {
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
                                Return ID
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Order ID
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Customer
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Reason
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Requested
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
                        {returns.map((r, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs font-medium">{r.returnId}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{r.orderId}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#B5894A] text-[10px] sm:text-xs font-medium">{r.customer}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{r.reason}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{r.requested}</td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${STATUS_STYLES[r.status]}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 sm:px-5">
                                    <button
                                        className="p-1 rounded hover:bg-[#F5F5F5] transition cursor-pointer"
                                        aria-label={`More actions for return ${r.returnId}`}
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

export default ReturnOrdersTable
