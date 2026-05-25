"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { Home, Package, PlusCircle, ShoppingBag, CreditCard, Star, Settings, Download, LogOut } from "lucide-react";

type RouteItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

const defaultRoutes: RouteItem[] = [
  { href: "/vendor/home", label: "Dashboard", icon: <Home size={16} /> },
  { href: "/vendor/products", label: "Products", icon: <Package size={16} /> },
  { href: "/vendor/add-product", label: "Add Product", icon: <PlusCircle size={16} /> },
  { href: "/vendor/orders", label: "Orders", icon: <ShoppingBag size={16} /> },
  { href: "/vendor/payouts", label: "Payouts", icon: <CreditCard size={16} /> },
  { href: "/vendor/reviews", label: "Reviews", icon: <Star size={16} /> },
  { href: "/vendor/settings", label: "Store Settings", icon: <Settings size={16} /> },
  { href: "/vendor/auto-import", label: "Auto-Import", icon: <Download size={16} /> },
];

const Sidebar = ({ routes, open, onClose }: { routes?: RouteItem[]; open?: boolean; onClose?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const items = routes ?? defaultRoutes;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  // Desktop sidebar always visible (lg). On small screens it's a drawer controlled by `open`.
  return (
    <>
      {/* Backdrop for mobile when open */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform w-64 lg:static lg:translate-x-0 lg:w-64 bg-[#1f1a17] text-[#efe7db] flex flex-col justify-between ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          <div className="px-6 py-6 flex items-center gap-3 border-b border-black/10">
            <div className="w-10 h-10 bg-[#b8924a] rounded flex items-center justify-center text-black font-bold">SA</div>
            <div>
              <p className="text-xs font-semibold">VENDOR PORTAL</p>
              <p className="text-sm font-bold mt-1">ADIRE COUTURE</p>
            </div>
          </div>

          <nav className="mt-4 px-2 flex flex-col gap-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-r-full transition-colors ${
                    active ? 'bg-[#b8924a] text-black font-semibold' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center text-inherit">{item.icon ?? <Home size={16} />}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4 py-6 border-t border-black/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2f2f2f] flex items-center justify-center">AC</div>
              <div>
                <p className="text-sm font-medium">ADIRE COUTURE</p>
                <p className="text-xs text-[#d6c6a8]">View store</p>
              </div>
            </div>

            <button
              onClick={() => router.replace("/")}
              className="p-2 rounded-md hover:bg-white/5"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export type { RouteItem };
export default Sidebar;
