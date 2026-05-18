const CardContainer = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4'>
        <div className='bg-black py-2.5 sm:py-3.5 md:py-4.5 lg:py-5.5 px-5 sm:px-6 md:px-7 lg:px-8 rounded-md'>
            <h4 className='text-[#A3A3A3] text-[10px] sm:text-xs md:text-sm lg:text-base mb-0.5 md:mb-1 lg:mb-1.5'>PENDING PAYOUT</h4>
            <p className='font-garamond text-[#B5894A] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1.5 md:mb-2 lg:mb-2.5'>N384,000</p>
            <p className='text-[#A3A3A3] text-[8px] md:text-[10px] lg:text-xs'>Next processing: Mon 7 Apr</p>
        </div>

        <div className='bg-black py-2.5 sm:py-3.5 md:py-4.5 lg:py-5.5 px-5 sm:px-6 md:px-7 lg:px-8 rounded-md'>
            <h4 className='text-[#A3A3A3] text-[10px] sm:text-xs md:text-sm lg:text-base mb-0.5 md:mb-1 lg:mb-1.5'>PAID THIS MONTH</h4>
            <p className='font-garamond text-[#B5894A] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1.5 md:mb-2 lg:mb-2.5'>N1.2M</p>
            <p className='text-[#A3A3A3] text-[8px] md:text-[10px] lg:text-xs'>Next processing: Mon 7 Apr</p>
        </div>

        <div className='bg-black py-2.5 sm:py-3.5 md:py-4.5 lg:py-5.5 px-5 sm:px-6 md:px-7 lg:px-8 rounded-md'>
            <h4 className='text-[#A3A3A3] text-[10px] sm:text-xs md:text-sm lg:text-base mb-0.5 md:mb-1 lg:mb-1.5'>TOTAL PAID (ALL TIME)</h4>
            <p className='font-garamond text-[#B5894A] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1.5 md:mb-2 lg:mb-2.5'>N8.4M</p>
            <p className='text-[#A3A3A3] text-[8px] md:text-[10px] lg:text-xs'>Since Feb 2021</p>
        </div>
    </div>
  )
}

export default CardContainer