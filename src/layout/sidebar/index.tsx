"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Image from "next/image";

type RouteItem = {
  href: string;
  label: string;
  icon?: string;
};

type Params = {
  routes?: RouteItem[];
  open?: boolean;
  onClose?: () => void;
  badgeTier: string;
  portalName: string;
  userName: string;
}

const defaultRoutes: RouteItem[] = [
  { href: '/vendor/home', label: 'Dashboard', icon: "/svgs/dasboard/dashboard-icon.svg" },
  { href: '/vendor/products', label: 'Products', icon: "/svgs/dasboard/products-icon.svg" },
  { href: '/vendor/add-product', label: 'Add Product', icon: "/svgs/dasboard/add-product-icon.svg" },
  { href: '/vendor/orders', label: 'Orders', icon: "/svgs/dasboard/order-icon.svg" },
  { href: '/vendor/payouts', label: 'Payouts', icon: "/svgs/dasboard/payout-icon.svg" },
  { href: '/vendor/reviews', label: 'Reviews', icon: "/svgs/dasboard/review-icon.svg" },
  { href: '/vendor/store-settings', label: 'Store Settings', icon: "/svgs/dasboard/store-settings-icon.svg" },
  // { href: "/vendor/auto-import", label: "Auto-Import", icon: "/svgs/dasboard/import-icon.svg" },
];

const Sidebar = ({ routes, open, onClose, badgeTier, portalName, userName }: Params) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const items = routes ?? defaultRoutes;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const initials = userName
    ?.split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Desktop sidebar always visible (lg). On small screens it's a drawer controlled by `open`.
  return (
    <>
      {/* Backdrop for mobile when open */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity xl:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform w-74 lg:static lg:translate-x-0 xl:w-74 bg-[#292524] text-[#efe7db] flex flex-col justify-between py-3.5 sm:py-4.5 md:py-5.5 lg:py-6.5 overflow-y-auto ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div>
          <div>
            <div className="flex flex-col px-3 sm:px-5 md:px-7 lg:px-9 pb-2 sm:pb-3 md:pb-3.5 lg:pb-4">
              <Image src={"/svgs/sa-logo.svg"} alt="logo" width={85} height={85} className="-ml-2.5" />
              <p className="text-xs md:text-sm lg:text-base text-[#C8C0B5] font-medium uppercase">{portalName}</p>
            </div>

            <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2 px-3 sm:px-5 md:px-7 lg:px-9 py-2 sm:py-3 md:py-3.5 lg:py-4 border-y border-[#FAF7F2]/30">
              <h4 className="text-base md:text-lg lg:text-xl font-bold text-white uppercase">{userName}</h4>
              <div className="flex">
                <p className="text-[10px] md:text-xs lg:text-sm text-[#92400E] font-bold bg-[#FEF3C7] px-4 md:px-5 lg:px-6 py-1 md:py-1.5 lg:py-2 border border-[#F59E0B] rounded-[20px]"><span className="capitalize">{badgeTier}</span> tier</p>
              </div>
            </div>
          </div>

          <nav className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 flex flex-col">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3  px-3 sm:px-5 md:px-7 lg:px-9 py-3 sm:py-4 md:py-4.5 lg:py-5 transition-colors text-[#C8C0B5] font-medium ${active ? 'bg-[#B5894A33] text-white font-bold!' : 'hover:bg-white/5'
                    }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center">
                    <Image
                      src={item.icon || "/svgs/dashboard/dashboard-icon.svg"}
                      alt={item.label}
                      width={24}
                      height={24}
                      className={active ? "opacity-100" : "opacity-70"}
                    />
                  </span>
                  <span className="text-xs md:text-sm lg:text-base">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-3">
          <button
            onClick={() => router.replace("/")}
            className="px-3 sm:px-5 md:px-7 lg:px-9 rounded-md hover:bg-white/5 flex items-center gap-3 sm:gap-3.5 md:gap-4 lg:gap-4.5 py-3 sm:py-4 md:py-4.5 lg:py-5 w-full cursor-pointer"
            aria-label="Logout"
          >
            <LogOut size={18} className="text-[#B5894A]" />
            <p>Log out</p>
          </button>

          <hr className="text-[#FAF7F2]/30 my-2 sm:my-2.5 md:my-3 lg:my-3.5" />

          <div className="flex items-center gap-3 px-3 sm:px-5 md:px-7 lg:px-9 py-1.5 sm:py-2 md:py-2.5 lg:py-3">
            <div className="w-9 h-9 rounded-full border border-[#C8C0B5]/50 flex items-center justify-center text-[#C8C0B5] text-xs md:text-sm lg:text-base font-medium uppercase">{initials}</div>
            <div>
              <p className="text-xs md:text-sm lg:text-base font-medium text-[#C8C0B5] uppercase">{userName}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export type { RouteItem };
export default Sidebar;
