import { useDeleteVendorProduct } from "@/hooks/api/vendor/useVendorProducts";
import { isApiError } from "@/services/api";
import { Product } from "@/types/vendor";
import { showToast } from "@/utils/toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation"
import { useState } from "react";

const ProductTable = ({ products }: { products: Product[] }) => {
    const router = useRouter();
    const toNaira = (amount: number): string => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        }).format(amount);
    };

    const calculateCustomerFees = (price: number, discountPercentage: number): string => {
        const discountedPrice = price - (price * discountPercentage) / 100;

        return toNaira(discountedPrice);
    }

    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { mutate: deleteProduct } = useDeleteVendorProduct();

    const handleDelete = (productId: string) => {
        setDeletingId(productId);

        deleteProduct(productId, {
            onSuccess: (res: any) => {
                showToast({
                    type: "success",
                    title: "Success",
                    message: res.message || "Successful",
                });

                setDeletingId(null);
            },
            onError: (error: any) => {
                const message = isApiError(error)
                    ? error.message
                    : "Something went wrong";

                showToast({
                    type: "error",
                    title: "Error",
                    message,
                });

                setDeletingId(null);
            },
        });
    };

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
                        products.map((product) => (
                            <tr
                                key={product.id}
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
                                        className={`border border-[#6EE7B7] bg-[#F0FDF4] text-[#065F46] text-[8px] sm:text-[10px] md:text-xs lg:text-sm rounded-full px-2.5 py-0.5 whitespace-nowrap`}
                                    >
                                        {product.listingType}
                                    </span>
                                </td>

                                {/* PRICE */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                    {toNaira(product.price)}
                                </td>

                                {/* CUSTOMER FEES */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">
                                    {calculateCustomerFees(product.price, product.discountPercentage)}
                                </td>

                                {/* STOCK */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {product.lowStockThreshold}
                                </td>

                                {/* STATUS */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7 text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                    {product.isOnSale ? "Active" : "Inactive"}
                                </td>

                                {/* ACTION */}
                                <td className="pl-6 lg:pl-8 py-3 md:py-5 lg:py-7">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => router.push(`/vendor/products/${product.id}/edit`)} className="text-[#B5894A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer">
                                            Edit
                                        </button>

                                        <button className="text-[#B54A4A] underline text-[8px] sm:text-[10px] md:text-xs lg:text-sm cursor-pointer" onClick={() => handleDelete(product.id)}>
                                            {deletingId === product.id ? (
                                                <Loader />
                                            ) : (
                                                "Delete"
                                            )}

                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className="py-4 text-center text-[#8A7E6E]"
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