import OrderConfirmationPage from "@/features/customer/dashboard/checkout/confirmation"

const OrderConfirmation = () => {
    return (
        <div className="flex flex-col">
            <div className="h-6 sm:h-8 md:h-10 lg:h-12 bg-[#F5F5F5]"></div>
            <OrderConfirmationPage />
        </div>
    )
}

export default OrderConfirmation
