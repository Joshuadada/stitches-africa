import { Minus, Plus } from "lucide-react";
import { FieldError } from "react-hook-form";

type SizesAndStockProps = {
    sizes: string[];
    selectedSizes: Record<string, boolean>;
    stock: Record<string, number>;
    onToggleSize: (size: string) => void;
    onUpdateStock: (size: string, type: "increment" | "decrement") => void;
    error?: FieldError | { message?: string };
};

const SIZE_GUIDE: Record<string, string> = {
    S: "UK 6 · US 2 · EU 34",
    M: "UK 8 · US 4 · EU 36",
    L: "UK 10 · US 6 · EU 38",
    XL: "UK 12 · US 8 · EU 40",
};

const SizesAndStock = ({
    sizes,
    selectedSizes,
    stock,
    onToggleSize,
    onUpdateStock,
    error,
}: SizesAndStockProps) => {
    return (
        <div>
            <p className="text-sm font-medium text-[#171717] mb-5 text-right">
                Sizes & Stock Availability <span className="text-[#DC2626]">*</span>
            </p>

            <div className="border border-[#ECECEC] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                    <span className="pl-8 text-sm text-[#737373]">Size</span>
                    <span className="text-sm text-[#737373]">Units</span>
                </div>

                <div className="flex flex-col gap-5">
                    {sizes.map((size) => (
                        <div
                            key={size}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedSizes[size]}
                                    onChange={() => onToggleSize(size)}
                                    className="accent-black"
                                />

                                <div className="w-10 h-10 rounded-xl bg-[#B5894A] text-white flex items-center justify-center text-sm font-medium">
                                    {size}
                                </div>

                                {SIZE_GUIDE[size] && (
                                    <span className="text-[10px] lg:text-xs xl:text-sm text-[#C8C0B5]">
                                        {SIZE_GUIDE[size]}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => onUpdateStock(size, "decrement")}
                                    className="w-8 h-8 rounded-md bg-[#F5F1EA] flex items-center justify-center"
                                >
                                    <Minus size={14} />
                                </button>

                                <div className="w-10 h-8 rounded-md bg-black text-white flex items-center justify-center text-sm font-medium">
                                    {stock[size]}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onUpdateStock(size, "increment")}
                                    className="w-8 h-8 rounded-md bg-[#F5F1EA] flex items-center justify-center"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {error && (
                    <p className="text-red-500 text-xs mt-4">
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SizesAndStock;