"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useAdminHeaderStore } from "@/store/admin-header"
import AdminStatCards, { AdminStat } from "../components/admin-stat-cards"
import ArticlesList from "./articles-list"
import ToggleRow from "@/shared/components/toggle-row"

const CONTENT_STATS: AdminStat[] = [
    { label: "PUBLISHED", value: "24", trend: "12% vs last month" },
    { label: "DRAFTS", value: "7" },
    { label: "TOTAL VIEWS", value: "18,420", trend: "1.2K this week" },
    { label: "EXPIRING SOON", value: "3", trend: "0.3%" },
]

const AdminContent = () => {
    const { setAdminHeader } = useAdminHeaderStore()
    const [autoPublish1, setAutoPublish1] = useState(true)
    const [autoPublish2, setAutoPublish2] = useState(true)
    const [autoPublish3, setAutoPublish3] = useState(true)

    useEffect(() => {
        setAdminHeader({
            eyebrow: "Create, edit and publish news and blog articles",
            title: "Content",
        })
    }, [])

    return (
        <div className="flex flex-col gap-8 lg:gap-10">
            <AdminStatCards stats={CONTENT_STATS} />

            <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-[#262626] font-medium text-sm sm:text-base">Articles</h3>
                    <button className="flex items-center gap-1.5 bg-[#B5894A] hover:bg-[#a07840] rounded-md px-4 py-2 text-white text-xs sm:text-sm font-medium transition cursor-pointer">
                        <Plus size={16} />
                        New article
                    </button>
                </div>
                <ArticlesList />
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
                <h3 className="text-[#262626] font-semibold text-xs sm:text-sm uppercase tracking-wide">
                    News Settings
                </h3>
                <div className="flex flex-col gap-4 sm:gap-5">
                    <ToggleRow
                        title="Auto-publish scheduled articles"
                        description="Publish articles automatically at scheduled time"
                        enabled={autoPublish1}
                        onToggle={() => setAutoPublish1((prev) => !prev)}
                    />
                    <ToggleRow
                        title="Auto-publish scheduled articles"
                        description="Publish articles automatically at scheduled time"
                        enabled={autoPublish2}
                        onToggle={() => setAutoPublish2((prev) => !prev)}
                    />
                    <ToggleRow
                        title="Auto-publish scheduled articles"
                        description="Publish articles automatically at scheduled time"
                        enabled={autoPublish3}
                        onToggle={() => setAutoPublish3((prev) => !prev)}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminContent
