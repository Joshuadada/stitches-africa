import Link from "next/link"

const STATUS_STYLES: Record<string, string> = {
    "In Stock": "bg-[#D1FAE5] text-[#065F46]",
    "Low Stock": "bg-[#FEF3C7] text-[#92400E]",
    "Out of Stock": "bg-[#FEE2E2] text-[#991B1B]",
}

const products = [
    { product: "Ankara Tailored Trouser", vendor: "Fabric Couture", stock: 214, status: "In Stock" },
    { product: "Adire Kaftan — Indigo", vendor: "Kente Kings", stock: 22, status: "Low Stock" },
    { product: "Embroidered Agbada Set", vendor: "Royal Threads", stock: 0, status: "Out of Stock" },
]

const ProductListingsTable = () => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[#262626] font-medium text-sm sm:text-base">Product Listings</h3>
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
                                Vendor
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Stock
                            </th>
                            <th className="text-left text-[#736551] text-[8px] sm:text-[10px] font-medium uppercase tracking-wide py-3 px-4 sm:px-5">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, index) => (
                            <tr key={index} className="border-t border-[#E8E8E8] bg-white">
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{p.product}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#B5894A] text-[10px] sm:text-xs">{p.vendor}</td>
                                <td className="py-3 px-4 sm:px-5 text-[#262626] text-[10px] sm:text-xs">{p.stock}</td>
                                <td className="py-3 px-4 sm:px-5">
                                    <span className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-wide rounded-full px-3 py-1 ${STATUS_STYLES[p.status]}`}>
                                        {p.status}
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

export default ProductListingsTable
