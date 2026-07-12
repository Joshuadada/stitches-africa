"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ShippingAddress from "./shipping-address"
import ShippingMethod, { SHIPPING_OPTIONS } from "./shipping-method"
import PaymentType from "./payment-type"
import OrderSummary from "./order-summary"
import { checkoutSchema, CheckoutFormData } from "@/schema/customer/checkout.schema"

const SUBTOTAL = 125000
const TAX = 22000

const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`

type SectionHeaderProps = {
    step: number
    title: string
}

const SectionHeader = ({ step, title }: SectionHeaderProps) => (
    <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border border-[#262626] flex items-center justify-center shrink-0">
            <span className="text-[8px] sm:text-[10px] font-semibold text-[#262626]">{step}</span>
        </div>
        <h3 className="text-[#262626] font-medium text-sm sm:text-base md:text-lg">{title}</h3>
    </div>
)

const CheckoutPage = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            streetAddress: "",
            city: "",
            country: "",
            shippingMethod: "dhl",
            paymentType: "flutterwave",
        },
    })

    const selectedShipping = watch("shippingMethod")
    const selectedPayment = watch("paymentType")

    const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === selectedShipping)
    const shippingAmount = shippingOption?.amount ?? 0
    const total = SUBTOTAL + shippingAmount + TAX

    const lineItems = [
        { label: "Subtotal", amount: formatNaira(SUBTOTAL) },
        { label: `Shipping (${shippingOption?.carrier ?? ""})`, amount: formatNaira(shippingAmount) },
        { label: "Estimated Tax", amount: formatNaira(TAX) },
    ]

    const onSubmit = () => {
        router.push('/checkout/confirmation')
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-6 sm:mb-8">
                <Link href="/" className="text-[#737373] text-[10px] sm:text-xs hover:text-[#262626] transition">
                    Piece of Ruchee
                </Link>
                <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                <span className="text-[#262626] text-[10px] sm:text-xs">Ankara Pants</span>
            </div>

            {/* Page title */}
            <div className="mb-8 sm:mb-10 md:mb-12">
                <h1 className="font-garamond text-[#262626] font-medium text-3xl sm:text-4xl md:text-5xl mb-1.5">
                    Checkout
                </h1>
                <p className="text-[#A3A3A3] text-[10px] sm:text-xs md:text-sm">
                    Please review and confirm your personal details
                </p>
            </div>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
                {/* Left: form sections */}
                <div className="flex-1 flex flex-col gap-8 sm:gap-10">
                    {/* ① Shipping Address */}
                    <section>
                        <SectionHeader step={1} title="Shipping Address" />
                        <ShippingAddress register={register} errors={errors} />
                    </section>

                    {/* ② Shipping Method */}
                    <section>
                        <SectionHeader step={2} title="Shipping Method" />
                        <ShippingMethod
                            selected={selectedShipping}
                            onSelect={(id) => setValue("shippingMethod", id, { shouldValidate: true })}
                        />
                    </section>

                    {/* ③ Payment Type */}
                    <section>
                        <SectionHeader step={3} title="Payment Type" />
                        <PaymentType
                            selected={selectedPayment}
                            onSelect={(id) => setValue("paymentType", id, { shouldValidate: true })}
                        />
                    </section>
                </div>

                {/* Right: order summary (sticky on desktop) */}
                <div className="w-full lg:w-[38%] xl:w-[36%] shrink-0 lg:sticky lg:top-6">
                    <OrderSummary
                        productImage="/svgs/dummy/product-image-1.svg"
                        productName="Hand-Crafted stitched Ankara tailored Pants"
                        productPrice={formatNaira(SUBTOTAL)}
                        lineItems={lineItems}
                        total={formatNaira(total)}
                        onCompletePurchase={handleSubmit(onSubmit)}
                        disabled={!isValid}
                    />
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
