"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/shared/components/input"
import Select from "@/shared/components/select"
import { manualOrderSchema, ManualOrderFormData } from "@/schema/admin/manual-order.schema"

const VENDOR_OPTIONS = [
    { label: "Fabric Couture", value: "fabric-couture" },
    { label: "Kente Kings", value: "kente-kings" },
    { label: "Royal Threads", value: "royal-threads" },
]

const PRODUCT_OPTIONS = [
    { label: "Ankara Tailored Trouser", value: "ankara-tailored-trouser" },
    { label: "Adire Kaftan — Indigo", value: "adire-kaftan-indigo" },
    { label: "Embroidered Agbada Set", value: "embroidered-agbada-set" },
]

const ManualOrderForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<ManualOrderFormData>({
        resolver: zodResolver(manualOrderSchema),
        mode: "onChange",
    })

    const onSubmit = (data: ManualOrderFormData) => {
        console.log("Manual order:", data)
    }

    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            <p className="text-[#737373] text-xs sm:text-sm">Create an order manually on behalf of a customer</p>

            <form onSubmit={handleSubmit(onSubmit)} className="border border-[#E8E8E8] rounded-lg bg-white p-6 sm:p-8 flex flex-col gap-6 sm:gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                    <Input label="Customer Name" name="customerName" required register={register} error={errors.customerName} />
                    <Input label="Customer Email" name="customerEmail" type="email" required register={register} error={errors.customerEmail} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                    <Select label="Vendor" name="vendor" options={VENDOR_OPTIONS} required register={register} error={errors.vendor} />
                    <Select label="Product" name="product" options={PRODUCT_OPTIONS} required register={register} error={errors.product} />
                </div>

                <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
                    <label htmlFor="shippingAddress" className="text-[10px] sm:text-xs md:text-sm text-black">
                        Shipping Address <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                        id="shippingAddress"
                        rows={3}
                        {...register("shippingAddress")}
                        className={`border rounded-md py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-[10px] sm:text-xs md:text-sm outline-none transition bg-white resize-none ${errors.shippingAddress ? "border-[#E24B4A] bg-[#FFF5F5] text-[#A32D2D]" : "border-[#E8E8E8]"
                            }`}
                    />
                    {errors.shippingAddress && (
                        <span className="text-[#E24B4A] text-[8px] sm:text-[10px] md:text-xs">
                            {errors.shippingAddress.message}
                        </span>
                    )}
                </div>

                <Input label="Order note (Optional)" name="orderNote" register={register} error={errors.orderNote} />

                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="flex-1 border border-[#B5894A] rounded-md py-2.5 sm:py-3 text-[#B5894A] text-xs sm:text-sm font-medium hover:bg-[#FBEFE0] transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="flex-1 bg-[#B5894A] hover:bg-[#a07840] rounded-md py-2.5 sm:py-3 text-white text-xs sm:text-sm font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Create Order
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ManualOrderForm
