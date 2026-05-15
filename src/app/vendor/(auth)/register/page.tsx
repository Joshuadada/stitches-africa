"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RegisterPage = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace('/vendor/register/start')
    })
}

export default RegisterPage