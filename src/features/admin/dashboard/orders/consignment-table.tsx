import Link from "next/link"

const STATUS_STYLES: Record<string, string> = {
    Approved: "bg-[#D1FAE5] text-[#065F46]",
    Pending: "bg-[#FEF3C7] text-[#92400E]",
    Settled: "bg-[#DBEAFE] text-[#1E3A8A]",
}

const consignments = [
    { consignmentId: "CON-2026-001", vendor: "Fabric Couture", items: 24, value: "₦840,000", startDate: "5 Jan 2026", status: "Approved" },
    { consignmentId: "CON-2026-001", vendor: "Kente Kings", items: 10, value: "₦320,000", startDate: "15 Feb 2026", status: "Pending" },
    { consignmentId: "CON-2026-001", vendor: "Royal Threads", items: 8, value: "₦210,000", startDate: "15 Feb 2026", status: "Settled" },
]

const ConsignmentTable = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">Consignment Records</h3>
                <Link href="/admin/orders" className="text-[#B5894A] text-[10px] sm:text-xs font-medium hover:underline">
                    Manage all
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E8E8E8]">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F4EBDD]">
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Consignment ID
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Vendor
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Items
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Value
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Start Date
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {consignments.map((c, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{c.consignmentId}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#B5894A] text-[10px] sm:text-xs font-medium">{c.vendor}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{c.items}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{c.value}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{c.startDate}</td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${STATUS_STYLES[c.status]}`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ConsignmentTable
