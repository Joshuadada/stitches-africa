"use client"

import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { ResetPasswordFormData, resetPasswordSchema } from "@/schema/auth/reset-password.schema";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import Image from "next/image";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isLoading },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        console.log("Form Data:", data);
    };

    return (
        <div className='p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16'>
            <div className='max-w-[412] mx-auto'>
                <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-7 sm:mb-8 md:mb-9 lg:mb-10'>
                    <h2 className='text-center text-[#171717] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond'>Reset password</h2>
                    <p className='text-[10px] sm:text-xs md:text-sm text-center text-black'>Enter your account email and we’ll send you a rest link</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-4 sm:mb-5 md:mb-6 lg:mb-7 flex flex-col gap-3 sm:gap-4 md:gap-5">
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        register={register}
                        error={errors.email}
                    />

                    <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3' disabled={!isValid} loading={isLoading}>
                        <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>Send reset link</p>
                    </Button>
                </form>

                <div className="flex justify-center">
                    <Link href={'/login'} className="cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
                        <Image src={'/svgs/back-icon.svg'} alt="back icon" height={9.3} width={9.3}></Image>
                        <p className="underline text-[10px] sm:text-xs md:text-sm text-black">Back to login</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword