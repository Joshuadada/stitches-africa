import Link from "next/link"

const STATUS_STYLES: Record<string, string> = {
    "Active": "bg-[#D1FAE5] text-[#065F46]",
    "Inactive": "bg-[#FEF3C7] text-[#92400E]",
    "Suspended": "bg-[#FEE2E2] text-[#991B1B]",
}

const vendors = [
    { businessName: "Fabric Couture", owner: "Ada Obi", location: "Lagos, NG", products: 48, status: "Active" },
    { businessName: "Kente Kings", owner: "Kofi Mensah", location: "Accra", products: 32, status: "Inactive" },
    { businessName: "Zuri Threads", owner: "Emeka Eze", location: "Ibadan, NG", products: 9, status: "Suspended" },
]

const AllVendorsTable = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">All Vendors</h3>
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
                                Owner
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Location
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Products
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((v, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#B5894A] text-[10px] sm:text-xs font-medium">{v.businessName}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{v.owner}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{v.location}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{v.products}</td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${STATUS_STYLES[v.status]}`}>
                                        {v.status}
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

export default AllVendorsTable
