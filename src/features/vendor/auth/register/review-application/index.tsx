"use client"

import { useSubmitVendorRegister } from '@/hooks/api/useAuth'
import Button from '@/shared/components/button'
import { useAuthStore, useVendorOnboardingFilesStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DetailsBlock from './details-block'

const ReviewApplication = () => {
    const [confirmed, setConfirmed] = useState(false)
    const { vendorOnboardingData, clearVendorOnboardingData } = useAuthStore()
    const router = useRouter()
    const { additionalFileData: additionalFile, portfolioFiles, govIdFiles, clearVendorOnboardingFiles } = useVendorOnboardingFilesStore()

    const { onSubmit, isPending } = useSubmitVendorRegister(() => {
        clearVendorOnboardingData()
        clearVendorOnboardingFiles()
    })

    useEffect(() => {
        if (!additionalFile || !portfolioFiles || !govIdFiles) {
            router.push("/vendor/register/document-upload")
        }
    }, [])

    const handleBack = () => router.push("/vendor/register/document-upload")

    const handleSubmit = () => {
        if (!confirmed || !vendorOnboardingData) return
        onSubmit(vendorOnboardingData, { additionalFile, portfolioFiles, govIdFiles })
    }

    const {
        businessName,
        physicalBusinessAddress,
        city,
        state,
        yearsInOperation,
        businessCategory,
        firstName,
        lastName,
        businessEmail,
        phoneNumber,
        whatsappNumber,
        cacRegistrationNumber,
        additionalFileData,
        govIdFilesData,
        portfolioFilesData,
    } = vendorOnboardingData ?? {}

    return (
        <div>
            <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 mb-5 sm:mb-8 md:mb-11 lg:mb-14">
                <h4 className="text-black font-garamond text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Review your application
                </h4>
                <p className="text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                    Check everything below before submitting.
                    You can edit any section by clicking the edit link next to it.
                    Once submitted you will not be able to make changes.
                </p>
            </div>

            <div>
                <div className='mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12'>
                    <div className='flex items-center justify-between gap-3 bg-[#FAF7F2] rounded-[10px] py-2 sm:py-3 md:py-4 lg:py-5 px-2.5 sm:px-3.5 md:px-4.5 lg:px-5.5'>
                        <h4 className='text-black font-medium text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>BUSINESS DETAILS</h4>
                        <a className='text-[#B5894A] underline cursor-pointer text-[8px] sm:text-[10px] md:text-xs lg:text-sm'
                            onClick={() => router.push("/vendor/register/business-details")}
                        >Edit details</a>
                    </div>
                    <div className='px-2.5 sm:px-3.5 md:px-4.5 lg:px-5.5 py-1.5 sm:py-2 md:py-3 lg:py-4'>
                        <DetailsBlock label='Business Name' value={businessName || ""} />
                        <DetailsBlock label='CAC number' value={cacRegistrationNumber || ""} />
                        <DetailsBlock label='Physical address' value={physicalBusinessAddress || ""} />
                        <DetailsBlock label='City' value={city || ""} />
                        <DetailsBlock label='State' value={state || ""} />
                        <DetailsBlock label='Years in operation' value={yearsInOperation + " years"} />
                        <DetailsBlock label='Product categories' value={state || ""} />

                        <div className='flex items-center gap-2 border-b border-[#C8C0B5] py-1.5 sm:py-2 md:py-3 lg:py-3.5'>
                            <h5 className='w-[196] text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>Product categories</h5>
                            <p className='flex-1 text-black font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm flex items-center gap-4 flex-wrap'>
                                {
                                    ((businessCategory as string[]) || [])?.map((category) => (
                                        <span key={category}>{category}</span>
                                    ))
                                }
                            </p>
                        </div>

                        <DetailsBlock label='First name' value={firstName || ""} />
                        <DetailsBlock label='Last name' value={lastName || ""} />
                        <DetailsBlock label='Business email' value={businessEmail || ""} />
                        <DetailsBlock label='Phone' value={phoneNumber || ""} />
                        <DetailsBlock label='Whatsapp number' value={whatsappNumber || ""} />
                    </div>
                </div>

                <div className='mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16'>
                    <div className='flex items-center justify-between gap-3 bg-[#FAF7F2] rounded-[10px] py-2 sm:py-3 md:py-4 lg:py-5 px-2.5 sm:px-3.5 md:px-4.5 lg:px-5.5'>
                        <h4 className='text-black font-medium text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>DOCUMENTS</h4>
                        <a className='text-[#B5894A] underline cursor-pointer text-[8px] sm:text-[10px] md:text-xs lg:text-sm'
                            onClick={() => router.push("/vendor/register/document-upload")}
                        >Edit documents</a>
                    </div>
                    <div className='px-2.5 sm:px-3.5 md:px-4.5 lg:px-5.5'>
                        <div className='flex items-center gap-2 border-b border-[#C8C0B5] py-1.5 sm:py-2.5 md:py-3.5 lg:py-4.5'>
                            <h5 className='w-[196] text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>Business Document</h5>
                            <div className='flex-1 flex items-center gap-2.5 sm:gap-3.5 md:gap-4.5 lg:gap-5.5'>
                                <div className={`w-5 sm:w-6 md:w-7 lg:w-9 h-5 sm:h-6 md:h-7 lg:h-9 rounded bg-black`}></div>
                                <div className='flex items-end gap-3'>
                                    <p className='text-black font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>{additionalFileData?.name}</p>
                                    <p className='text-[#737373] text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs'>{additionalFileData?.size} </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 border-b border-[#C8C0B5] py-1.5 sm:py-2.5 md:py-3.5 lg:py-4.5'>
                            <h5 className='w-[196] text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>Government ID</h5>
                            <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
                                {
                                    ((govIdFilesData || []) as any[]).map((govId, index) => (
                                        <div key={govId.name + index} className='flex-1 flex items-center gap-2.5 sm:gap-3.5 md:gap-4.5 lg:gap-5.5'>
                                            <div className={`w-5 sm:w-6 md:w-7 lg:w-9 h-5 sm:h-6 md:h-7 lg:h-9 rounded bg-black`}></div>
                                            <div className='flex items-end gap-3'>
                                                <p className='text-black font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>{govId?.name}</p>
                                                <p className='text-[#737373] text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs'>{govId?.size}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='flex gap-2 py-1.5 sm:py-2.5 md:py-3.5 lg:py-4.5'>
                            <h5 className='w-[196] text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>Portfolio samples</h5>
                            <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
                                {
                                    ((portfolioFilesData || []) as any[]).map((portfolio, index) => (
                                        <div key={portfolio.name + index} className='flex-1 flex items-center gap-2.5 sm:gap-3.5 md:gap-4.5 lg:gap-5.5'>
                                            <div className={`w-5 sm:w-6 md:w-7 lg:w-9 h-5 sm:h-6 md:h-7 lg:h-9 rounded bg-black`}></div>
                                            <div className='flex items-end gap-3'>
                                                <p className='text-black font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>{portfolio?.name}</p>
                                                <p className='text-[#737373] text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs'>{portfolio?.size}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation checkbox */}
                <div className='flex gap-1.5 sm:gap-2.5 md:gap-3.5 lg:gap-4.5 bg-[#FAF7F2] px-2 sm:px-3 md:px-4 lg:px-5 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-26'>
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className="w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5 accent-black mt-0.5 shrink-0"
                    />
                    <p className='text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>
                        I confirm that all information provided is accurate and that I am authorised to represent this business.
                        I understand that submitting false information will result in immediate rejection and may prevent future applications.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 md:gap-12 lg:gap-18 xl:gap-26">
                    <Button onClick={handleBack} type='button' className='bg-white border border-[#A3A3A3] p-3'>
                        <p className='font-medium text-[10px] sm:text-xs lg:text-sm text-black'>&larr; Back</p>
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        type='button'
                        className='bg-[#B5894A] p-3'
                        disabled={!confirmed || isPending}
                        loading={isPending}
                    >
                        <p className='font-medium text-[10px] sm:text-xs lg:text-sm text-white'>Submit application &rarr;</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ReviewApplication