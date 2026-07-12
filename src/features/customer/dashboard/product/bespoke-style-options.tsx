"use client"

import { useFormContext } from "react-hook-form"
import Accordion from "./accordion"
import { BespokeCustomizationFormData } from "@/schema/customer/bespoke-customization.schema"

const FABRIC_TYPES = ["Ankara", "Kente", "Fula-doe", "Kaftan", "Lace"]
const LINING_OPTIONS = ["Fully lined", "Half lined"]

const BespokeStyleOptions = () => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<BespokeCustomizationFormData>()

    const selectedFabrics = watch("fabricTypes") ?? []
    const selectedLining = watch("lining")

    const toggleFabric = (fabric: string) => {
        const next = selectedFabrics.includes(fabric)
            ? selectedFabrics.filter((f) => f !== fabric)
            : [...selectedFabrics, fabric]
        setValue("fabricTypes", next, { shouldValidate: true })
    }

    return (
        <Accordion title="Style Options">
            {/* Fabric type */}
            <div className="flex flex-col gap-2">
                <p className="text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                    Fabric Type
                </p>
                <div className="flex flex-wrap gap-2">
                    {FABRIC_TYPES.map((fabric) => (
                        <button
                            key={fabric}
                            type="button"
                            onClick={() => toggleFabric(fabric)}
                            className={`px-3 py-1.5 rounded-[100px] text-[8px] sm:text-[10px] md:text-xs border cursor-pointer transition ${
                                selectedFabrics.includes(fabric)
                                    ? "bg-[#B5894A] text-white border-[#B5894A]"
                                    : "bg-white text-[#525252] border-[#E8E8E8] hover:border-[#B5894A]"
                            }`}
                        >
                            {fabric}
                        </button>
                    ))}
                </div>
                {errors.fabricTypes && (
                    <span className="text-[#E24B4A] text-[8px] sm:text-[10px]">{errors.fabricTypes.message}</span>
                )}
                <input
                    type="text"
                    {...register("fabricNote")}
                    placeholder="Specify here"
                    className="border border-[#E8E8E8] rounded-md px-3 py-2 text-[10px] sm:text-xs text-[#262626] placeholder:text-[#D4D4D4] outline-none focus:border-[#262626] transition bg-white"
                />
            </div>

            {/* Lining */}
            <div className="flex flex-col gap-2">
                <p className="text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                    Lining
                </p>
                <div className="flex items-center gap-2">
                    {LINING_OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => setValue("lining", opt, { shouldValidate: true })}
                            className={`px-3 py-1.5 rounded-[100px] text-[8px] sm:text-[10px] md:text-xs border cursor-pointer transition ${
                                selectedLining === opt
                                    ? "bg-[#B5894A] text-white border-[#B5894A]"
                                    : "bg-white text-[#525252] border-[#E8E8E8] hover:border-[#B5894A]"
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
                {errors.lining && (
                    <span className="text-[#E24B4A] text-[8px] sm:text-[10px]">{errors.lining.message}</span>
                )}
            </div>

            {/* Customer note */}
            <div className="flex flex-col gap-2">
                <p className="text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                    Customer Note
                </p>
                <textarea
                    {...register("customerNote")}
                    rows={3}
                    placeholder="Add any special instructions or notes for the vendor..."
                    className="border border-[#E8E8E8] rounded-md px-3 py-2 text-[10px] sm:text-xs text-[#262626] placeholder:text-[#D4D4D4] outline-none focus:border-[#262626] transition bg-white resize-none"
                />
            </div>
        </Accordion>
    )
}

export default BespokeStyleOptions
