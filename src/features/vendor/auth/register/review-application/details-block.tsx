const DetailsBlock = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className='flex items-center gap-2 border-b border-[#C8C0B5] py-1.5 sm:py-2 md:py-3 lg:py-3.5'>
            <h5 className='w-[196] text-[#736551] text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>{label}</h5>
            <p className='flex-1 text-black font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm'>{value}</p>
        </div>
    )
}

export default DetailsBlock