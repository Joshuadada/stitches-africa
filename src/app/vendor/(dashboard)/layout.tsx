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
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        routes={[
          { href: '/vendor/home', label: 'Dashboard', icon: <></> },
          { href: '/vendor/products', label: 'Products', icon: <></> },
          { href: '/vendor/add-product', label: 'Add Product', icon: <></> },
          { href: '/vendor/orders', label: 'Orders', icon: <></> },
          { href: '/vendor/payouts', label: 'Payouts', icon: <></> },
          { href: '/vendor/reviews', label: 'Reviews', icon: <></> },
          { href: '/vendor/settings', label: 'Store Settings', icon: <></> },
        ] as RouteItem[]}
      />
      <div className="flex-1 flex flex-col">
        <VendorHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        <main className="flex-1 overflow-y-auto p-7 sm:p-9 md:p-11 lg:p-13">{children}</main>
      </div>
    </div>
  );
}
