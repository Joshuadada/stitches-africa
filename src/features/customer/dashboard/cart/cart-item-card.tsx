import Image from "next/image"
import { StaticImageData } from "next/image"
import { Trash2 } from "lucide-react"

export type CartItem = {
    id: string
    imgSrc: string | StaticImageData
    title: string
    price: number
    quantity: number
}

type Props = {
    item: CartItem
    formatAmount: (amount: number) => string
    onIncrement: (id: string) => void
    onDecrement: (id: string) => void
    onRemove: (id: string) => void
}

const CartItemCard = ({ item, formatAmount, onIncrement, onDecrement, onRemove }: Props) => {
    return (
        <div className="flex items-start gap-3 sm:gap-4">
            <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-md overflow-hidden bg-[#F5F5F5] shrink-0">
                <Image
                    src={item.imgSrc}
                    alt={item.title}
                    height={72}
                    width={72}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <p className="text-[#262626] text-[10px] sm:text-xs md:text-sm font-medium leading-snug">
                    {item.title}
                </p>
                <p className="text-[#B5894A] font-semibold text-sm sm:text-base">
                    {formatAmount(item.price)}
                </p>
                <button
                    onClick={() => onRemove(item.id)}
                    className="flex items-center gap-1 w-fit cursor-pointer group"
                >
                    <Trash2 size={12} className="text-[#B5894A]" />
                    <span className="text-[#B5894A] text-[10px] sm:text-xs font-medium group-hover:underline">
                        Remove
                    </span>
                </button>
            </div>

            <div className="flex items-center border border-[#E8E8E8] rounded-md overflow-hidden bg-[#F5F5F5] shrink-0">
                <button
                    onClick={() => onDecrement(item.id)}
                    className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center text-[#262626] text-sm font-medium hover:bg-[#E8E8E8] transition cursor-pointer"
                    aria-label="Decrease quantity"
                >
                    −
                </button>
                <span className="h-7 sm:h-8 min-w-7 sm:min-w-8 flex items-center justify-center border-x border-[#E8E8E8] bg-white text-[#262626] text-xs sm:text-sm font-medium">
                    {item.quantity}
                </span>
                <button
                    onClick={() => onIncrement(item.id)}
                    className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center text-[#262626] text-sm font-medium hover:bg-[#E8E8E8] transition cursor-pointer"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default CartItemCard
