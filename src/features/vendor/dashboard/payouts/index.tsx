"use client"

import { useVendorHeaderStore } from '@/store/vendor-header'
import AccountCard from './account-card'
import CardContainer from './card-container'
import PayoutHistory from './payout-history'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { useBankAccountDetails, usePayoutSummary, useVendorPayouts } from '@/hooks/api/vendor/useVendorPayouts'
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

  const {
    data: payoutSummary,
    isLoading: isPayoutSummaryLoading,
    error: payoutSummaryError,
  } = usePayoutSummary();

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

    if (payoutSummaryError) {
      showToast({
        type: "error",
        title: "Error",
        message: payoutSummaryError.message,
      });
    }
  }, [payoutError, accountDetailsError, payoutSummaryError]);

  useEffect(() => {
    setVendorHeader({
      title: "Payouts",
      highlight: vendorProfile?.businessName || ''
    })
  }, [vendorProfile])

  if (isPayoutLoading || isAccountDetailsLoading || isPayoutSummaryLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className='mb-6 sm:mb-8 md:mb-10 lg:mb-11.5'><CardContainer payoutSummary={payoutSummary || null} /></div>
      <div className='mb-8 sm:mb-10 md:mb-12 lg:mb-13.5'><AccountCard accountDetails={accountDetails || null} /></div>
      <div><PayoutHistory payouts={vendorPayouts || []} /></div>
    </div>
  )
}

export default Payouts