import { useRouter } from "next/navigation"
import Button from "@/shared/components/button"

type Address = {
    name: string
    street: string
    city: string
    country: string
    postalCode: string
}

type Props = {
    address: Address
}

const ShippingInfoCard = ({ address }: Props) => {
    const router = useRouter()

    return (
        <div className="border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 md:p-7 flex flex-col gap-6 sm:gap-7">
            {/* Shipping address */}
            <div className="flex flex-col gap-3">
                <p className="text-[#737373] text-[8px] sm:text-[10px] font-medium tracking-widest uppercase">
                    Shipping To
                </p>
                <div className="flex flex-col gap-0.5">
                    <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium">{address.name}</p>
                    <p className="text-[#737373] text-[10px] sm:text-xs">{address.street}</p>
                    <p className="text-[#737373] text-[10px] sm:text-xs">{address.city}, {address.country}</p>
                    <p className="text-[#737373] text-[10px] sm:text-xs">{address.postalCode}</p>
                </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
                <Button
                    onClick={() => router.push("/orders")}
                    className="bg-[#B5894A] text-white text-[10px] sm:text-xs md:text-sm font-medium py-3 sm:py-3.5 hover:bg-[#a07840] transition"
                >
                    View Order Status
                </Button>
                <Button
                    onClick={() => router.push("/")}
                    className="bg-white text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium py-3 sm:py-3.5 border border-[#E8E8E8] hover:border-[#262626] transition"
                >
                    Continue Shopping
                </Button>
            </div>
        </div>
    )
}

export default ShippingInfoCard
