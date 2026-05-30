import { Check } from "lucide-react";

type ProductCategory = "rtw" | "mto" | "bespoke";

type ProductCategoriesProps = {
    active: ProductCategory[];
    onToggle: (key: ProductCategory) => void;
};

const CATEGORIES: { key: ProductCategory; label: string }[] = [
    { key: "rtw", label: "Ready-to-Wear" },
    { key: "mto", label: "Made to Order" },
    { key: "bespoke", label: "Bespoke" },
];

const ProductCategories = ({ active, onToggle }: ProductCategoriesProps) => (
    <section>
        <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-3">Product categories offered</p>
        <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, label }) => {
                const isActive = active.includes(key);
                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onToggle(key)}
                        className={`flex items-center gap-1.5 border rounded-full px-4 py-1.5 text-sm transition cursor-pointer ${
                            isActive
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-white text-[#1F1B17] border-[#D4CFC9] hover:border-[#8A8278]"
                        }`}
                    >
                        {isActive && <Check size={12} />}
                        {label}
                    </button>
                );
            })}
        </div>
    </section>
);

export default ProductCategories;