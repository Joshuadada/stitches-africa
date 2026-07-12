import Link from "next/link"
import { MoreVertical } from "lucide-react"

const DOCS_STYLES: Record<string, string> = {
    "Uploaded": "bg-[#A7F3D0] text-[#065F46]",
    "Incomplete": "bg-[#FEF3C7] text-[#92400E]",
    "Missing": "bg-[#FEE2E2] text-[#991B1B]",
}

const STATUS_STYLES: Record<string, string> = {
    "Pending": "bg-[#FEF3C7] text-[#92400E]",
    "On Hold": "bg-[#FEE2E2] text-[#991B1B]",
}

const applications = [
    { businessName: "Fabric Couture", location: "Lagos, NG", submitted: "9 Apr 2026", kycDocs: "Uploaded", status: "Pending" },
    { businessName: "Zuri Threads Co.", location: "Abuja, NG", submitted: "3 Apr 2026", kycDocs: "Incomplete", status: "Pending" },
    { businessName: "Lagos Luxe Wear", location: "Abuja, NG", submitted: "3 Apr 2026", kycDocs: "Missing", status: "On Hold" },
]

const PendingKycTable = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">Pending KYC Applications</h3>
                <Link href="/admin/catalogue" className="text-[#B5894A] text-[10px] sm:text-xs font-medium hover:underline">
                    Manage all
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E8E8E8]">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F4EBDD]">
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Business Name
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Location
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Submitted
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                KYC Docs
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
                        {applications.map((a, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#B5894A] text-[10px] sm:text-xs font-medium">{a.businessName}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{a.location}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{a.submitted}</td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${DOCS_STYLES[a.kycDocs]}`}>
                                        {a.kycDocs}
                                    </span>
                                </td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${STATUS_STYLES[a.status]}`}>
                                        {a.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 sm:px-5">
                                    <button
                                        className="p-1 rounded hover:bg-[#F5F5F5] transition cursor-pointer"
                                        aria-label={`More actions for ${a.businessName}`}
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

export default PendingKycTable
