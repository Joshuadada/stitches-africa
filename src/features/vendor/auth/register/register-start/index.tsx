"use client";

import { useRef, useState } from "react";
import Button from '@/shared/components/button'
import Link from 'next/link'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/components/input';
import { useSubmitVendorConfirmOtp, useSubmitVendorRegisterStart, useSubmitVendorSocialLogin } from '@/hooks/api/useVendorAuth';
import {
    RegisterStartFormData,
    registerStartSchema
} from '@/schema/auth/vendor-register.schema';

import EmailOtpModal from "@/shared/modals/email-otp-modal";
import { useAuthStore } from "@/store/auth";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        fbAsyncInit: any;
        FB: any;
    }
}

const RegisterStart = () => {
    const [openOtpModal, setOpenOtpModal] = useState(false);
    const [socialError, setSocialError] = useState<string | null>(null);
    const { setVendorRegisterEmail, setVendorRegisterPhone } = useAuthStore()

    const googleButtonRef = useRef<HTMLDivElement>(null);

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

    // Social signup
    const { onSubmit: onSocialSubmit, isPending: isSocialPending } = useSubmitVendorSocialLogin();
    const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);

    function showLocalError(msg: string) {
        setSocialError(msg);
    }

    function clearLocalError() {
        setSocialError(null);
    }

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
                        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                            {/* Hidden Google button */}
                            <div className="hidden">
                                <div ref={googleButtonRef}>
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            setSocialError(null);
                                            const idToken = credentialResponse.credential;
                                            if (idToken) onSocialSubmit("google", idToken);
                                            else setSocialError("Google login failed");
                                        }}
                                        onError={() => setSocialError("Google login failed")}
                                    />
                                </div>
                            </div>

                            {/* Your original custom button */}
                            <Button
                                onClick={() => {
                                    setSocialLoading('google');
                                    // Find and click the hidden Google button
                                    googleButtonRef.current?.querySelector('div[role="button"]')?.dispatchEvent(
                                        new MouseEvent('click', { bubbles: true, cancelable: true })
                                    );
                                }}
                                className='border border-[#E8E8E8]'
                                loading={isSocialPending && socialLoading === 'google'}
                            >
                                <div className='flex items-center gap-2'>
                                    <Image src="/svgs/google-icon.svg" alt="google" width={26} height={26} />
                                    <span className='font-semibold text-[10px] sm:text-xs lg:text-sm text-[#262626]'>
                                        Continue with Google
                                    </span>
                                </div>
                            </Button>
                        </GoogleOAuthProvider>

                        <div className='flex justify-center'>
                            <Button
                                onClick={async () => {
                                    setSocialLoading('facebook');
                                    clearLocalError();

                                    if (!window.FB) {
                                        window.fbAsyncInit = function () {
                                            window.FB.init({
                                                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
                                                cookie: true,
                                                xfbml: false,
                                                version: 'v17.0',
                                            });
                                        };

                                        const d = document;
                                        const s = 'script';
                                        const id = 'facebook-jssdk';
                                        if (!d.getElementById(id)) {
                                            const js = d.createElement(s) as HTMLScriptElement;
                                            js.id = id;
                                            js.src = 'https://connect.facebook.net/en_US/sdk.js';
                                            d.body.appendChild(js);
                                            await new Promise((resolve) => {
                                                js.onload = resolve;
                                                js.onerror = () => resolve(undefined);
                                            });
                                        }
                                    }

                                    if (!window.FB) {
                                        showLocalError('Could not load Facebook SDK');
                                        return;
                                    }

                                    window.FB.login((response: any) => {
                                        if (response?.status === 'connected') {
                                            const accessToken = response.authResponse?.accessToken;
                                            if (accessToken) onSocialSubmit('facebook', accessToken);
                                            else showLocalError('No access token received from Facebook');
                                        } else {
                                            showLocalError('Facebook login failed or cancelled');
                                        }
                                    }, { scope: 'email,public_profile' });
                                }}
                                className='bg-[#1877F2] text-white'
                                loading={isSocialPending && socialLoading === 'facebook'}
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    <Image src="/svgs/facebook-icon.svg" alt="facebook icon" width={20} height={20} />
                                    <span className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>
                                        Continue with Facebook
                                    </span>
                                </div>
                            </Button>
                        </div>

                        {socialError && <p className='text-red-600 text-sm'>{socialError}</p>}
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