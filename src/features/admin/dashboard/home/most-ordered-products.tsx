import Link from "next/link"

const products = [
    { product: "Ankara Tailored Trouser", orders: 214, vendor: "Fabric Couture" },
    { product: "Ankara Tailored Trouser", orders: 214, vendor: "Fabric Couture" },
    { product: "Ankara Tailored Trouser", orders: 214, vendor: "Fabric Couture" },
]

const MostOrderedProducts = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">Most Ordered Products</h3>
                <Link href="/admin/catalogue" className="text-[#B5894A] text-[10px] sm:text-xs font-medium hover:underline">
                    Manage all
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E8E8E8]">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F4EBDD]">
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Product
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Orders
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Vendor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{p.product}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{p.orders}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{p.vendor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MostOrderedProducts
