import VendorProfilePage from "@/features/customer/dashboard/vendors/vendor-profile"

const VendorPage = () => {
    return (
        <div className="flex flex-col">
            <div className="h-6 sm:h-8 md:h-10 lg:h-12 bg-[#F5F5F5]"></div>
            <VendorProfilePage />
        </div>
    )
}

export default VendorPage
