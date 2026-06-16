"use client"

import { useVendorHeaderStore } from '@/store/vendor-header'
import AccountCard from './account-card'
import CardContainer from './card-container'
import PayoutHistory from './payout-history'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { useVendorPayouts } from '@/hooks/api/vendor/useVendorPayouts'
import { showToast } from '@/utils/toast'
import Loader from '@/shared/components/loader'

const Payouts = () => {
  const { vendorProfile } = useAuthStore()
  const { setVendorHeader } = useVendorHeaderStore()

  const {
    data: vendorPayouts,
    isLoading,
    error,
  } = useVendorPayouts();

  useEffect(() => {
    if (error) {
      showToast({
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  }, [error]);

  useEffect(() => {
    setVendorHeader({
      title: "Payouts",
      highlight: vendorProfile?.businessName || ''
    })
  }, [vendorProfile])

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className='mb-6 sm:mb-8 md:mb-10 lg:mb-11.5'><CardContainer /></div>
      <div className='mb-8 sm:mb-10 md:mb-12 lg:mb-13.5'><AccountCard /></div>
      <div><PayoutHistory payouts={vendorPayouts || []} /></div>
    </div>
  )
}

export default Payouts