import LookLeft from "./look-left"
import LookRight from "./look-right"

const TryOnLook = () => {
    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className="w-[614]">
                <LookLeft />
            </div>
            <div className="flex-1">
                <LookRight />
            </div>

        </div>
    )
}

export default TryOnLook