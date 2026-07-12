const STATUS_STYLES: Record<string, string> = {
    Published: "bg-[#D1FAE5] text-[#065F46]",
    Draft: "bg-[#FEF3C7] text-[#92400E]",
}

const articles = [
    {
        title: "Stitches Africa hits 5,000 orders milestone",
        meta: "Published · 8 Apr 2026 · 2,410 views · 5.1% engagement",
        status: "Published",
    },
    {
        title: "How AI Try-On is changing diaspora fashion",
        meta: "Draft · Last edited 5 Apr 2026",
        status: "Draft",
    },
    {
        title: "Meet the vendors: Fabric Couture story",
        meta: "Published · 1 Apr 2026 · 1,890 views · 3.8% engagement",
        status: "Published",
    },
]

const ArticlesList = () => {
    return (
        <div className="border border-[#F0DFC0] rounded-lg bg-[#FBEFE0] p-3 sm:p-4 flex flex-col gap-3">
            {articles.map((article, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 bg-[#FFFDF9] border border-[#F0DFC0] rounded-lg p-3 sm:p-4"
                >
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-md bg-[#E8DCC8] shrink-0" />

                    <div className="flex-1 min-w-0">
                        <p className="text-[#262626] font-medium text-xs sm:text-sm">{article.title}</p>
                        <p className="text-[#B5894A] text-[10px] sm:text-xs mt-0.5">{article.meta}</p>
                    </div>

                    <span className={`text-[10px] sm:text-xs font-medium rounded-full px-3 py-1 shrink-0 ${STATUS_STYLES[article.status]}`}>
                        {article.status}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default ArticlesList
