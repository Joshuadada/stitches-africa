"use client"

import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import { ChangePasswordFormData, changePasswordSchema } from "@/schema/auth/change-password.schema";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import Image from "next/image";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isLoading },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",
    });

    const onSubmit = (data: ChangePasswordFormData) => {
        console.log("Form Data:", data);
    };

    return (
        <div className='p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16'>
            <div className='max-w-[412] mx-auto'>
                <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-7 sm:mb-8 md:mb-9 lg:mb-10'>
                    <h2 className='text-center text-[#171717] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond'>New password</h2>
                    <p className='text-[10px] sm:text-xs md:text-sm text-center text-black'>Choose a new password for your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
                    <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9'>
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            register={register}
                            error={errors.password}
                        />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            register={register}
                            error={errors.confirmPassword}
                        />
                    </div>

                    <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3' disabled={!isValid} loading={isLoading}>
                        <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>Send reset link</p>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword