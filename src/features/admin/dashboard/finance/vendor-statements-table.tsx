import Link from "next/link"
import { MoreVertical } from "lucide-react"

const STATUS_STYLES: Record<string, string> = {
    Settled: "bg-[#D1FAE5] text-[#065F46]",
    Pending: "bg-[#FEF3C7] text-[#92400E]",
}

const statements = [
    { vendor: "Fabric Couture", grossSales: "₦12,400,000", platformFees: "₦1,240,000", netPayout: "₦11,160,000", lastPayout: "10 Apr 2026", status: "Settled" },
    { vendor: "Kente Kings", grossSales: "₦8,200,000", platformFees: "₦820,000", netPayout: "₦7,380,000", lastPayout: "10 Apr 2026", status: "Settled" },
    { vendor: "Royal Threads", grossSales: "₦5,100,000", platformFees: "₦510,000", netPayout: "₦4,590,000", lastPayout: "", status: "Pending" },
]

const VendorStatementsTable = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">Vendor Statements</h3>
                <Link href="/admin/finance" className="text-[#B5894A] text-[10px] sm:text-xs font-medium hover:underline">
                    Manage all
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E8E8E8]">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F4EBDD]">
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Vendor
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Gross Sales
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Platform Fees
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Net Payout
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Last Payout
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
                        {statements.map((s, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs font-medium">{s.vendor}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{s.grossSales}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{s.platformFees}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{s.netPayout}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{s.lastPayout}</td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${STATUS_STYLES[s.status]}`}>
                                        {s.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 sm:px-5">
                                    <button
                                        className="p-1 rounded hover:bg-[#F5F5F5] transition cursor-pointer"
                                        aria-label={`More actions for ${s.vendor}`}
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

export default VendorStatementsTable
