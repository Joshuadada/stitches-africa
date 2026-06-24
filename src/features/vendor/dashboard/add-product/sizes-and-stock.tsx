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
                <div className="flex flex-col gap-5">
                    {sizes.map((size) => (
                        <div
                            key={size}
                            className="grid grid-cols-3 items-center"
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
                            </div>

                            <div className="col-span-2 flex justify-end">
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