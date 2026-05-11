"use client";

import Button from '@/shared/components/button'
import Link from 'next/link'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/components/input';
import { RegisterFormData, registerSchema } from '@/schema/auth/register.schema';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isLoading },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log("Form Data:", data);
    };

    return (
        <div className='p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16'>
            <div className='max-w-[412] mx-auto'>
                <div className='flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-7 sm:mb-8 md:mb-9 lg:mb-10'>
                    <h2 className='text-center text-[#171717] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-garamond'>Create account</h2>
                    <p className='text-[10px] sm:text-xs md:text-sm text-center text-black flex gap-1 justify-center'>
                        <span>Already have an account?</span>
                        <Link href={''} className='font-bold underline'>Login</Link>
                    </p>
                </div>

                <div className='flex flex-col gap-3 sm:gap-4 md:gap-5'>
                    <Button onClick={() => { }} className='border border-[#E8E8E8]'>
                        <div className='flex justify-center items-center gap-2'>
                            <Image
                                src="/svgs/google-icon.svg"
                                alt="google icon"
                                width={26}
                                height={26}
                            />
                            <span className='font-semibold text-[10px] sm:text-xs lg:text-sm text-[#262626]'>Continue with Google</span>
                        </div>
                    </Button>

                    <Button onClick={() => { }} className='bg-[#0865FE]'>
                        <div className='flex justify-center items-center gap-2'>
                            <Image
                                src="/svgs/facebook-icon.svg"
                                alt="google icon"
                                width={26}
                                height={26}
                            />
                            <span className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>Continue with Facebook</span>
                        </div>
                    </Button>
                </div>

                <div className='flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 my-5 sm:my-6 md:my-7 lg:my-8'>
                    <hr className='flex-1 text-[#E8E8E8]' />
                    <p className='text-[10px] sm:text-xs lg:text-sm text-[#737373]'>or</p>
                    <hr className='flex-1 text-[#E8E8E8]' />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9'>
                        <Input
                            label="Full Name"
                            name="fullName"
                            required
                            register={register}
                            error={errors.fullName}
                        />

                        <Input
                            label="Email Address"
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

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            register={register}
                            error={errors.confirmPassword}
                        />
                    </div>

                    <div className='flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-9 mt-3 sm:mt-4 md:mt-5 lg:mt-6'>
                        <div className='flex justify-center gap-2'>
                            <input
                                type="checkbox"
                                id="agree"
                                {...register("agree")}
                            />
                            <p className='flex items-center gap-1 text-[8px] sm:text-[10px] md:text-xs text-black'>
                                <span>I agree to the</span>
                                <Link href={''} className='cursor-pointer underline font-semibold'>Terms of service</Link>
                                <span>and</span>
                                <Link href={''} className='cursor-pointer underline font-semibold'>Privacy Policy</Link>
                            </p>
                        </div>

                        <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3' disabled={!isValid} loading={isLoading}>
                            <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>Create Account</p>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register