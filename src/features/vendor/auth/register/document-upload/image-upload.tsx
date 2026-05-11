"use client"
import React, { useState } from 'react'
import Image from 'next/image';

interface ImageUploadProps {
    onChange?: (file: File) => void;
}

const ImageUpload = ({ onChange }: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (file: File) => {
        if (!file) return;

        // Send file to parent
        onChange?.(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileChange(file);
    };
    
    return (
        <div>
            <input type="file" accept='image/*' className='hidden' id='photo' onChange={onFileInputChange} />
            <label htmlFor="photo" className='w-full block p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 border border-dashed rounded-sm sm:rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl border-[#737373] bg-[#FAF7F2]'>
                <div className='flex flex-col items-center'>
                    {/* Preview OR Placeholder */}
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mb-5 sm:mb-6 md:mb-7 lg:mb-8 h-32 w-32 object-cover rounded-full border border-dotted"
                        />
                    ) : (
                        <Image
                            src="/svgs/upload-icon.svg"
                            alt="Upload"
                            width={21.58} height={33.15} className='mb-5 sm:mb-6 md:mb-7 lg:mb-8'
                        />
                    )}
                    <div className='flex flex-col items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3'>
                        <h4 className='text-black text-sm sm:text-base md:text-lg lg:text-xl text-center'>Upload your business document</h4>
                        <p className='text-[#525252] text-[10px] sm:text-xs md:text-sm lg:text-base text-center'>Drag and drop your business registration document here or choose a file below</p>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
                        <label htmlFor='photo' className='bg-black border border-[#A3A3A3] py-1.5 lg:py-2 px-4 sm:px-5 md:px-6 lg:px-7 flex items-center justify-center min-w-[137] w-full rounded-md cursor-pointer'>
                            <p className='font-medium text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-white'>Browse File</p>
                        </label>

                        <label htmlFor='photo' className='bg-white border border-black py-1.5 lg:py-2 px-4 sm:px-5 md:px-6 lg:px-7 flex items-center justify-center min-w-[147] w-full rounded-md cursor-pointer'>
                            <p className='font-medium text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-black'>Take a Photo</p>
                        </label>
                    </div>
                </div>
            </label>
        </div>
    )
}

export default ImageUpload