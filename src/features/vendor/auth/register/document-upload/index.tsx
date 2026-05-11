"use client"

import { useState } from "react";
import ImageUpload from "./image-upload";
import { useMultiFiles } from "@/shared/hooks/useMultifiles";
import { MultiFileUpload } from "./multifile-upload";
import Button from "@/shared/components/button";

const VendorDocumentUpload = () => {
    const [additionalFile, setAdditionalFile] = useState<File | null>(null);
    const govId = useMultiFiles();
    const portfolio = useMultiFiles();

    return (
        <div>
            <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 mb-5 sm:mb-8 md:mb-11 lg:mb-14">
                <h4 className="text-black font-garamond text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Upload your documents
                </h4>
                <p className="text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                    All documents are reviewed securely by our team and never shared
                    publicly. Accepted formats: PDF, JPG, PNG. Maximum 10MB per file.
                </p>
            </div>

            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
                {/* Additional Documents */}
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                    <h5 className="text-black text-[8px] md:text-[10px] lg:text-xs tracking-wide">
                        ADDITIONAL DOCUMENTS *
                    </h5>
                    <ImageUpload onChange={(file) => setAdditionalFile(file)} />
                </div>

                {/* Government Issue ID */}
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                    <h5 className="text-black text-[8px] md:text-[10px] lg:text-xs tracking-wide">
                        GOVERNMENT ISSUE ID *
                    </h5>
                    <MultiFileUpload
                        files={govId.files}
                        onAdd={govId.addFiles}
                        onRemove={govId.removeFile}
                    />
                </div>

                {/* Product Portfolio Sample */}
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                    <h5 className="text-black text-[8px] md:text-[10px] lg:text-xs tracking-wide">
                        PRODUCT PORTFOLIO SAMPLE
                    </h5>
                    <MultiFileUpload
                        files={portfolio.files}
                        onAdd={portfolio.addFiles}
                        onRemove={portfolio.removeFile}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 md:gap-12 lg:gap-18 xl:gap-26 mt-5 sm:mt-7 md:mt-9 lg:mt-11">
                    <Button onClick={() => { }} type='submit' className='bg-white border border-[#A3A3A3] p-3'>
                        <p className='font-medium text-[10px] sm:text-xs lg:text-sm text-black'>&larr; Back</p>
                    </Button>
                    <Button onClick={() => { }} type='submit' className='bg-[#171717] p-3'>
                        <p className='font-medium text-[10px] sm:text-xs lg:text-sm text-white'>Review your application &rarr;</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VendorDocumentUpload;