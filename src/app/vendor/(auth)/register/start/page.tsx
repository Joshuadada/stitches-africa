import RegisterStart from '@/features/vendor/auth/register/register-start'
import Header from '@/layout/header'
import GoogleOAuthClientProvider from '@/providers/google-oauth-client-provider';

const RegisterStartPage = () => {
    return (
        <div>
            <Header />
            <div className='h-6 sm:h-8 md:h-10 lg:h-12 bg-[#F5F5F5]'></div>
            <GoogleOAuthClientProvider>
                <RegisterStart />
            </GoogleOAuthClientProvider>
        </div>
    )
}

export default RegisterStartPage