"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutGrid,
    ShoppingCart,
    Heart,
    User,
    Sparkles,
    CreditCard,
    Bell,
    Gift,
    HelpCircle,
    ShieldCheck,
    LogOut,
    Copy,
    Share2,
} from "lucide-react"

type NavItem = {
    href: string
    label: string
    icon: React.ElementType
}

const ACCOUNT_ITEMS: NavItem[] = [
    { href: "/orders", label: "Orders", icon: LayoutGrid },
    { href: "/cart", label: "My Cart", icon: ShoppingCart },
    { href: "/wishlist", label: "My Wishlist", icon: Heart },
    { href: "/profile", label: "Edit profile", icon: User },
    { href: "/try-on", label: "AI Try-on feature", icon: Sparkles },
    { href: "/payment-methods", label: "Payment method", icon: CreditCard },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/referral", label: "Referral code", icon: Gift },
]

const SUPPORT_ITEMS: NavItem[] = [
    { href: "/help", label: "Help centre", icon: HelpCircle },
    { href: "/privacy", label: "Privacy policy", icon: ShieldCheck },
]

type Props = {
    referralCode: string
    onSignOut: () => void
    onNavigate?: () => void
    variant?: "dropdown" | "drawer"
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[#A3A3A3] text-[10px] font-medium uppercase tracking-wide px-4 sm:px-5 pt-4 pb-1.5">
        {children}
    </p>
)

const AccountMenu = ({ referralCode, onSignOut, onNavigate, variant = "dropdown" }: Props) => {
    const pathname = usePathname()

    const renderItems = (items: NavItem[]) =>
        items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
                <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-4 sm:px-5 py-2.5 transition-colors ${active ? "bg-[#FBEFE0] text-[#B5894A] font-medium" : "text-[#525252] hover:bg-[#FAF7F2]"
                        }`}
                >
                    <Icon size={16} className={active ? "text-[#B5894A]" : "text-[#737373]"} />
                    <span className="text-xs sm:text-sm">{label}</span>
                </Link>
            )
        })

    return (
        <div className={`w-full h-full bg-white overflow-y-auto ${variant === "dropdown" ? "rounded-lg border border-[#E8E8E8] shadow-lg" : ""}`}>
            {/* Referral code */}
            <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 flex flex-col gap-2.5">
                <p className="text-[#A3A3A3] text-[10px] font-medium uppercase tracking-wide">
                    Your referral code
                </p>
                <div className="rounded-md bg-[#262626] py-2.5 flex items-center justify-center">
                    <p className="text-white text-xs sm:text-sm font-semibold tracking-wider">{referralCode}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 border border-[#E8E8E8] rounded-md py-1.5 text-[#262626] text-[10px] sm:text-xs font-medium hover:bg-[#FAF7F2] transition cursor-pointer">
                        <Copy size={12} />
                        Copy link
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#262626] rounded-md py-1.5 text-white text-[10px] sm:text-xs font-medium hover:bg-[#171717] transition cursor-pointer">
                        <Share2 size={12} />
                        Share code
                    </button>
                </div>
            </div>

            <hr className="border-[#E8E8E8]" />

            <SectionLabel>My Account</SectionLabel>
            <div className="flex flex-col pb-2">{renderItems(ACCOUNT_ITEMS)}</div>

            <hr className="border-[#E8E8E8]" />

            <SectionLabel>Support</SectionLabel>
            <div className="flex flex-col pb-2">{renderItems(SUPPORT_ITEMS)}</div>

            <hr className="border-[#E8E8E8]" />

            <button
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-[#DC2626] hover:bg-[#FEF2F2] transition cursor-pointer"
            >
                <LogOut size={16} />
                <span className="text-xs sm:text-sm font-medium">Sign out</span>
            </button>
        </div>
    )
}

export default AccountMenu
