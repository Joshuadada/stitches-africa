"use client"

import { useFormContext } from "react-hook-form"
import Accordion from "./accordion"
import { BespokeCustomizationFormData } from "@/schema/customer/bespoke-customization.schema"

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

type MeasurementField = {
    key: "hips" | "length" | "sleeves" | "waist"
    label: string
    placeholder: string
}

const MEASUREMENT_FIELDS: MeasurementField[] = [
    { key: "hips",    label: "HIPS",    placeholder: "e.g. 90" },
    { key: "length",  label: "LENGTH",  placeholder: "e.g. 105" },
    { key: "sleeves", label: "SLEEVES", placeholder: "e.g. 62" },
    { key: "waist",   label: "WAIST",   placeholder: "e.g. 74" },
]

type Props = {
    onViewSizeChart: () => void
}

const BespokeSpecifications = ({ onViewSizeChart }: Props) => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<BespokeCustomizationFormData>()

    const selectedSize = watch("size")

    return (
        <Accordion title="Specifications">
            {/* Size row */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                        Size
                    </p>
                    <button
                        onClick={onViewSizeChart}
                        className="text-[#262626] text-[8px] sm:text-[10px] underline cursor-pointer hover:text-[#737373] transition"
                    >
                        View Size chart
                    </button>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => setValue("size", size, { shouldValidate: true })}
                            className={`h-7 w-9 sm:h-8 sm:w-10 md:h-9 md:w-11 flex items-center justify-center rounded text-[8px] sm:text-[10px] border cursor-pointer transition ${
                                selectedSize === size
                                    ? "bg-[#262626] text-white border-[#262626]"
                                    : "bg-white text-[#262626] border-[#E8E8E8] hover:border-[#262626]"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                {errors.size && (
                    <span className="text-[#E24B4A] text-[8px] sm:text-[10px]">{errors.size.message}</span>
                )}
            </div>

            {/* Unit */}
            <div className="flex flex-col gap-1">
                <label className="text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                    Unit
                </label>
                <input
                    type="text"
                    {...register("unit")}
                    placeholder="cm"
                    className="border border-[#E8E8E8] rounded-md px-2.5 py-1.5 text-[10px] sm:text-xs text-[#262626] placeholder:text-[#D4D4D4] outline-none focus:border-[#262626] transition bg-white"
                />
            </div>

            {/* Measurement fields grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {MEASUREMENT_FIELDS.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <label className="text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                            {field.label}
                        </label>
                        <input
                            type="number"
                            {...register(field.key)}
                            placeholder={field.placeholder}
                            className="border border-[#E8E8E8] rounded-md px-2.5 py-1.5 text-[10px] sm:text-xs text-[#262626] placeholder:text-[#D4D4D4] outline-none focus:border-[#262626] transition bg-white"
                        />
                    </div>
                ))}
            </div>
        </Accordion>
    )
}

export default BespokeSpecifications
