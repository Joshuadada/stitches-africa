import Button from '@/shared/components/button'
import Image from 'next/image';
import { Copy, Mail } from 'lucide-react';

type ApplicationSubmittedProps = {
    vendorName: string;
    applicationReference: string;
    onClose: () => void;
    onCopyReference: () => void;
};

const ApplicationSubmittedModal = ({
    vendorName,
    applicationReference,
    onClose,
    onCopyReference
}: ApplicationSubmittedProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[3px] px-4 py-6">
            <div className="relative w-full max-w-164.75 rounded-3xl bg-white px-5 sm:px-8 md:px-14 lg:px-20 xl:px-26 pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 shadow-[0px_20px_80px_rgba(0,0,0,0.18)] animate-in fade-in zoom-in-95 duration-300">

                {/* Success Icon */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative h-22.5 w-22.5 sm:h-27.5 sm:w-27.5">
                        <Image
                            src={'/svgs/success-mark.svg'}
                            alt="success mark"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center">
                    {/* Title */}
                    <h2 className="font-garamond text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#171717] font-medium mb-2.5 sm:mb-3.5 md:mb-4.5 lg:mb-5.5">
                        Application Submitted
                    </h2>

                    {/* Subtitle */}
                    <p className="max-w-76.25 mx-auto text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#B5894A] mb-2.5 sm:mb-3.5 md:mb-4.5 lg:mb-5.5">
                        Thank you,{" "}
                        <span className="font-semibold text-black">
                            {vendorName || "Joshua"}
                        </span>
                        . We&apos;ve received your application to sell on Stitches Africa.
                    </p>

                    {/* Reference */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                        <p className="text-[#B5894A] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                            Application reference:
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                {applicationReference || "SA-VND-2026-00482"}
                            </span>

                            <button
                                onClick={onCopyReference}
                                className="flex items-center justify-center rounded-md p-1.5 text-[#B5894A] transition hover:bg-[#F7F1E8]"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="rounded-2xl bg-[#FAF7F2] px-2.5 sm:px-3 md:px-3.5 lg:px-4.5 py-2 sm:py-2.5 md:py-3 lg:py-4 text-left mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                        <div className="flex items-start gap-4">
                            <Image src={"/svgs/envelope-icon.svg"} alt='envelope icon' height={8} width={10} className='mt-1' />

                            <p className="text-[8px] md:text-[10px] lg::text-xs text-[#6A5D4D] font-medium">
                                Our team will review your application and email
                                within{" "}
                                <span className="font-bold text-[#171717]">
                                    3–5 working days
                                </span>.
                                Once approved, you can log in to your vendor
                                account.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-7">
                        <Button
                            type='button'
                            onClick={onClose}
                            className='bg-[#171717] p-3'
                        >
                            <p className='font-semibold text-[10px] sm:text-xs lg:text-sm text-white'>
                                Return to homepage
                            </p>
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-[8px] sm:text-[10px] lg:text-xs text-[#736551] font-semibold ">
                            Questions about your application?{" "}
                            <button className="text-[#B5894A] hover:underline underline-offset-4 transition cursor-pointer">
                                Contact support
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationSubmittedModal