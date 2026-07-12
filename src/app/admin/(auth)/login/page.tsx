import AdminLogin from '@/features/admin/auth/login'
import GoogleOAuthClientProvider from '@/providers/google-oauth-client-provider';

const AdminLoginPage = () => {
    return (
        <div>
            <div className='h-6 sm:h-8 md:h-10 lg:h-12 bg-[#F5F5F5]'></div>
            <GoogleOAuthClientProvider>
                <AdminLogin />
            </GoogleOAuthClientProvider>
        </div>
    )
}

export default AdminLoginPage
