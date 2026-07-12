"use client";

import React from 'react'
import AdminHeader from '@/layout/admin-header'
import AdminSidebar from '@/layout/admin-sidebar'

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-[#FAF7F2]">
      <AdminSidebar
        userName="John Doe"
        role="Super Admin"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        <main className="flex-1 min-w-0 overflow-y-auto p-7 sm:p-9 md:p-11 lg:p-13">
          {children}
        </main>
      </div>
    </div>
  );
}
