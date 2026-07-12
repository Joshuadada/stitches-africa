"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Wallet,
  Layers,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export type AdminRouteItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const defaultRoutes: AdminRouteItem[] = [
  { href: "/admin/home", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/catalogue", label: "Catalogue", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/finance", label: "Finance", icon: Wallet },
  { href: "/admin/collections/create", label: "Collections", icon: Layers },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/system", label: "System", icon: Settings },
];

type Props = {
  routes?: AdminRouteItem[];
  open?: boolean;
  onClose?: () => void;
  userName: string;
  role: string;
};

const AdminSidebar = ({ routes, open, onClose, userName, role }: Props) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const items = routes ?? defaultRoutes;

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Backdrop for mobile when open */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity xl:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform w-74 lg:static lg:translate-x-0 xl:w-74 bg-[#292524] text-[#efe7db] flex flex-col justify-between py-3.5 sm:py-4.5 md:py-5.5 lg:py-6.5 overflow-y-auto ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div>
          <div>
            <div className="flex flex-col px-3 sm:px-5 md:px-7 lg:px-9 pb-2 sm:pb-3 md:pb-3.5 lg:pb-4">
              <Image src={"/svgs/sa-logo.svg"} alt="logo" width={85} height={85} className="-ml-2.5" />
              <p className="text-xs md:text-sm lg:text-base text-[#B5894A] font-medium uppercase">Admin Portal</p>
            </div>

            <div className="flex flex-col gap-1 px-3 sm:px-5 md:px-7 lg:px-9 py-2 sm:py-3 md:py-3.5 lg:py-4 border-y border-[#FAF7F2]/30">
              <h4 className="text-base md:text-lg lg:text-xl font-bold text-white uppercase">{userName}</h4>
              <p className="text-[10px] md:text-xs lg:text-sm text-[#B5894A] font-semibold">{role}</p>
            </div>
          </div>

          <nav className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 flex flex-col">
            {items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 sm:px-5 md:px-7 lg:px-9 py-3 sm:py-4 md:py-4.5 lg:py-5 transition-colors text-[#C8C0B5] font-medium ${active ? 'bg-[#B5894A33] text-white font-bold!' : 'hover:bg-white/5'}`}
                >
                  <span className="w-6 h-6 flex items-center justify-center">
                    <Icon size={20} className={active ? "text-[#B5894A]" : "text-[#C8C0B5]"} />
                  </span>
                  <span className="text-xs md:text-sm lg:text-base">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-3">
          <button
            onClick={() => router.replace("/admin/login")}
            className="px-3 sm:px-5 md:px-7 lg:px-9 rounded-md hover:bg-white/5 flex items-center gap-3 sm:gap-3.5 md:gap-4 lg:gap-4.5 py-3 sm:py-4 md:py-4.5 lg:py-5 w-full cursor-pointer"
            aria-label="Logout"
          >
            <LogOut size={18} className="text-[#B5894A]" />
            <p>Log out</p>
          </button>

          <hr className="text-[#FAF7F2]/30 my-2 sm:my-2.5 md:my-3 lg:my-3.5" />

          <div className="flex items-center gap-3 px-3 sm:px-5 md:px-7 lg:px-9 py-1.5 sm:py-2 md:py-2.5 lg:py-3">
            <div className="w-9 h-9 rounded-md border border-[#C8C0B5]/50 bg-white flex items-center justify-center overflow-hidden shrink-0">
              <Image src={"/svgs/sa-logo.svg"} alt="logo" width={22} height={22} />
            </div>
            <p className="text-xs md:text-sm lg:text-base font-medium text-[#C8C0B5] uppercase">{role}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
