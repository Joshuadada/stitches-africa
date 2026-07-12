"use client"

import { useState } from 'react'
import Button from '@/shared/components/button'
import Image from 'next/image'
import AddPayoutModal from './add-payout-modal'
import { BankAccount } from '@/types/vendor'
import { useSubmitUpdateBankAccount } from '@/hooks/api/vendor/useVendorPayouts'

const AccountCard = ({ accountDetails }: { accountDetails: BankAccount | null }) => {
    const [openModal, setOpenModal] = useState(false)

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <>
            <div className='space-y-4'>
                {accountDetails?.hasBankAccount ? (
                    <div className='flex gap-3 flex-wrap items-center justify-between py-2.5 sm:py-3.5 md:py-4 lg:py-4.5 px-3.5 sm:px-4.5 md:px-5.5 lg:px-6 border border-[#B5894A] rounded-2xl lg:rounded-[20px]'>
                        <div>
                            <h4 className='text-[#B5894A] font-garamond font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
                                {accountDetails?.bankName}
                            </h4>

                            <p className='text-[#76716C] text-[10px] sm:text-xs md:text-sm lg:text-base'>
                                {accountDetails?.accountNumberMasked} - {accountDetails?.accountName}
                            </p>
                        </div>

                        <Button
                            onClick={() => setOpenModal(true)}
                            type='button'
                            className='bg-white border border-[#B5894A] p-2.5 max-w-40.75'
                        >
                            <p className='font-medium text-[10px] md:text-xs lg:text-sm text-[#737373]'>
                                Update bank account
                            </p>
                        </Button>
                    </div>
                ) : (
                    <div className='flex gap-3 flex-wrap items-center justify-between py-2.5 sm:py-3.5 md:py-4 lg:py-4.5 px-3.5 sm:px-4.5 md:px-5.5 lg:px-6 border border-[#B5894A] rounded-2xl lg:rounded-[20px]'>
                        <div className='flex items-center gap-3 md:gap-5 lg:gap-7'>
                            <Image
                                src={"/svgs/bank-icon.svg"}
                                alt='bank icon'
                                height={51}
                                width={46}
                            />

                            <div>
                                <h4 className='text-[#B5894A] font-garamond font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
                                    NO BANK ACCOUNT
                                </h4>

                                <p className='text-[#76716C] text-[10px] sm:text-xs md:text-sm lg:text-base'>
                                    Add a bank account to start receiving your earnings
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setOpenModal(true)}
                            type='button'
                            className='bg-[#B5894A] text-white p-2.5 max-w-38 flex items-center gap-2 md:gap-3 lg:gap-4'
                        >
                            <span className='font-medium'>+</span>

                            <p className='font-medium text-[10px] md:text-xs lg:text-sm'>
                                Add account
                            </p>
                        </Button>
                    </div>
                )}
            </div>

            {openModal && (
                <AddPayoutModal
                    onClose={handleCloseModal}
                    accountDetails={accountDetails || null}
                />
            )}
        </>
    )
}

export default AccountCard