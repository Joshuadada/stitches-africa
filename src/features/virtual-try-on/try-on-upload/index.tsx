"use client";

import Button from '@/shared/components/button'
import ImageUpload from './image-upload';
import { useState } from 'react';

const TryOnUpload = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleImageChange = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleSubmit = () => {
        if (!file) {
            console.log("No file selected");
            return;
        }

        console.log("Submitting file:", file);
        // TODO: upload logic here
    };

    return (
        <div className='px-8 sm:px-12 md:px-20 lg:px-29 py-8 sm:py-12 md:py-16 lg:py-24'>
            <div className='max-w-[954] flex flex-col items-center mx-auto gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20 lg:mb-24'>
                <h2 className='font-garamond font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black text-center'>Upload your try-on photo</h2>
                <p className='text-center text-[#262626] text-sm sm:text-base md:text-lg lg:text-xl'>Use a clear, well-lit photo showing your full upper body. This is saved securely and used only to generate try-on previews across product listings.</p>
            </div>

            <div className='mb-18 sm:mb-22 md:mb-26 lg:mb-30 w-full flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8'>
                <div className='w-full'>
                    <ImageUpload onChange={handleImageChange} />
                </div>
                <a href="" className='text-black underline cursor-pointer text-sm sm:text-base md:text-lg lg:text-xl text-center'>Skip for now — I'll add my photo later from My Account</a>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-7 gap-y-6 sm:gap-y-7 md:gap-y-8 lg:gap-y-10 mb-12 sm:mb-16 md:mb-20 lg:mb-23'>
                <div className='bg-white flex flex-col gap-1 sm:gap-1.5 md:gap-2 py-4 sm:py-5 md:py-6 px-10 sm:px-12 md:px-14'>
                    <h4 className='text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl'>Full Upper body visible</h4>
                    <p className='text-[#525252] text-[10px] sm:text-xs md:text-sm'>From shoulders to hips ideally</p>
                </div>

                <div className='bg-white flex flex-col gap-1 sm:gap-1.5 md:gap-2 py-4 sm:py-5 md:py-6 px-10 sm:px-12 md:px-14'>
                    <h4 className='text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl'>Good, even lighting</h4>
                    <p className='text-[#525252] text-[10px] sm:text-xs md:text-sm'>avoid harsh shadows or backlight</p>
                </div>

                <div className='bg-white flex flex-col gap-1 sm:gap-1.5 md:gap-2 py-4 sm:py-5 md:py-6 px-10 sm:px-12 md:px-14'>
                    <h4 className='text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl'>Face and shoulders clear</h4>
                    <p className='text-[#525252] text-[10px] sm:text-xs md:text-sm'>helps the AI understand your proportions</p>
                </div>

                <div className='bg-white flex flex-col gap-1 sm:gap-1.5 md:gap-2 py-4 sm:py-5 md:py-6 px-10 sm:px-12 md:px-14'>
                    <h4 className='text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl'>Standing straight</h4>
                    <p className='text-[#525252] text-[10px] sm:text-xs md:text-sm'>not seated or at an angle</p>
                </div>

                <div className='bg-white flex flex-col gap-1 sm:gap-1.5 md:gap-2 py-4 sm:py-5 md:py-6 px-10 sm:px-12 md:px-14 lg:col-span-2'>
                    <h4 className='text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl'>Plain or simple background</h4>
                    <p className='text-[#525252] text-[10px] sm:text-xs md:text-sm'>lets the garment stand out</p>
                </div>
            </div>

            <div className='bg-white flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-4 sm:py-5 md:py-6 px-10 sm:px-12 md:px-14 mb-14 sm:mb-18 mb:mb-23 lg:mb-27'>
                <h4 className='text-black font-semibold text-base sm:text-lg md:text-xl lg:text-2xl'>How your photo is used</h4>
                <p className='text-[#525252] text-sm sm:text-base md:text-lg lg:text-xl max-w-227.75'>Used exclusively for AI try-on previews. Never shared publicly, never shown to vendors, never used in advertising. Delete it anytime. Privacy policy →</p>
            </div>

            <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3'>
                <p className='font-medium text-sm sm:text-base md:text-lg lg:text-xl text-white'>Submit</p>
            </Button>
        </div>
    )
}

export default TryOnUpload