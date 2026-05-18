type CategorySelectorProps = {
    categories: string[];
    selected: string;
    onChange: (category: string) => void;
};

const CategorySelector = ({
    categories,
    selected,
    onChange,
}: CategorySelectorProps) => {
    return (
        <div className="mb-10">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black mb-2.5 sm:mb-3.5 md:mb-4.5 lg:mb-5.5">
                Select Product Category
            </p>

            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const active = selected === category;

                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => onChange(category)}
                            className={`
                                px-5.5 sm:px-6.5 md:px-7.5 lg:px-8.5
                                py-1.5 sm:py-2 lg:py-2.5
                                rounded-[10px]
                                transition
                                text-xs sm:text-sm
                                border
                                ${
                                    active
                                        ? "bg-[#B5894A] border-[#B5894A] text-white"
                                        : "border-[#D7C5A8] text-[#B5894A] bg-white hover:bg-[#FAF7F2]"
                                }
                            `}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySelector;