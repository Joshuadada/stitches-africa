import { Product } from "."

const ProductTable = ({ products }: { products: Product[] }) => {
    return (
        <div className="overflow-x-auto w-full">
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
                            PRICE
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                            CUSTOMER FEES
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                            STOCK
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8">
                            STATUS
                        </th>

                        <th className="text-left text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-normal pl-6 lg:pl-8 py-2 sm:py-4 md:py-6 lg:py-8 rounded-tr-lg sm:rounded-tr-xl md:rounded-tr-2xl lg:rounded-tr-[20px]">
                            ACTION
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#EEE6DA]"
                            >
                                {/* PRODUCT */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                                        <div className="relative w-6.5 sm:w-8.5 md:w-10.5 lg:w-12.5 h-5 sm:h-7 md:h-9 lg:h-11 rounded-lg overflow-hidden bg-black shrink-0"></div>

                                        <h3 className="text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                            {product.name}
                                        </h3>
                                    </div>
                                </td>

                                {/* CATEGORY */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                    <span
                                        className={`border text-[8px] sm:text-[10px] md:text-xs lg:text-sm rounded-full px-2.5 py-0.5 whitespace-nowrap ${product.categoryData.className}`}
                                    >
                                        {product.categoryData.label}
                                    </span>
                                </td>

                                {/* PRICE */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                    {product.price}
                                </td>

                                {/* CUSTOMER FEES */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                    {product.customerFees}
                                </td>

                                {/* STOCK */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {product.stock}
                                </td>

                                {/* STATUS */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {product.status}
                                </td>

                                {/* ACTION */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                    <div className="flex items-center gap-4">
                                        <button className="text-[#B5894A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                                            Edit
                                        </button>

                                        <button className="text-[#B54A4A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className="py-20 text-center text-[#8A7E6E] text-lg"
                            >
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable