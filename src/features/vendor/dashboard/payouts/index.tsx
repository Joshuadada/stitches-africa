"use client"

import { useVendorHeaderStore } from '@/store/vendor-header'
import AccountCard from './account-card'
import CardContainer from './card-container'
import PayoutHistory from './payout-history'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { useBankAccountDetails, useVendorPayouts } from '@/hooks/api/vendor/useVendorPayouts'
import { showToast } from '@/utils/toast'
import Loader from '@/shared/components/loader'

const Payouts = () => {
  const { vendorProfile } = useAuthStore()
  const { setVendorHeader } = useVendorHeaderStore()

  const {
    data: vendorPayouts,
    isLoading: isPayoutLoading,
    error: payoutError,
  } = useVendorPayouts();

  const {
    data: accountDetails,
    isLoading: isAccountDetailsLoading,
    error: accountDetailsError,
  } = useBankAccountDetails();

  useEffect(() => {
    if (payoutError) {
      showToast({
        type: "error",
        title: "Error",
        message: payoutError.message,
      });
    }

    if (accountDetailsError) {
      showToast({
        type: "error",
        title: "Error",
        message: accountDetailsError.message,
      });
    }
  }, [payoutError, accountDetailsError]);

  useEffect(() => {
    setVendorHeader({
      title: "Payouts",
      highlight: vendorProfile?.businessName || ''
    })
  }, [vendorProfile])

  if (isPayoutLoading || isAccountDetailsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className='mb-6 sm:mb-8 md:mb-10 lg:mb-11.5'><CardContainer /></div>
      <div className='mb-8 sm:mb-10 md:mb-12 lg:mb-13.5'><AccountCard accountDetails={accountDetails || null} /></div>
      <div><PayoutHistory payouts={vendorPayouts || []} /></div>
    </div>
  )
}

export default Payouts