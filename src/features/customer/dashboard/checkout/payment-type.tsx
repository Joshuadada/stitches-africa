export type PaymentOption = {
    id: string
    label: string
    logo: React.ReactNode
}

import { ReactNode } from "react"

type Props = {
    selected: string
    onSelect: (id: string) => void
}

const FlutterwaveLogo = () => (
    <div className="flex flex-col items-center gap-1">
        {/* Stylised wave icon using simple shapes */}
        <div className="flex items-end gap-[2px] mb-0.5">
            <div className="w-1.5 h-2 rounded-full bg-[#F5A623]" />
            <div className="w-1.5 h-3 rounded-full bg-[#E8491D]" />
            <div className="w-1.5 h-2 rounded-full bg-[#F5A623]" />
        </div>
        <p className="text-[#E8491D] text-[8px] sm:text-[10px] font-semibold tracking-widest uppercase">
            Pay with Flutterwave
        </p>
    </div>
)

const StripeLogo = () => (
    <div className="flex flex-col items-center gap-1">
        <p className="text-[#635BFF] text-base sm:text-lg font-semibold tracking-tight lowercase">
            stripe
        </p>
        <p className="text-[#635BFF] text-[8px] sm:text-[10px] font-semibold tracking-widest uppercase">
            Pay with Stripe
        </p>
    </div>
)

const PAYMENT_OPTIONS: { id: string; logo: ReactNode }[] = [
    { id: "flutterwave", logo: <FlutterwaveLogo /> },
    { id: "stripe", logo: <StripeLogo /> },
]

const PaymentType = ({ selected, onSelect }: Props) => {
    return (
        <div className="flex items-center gap-3 sm:gap-4">
            {PAYMENT_OPTIONS.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={`flex-1 flex items-center justify-center py-4 sm:py-5 px-3 rounded-lg border-2 cursor-pointer transition ${
                        selected === option.id
                            ? "border-[#B5894A] bg-white"
                            : "border-[#E8E8E8] bg-white hover:border-[#A3A3A3]"
                    }`}
                >
                    {option.logo}
                </button>
            ))}
        </div>
    )
}

export default PaymentType
