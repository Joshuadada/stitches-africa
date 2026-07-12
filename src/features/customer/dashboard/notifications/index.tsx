"use client"

import { useState } from "react"
import Link from "next/link"
import ToggleRow from "@/shared/components/toggle-row"

const NotificationsPage = () => {
    const [pushEnabled, setPushEnabled] = useState(true)
    const [newsletterEnabled, setNewsletterEnabled] = useState(false)

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-6 sm:mb-8">
                <Link href="/profile" className="text-[#737373] text-[10px] sm:text-xs hover:text-[#262626] transition">
                    Profile
                </Link>
                <span className="text-[#737373] text-[10px] sm:text-xs">/</span>
                <span className="text-[#262626] text-[10px] sm:text-xs">Notifications</span>
            </div>

            {/* Page title */}
            <div className="mb-8 sm:mb-10 md:mb-12">
                <h1 className="font-garamond text-[#262626] font-medium text-3xl sm:text-4xl md:text-5xl">
                    Notifications
                </h1>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
                <ToggleRow
                    title="Push Notifications"
                    description="Enable Calls/Customer/preferences"
                    enabled={pushEnabled}
                    onToggle={() => setPushEnabled((prev) => !prev)}
                />
                <ToggleRow
                    title="Newsletter Emails"
                    description="Enable Calls/Customer/preferences"
                    enabled={newsletterEnabled}
                    onToggle={() => setNewsletterEnabled((prev) => !prev)}
                />
            </div>
        </div>
    )
}

export default NotificationsPage
