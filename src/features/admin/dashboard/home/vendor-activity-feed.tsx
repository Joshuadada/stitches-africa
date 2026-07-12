import Link from "next/link"

const activity = [
    { vendor: "Fabric Couture", activity: 'Marked order ABC-345 as "in production"', time: "2 min ago" },
    { vendor: "Kente Kings", activity: "Uploaded 3 new product listings", time: "12 min ago" },
    { vendor: "Royal Threads", activity: "Dispatched order ABC-290 via DHL", time: "1 hr ago" },
]

const VendorActivityFeed = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">Vendor activity feed</h3>
                <Link href="/admin/system" className="text-[#B5894A] text-[10px] sm:text-xs font-medium hover:underline">
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
                                Activity
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activity.map((a, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs font-medium">{a.vendor}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#B5894A] text-[10px] sm:text-xs">{a.activity}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#A3A3A3] text-[10px] sm:text-xs">{a.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VendorActivityFeed
