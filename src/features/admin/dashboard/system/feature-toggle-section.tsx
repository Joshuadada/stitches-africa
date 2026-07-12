import ToggleRow from "@/shared/components/toggle-row"

export type FeatureToggleItem = {
    key: string
    title: string
    description: string
}

type Props = {
    title: string
    items: FeatureToggleItem[]
    values: Record<string, boolean>
    onToggle: (key: string) => void
}

const FeatureToggleSection = ({ title, items, values, onToggle }: Props) => {
    return (
        <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-[#262626] font-semibold text-xs sm:text-sm uppercase tracking-wide">
                {title}
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4">
                {items.map((item) => (
                    <ToggleRow
                        key={item.key}
                        title={item.title}
                        description={item.description}
                        enabled={!!values[item.key]}
                        onToggle={() => onToggle(item.key)}
                        compact
                    />
                ))}
            </div>
        </div>
    )
}

export default FeatureToggleSection
