"use client";

import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import {
    LoginFormData,
    loginSchema,
} from "@/schema/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSubmitVendorLogin } from "@/hooks/api/vendor/useVendorAuth";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useSubmitVendorSocialLogin } from "@/hooks/api/vendor/useVendorAuth";
import { useRef, useState } from "react";
import Image from 'next/image';

declare global {
    interface Window {
        fbAsyncInit: any;
        FB: any;
    }
}

const Right = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const { onSubmit, isPending } =
        useSubmitVendorLogin(reset);
    const { onSubmit: onSocialSubmit, isPending: isSocialPending } = useSubmitVendorSocialLogin();
    const [socialError, setSocialError] = useState<string | null>(null);
    const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);

    const googleButtonRef = useRef<HTMLDivElement>(null);

    return (
        <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-5 sm:pb-6 md:pb-7 lg:pb-8 px-8 sm:px-16 md:px-24 lg:px-36 h-full overflow-y-auto bg-[#FAF7F2]">
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5.5 mb-14 sm:mb-16 md:mb-18 lg:mb-21">
                <p className="text-[#B5894A] font-medium text-[10px] sm:text-xs md:text-sm lg:text-base">
                    VENDOR PORTAL SIGN IN
                </p>

                <h4 className="text-[#171717] font-garamond font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    Welcome back
                </h4>

                <p className="text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base">
                    Sign in to your vendor account to manage your
                    store, orders, and payouts.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full mb-5 sm:mb-6 md:mb-7 lg:mb-9"
            >
                {/* Social logins */}
                <div className="flex flex-col gap-4 mb-5 sm:mb-6 md:mb-7 lg:mb-9">
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

                    <div className="flex justify-center">
                        <Button
                            onClick={async () => {
                                setSocialLoading('facebook');
                                setSocialError(null);

                                if (!window.FB) {
                                    window.fbAsyncInit = function () {
                                        window.FB.init({
                                            appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
                                            cookie: true,
                                            xfbml: false,
                                            version: "v17.0",
                                        });
                                    };

                                    const d = document;
                                    const s = "script";
                                    const id = "facebook-jssdk";
                                    if (!d.getElementById(id)) {
                                        const js = d.createElement(s) as HTMLScriptElement;
                                        js.id = id;
                                        js.src = "https://connect.facebook.net/en_US/sdk.js";
                                        d.body.appendChild(js);
                                        await new Promise((resolve) => {
                                            js.onload = resolve;
                                            js.onerror = () => resolve(undefined);
                                        });
                                    }
                                }

                                if (!window.FB) {
                                    setSocialError("Could not load Facebook SDK");
                                    return;
                                }

                                window.FB.login((response: any) => {
                                    if (response?.status === "connected") {
                                        const accessToken = response.authResponse?.accessToken;
                                        if (accessToken) onSocialSubmit("facebook", accessToken);
                                        else setSocialError("No access token received from Facebook");
                                    } else {
                                        setSocialError("Facebook login failed or cancelled");
                                    }
                                }, { scope: "email,public_profile" });
                            }}
                            className="bg-[#1877F2] text-white"
                            loading={isSocialPending && socialLoading === 'facebook'}
                        >
                            <div className='flex items-center gap-2'>
                                <Image src="/svgs/facebook-icon.svg" alt="facebook" width={20} height={20} />
                                <span className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>Continue with Facebook</span>
                            </div>
                        </Button>
                    </div>

                    {socialError && <p className="text-red-600 text-sm">{socialError}</p>}
                </div>
                <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9">
                    <Input
                        label="Business Email Address"
                        name="email"
                        type="email"
                        required
                        register={register}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        required
                        register={register}
                        error={errors.password}
                    />
                </div>

                <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9 mt-2 sm:mt-2.5 md:mt-3">
                    <div className="flex justify-end">
                        <Link
                            href=""
                            className="cursor-pointer text-[10px] sm:text-xs md:text-sm text-black underline"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="bg-[#171717] p-3"
                        disabled={!isValid || isPending}
                        loading={isPending}
                    >
                        <p className="font-semibold text-[10px] sm:text-xs lg:text-sm text-white">
                            Sign in to vendor portal
                        </p>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Right;