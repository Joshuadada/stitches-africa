"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StorePreview from "./store-preview";
import Button from "@/shared/components/button";
import StoreLogo from "./store-logo";
import BrandStory from "./brand-story";
import ContactInformation from "./contact-information";
import NotificationPreferences from "./notification-preferences";
import ProductCategories from "./product-categories";
import StoreBanner from "./store-banner";
import { useVendorHeaderStore } from "@/store/vendor-header";
import { useAuthStore } from "@/store/auth";
import { storeSettingsSchema, StoreSettingsFormData } from "@/schema/vendor/store-settings.schema";

export type { StoreSettingsFormData };

type ProductCategory = "rtw" | "mto" | "bespoke";

const StoreSettings = () => {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [activeCategories, setActiveCategories] = useState<ProductCategory[]>(["rtw", "mto"]);

    const { vendorProfile } = useAuthStore()
    const { setVendorHeader } = useVendorHeaderStore()

    useEffect(() => {
        setVendorHeader({
            title: "Store Settings",
            highlight: vendorProfile?.businessName || ''
        })
    }, [vendorProfile])

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<StoreSettingsFormData>({
        resolver: zodResolver(storeSettingsSchema),
        mode: "onChange",
        defaultValues: {
            brandStory: "Adire Couture brings heritage indigo craft to the world each piece hand-dyed by artisans in Abeokuta.",
            address: "12 Adeniyi Jones Ave, Ikeja, Lagos",
            email: "hello@adirecouture.com",
            phone: "+234 802 123 4567",
            emailNotifications: true,
            inAppNotifications: true,
        },
    });

    const brandStory = watch("brandStory");

    const toggleCategory = (key: ProductCategory) =>
        setActiveCategories((prev) =>
            prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
        );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            <form onSubmit={handleSubmit((data) => console.log("Store settings:", data))} className="space-y-7">
                <StoreLogo preview={logoPreview} onUpload={setLogoPreview} />
                <StoreBanner preview={bannerPreview} onUpload={setBannerPreview} />
                <BrandStory register={register} watch={watch} error={errors.brandStory} />
                <ProductCategories active={activeCategories} onToggle={toggleCategory} />
                <ContactInformation register={register} errors={errors} />
                <NotificationPreferences register={register} />

                <Button type="submit" disabled={!isValid} className="w-full bg-[#B5894A] hover:bg-[#9F763B] py-3">
                    <p className="text-white text-sm font-medium">
                        {"Save changes"}
                    </p>
                </Button>
            </form>

            <StorePreview
                logoPreview={logoPreview}
                bannerPreview={bannerPreview}
                brandStory={brandStory}
                activeCategories={activeCategories}
            />
        </div>
    );
};

export default StoreSettings;