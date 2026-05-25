import VendorLogin from '@/features/vendor/auth/login'
import GoogleOAuthClientProvider from '@/providers/google-oauth-client-provider';

const VendorLoginPage = () => {
  return (
    <GoogleOAuthClientProvider>
      <VendorLogin />
    </GoogleOAuthClientProvider>
  )
}

export default VendorLoginPage