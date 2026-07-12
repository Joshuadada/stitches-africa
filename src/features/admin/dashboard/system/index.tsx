"use client"

import { useEffect, useState } from "react"
import { useAdminHeaderStore } from "@/store/admin-header"
import FeatureToggleSection, { FeatureToggleItem } from "./feature-toggle-section"

const CUSTOMER_FACING_FEATURES: FeatureToggleItem[] = [
    { key: "aiVirtualTryOn", title: "AI Virtual Try-On", description: "Enable photo upload and virtual fitting" },
    { key: "aiSizeSuggestions", title: "AI size suggestions", description: "Show size estimates from photo analysis" },
    { key: "referralProgramme", title: "Referral programme", description: "Allow customers to share and earn rewards" },
    { key: "bogoPromotionsDisplay", title: "BOGO promotions display", description: "Allow customers to share and earn rewards" },
    { key: "waitlistPreOrder", title: "Waitlist / pre-order", description: "Let customers join vendor waitlists" },
]

const VENDOR_FACING_FEATURES: FeatureToggleItem[] = [
    { key: "vendorDashboardAnalytics", title: "Vendor dashboard analytics", description: "Show sales charts on vendor portal" },
    { key: "consignmentMode", title: "Consignment mode", description: "Allow vendors to offer consignment orders" },
    { key: "automatedPayouts", title: "Automated payouts", description: "Trigger vendor payments on delivery confirmation" },
]

const NOTIFICATION_SETTINGS: FeatureToggleItem[] = [
    { key: "newVendorRegistrationAlerts", title: "New vendor registration alerts", description: "Email admin on new vendor signup" },
    { key: "lowStockAlerts", title: "Low stock alerts", description: "Notify when products hit ≤5 units" },
    { key: "disputeEscalationAlerts", title: "Dispute escalation alerts", description: "Alert admin on unresolved disputes after 48h" },
    { key: "payoutFailureNotifications", title: "Payout failure notifications", description: "Alert when a vendor payout fails to process" },
]

const DEFAULT_ENABLED_KEYS = [
    "aiVirtualTryOn",
    "aiSizeSuggestions",
    "referralProgramme",
    "bogoPromotionsDisplay",
    "vendorDashboardAnalytics",
    "consignmentMode",
    "newVendorRegistrationAlerts",
    "lowStockAlerts",
]

const AdminSystem = () => {
    const { setAdminHeader } = useAdminHeaderStore()
    const [values, setValues] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(DEFAULT_ENABLED_KEYS.map((key) => [key, true]))
    )

    useEffect(() => {
        setAdminHeader({
            eyebrow: "Feature flags and platform-wide settings",
            title: "System",
            actions: [{ label: "Refresh", variant: "outline" }],
        })
    }, [])

    const toggle = (key: string) =>
        setValues((prev) => ({ ...prev, [key]: !prev[key] }))

    return (
        <div className="flex flex-col gap-8 lg:gap-10">
            <FeatureToggleSection
                title="Customer-Facing Features"
                items={CUSTOMER_FACING_FEATURES}
                values={values}
                onToggle={toggle}
            />
            <FeatureToggleSection
                title="Vendor-Facing Features"
                items={VENDOR_FACING_FEATURES}
                values={values}
                onToggle={toggle}
            />
            <FeatureToggleSection
                title="Notification Settings"
                items={NOTIFICATION_SETTINGS}
                values={values}
                onToggle={toggle}
            />
        </div>
    )
}

export default AdminSystem
