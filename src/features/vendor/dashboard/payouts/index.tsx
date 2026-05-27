"use client"

import { useVendorHeaderStore } from '@/store/vendor-header'
import AccountCard from './account-card'
import CardContainer from './card-container'
import PayoutHistory from './payout-history'
import { useEffect } from 'react'

const Payouts = () => {
  const { setVendorHeader } = useVendorHeaderStore()

  useEffect(() => {
    setVendorHeader({
      title: "Payouts",
      highlight: "Adire Couture"
    })
  }, [])

  return (
    <div>
      <div className='mb-6 sm:mb-8 md:mb-10 lg:mb-11.5'><CardContainer /></div>
      <div className='mb-8 sm:mb-10 md:mb-12 lg:mb-13.5'><AccountCard /></div>
      <div><PayoutHistory /></div>
    </div>
  )
}

export default Payouts