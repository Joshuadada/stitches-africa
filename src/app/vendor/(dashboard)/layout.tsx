"use client";

import React from 'react'
import VendorHeader from '@/layout/vendor-header'
import Sidebar, { RouteItem } from '@/layout/sidebar'

export default function VendorAuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-[#FAF7F2]">
      <Sidebar
        portalName='Vendor Portal'
        userName={'Joshua Dada'}
        badgeTier={'Bronze'}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        routes={[
          { href: '/vendor/home', label: 'Dashboard', icon: "/svgs/dasboard/dashboard-icon.svg" },
          { href: '/vendor/products', label: 'Products', icon: "/svgs/dasboard/products-icon.svg" },
          { href: '/vendor/add-product', label: 'Add Product', icon: "/svgs/dasboard/add-product-icon.svg" },
          { href: '/vendor/orders', label: 'Orders', icon: "/svgs/dasboard/order-icon.svg" },
          { href: '/vendor/payouts', label: 'Payouts', icon: "/svgs/dasboard/payout-icon.svg" },
          { href: '/vendor/reviews', label: 'Reviews', icon: "/svgs/dasboard/review-icon.svg" },
          { href: '/vendor/store-settings', label: 'Store Settings', icon: "/svgs/dasboard/store-settings-icon.svg" },
          // { href: "/vendor/auto-import", label: "Auto-Import", icon: "/svgs/dasboard/import-icon.svg" },
        ] as RouteItem[]}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <VendorHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        <main className="flex-1 min-w-0 overflow-y-auto p-7 sm:p-9 md:p-11 lg:p-13">{children}</main>
      </div>
    </div>
  );
}
