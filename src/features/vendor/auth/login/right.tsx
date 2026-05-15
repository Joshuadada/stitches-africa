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
import { useSubmitVendorLogin } from "@/hooks/api/useAuth";

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