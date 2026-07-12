import { FieldErrors, UseFormRegister } from "react-hook-form"
import { CheckoutFormData } from "@/schema/customer/checkout.schema"

type Props = {
    register: UseFormRegister<CheckoutFormData>
    errors: FieldErrors<CheckoutFormData>
}

const FIELD_CLASS =
    "border border-[#E8E8E8] rounded-md py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 text-[10px] sm:text-xs md:text-sm text-[#262626] outline-none focus:border-[#262626] transition bg-white placeholder:text-[#D4D4D4] w-full"

const ERROR_FIELD_CLASS =
    "border border-[#E24B4A] bg-[#FFF5F5] rounded-md py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 text-[10px] sm:text-xs md:text-sm text-[#A32D2D] outline-none transition w-full"

const LABEL_CLASS =
    "text-[#737373] text-[8px] sm:text-[10px] md:text-xs font-medium tracking-widest uppercase"

const ERROR_TEXT_CLASS = "text-[#E24B4A] text-[8px] sm:text-[10px]"

const ShippingAddress = ({ register, errors }: Props) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLASS}>Full Name</label>
                <input
                    type="text"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className={errors.fullName ? ERROR_FIELD_CLASS : FIELD_CLASS}
                />
                {errors.fullName && <span className={ERROR_TEXT_CLASS}>{errors.fullName.message}</span>}
            </div>

            {/* Street Address */}
            <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLASS}>Street Address</label>
                <input
                    type="text"
                    {...register("streetAddress")}
                    placeholder="Enter your street address"
                    className={errors.streetAddress ? ERROR_FIELD_CLASS : FIELD_CLASS}
                />
                {errors.streetAddress && <span className={ERROR_TEXT_CLASS}>{errors.streetAddress.message}</span>}
            </div>

            {/* City + Country */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>City</label>
                    <input
                        type="text"
                        {...register("city")}
                        placeholder="City"
                        className={errors.city ? ERROR_FIELD_CLASS : FIELD_CLASS}
                    />
                    {errors.city && <span className={ERROR_TEXT_CLASS}>{errors.city.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>Country</label>
                    <input
                        type="text"
                        {...register("country")}
                        placeholder="Country"
                        className={errors.country ? ERROR_FIELD_CLASS : FIELD_CLASS}
                    />
                    {errors.country && <span className={ERROR_TEXT_CLASS}>{errors.country.message}</span>}
                </div>
            </div>
        </div>
    )
}

export default ShippingAddress
