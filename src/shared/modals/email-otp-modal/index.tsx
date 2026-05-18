"use client";

import { useState } from "react";
import OTPInput from "react-otp-input";
import { Check } from "lucide-react";
import Button from "../../components/button";
import Image from "next/image";

type EmailOtpModalProps = {
    email: string;
    isPending: boolean;
    onClose: () => void;
    onSubmit: (otp: string) => void;
    onResend: () => void;
};

const EmailOtpModal = ({
    email,
    isPending,
    onClose,
    onSubmit,
    onResend
}: EmailOtpModalProps) => {
    const [otp, setOtp] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4">
            <div className="w-full max-w-[531] rounded-[10px] bg-white pt-2.5 sm:pt-3.5 md:pt-4.5 lg:pt-5.5 pb-9 px-6 sm:px-10 lg:px-14 shadow-2xl">
                {/* Success Icon */}
                <div className="flex justify-center mb-3.5 sm:mb-4 md:mb-4.5 lg:mb-5">
                    <Image src={'/svgs/success-mark.svg'} alt="success mark" height={93} width={88} />
                </div>

                {/* Title */}
                <div className="flex flex-col gap-4 sm:gap-4.5 md:gap-5 lg:gap-5.5 text-center mb-5.5 sm:mb-6 md:mb-6.5 lg:mb-7">
                    <h2 className="font-garamond text-2xl sm:text-3xl md:text-4xl lg::text-5xl text-[#171717] font-medium">
                        Email OTP Sent
                    </h2>

                    <p className="text-[10px] md:text-xs lg:text-sm text-[#B5894A]">
                        Enter the 6-digit code to verify your account.
                    </p>
                </div>

                {/* Email Box */}
                <div className="rounded-md bg-[#FAF7F2] px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3.5 lg:py-4.5 text-center mb-4 sm:mb-4.5 md:mb-5 lg:mb-5.5">
                    <p className="text-[10px] lg:text-xs font-semibold text-[#736551] mb-1.5 lg:mb-2">
                        We sent a code to{" "}
                        <span className="text-black">
                            {email}
                        </span>
                    </p>

                    <button onClick={onClose} className="text-[10px] lg:text-xs font-semibold text-[#736551] underline underline-offset-2 hover:text-black cursor-pointer">
                        Wrong email? Edit
                    </button>
                </div>

                {/* OTP Input */}
                <div className="mb-5.5 sm:mb-6 md:mb-6.5 lg:mb-7">
                    <OTPInput
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        numInputs={6}
                        shouldAutoFocus
                        renderSeparator={<span className="w-1 sm:w-2" />}
                        containerStyle={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "2px",
                        }}
                        renderInput={(props) => (
                            <input
                                {...props}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                autoComplete="one-time-code"
                                onKeyDown={(e) => {
                                    const allowedKeys = [
                                        "Backspace",
                                        "Delete",
                                        "ArrowLeft",
                                        "ArrowRight",
                                        "Tab",
                                    ];

                                    if (
                                        !/^\d$/.test(e.key) &&
                                        !allowedKeys.includes(e.key)
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
                                className="
                                    w-10!
                                    h-12!
                                    sm:w-12!
                                    sm:h-14!
                                    md:w-14!
                                    md:h-16!
                                    rounded-md
                                    border
                                    border-[#E7DED2]
                                    text-center
                                    text-lg
                                    md:text-xl
                                    font-semibold
                                    text-[#171717]
                                    outline-none
                                    focus:border-black
                                    transition
                                "
                            />
                        )}
                    />
                </div>

                <Button
                    type='submit'
                    onClick={() => onSubmit(otp)}
                    loading={isPending}
                    disabled={otp.length != 6 || isPending}
                    className='bg-[#171717] p-3'
                >
                    <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>
                        Verify
                    </p>
                </Button>

                {/* Resend */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-[#736551]">
                        Didn&apos;t receive a code?{" "}
                        <button onClick={onResend} className="font-medium text-[#B5894A] hover:underline">
                            Resend code
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailOtpModal;