"use client"

import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import {
    RegisterBusinessDetailsFormData,
    registerBusinessDetailsSchema,
} from "@/schema/auth/vendor-register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BUSINESS_CATEGORIES = ["Ready to wear", "Made to Order", "Bespoke"] as const;

const VendorBusinessDetailsPage = () => {
    const { setVendorOnboardingData, vendorOnboardingData, vendorRegisterEmail, vendorRegisterPhone } = useAuthStore()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<RegisterBusinessDetailsFormData>({
        resolver: zodResolver(registerBusinessDetailsSchema),
        mode: "onChange",
        defaultValues: {
            businessCategory: [],
            phoneNumber: vendorRegisterPhone,
            businessEmail: vendorRegisterEmail
        },
    });

    useEffect(() => {
        if (!vendorRegisterEmail || !vendorRegisterPhone) {
            router.replace('/vendor/register/start')
        }
    }, [vendorRegisterEmail, vendorRegisterPhone, router])

    useEffect(() => {
        if (vendorOnboardingData) {
            reset({
                ...vendorOnboardingData,
            });
        }
    }, [vendorOnboardingData, reset]);

    const selectedCategories = watch("businessCategory");

    const toggleCategory = (category: (typeof BUSINESS_CATEGORIES)[number]) => {
        const current = selectedCategories ?? [];
        const updated = current.includes(category)
            ? current.filter((c) => c !== category)
            : [...current, category];
        setValue("businessCategory", updated, { shouldValidate: true });
    };

    const onSubmit = (data: RegisterBusinessDetailsFormData) => {
        setVendorOnboardingData(data)
        router.replace('/vendor/register/document-upload')
        // handle submission
    };

    return (
        <div>
            <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 mb-5 sm:mb-8 md:mb-11 lg:mb-14">
                <h4 className="text-black font-garamond text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Business details
                </h4>
                <p className="text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                    This information will be used to verify your business and create your
                    vendor profile on the platform
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full mb-5 sm:mb-6 md:mb-7 lg:mb-9"
            >
                <div className="grid xl:grid-cols-12 gap-x-8 sm:gap-x-12 md:gap-x-16 2xl:gap-x-20 gap-y-3 sm:gap-y-5 md:gap-y-7 lg:gap-y-9 mb-12 sm:mb-16 md:mb-20 lg:mb-23">
                    {/* Row 1 */}
                    <div className="xl:col-span-6">
                        <Input
                            label="Business Name"
                            name="businessName"
                            type="text"
                            required
                            register={register}
                            error={errors.businessName}
                        />
                    </div>

                    <div className="xl:col-span-6">
                        <Input
                            label="CAC Registration Number"
                            name="cacRegistrationNumber"
                            type="text"
                            required
                            register={register}
                            error={errors.cacRegistrationNumber}
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="xl:col-span-12">
                        <Input
                            label="Physical Business Address"
                            name="physicalBusinessAddress"
                            type="text"
                            required
                            register={register}
                            error={errors.physicalBusinessAddress}
                        />
                    </div>

                    {/* Row 3 */}
                    <div className="xl:col-span-4">
                        <Input
                            label="City"
                            name="city"
                            type="text"
                            required
                            register={register}
                            error={errors.city}
                        />
                    </div>

                    <div className="xl:col-span-4">
                        <Input
                            label="State"
                            name="state"
                            type="text"
                            required
                            register={register}
                            error={errors.state}
                        />
                    </div>

                    <div className="xl:col-span-4">
                        <Input
                            label="Years in Operation"
                            name="yearsInOperation"
                            type="string"
                            required
                            register={register}
                            registerOptions={{ valueAsNumber: true }}
                            error={errors.yearsInOperation}
                        />
                    </div>

                    {/* Business Category */}
                    <div className="xl:col-span-12">
                        <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm flex items-center gap-1 mb-2.5 sm:mb-3 md:mb-3.5 lg:mb-4">
                            <span className="text-black">Business Category</span>
                            <span className="text-[#B5894A] font-normal">
                                (Select all that applies)
                            </span>
                        </p>

                        <div className="flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
                            {BUSINESS_CATEGORIES.map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 cursor-pointer text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#737373]"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories?.includes(category) ?? false}
                                        onChange={() => toggleCategory(category)}
                                        className="w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5 accent-black"
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>

                        {errors.businessCategory && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.businessCategory.message}
                            </p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="xl:col-span-12 border-t border-gray-200 my-6" />

                    {/* Row 4 */}
                    <div className="xl:col-span-6">
                        <Input
                            label="First Name"
                            name="firstName"
                            type="text"
                            required
                            register={register}
                            error={errors.firstName}
                        />
                    </div>

                    <div className="xl:col-span-6">
                        <Input
                            label="Last Name"
                            name="lastName"
                            type="text"
                            required
                            register={register}
                            error={errors.lastName}
                        />
                    </div>

                    <div className="xl:col-span-6">
                        <Input
                            label="Business Email"
                            name="businessEmail"
                            type="email"
                            readonly={true}
                            required
                            register={register}
                            error={errors.businessEmail}
                        />
                    </div>

                    {/* Row 5 */}
                    <div className="xl:col-span-6">
                        <Input
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            readonly={true}
                            required
                            register={register}
                            error={errors.phoneNumber}
                        />
                    </div>

                    <div className="xl:col-span-6">
                        <Input
                            label="Whatsapp Number"
                            name="whatsappNumber"
                            type="tel"
                            required
                            register={register}
                            error={errors.whatsappNumber}
                        />
                        <p className="text-[#737373] text-xs mt-3 sm:mt-3.5 md:mt-4 lg:mt-4.5">
                            Used by admin to reach you about orders
                        </p>
                    </div>

                    <div className="xl:col-span-6">
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            register={register}
                            error={errors.password}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3 max-w-[412]' disabled={!isValid || isSubmitting} loading={isSubmitting}>
                        <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>Continue to documents →</p>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default VendorBusinessDetailsPage;