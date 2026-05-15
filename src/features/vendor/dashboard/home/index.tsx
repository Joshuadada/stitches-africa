import RecentOrders from "./recent-orders"
import Review from "./review"
import StatCards from "./stat-cards"

const VendorHome = () => {
    return (
        <div className="space-y-8 lg:space-y-10">
            {/* ================= STATS CARDS ================= */}
            <StatCards />

            {/* ================= REVIEWS SECTION ================= */}
            <Review />

            {/* ================= RECENT ORDERS ================= */}
            <RecentOrders />
        </div>
    )
}

export default VendorHome