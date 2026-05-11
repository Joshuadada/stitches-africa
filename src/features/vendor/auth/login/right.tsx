"use client"

import Button from '@/shared/components/button';
import Input from '@/shared/components/input';
import { LoginFormData, loginSchema } from '@/schema/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const Right = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isLoading },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = (data: LoginFormData) => {
        console.log("Form Data:", data);
    };

    return (
        <div className='pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-5 sm:pb-6 md:pb-7 lg:pb-8 px-8 sm:px-16 md:px-24 lg:px-36 h-full overflow-y-auto'>
            <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5.5 mb-14 sm:mb-16 md:mb-18 lg:mb-21'>
                <p className='text-[#B5894A] font-medium text-[10px] sm:text-xs md:text-sm lg:text-base'>VENDOR PORTAL SIGN IN</p>
                <h4 className='text-[#171717] font-garamond font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>Welcome back</h4>
                <p className='text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base'>Sign in to your vendor account to manage your store, orders, and payouts.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-5 sm:mb-6 md:mb-7 lg:mb-9">
                <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9'>
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

                <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9 mt-2 sm:mt-2.5 md:mt-3'>
                    <div className='flex justify-end'>
                        <Link href={''} className='cursor-pointer text-[10px] sm:text-xs md:text-sm text-black underline'>Forgot Password</Link>
                    </div>

                    <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3' disabled={!isValid} loading={isLoading}>
                        <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>Sign in to vendor portal</p>
                    </Button>
                </div>
            </form>

            <div>
                <div className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4.5 mb-6 sm:mb-8 md:mb-10 lg:mb-12'>
                    <hr className='flex-1 text-[#C8C0B5]' />
                    <p className='text-[#737373] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>Not yet a vendor? </p>
                    <hr className='flex-1 text-[#C8C0B5]' />
                </div>

                <div className='bg-[#FFF3E2] border border-[#B5894A] py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-3 sm:px-3.5 md:px-4 lg:px-4.5 rounded-2xl flex flex-col items-center gap-1 mb-14 sm:mb-18 md:mb-22 lg:mb-26'>
                    <p className='text-[#B5894A] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>Want to sell on Stitches Africa? <a className='cursor-pointer font-semibold underline'>Apply to become a verified vendor →</a></p>
                    <p className='text-[#866331] text-[6px] md:text-[8px] lg:text-[10px]'>Applications reviewed within 5–7 business days</p>
                </div>

                <div className='flex items-center justify-center gap-2'>
                    <p className='text-[#737373] text-[10px] sm:text-xl md:text-sm lg:text-base'>Want to become a Stitches Africa Influencer?</p>
                    <a className='text-[#737373] cursor-pointer underline text-[10px] sm:text-xl md:text-sm lg:text-base'>Apply here</a>
                </div>
            </div>
        </div>
    )
}

export default Right