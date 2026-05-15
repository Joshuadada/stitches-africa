"use client";

import { useState } from "react";
import Button from '@/shared/components/button'
import Link from 'next/link'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/components/input';
import { useSubmitVendorConfirmOtp, useSubmitVendorRegisterStart } from '@/hooks/api/useAuth';
import {
    RegisterStartFormData,
    registerStartSchema
} from '@/schema/auth/vendor-register.schema';

import EmailOtpModal from "@/shared/components/email-otp-modal";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";


const RegisterStart = () => {
    const [openOtpModal, setOpenOtpModal] = useState(false);
    const { setVendorRegisterEmail, setVendorRegisterPhone } = useAuthStore()
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<RegisterStartFormData>({
        resolver: zodResolver(registerStartSchema),
        mode: "onChange",
    });

    const email = watch("email");
    const phoneNumber = watch("phoneNumber");

    const { onSubmit, isPending } =
        useSubmitVendorRegisterStart(() => { }, () => {
            setVendorRegisterEmail(email)
            setVendorRegisterPhone(phoneNumber)
            setOpenOtpModal(true)
        });

    const { onSubmit: onSubmitConfirm, isPending: isConfirmPending } =
        useSubmitVendorConfirmOtp(() => { });

    return (
        <>
            <div className='p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16'>
                <div className='max-w-[412] mx-auto'>
                    <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-7 sm:mb-8 md:mb-9 lg:mb-10'>
                        <h2 className='text-center text-[#171717] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond'>
                            Create account
                        </h2>

                        <p className='text-[10px] sm:text-xs md:text-sm text-center text-black flex gap-1 justify-center'>
                            <span>Already have an account?</span>

                            <Link
                                href={'/vendor/login'}
                                className='font-bold underline'
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className='flex flex-col gap-3 sm:gap-4 md:gap-5'>
                        <Button
                            onClick={() => { }}
                            className='border border-[#E8E8E8]'
                        >
                            <div className='flex justify-center items-center gap-2'>
                                <Image
                                    src="/svgs/google-icon.svg"
                                    alt="google icon"
                                    width={26}
                                    height={26}
                                />

                                <span className='font-semibold text-[10px] sm:text-xs lg:text-sm text-[#262626]'>
                                    Continue with Google
                                </span>
                            </div>
                        </Button>

                        <Button
                            onClick={() => { }}
                            className='bg-[#0865FE]'
                        >
                            <div className='flex justify-center items-center gap-2'>
                                <Image
                                    src="/svgs/facebook-icon.svg"
                                    alt="facebook icon"
                                    width={26}
                                    height={26}
                                />

                                <span className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>
                                    Continue with Facebook
                                </span>
                            </div>
                        </Button>
                    </div>

                    <div className='flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 my-5 sm:my-6 md:my-7 lg:my-8'>
                        <hr className='flex-1 text-[#E8E8E8]' />

                        <p className='text-[10px] sm:text-xs lg:text-sm text-[#737373]'>
                            or
                        </p>

                        <hr className='flex-1 text-[#E8E8E8]' />
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9'>
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                required
                                register={register}
                                error={errors.email}
                            />

                            <Input
                                label="Phone Number"
                                name="phoneNumber"
                                type="text"
                                required
                                register={register}
                                error={errors.phoneNumber}
                            />
                        </div>

                        <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9 mt-3 sm:mt-4 md:mt-5 lg:mt-6'>
                            <Button
                                type='submit'
                                className='bg-[#171717] p-3'
                                disabled={!isValid || isPending}
                                loading={isPending}
                            >
                                <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>
                                    Create Account
                                </p>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* OTP Modal */}
            {openOtpModal && (
                <EmailOtpModal
                    email={email}
                    onClose={() => setOpenOtpModal(false)}
                    onSubmit={(verificationCode) => onSubmitConfirm({
                        verificationCode
                    })}
                    isPending={isConfirmPending}
                    onResend={() => onSubmit({
                        email,
                        phoneNumber: watch("phoneNumber"),
                    })}
                />
            )}
        </>
    )
}

export default RegisterStart;