'use client';

import React, { ReactNode, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/SplashScreen';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

export default function DashboardLayout(props: { children: ReactNode }) {
    const { user, status } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <SplashScreen />;
    }

    if (user && !user?.is_active) {
        router.push('/auth/wait-list');
    }

    if (user && user?.is_active && status === 'authenticated') {
        return <AppLayout>{props.children}</AppLayout>;
    }

    return null;
}
