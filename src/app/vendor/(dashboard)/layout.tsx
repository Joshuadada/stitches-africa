"use client";

import React, { useEffect } from 'react'
import VendorHeader from '@/layout/vendor-header'
import Sidebar, { RouteItem } from '@/layout/sidebar'
import { useVendorProfile } from '@/hooks/api/vendor/useVendorAuth';
import { showToast } from '@/utils/toast';
import Loader from '@/shared/components/loader';

const ROUTES: RouteItem[] = [
  { href: '/vendor/home', label: 'Dashboard', icon: "/svgs/dasboard/dashboard-icon.svg" },
  { href: '/vendor/products', label: 'Products', icon: "/svgs/dasboard/products-icon.svg" },
  { href: '/vendor/add-product', label: 'Add Product', icon: "/svgs/dasboard/add-product-icon.svg" },
  { href: '/vendor/orders', label: 'Orders', icon: "/svgs/dasboard/order-icon.svg" },
  { href: '/vendor/payouts', label: 'Payouts', icon: "/svgs/dasboard/payout-icon.svg" },
  { href: '/vendor/reviews', label: 'Reviews', icon: "/svgs/dasboard/review-icon.svg" },
  { href: '/vendor/store-settings', label: 'Store Settings', icon: "/svgs/dasboard/store-settings-icon.svg" },
];

export default function VendorAuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const {
    data: vendorProfile,
    isLoading,  // true only on the very first fetch, no cached data yet
    error,
  } = useVendorProfile();

  useEffect(() => {
    if (error) {
      showToast({
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  }, [error]);

  // Block the shell only on the initial load — not on background refetches
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen bg-[#FAF7F2]">
      <Sidebar
        portalName='Vendor Portal'
        userName={vendorProfile?.businessName ?? ''}
        badgeTier={vendorProfile?.badgeTier ?? ''}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        routes={ROUTES}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <VendorHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        <main className="flex-1 min-w-0 overflow-y-auto p-7 sm:p-9 md:p-11 lg:p-13">
          {children}
        </main>
      </div>
    </div>
  );
}