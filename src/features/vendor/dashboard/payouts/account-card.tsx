"use client"

import Button from '@/shared/components/button'

const AccountCard = () => {
    return (
        <div className='flex gap-3 flex-wrap items-center justify-between py-2.5 sm:py-3.5 md:py-4 lg:py-4.5 px-3.5 sm:px-4.5 md:px-5.5 lg:px-6 border border-[#B5894A] rounded-2xl lg:rounded-[20px]'>
            <div>
                <h4 className='text-[#B5894A] font-garamond font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>GTB BANK</h4>
                <p className='text-[#76716C] text-[10px] sm:text-xs md:text-sm lg:text-base'>001237689504 - DAVID NSIRIM</p>
            </div>

            <Button onClick={() => { }} type='button' className='bg-white border border-[#B5894A] p-2.5 max-w-[163]'>
                <p className='font-medium text-[10px] md:text-xs lg:text-sm text-[#737373]'>Update bank account</p>
            </Button>
        </div>
    )
}

export default AccountCard