import React from 'react'
import Left from './left'
import Right from './right'

const VendorLogin = () => {
    return (
        <div className='flex flex-col md:flex-row h-full bg-[#FAF7F2]'>
            <div className='md:w-[440] lg:w-[660]'><Left /></div>
            <div className='flex-1'><Right /></div>
        </div>
    )
}

export default VendorLogin