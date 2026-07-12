type Props = {
    title: string
    description: string
    enabled: boolean
    onToggle: () => void
    compact?: boolean
}

const ToggleRow = ({ title, description, enabled, onToggle, compact = false }: Props) => {
    return (
        <div
            className={`flex items-center justify-between gap-4 border border-[#B5894A] rounded-[20px] bg-white ${compact ? "px-4 sm:px-5 py-3 sm:py-3.5" : "px-5 sm:px-6 py-4 sm:py-5"
                }`}
        >
            <div className="flex flex-col gap-1">
                <p className={`text-black font-medium ${compact ? "text-xs sm:text-sm" : "text-base sm:textlg md:text-xl lg:text-2xl"}`}>
                    {title}
                </p>
                <p className={`text-[#B5894A] ${compact ? "text-[8px] sm:text-[10px]" : "text-[10px] md:text-xs lg:text-sm"}`}>
                    {description}
                </p>
            </div>
            <button
                onClick={onToggle}
                role="switch"
                aria-checked={enabled}
                aria-label={title}
                className={`relative rounded-full transition-colors shrink-0 cursor-pointer ${compact ? "h-5 w-9" : "h-6 w-11 sm:h-7 sm:w-12"} ${enabled ? "bg-[#B5894A]" : "bg-[#D4D4D4]"
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform ${compact ? "h-4 w-4" : "h-5 w-5 sm:h-6 sm:w-6"} ${enabled ? (compact ? "translate-x-4" : "translate-x-5") : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    )
}

export default ToggleRow
