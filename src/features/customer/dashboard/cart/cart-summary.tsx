import Button from "@/shared/components/button"

type Props = {
    total: string
    onCheckout: () => void
    onContinueShopping: () => void
}

const CartSummary = ({ total, onCheckout, onContinueShopping }: Props) => {
    return (
        <div className="border border-[#E8E8E8] rounded-lg bg-white p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
            <h3 className="font-garamond text-[#262626] font-medium text-lg sm:text-xl md:text-2xl">
                Cart Summary
            </h3>

            <div className="flex items-center justify-between">
                <p className="text-[#262626] text-xs sm:text-sm md:text-base font-semibold">Total</p>
                <p className="text-[#B5894A] text-sm sm:text-base md:text-lg font-bold">{total}</p>
            </div>

            <Button
                onClick={onCheckout}
                className="bg-[#B5894A] text-white text-[10px] sm:text-xs md:text-sm font-medium py-3 sm:py-3.5 hover:bg-[#a07840] transition"
            >
                Checkout ({total})
            </Button>

            <button
                onClick={onContinueShopping}
                className="text-[#B5894A] text-[10px] sm:text-xs md:text-sm font-medium text-center hover:underline cursor-pointer"
            >
                Continue Shopping
            </button>
        </div>
    )
}

export default CartSummary
